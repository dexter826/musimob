import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { discoverApi, searchApi } from '@/lib/api/catalog'
import type { NewSong, SearchResult, Song } from '@/lib/api/types'
import {
  interleaveAndDeduplicate,
  sampleLibraryArtists,
} from '../lib/pool-aggregator'

const DISCOVER_BATCH_SIZE = 12
const STALE_TIME_MS = 15 * 60 * 1000
const GC_TIME_MS = 30 * 60 * 1000
const ACTIVE_BATCH_KEY = ['discover', 'active-batch'] as const
const SAVED_IDS_KEY = ['discover', 'saved-ids'] as const

type UseDiscoverOptions = {
  librarySongs: Song[]
  onAddSong?: (song: NewSong) => Promise<string | void>
}

export function useDiscover({ librarySongs, onAddSong }: UseDiscoverOptions) {
  const queryClient = useQueryClient()
  const [savingTrackId, setSavingTrackId] = useState<number | null>(null)

  // 1. Nguồn bài hát phổ biến
  const popularQuery = useQuery({
    queryKey: ['discover', 'top-songs'],
    queryFn: () => discoverApi.topSongs(50),
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  // 2. Lấy mẫu nghệ sĩ từ thư viện cá nhân (ổn định theo số lượng bài đã lưu)
  const sampledArtists = useMemo(
    () => sampleLibraryArtists(librarySongs, 3),
    [librarySongs],
  )

  const artistQueryKey = sampledArtists.slice().sort().join('|')

  // 3. Nguồn bài hát theo nghệ sĩ đã lưu
  const artistQuery = useQuery({
    queryKey: ['discover', 'artist-songs', artistQueryKey],
    queryFn: async () => {
      if (sampledArtists.length === 0) return []
      const responses = await Promise.all(
        sampledArtists.map((artist) =>
          searchApi.query(artist).catch(() => []),
        ),
      )
      return responses.flat()
    },
    enabled: sampledArtists.length > 0,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  const popularData = popularQuery.data
  const artistData = artistQuery.data

  // 4. Trộn hai nguồn và lọc trừ các bài đã có trong Thư viện
  const candidatePool = useMemo(() => {
    const popularSongs = popularData ?? []
    const artistSongs = artistData ?? []
    return interleaveAndDeduplicate(popularSongs, artistSongs, librarySongs)
  }, [popularData, artistData, librarySongs])

  // Lấy activeSongs và savedTrackIds từ cache để giữ nguyên trạng thái khi chuyển tab
  const cachedActive = queryClient.getQueryData<SearchResult[]>(ACTIVE_BATCH_KEY)
  const [activeSongs, setActiveSongsState] = useState<SearchResult[]>(
    () => cachedActive ?? [],
  )

  const setActiveSongs = useCallback(
    (updater: (prev: SearchResult[]) => SearchResult[]) => {
      setActiveSongsState((prev) => {
        const next = updater(prev)
        queryClient.setQueryData(ACTIVE_BATCH_KEY, next)
        return next
      })
    },
    [queryClient],
  )

  // Khởi tạo activeSongs lần đầu ngẫu nhiên từ candidatePool
  useEffect(() => {
    if (activeSongs.length === 0 && candidatePool.length > 0) {
      const shuffled = [...candidatePool].sort(() => Math.random() - 0.5)
      const initialBatch = shuffled.slice(0, DISCOVER_BATCH_SIZE)
      setActiveSongs(() => initialBatch)
    }
  }, [activeSongs.length, candidatePool, setActiveSongs])

  const saveSong = useCallback(
    async (song: SearchResult) => {
      if (!onAddSong || savingTrackId !== null) return

      setSavingTrackId(song.trackId)
      try {
        await onAddSong({
          title: song.title,
          artist: song.artist,
          coverUrl: song.coverUrl,
          previewUrl: song.previewUrl,
          sourceId: song.trackId,
        })

        toast.success('Đã lưu bài hát vào Thư viện', {
          description: `${song.title} · ${song.artist}`,
        })

        const savedIds =
          queryClient.getQueryData<Set<number>>(SAVED_IDS_KEY) ?? new Set()
        savedIds.add(song.trackId)
        queryClient.setQueryData(SAVED_IDS_KEY, savedIds)

        // Bù bài mới vào đúng vị trí ô trống (index) của bài vừa lưu
        setActiveSongs((prevActive) => {
          const targetIndex = prevActive.findIndex(
            (s) => s.trackId === song.trackId,
          )
          if (targetIndex === -1) return prevActive

          const currentIds = new Set(prevActive.map((s) => s.trackId))
          currentIds.add(song.trackId)

          const replacement = candidatePool.find(
            (candidate) =>
              !currentIds.has(candidate.trackId) &&
              !savedIds.has(candidate.trackId),
          )

          const next = [...prevActive]
          if (replacement) {
            next[targetIndex] = replacement
          } else {
            next.splice(targetIndex, 1)
          }
          return next
        })
      } catch {
        toast.error('Không lưu được bài hát. Kiểm tra mạng rồi thử lại.')
      } finally {
        setSavingTrackId(null)
      }
    },
    [onAddSong, savingTrackId, candidatePool, queryClient, setActiveSongs],
  )

  const shuffle = useCallback(() => {
    const savedIds =
      queryClient.getQueryData<Set<number>>(SAVED_IDS_KEY) ?? new Set()

    setActiveSongs((current) => {
      const currentIds = new Set(current.map((s) => s.trackId))
      const availableCandidates = candidatePool.filter(
        (c) => !currentIds.has(c.trackId) && !savedIds.has(c.trackId),
      )

      if (availableCandidates.length >= DISCOVER_BATCH_SIZE) {
        const shuffled = [...availableCandidates].sort(
          () => Math.random() - 0.5,
        )
        return shuffled.slice(0, DISCOVER_BATCH_SIZE)
      }

      const allEligible = candidatePool.filter((c) => !savedIds.has(c.trackId))
      const shuffledAll = [...allEligible].sort(() => Math.random() - 0.5)
      return shuffledAll.slice(0, DISCOVER_BATCH_SIZE)
    })
  }, [candidatePool, queryClient, setActiveSongs])

  const isLoading =
    popularQuery.isLoading ||
    (sampledArtists.length > 0 && artistQuery.isLoading)
  const isError =
    popularQuery.isError && (!artistData || artistData.length === 0)
  const error = popularQuery.error || artistQuery.error

  const refetch = useCallback(() => {
    return Promise.all([popularQuery.refetch(), artistQuery.refetch()])
  }, [popularQuery, artistQuery])

  return {
    songs: activeSongs,
    candidatePool,
    savingTrackId,
    saveSong,
    shuffle,
    isLoading: isLoading && activeSongs.length === 0,
    isError,
    error,
    refetch,
    setActiveSongs,
  }
}
