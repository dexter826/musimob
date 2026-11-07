import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
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
  async rename(uid, id, name) {
    await updateDoc(doc(firebaseFirestore, 'users', uid, 'albums', id), {
      name: name.trim(),
      updatedAt: serverTimestamp(),
    })
  },

  async remove(uid, id) {
    await deleteDoc(doc(firebaseFirestore, 'users', uid, 'albums', id))
  },

  async removeSong(uid, albumId, songId) {
    await updateDoc(doc(firebaseFirestore, 'users', uid, 'albums', albumId), {
      songIds: arrayRemove(songId),
      updatedAt: serverTimestamp(),
    })
  },

  async addSongs(uid, albumIds, songIds) {
    if (albumIds.length === 0 || songIds.length === 0) return

    const batch = writeBatch(firebaseFirestore)
    for (const albumId of albumIds) {
      batch.update(doc(firebaseFirestore, 'users', uid, 'albums', albumId), {
        songIds: arrayUnion(...songIds),
        updatedAt: serverTimestamp(),
      })
    }
    await batch.commit()
  },

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
