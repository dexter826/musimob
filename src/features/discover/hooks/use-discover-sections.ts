import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { discoverApi, searchApi, type CatalogTrack } from '@/features/catalog'
import type { NewSong, Song } from '@/features/songs'
import { getSongKey } from '@/lib/song-key'
import { sampleLibraryArtists } from '../lib/pool-aggregator'

const STALE_TIME_MS = 15 * 60 * 1000
const GC_TIME_MS = 30 * 60 * 1000

export const DISCOVER_GENRES = [
  { id: 'vpop', label: 'Nhạc Trẻ', query: 'Nhạc trẻ' },
  { id: 'ballad', label: 'Ballad', query: 'Ballad Việt' },
  { id: 'acoustic', label: 'Acoustic', query: 'Acoustic Việt' },
  { id: 'usuk', label: 'US-UK', query: 'Pop hits' },
  { id: 'lofi', label: 'Lofi Chill', query: 'Lofi Việt Nam' },
] as const

export type DiscoverGenreId = (typeof DISCOVER_GENRES)[number]['id']

type UseDiscoverSectionsOptions = {
  librarySongs: Song[]
  onAddSong?: (song: NewSong) => Promise<string | void>
}

export function useDiscoverSections({
  librarySongs,
  onAddSong,
}: UseDiscoverSectionsOptions) {
  const [savingTrackId, setSavingTrackId] = useState<number | null>(null)
  const [selectedGenreId, setSelectedGenreId] =
    useState<DiscoverGenreId>('vpop')

  const savedSet = useMemo(() => {
    const set = new Set<string | number>()
    for (const song of librarySongs) {
      if (song.sourceId != null) {
        set.add(song.sourceId)
        set.add(String(song.sourceId))
        const num = Number(song.sourceId)
        if (!Number.isNaN(num)) set.add(num)
      }
      set.add(getSongKey(song.title, song.artist))
    }
    return set
  }, [librarySongs])

  // 1. Phân mục Thịnh hành (Top Songs Việt Nam)
  const trendingQuery = useQuery({
    queryKey: ['discover', 'trending-vpop'],
    queryFn: () => discoverApi.topSongs(30),
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  // 2. Phân mục Dành cho bạn (Nghệ sĩ trong thư viện)
  const sampledArtists = useMemo(
    () => sampleLibraryArtists(librarySongs, 5),
    [librarySongs],
  )

  const artistQueryKey = sampledArtists.slice().sort().join('|')

  const forYouQuery = useQuery({
    queryKey: ['discover', 'for-you', artistQueryKey],
    queryFn: async () => {
      if (sampledArtists.length === 0) return []
      const responses = await Promise.all(
        sampledArtists.map((artist) => searchApi.query(artist).catch(() => [])),
      )
      const tracks = responses.flat()
      // Loại trừ các bài đã có trong Thư viện
      const seen = new Set<number>()
      const result: CatalogTrack[] = []
      for (const t of tracks) {
        if (seen.has(t.trackId)) continue
        seen.add(t.trackId)
        if (
          !savedSet.has(t.trackId) &&
          !savedSet.has(getSongKey(t.title, t.artist))
        ) {
          result.push(t)
        }
      }
      return result
    },
    enabled: sampledArtists.length > 0,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  // 3. Phân mục Thể loại
  const currentGenre = useMemo(
    () =>
      DISCOVER_GENRES.find((g) => g.id === selectedGenreId) ??
      DISCOVER_GENRES[0],
    [selectedGenreId],
  )

  const genreQuery = useQuery({
    queryKey: ['discover', 'genre', currentGenre.id],
    queryFn: () => searchApi.query(currentGenre.query),
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  const saveSong = useCallback(
    async (song: CatalogTrack) => {
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

        toast.success('Đã lưu vào Thư viện', {
          description: `${song.title} · ${song.artist}`,
        })
      } catch {
        toast.error('Không lưu được bài hát. Thử lại sau.')
      } finally {
        setSavingTrackId(null)
      }
    },
    [onAddSong, savingTrackId],
  )

  const isLoading = trendingQuery.isLoading
  const isError = trendingQuery.isError
  const error = trendingQuery.error

  const refetch = useCallback(() => {
    void trendingQuery.refetch()
    void forYouQuery.refetch()
    void genreQuery.refetch()
  }, [trendingQuery, forYouQuery, genreQuery])

  return {
    trendingTracks: trendingQuery.data ?? [],
    forYouTracks: forYouQuery.data ?? [],
    hasArtistsInLibrary: sampledArtists.length > 0,
    genreTracks: genreQuery.data ?? [],
    genres: DISCOVER_GENRES,
    selectedGenreId,
    setSelectedGenreId,
    selectedGenreLabel: currentGenre.label,
    isGenreLoading: genreQuery.isLoading,
    savedSet,
    savingTrackId,
    saveSong,
    isLoading,
    isError,
    error,
    refetch,
  }
}
