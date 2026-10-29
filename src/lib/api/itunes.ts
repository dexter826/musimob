import type { MusimobApi, SearchResult } from './types'

const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search'

type ItunesTrack = {
  trackId?: unknown
  trackName?: unknown
  artistName?: unknown
  artworkUrl100?: unknown
}

type ItunesResponse = {
  results?: unknown
}

export class RateLimitError extends Error {
  constructor() {
    super('iTunes đang giới hạn tìm kiếm.')
    this.name = 'RateLimitError'
  }
}

export class SearchError extends Error {
  constructor(message = 'Không tìm được.', options?: ErrorOptions) {
    super(message, options)
    this.name = 'SearchError'
  }
}

export function normalizeItunesTrack(track: ItunesTrack): SearchResult | null {
  if (typeof track.trackId !== 'number') return null

  const artworkUrl =
    typeof track.artworkUrl100 === 'string' ? track.artworkUrl100 : ''

  return {
    trackId: track.trackId,
    title: typeof track.trackName === 'string' ? track.trackName.trim() : '',
    artist: typeof track.artistName === 'string' ? track.artistName.trim() : '',
    coverUrl: artworkUrl.replace('100x100bb', '600x600bb'),
  }
}

function isItunesTrack(value: unknown): value is ItunesTrack {
  return typeof value === 'object' && value !== null
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
      response = await fetch(`${ITUNES_SEARCH_URL}?${params.toString()}`)
    } catch (error) {
      throw new SearchError('Không kết nối được iTunes.', { cause: error })
    }

    if (response.status === 429) {
      throw new RateLimitError()
    }

    if (!response.ok) {
      throw new SearchError(`iTunes trả lỗi ${response.status}.`)
    }

    let payload: ItunesResponse
    try {
      payload = (await response.json()) as ItunesResponse
    } catch (error) {
      throw new SearchError('iTunes trả dữ liệu không hợp lệ.', {
        cause: error,
      })
    }

    if (!Array.isArray(payload.results)) {
      return []
    }

    return payload.results
      .filter(isItunesTrack)
      .map(normalizeItunesTrack)
      .filter((result): result is SearchResult => result !== null)
      .filter((result) => Boolean(result.title && result.artist))
  },
}
