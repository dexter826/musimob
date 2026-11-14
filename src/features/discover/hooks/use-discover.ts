import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { discoverApi, searchApi } from '@/lib/api/catalog'
import type { SearchResult, Song } from '@/lib/api/types'
import {
  interleaveAndDeduplicate,
  sampleLibraryArtists,
} from '../lib/pool-aggregator'

const DISCOVER_BATCH_SIZE = 12
const STALE_TIME_MS = 15 * 60 * 1000
const GC_TIME_MS = 30 * 60 * 1000

type UseDiscoverOptions = {
  librarySongs: Song[]
}

export function useDiscover({ librarySongs }: UseDiscoverOptions) {
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

  // 3. Nguồn bài hát theo ca sĩ đã lưu (nếu có)
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

  const activeSongs: SearchResult[] = useMemo(() => {
    return candidatePool.slice(0, DISCOVER_BATCH_SIZE)
  }, [candidatePool])

  const isLoading =
    popularQuery.isLoading ||
    (sampledArtists.length > 0 && artistQuery.isLoading)
  const isError =
    popularQuery.isError && (!artistData || artistData.length === 0)
  const error = popularQuery.error || artistQuery.error

  function refetch() {
    return Promise.all([popularQuery.refetch(), artistQuery.refetch()])
  }

  return {
    songs: activeSongs,
    candidatePool,
    isLoading,
    isError,
    error,
    refetch,
  }
}
