import type { SearchResult, Song } from '@/lib/api/types'

export function isSongDuplicate(
  candidate: SearchResult,
  librarySongs: Song[],
): boolean {
  const normTitle = candidate.title.toLowerCase().trim()
  const normArtist = candidate.artist.toLowerCase().trim()

  return librarySongs.some((libSong) => {
    if (libSong.sourceId && libSong.sourceId === candidate.trackId) {
      return true
    }
    return (
      libSong.title.toLowerCase().trim() === normTitle &&
      libSong.artist.toLowerCase().trim() === normArtist
    )
  })
}

export function sampleLibraryArtists(songs: Song[], maxArtists = 3): string[] {
  const uniqueArtists = Array.from(
    new Set(songs.map((s) => s.artist.trim()).filter(Boolean)),
  )
  if (uniqueArtists.length <= maxArtists) {
    return uniqueArtists
  }
  // Xáo trộn ngẫu nhiên và chọn tối đa maxArtists
  const shuffled = [...uniqueArtists].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, maxArtists)
}

export function interleaveAndDeduplicate(
  popularSongs: SearchResult[],
  artistSongs: SearchResult[],
  librarySongs: Song[],
): SearchResult[] {
  const seenTrackIds = new Set<number>()
  const result: SearchResult[] = []

  // Nếu không có bài theo ca sĩ (ví dụ thư viện trống), duyệt hoàn toàn từ bài phổ biến
  if (artistSongs.length === 0) {
    for (const item of popularSongs) {
      if (
        !seenTrackIds.has(item.trackId) &&
        !isSongDuplicate(item, librarySongs)
      ) {
        seenTrackIds.add(item.trackId)
        result.push(item)
      }
    }
    return result
  }

  // Nếu có cả 2 nguồn, xen kẽ 1 bài theo ca sĩ và 1 bài phổ biến
  const maxLen = Math.max(popularSongs.length, artistSongs.length)
  for (let i = 0; i < maxLen; i++) {
    if (i < artistSongs.length) {
      const item = artistSongs[i]
      if (
        !seenTrackIds.has(item.trackId) &&
        !isSongDuplicate(item, librarySongs)
      ) {
        seenTrackIds.add(item.trackId)
        result.push(item)
      }
    }
    if (i < popularSongs.length) {
      const item = popularSongs[i]
      if (
        !seenTrackIds.has(item.trackId) &&
        !isSongDuplicate(item, librarySongs)
      ) {
        seenTrackIds.add(item.trackId)
        result.push(item)
      }
    }
  }

  return result
}
