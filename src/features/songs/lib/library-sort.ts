export type LibrarySortOption = 'newest' | 'title-asc' | 'artist-asc'

export const SORT_STORAGE_KEY = 'musimob:library-sort'

export function getSavedSortOption(): LibrarySortOption {
  if (typeof window === 'undefined') return 'newest'
  const saved = localStorage.getItem(SORT_STORAGE_KEY)
  if (saved === 'title-asc' || saved === 'artist-asc' || saved === 'newest') {
    return saved
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
  return songs
}
