import type { Album, Song } from '@/lib/api/types'

export function getSongsById(songs: Song[]): Map<string, Song> {
  return new Map(songs.map((song) => [song.id, song]))
}

export function getAlbumSongs(
  album: Album,
  songsById: Map<string, Song>,
): Song[] {
  return album.songIds.flatMap((songId) => {
    const song = songsById.get(songId)
    return song ? [song] : []
  })
}

export function getAlbumCoverUrl(albumSongs: Song[]): string {
  return albumSongs[0]?.coverUrl ?? ''
}
