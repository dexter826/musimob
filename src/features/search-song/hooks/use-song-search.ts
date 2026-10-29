import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/lib/api/catalog'

const DEBOUNCE_MS = 400
const MIN_TERM_LENGTH = 2
const STALE_TIME_MS = 10 * 60 * 1000
const GC_TIME_MS = 30 * 60 * 1000

export function useSongSearch(term: string) {
  const trimmedTerm = term.trim()
  const [debouncedTerm, setDebouncedTerm] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedTerm(trimmedTerm)
    }, DEBOUNCE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [trimmedTerm])

  const query = useQuery({
    queryKey: ['catalog', debouncedTerm],
    queryFn: () => searchApi.query(debouncedTerm),
    enabled: debouncedTerm.length >= MIN_TERM_LENGTH,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS,
    retry: false,
  })

  return {
    ...query,
    debouncedTerm,
    isDebouncing: trimmedTerm !== debouncedTerm,
  }
}
