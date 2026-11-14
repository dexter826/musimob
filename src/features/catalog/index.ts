export { SongSearch } from './components/song-search'
export { SearchResultRow } from './components/search-result-row'
export { AlreadySavedBadge } from './components/already-saved-badge'
export { useSongSearch } from './hooks/use-song-search'
export {
  searchApi,
  discoverApi,
  normalizeCatalogTrack,
  normalizeRssEntry,
  RateLimitError,
  SearchError,
  SearchTimeoutError,
} from './api/catalog'
export type { CatalogTrack, SearchResult } from './types'
