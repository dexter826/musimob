import { useQuery } from '@tanstack/react-query'
import { discoverApi } from '@/lib/api/catalog'
import type { SearchResult } from '@/lib/api/types'

const DISCOVER_BATCH_SIZE = 12
const STALE_TIME_MS = 15 * 60 * 1000
const GC_TIME_MS = 30 * 60 * 1000

export function useDiscover() {
  const query = useQuery({
    queryKey: ['discover', 'top-songs'],
    queryFn: () => discoverApi.topSongs(50),
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: 1,
  })

  const allSongs = query.data ?? []
  const activeSongs: SearchResult[] = allSongs.slice(0, DISCOVER_BATCH_SIZE)

  return {
    songs: activeSongs,
    allSongs,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
