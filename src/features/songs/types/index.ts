import type { Timestamp } from 'firebase/firestore'

export type Song = {
  id: string
  title: string
  artist: string
  coverUrl: string
  previewUrl: string
  sourceId?: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NewSong = Omit<Song, 'id' | 'createdAt' | 'updatedAt'>

export type SongPatch = Partial<Pick<Song, 'title' | 'artist' | 'coverUrl'>>
