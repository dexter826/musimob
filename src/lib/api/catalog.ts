import type { MusimobApi, SearchResult } from './types'

const CATALOG_SEARCH_URL = 'https://itunes.apple.com/search'
const CATALOG_TOP_SONGS_URL = 'https://itunes.apple.com/vn/rss/topsongs'
const REQUEST_TIMEOUT_MS = 10_000

type CatalogTrack = {
  trackId?: unknown
  trackName?: unknown
  artistName?: unknown
  artworkUrl100?: unknown
  previewUrl?: unknown
}

type CatalogResponse = {
  results?: unknown
}

export class RateLimitError extends Error {
  constructor() {
    super('Nguồn nhạc đang giới hạn tìm kiếm.')
    this.name = 'RateLimitError'
  }
}

export class SearchError extends Error {
  constructor(message = 'Không tìm được.', options?: ErrorOptions) {
    super(message, options)
    this.name = 'SearchError'
  }
}

export class SearchTimeoutError extends SearchError {
  constructor(options?: ErrorOptions) {
    super('Nguồn nhạc phản hồi chậm. Kiểm tra mạng rồi thử lại.', options)
    this.name = 'SearchTimeoutError'
  }
}

export function normalizeCatalogTrack(
  track: CatalogTrack,
): SearchResult | null {
  if (typeof track.trackId !== 'number') return null

  const artworkUrl =
    typeof track.artworkUrl100 === 'string' ? track.artworkUrl100 : ''

  return {
    trackId: track.trackId,
    title: typeof track.trackName === 'string' ? track.trackName.trim() : '',
    artist: typeof track.artistName === 'string' ? track.artistName.trim() : '',
    coverUrl: artworkUrl.replace('100x100bb', '600x600bb'),
    previewUrl:
      typeof track.previewUrl === 'string' ? track.previewUrl.trim() : '',
  }
}

function isCatalogTrack(value: unknown): value is CatalogTrack {
  return typeof value === 'object' && value !== null
}

function isTimeout(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === 'TimeoutError' || error.name === 'AbortError')
  )
}

export const searchApi: MusimobApi['search'] = {
  async query(term) {
    const params = new URLSearchParams({
      term,
      country: 'vn',
      entity: 'song',
      limit: '25',
    })

    let response: Response
    try {
      response = await fetch(`${CATALOG_SEARCH_URL}?${params.toString()}`, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
    } catch (error) {
      if (isTimeout(error)) throw new SearchTimeoutError({ cause: error })

      throw new SearchError('Không kết nối được nguồn nhạc.', { cause: error })
    }

    if (response.status === 429) {
      throw new RateLimitError()
    }

    if (!response.ok) {
      throw new SearchError(`Nguồn nhạc trả lỗi ${response.status}.`)
    }

    let payload: CatalogResponse
    try {
      payload = (await response.json()) as CatalogResponse
    } catch (error) {
      throw new SearchError('Nguồn nhạc trả dữ liệu không hợp lệ.', {
        cause: error,
      })
    }

    if (!Array.isArray(payload.results)) {
      return []
    }

    return payload.results
      .filter(isCatalogTrack)
      .map(normalizeCatalogTrack)
      .filter((result): result is SearchResult => result !== null)
      .filter((result) => Boolean(result.title && result.artist))
  },
}

type RssEntry = {
  id?: {
    attributes?: {
      'im:id'?: unknown
    }
  }
  'im:name'?: { label?: unknown }
  'im:artist'?: { label?: unknown }
  'im:image'?: Array<{ label?: unknown }>
  link?: Array<{
    attributes?: {
      title?: unknown
      rel?: unknown
      href?: unknown
      'im:assetType'?: unknown
    }
  }>
}

export function normalizeRssEntry(entry: unknown): SearchResult | null {
  if (typeof entry !== 'object' || entry === null) return null
  const e = entry as RssEntry
  const rawId = e.id?.attributes?.['im:id']
  const trackId =
    typeof rawId === 'string' || typeof rawId === 'number'
      ? Number(rawId)
      : NaN
  if (Number.isNaN(trackId) || trackId <= 0) return null

  const title =
    typeof e['im:name']?.label === 'string' ? e['im:name'].label.trim() : ''
  const artist =
    typeof e['im:artist']?.label === 'string' ? e['im:artist'].label.trim() : ''
  if (!title || !artist) return null

  const images = Array.isArray(e['im:image']) ? e['im:image'] : []
  const lastImage = images[images.length - 1]
  const rawCover = typeof lastImage?.label === 'string' ? lastImage.label : ''
  const coverUrl = rawCover
    .replace(/\/\d+x\d+bb\./, '/600x600bb.')
    .replace('170x170bb', '600x600bb')

  const links = Array.isArray(e.link) ? e.link : []
  const previewLink = links.find(
    (l) =>
      l.attributes?.title === 'Preview' ||
      l.attributes?.rel === 'enclosure' ||
      l.attributes?.['im:assetType'] === 'preview',
  )
  const previewUrl =
    typeof previewLink?.attributes?.href === 'string'
      ? previewLink.attributes.href.trim()
      : ''

  return {
    trackId,
    title,
    artist,
    coverUrl,
    previewUrl,
  }
}

export const discoverApi = {
  async topSongs(limit = 50): Promise<SearchResult[]> {
    let response: Response
    try {
      response = await fetch(`${CATALOG_TOP_SONGS_URL}/limit=${limit}/json`, {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
    } catch (error) {
      if (isTimeout(error)) throw new SearchTimeoutError({ cause: error })
      throw new SearchError('Không kết nối được nguồn nhạc.', { cause: error })
    }

    if (response.status === 429) {
      throw new RateLimitError()
    }

    if (!response.ok) {
      throw new SearchError(`Nguồn nhạc trả lỗi ${response.status}.`)
    }

    let payload: { feed?: { entry?: unknown } }
    try {
      payload = (await response.json()) as { feed?: { entry?: unknown } }
    } catch (error) {
      throw new SearchError('Nguồn nhạc trả dữ liệu không hợp lệ.', {
        cause: error,
      })
    }

    const rawEntries = payload.feed?.entry
    const entries = Array.isArray(rawEntries)
      ? rawEntries
      : rawEntries
        ? [rawEntries]
        : []

    return entries
      .map(normalizeRssEntry)
      .filter((result): result is SearchResult => result !== null)
      .filter((result) => Boolean(result.title && result.artist))
  },
}
