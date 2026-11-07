import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore'
import { firebaseFirestore } from './firebase'
import type { Album, MusimobApi } from './types'

function toSongIds(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  const seen = new Set<string>()
  const songIds: string[] = []

  for (const item of value) {
    if (typeof item !== 'string' || seen.has(item)) continue
    seen.add(item)
    songIds.push(item)
  }

  return songIds
}

function toAlbum(id: string, data: DocumentData): Album {
  const createdAt =
    data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now()
  const updatedAt =
    data.updatedAt instanceof Timestamp ? data.updatedAt : createdAt

  return {
    id,
    name: typeof data.name === 'string' ? data.name : '',
    songIds: toSongIds(data.songIds),
    createdAt,
    updatedAt,
  }
}

export const albumsApi: MusimobApi['albums'] = {
  subscribe(uid, callback, onError) {
    const albumsQuery = query(
      collection(firebaseFirestore, 'users', uid, 'albums'),
      orderBy('createdAt', 'desc'),
    )

    return onSnapshot(
      albumsQuery,
      (snapshot) => {
        callback(
          snapshot.docs.map((albumDoc) =>
            toAlbum(albumDoc.id, albumDoc.data()),
          ),
        )
      },
      (error) => {
        onError?.(error)
      },
    )
  },

  async create(uid, name) {
    const albumRef = await addDoc(
      collection(firebaseFirestore, 'users', uid, 'albums'),
      {
        name: name.trim(),
        songIds: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
    )
    return albumRef.id
  },
}
