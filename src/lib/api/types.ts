import type { Timestamp } from 'firebase/firestore'

export type User = {
  uid: string
  displayName: string
}

export type Song = {
  id: string
  title: string
  artist: string
  coverUrl: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NewSong = Omit<Song, 'id' | 'createdAt' | 'updatedAt'>

export type SearchResult = {
  title: string
  artist: string
  coverUrl: string
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
    add(uid: string, song: NewSong): Promise<void>
  }
  search: {
    query(term: string): Promise<SearchResult[]>
  }
}
