import type { Timestamp } from 'firebase/firestore'

export type User = {
  uid: string
  displayName: string
  photoURL: string | null
}

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

export type Album = {
  id: string
  name: string
  songIds: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NewAlbum = Pick<Album, 'name'>

export type SearchResult = {
  trackId: number
  title: string
  artist: string
  coverUrl: string
  previewUrl: string
}

export type MusimobApi = {
  auth: {
    signInWithGoogle(): Promise<void>
    signOut(): Promise<void>
    onUserChanged(callback: (user: User | null) => void): () => void
    resolveRedirect(): Promise<void>
  }
  songs: {
    subscribe(
      uid: string,
      callback: (songs: Song[]) => void,
      onError?: (error: unknown) => void,
    ): () => void
    add(uid: string, song: NewSong): Promise<string>
    restore(uid: string, song: Song): Promise<void>
    update(uid: string, id: string, patch: SongPatch): Promise<void>
    remove(uid: string, id: string): Promise<void>
  }
  albums: {
    subscribe(
      uid: string,
      callback: (albums: Album[]) => void,
      onError?: (error: unknown) => void,
    ): () => void
    create(uid: string, name: string): Promise<string>
    addSongs(uid: string, albumIds: string[], songIds: string[]): Promise<void>
  }
  search: {
    query(term: string): Promise<SearchResult[]>
  }
}
