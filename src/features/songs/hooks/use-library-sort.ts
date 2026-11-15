import { useMemo, useState } from 'react'
import {
  getSavedSortOption,
  sortSongs,
  SORT_STORAGE_KEY,
  type LibrarySortOption,
} from '../lib/library-sort'
import type { Song } from '../types'

export function useLibrarySort(songs: Song[]) {
  const [sortOption, setSortOptionState] =
    useState<LibrarySortOption>(getSavedSortOption)

  function setSortOption(option: LibrarySortOption) {
    setSortOptionState(option)
    try {
      localStorage.setItem(SORT_STORAGE_KEY, option)
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }

  const sortedSongs = useMemo(
    () => sortSongs(songs, sortOption),
    [songs, sortOption],
  )

  return {
    sortOption,
    setSortOption,
    sortedSongs,
  }
}
