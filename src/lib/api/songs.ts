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
import type { MusimobApi, Song } from './types'

function toSong(id: string, data: DocumentData): Song {
  const createdAt =
    data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now()
  const updatedAt =
    data.updatedAt instanceof Timestamp ? data.updatedAt : createdAt

  return {
    id,
    title: typeof data.title === 'string' ? data.title : '',
    artist: typeof data.artist === 'string' ? data.artist : '',
    coverUrl: typeof data.coverUrl === 'string' ? data.coverUrl : '',
    createdAt,
    updatedAt,
  }
}

export const songsApi: MusimobApi['songs'] = {
  subscribe(uid, callback, onError) {
    const songsQuery = query(
      collection(firebaseFirestore, 'users', uid, 'songs'),
      orderBy('createdAt', 'desc'),
    )

    return onSnapshot(
      songsQuery,
      (snapshot) => {
        callback(
          snapshot.docs.map((songDoc) => toSong(songDoc.id, songDoc.data())),
        )
      },
      (error) => {
        onError?.(error)
      },
    )
  },

  async add(uid, song) {
    await addDoc(collection(firebaseFirestore, 'users', uid, 'songs'), {
      title: song.title.trim(),
      artist: song.artist.trim(),
      coverUrl: song.coverUrl.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  },
}
