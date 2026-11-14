import type { CatalogTrack } from '@/features/catalog'
import type { Song } from '@/features/songs'
import { getSongKey } from '@/lib/song-key'

export function isSongDuplicate(
  candidate: CatalogTrack,
  librarySongs: Song[],
): boolean {
  const candidateKey = getSongKey(candidate.title, candidate.artist)

  return librarySongs.some((libSong) => {
    if (libSong.sourceId && libSong.sourceId === candidate.trackId) {
      return true
    }
    return getSongKey(libSong.title, libSong.artist) === candidateKey
  })
}

export function sampleLibraryArtists(songs: Song[], maxArtists = 3): string[] {
  const uniqueArtists = Array.from(
    new Set(songs.map((s) => s.artist.trim()).filter(Boolean)),
  )
  if (uniqueArtists.length <= maxArtists) {
    return uniqueArtists
  }

  // Lấy các nghệ sĩ có nhiều bài hát nhất trong thư viện (thứ tự ổn định, tránh đổi query key liên tục)
  const artistCounts = new Map<string, number>()
  for (const song of songs) {
    const artist = song.artist.trim()
    if (artist) {
      artistCounts.set(artist, (artistCounts.get(artist) ?? 0) + 1)
    }
  }

  return Array.from(artistCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxArtists)
    .map(([artist]) => artist)
}

function tryAddCandidate(
  item: CatalogTrack,
  seenTrackIds: Set<number>,
  librarySongs: Song[],
  destination: CatalogTrack[],
) {
  if (!seenTrackIds.has(item.trackId) && !isSongDuplicate(item, librarySongs)) {
    seenTrackIds.add(item.trackId)
    destination.push(item)
  }
}

export function interleaveAndDeduplicate(
  popularSongs: CatalogTrack[],
  artistSongs: CatalogTrack[],
  librarySongs: Song[],
): CatalogTrack[] {
  const seenTrackIds = new Set<number>()
  const result: CatalogTrack[] = []

  if (artistSongs.length === 0) {
    for (const item of popularSongs) {
      tryAddCandidate(item, seenTrackIds, librarySongs, result)
    }
    return result
  }

  const maxLen = Math.max(popularSongs.length, artistSongs.length)
  for (let i = 0; i < maxLen; i++) {
    if (i < artistSongs.length) {
      tryAddCandidate(artistSongs[i], seenTrackIds, librarySongs, result)
    }
    if (i < popularSongs.length) {
      tryAddCandidate(popularSongs[i], seenTrackIds, librarySongs, result)
    }
  }

  return result
}
