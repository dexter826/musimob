import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type UpdateData,
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
    previewUrl: typeof data.previewUrl === 'string' ? data.previewUrl : '',
    sourceId: typeof data.sourceId === 'number' ? data.sourceId : undefined,
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
    const data: DocumentData = {
      title: song.title.trim(),
      artist: song.artist.trim(),
      coverUrl: song.coverUrl.trim(),
      previewUrl: song.previewUrl.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    if (song.sourceId !== undefined) data.sourceId = song.sourceId

    const songRef = await addDoc(
      collection(firebaseFirestore, 'users', uid, 'songs'),
      data,
    )
    return songRef.id
  },

  async restore(uid, song) {
    const data: DocumentData = {
      title: song.title,
      artist: song.artist,
      coverUrl: song.coverUrl,
      previewUrl: song.previewUrl,
      createdAt: song.createdAt,
      updatedAt: serverTimestamp(),
    }
    if (song.sourceId !== undefined) data.sourceId = song.sourceId

    await setDoc(doc(firebaseFirestore, 'users', uid, 'songs', song.id), data)
  },

  async update(uid, id, patch) {
    const data: UpdateData<DocumentData> = { updatedAt: serverTimestamp() }

    if (patch.title !== undefined) data.title = patch.title.trim()
    if (patch.artist !== undefined) data.artist = patch.artist.trim()
    if (patch.coverUrl !== undefined) data.coverUrl = patch.coverUrl.trim()

    await updateDoc(doc(firebaseFirestore, 'users', uid, 'songs', id), data)
  },

  async remove(uid, id) {
    await deleteDoc(doc(firebaseFirestore, 'users', uid, 'songs', id))
  },
}
