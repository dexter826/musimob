export type LibrarySortOption = 'newest' | 'title-asc' | 'artist-asc'

export const SORT_STORAGE_KEY = 'musimob:library-sort'

function getTimestampMillis(val: unknown): number {
  if (!val) return 0
  if (typeof val === 'number') return val
  if (typeof (val as { toMillis?: () => number }).toMillis === 'function') {
    return (val as { toMillis: () => number }).toMillis()
  }
  if (typeof (val as { seconds?: number }).seconds === 'number') {
    return (val as { seconds: number }).seconds * 1000
  }
  if (val instanceof Date) return val.getTime()
  const parsed = Date.parse(String(val))
  return Number.isNaN(parsed) ? 0 : parsed
}

export function getSavedSortOption(): LibrarySortOption {
  if (typeof window === 'undefined') return 'newest'
  try {
    const saved = localStorage.getItem(SORT_STORAGE_KEY)
    if (saved === 'title-asc' || saved === 'artist-asc' || saved === 'newest') {
      return saved
    }
  } catch {
    // Ignore storage errors
  }
  return 'newest'
}

export function sortSongs<
  T extends { title: string; artist: string; createdAt?: unknown },
>(songs: T[], option: LibrarySortOption): T[] {
  if (option === 'title-asc') {
    return [...songs].sort(
      (a, b) =>
        a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' }) ||
        a.artist.localeCompare(b.artist, 'vi', { sensitivity: 'base' }),
    )
  }
  if (option === 'artist-asc') {
    return [...songs].sort(
      (a, b) =>
        a.artist.localeCompare(b.artist, 'vi', { sensitivity: 'base' }) ||
        a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' }),
    )
  }
  if (option === 'newest') {
    return [...songs].sort((a, b) => {
      const timeA = getTimestampMillis(a.createdAt)
      const timeB = getTimestampMillis(b.createdAt)
      return timeB - timeA
    })
  }
  return [...songs]
}
