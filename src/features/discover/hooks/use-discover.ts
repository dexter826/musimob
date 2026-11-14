import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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

type UseDiscoverOptions = {
  librarySongs: Song[]
  onAddSong?: (song: NewSong) => Promise<string | void>
}

export function useDiscover({ librarySongs, onAddSong }: UseDiscoverOptions) {
  const [activeSongs, setActiveSongs] = useState<SearchResult[]>([])
  const [savedTrackIds, setSavedTrackIds] = useState<Set<number>>(
    () => new Set(),
  )
  const [savingTrackId, setSavingTrackId] = useState<number | null>(null)

  // 1. Nguồn bài hát phổ biến
  const popularQuery = useQuery({
    queryKey: ['discover', 'top-songs'],
    queryFn: () => discoverApi.topSongs(50),
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  // 2. Lấy mẫu 1-3 ca sĩ từ thư viện cá nhân
  const sampledArtists = useMemo(
    () => sampleLibraryArtists(librarySongs, 3),
    [librarySongs],
  )

  const artistQueryKey = sampledArtists.slice().sort().join('|')

  // 3. Nguồn bài hát theo ca sĩ đã lưu
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

  // Khởi tạo activeSongs khi candidatePool có dữ liệu
  useEffect(() => {
    setActiveSongs((current) => {
      if (current.length > 0) return current
      return candidatePool.slice(0, DISCOVER_BATCH_SIZE)
    })
  }, [candidatePool])

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

        setSavedTrackIds((prev) => new Set(prev).add(song.trackId))

        // Bù ngay một bài mới từ candidatePool vào vị trí bài vừa lưu
        setActiveSongs((prevActive) => {
          const currentIds = new Set(prevActive.map((s) => s.trackId))
          currentIds.add(song.trackId)

          const replacement = candidatePool.find(
            (candidate) =>
              !currentIds.has(candidate.trackId) &&
              !savedTrackIds.has(candidate.trackId),
          )

          const filtered = prevActive.filter((s) => s.trackId !== song.trackId)
          if (replacement) {
            return [...filtered, replacement]
          }
          return filtered
        })
      } catch {
        toast.error('Không lưu được bài hát. Kiểm tra mạng rồi thử lại.')
      } finally {
        setSavingTrackId(null)
      }
    },
    [onAddSong, savingTrackId, candidatePool, savedTrackIds],
  )

  const isLoading =
    popularQuery.isLoading ||
    (sampledArtists.length > 0 && artistQuery.isLoading)
  const isError =
    popularQuery.isError && (!artistData || artistData.length === 0)
  const error = popularQuery.error || artistQuery.error

  const refetch = useCallback(() => {
    return Promise.all([popularQuery.refetch(), artistQuery.refetch()])
  }, [popularQuery, artistQuery])

  const shuffle = useCallback(() => {
    setActiveSongs((current) => {
      const currentIds = new Set(current.map((s) => s.trackId))
      const availableCandidates = candidatePool.filter(
        (c) => !currentIds.has(c.trackId) && !savedTrackIds.has(c.trackId),
      )

      if (availableCandidates.length >= DISCOVER_BATCH_SIZE) {
        const shuffled = [...availableCandidates].sort(
          () => Math.random() - 0.5,
        )
        return shuffled.slice(0, DISCOVER_BATCH_SIZE)
      }

      const allEligible = candidatePool.filter(
        (c) => !savedTrackIds.has(c.trackId),
      )
      const shuffledAll = [...allEligible].sort(() => Math.random() - 0.5)
      return shuffledAll.slice(0, DISCOVER_BATCH_SIZE)
    })
  }, [candidatePool, savedTrackIds])

  return {
    songs: activeSongs,
    candidatePool,
    savedTrackIds,
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
