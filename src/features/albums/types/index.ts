import type { Timestamp } from 'firebase/firestore'

export type Album = {
  id: string
  name: string
  songIds: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NewAlbum = Pick<Album, 'name'>
