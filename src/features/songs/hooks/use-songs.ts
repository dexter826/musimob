import { useCallback, useEffect, useMemo, useState } from 'react'
import { songsApi } from '@/lib/api/songs'
import type { NewSong, Song, SongPatch } from '@/lib/api/types'
import { getErrorCode } from '@/lib/errors'

export type SongsStatus =
  | { state: 'loading' }
  | { state: 'failed'; message: string }
  | { state: 'ready'; warning: string | null }

type SongOperation = 'load' | 'add' | 'update' | 'remove' | 'restore'

const PERMISSION_MESSAGES: Record<SongOperation, string> = {
  load: 'Bạn không có quyền xem danh sách này.',
  add: 'Bạn không có quyền thêm bài.',
  update: 'Bạn không có quyền sửa bài.',
  remove: 'Bạn không có quyền xoá bài.',
  restore: 'Bạn không có quyền khôi phục bài.',
}

const FALLBACK_MESSAGES: Record<SongOperation, string> = {
  load: 'Không tải được danh sách. Thử lại.',
  add: 'Không lưu được bài. Thử lại.',
  update: 'Không lưu được thay đổi. Thử lại.',
  remove: 'Không xoá được bài. Thử lại.',
  restore: 'Không khôi phục được bài. Thử lại.',
}

const LOG_LABELS: Record<SongOperation, string> = {
  load: 'Không tải được danh sách.',
  add: 'Không lưu được bài.',
  update: 'Không lưu được thay đổi.',
  remove: 'Không xoá được bài.',
  restore: 'Không khôi phục được bài.',
}

const OFFLINE_MESSAGE = 'Mất kết nối. Kiểm tra mạng rồi thử lại.'

function songErrorMessage(operation: SongOperation, error: unknown): string {
  const code = getErrorCode(error)

  if (code === 'permission-denied') return PERMISSION_MESSAGES[operation]
  if (code === 'unavailable') return OFFLINE_MESSAGE

  const isDataError =
    code === 'invalid-argument' &&
    (operation === 'add' || operation === 'update')
  if (isDataError) return 'Dữ liệu bài hát không hợp lệ.'

  if (code === 'resource-exhausted' && operation === 'load') {
    return 'Danh sách đang quá tải. Thử lại sau.'
  }

  if (code === 'not-found' && operation === 'update') {
    return 'Bài này không còn trong danh sách.'
  }

  return FALLBACK_MESSAGES[operation]
}

function logAndWrap(operation: SongOperation, error: unknown): Error {
  console.error(LOG_LABELS[operation], error)
  return new Error(songErrorMessage(operation, error), { cause: error })
}

async function runSongOperation<T>(
  operation: SongOperation,
  work: () => Promise<T>,
): Promise<T> {
  try {
    return await work()
  } catch (operationError) {
    throw logAndWrap(operation, operationError)
  }
}

export function useSongs(uid: string) {
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    setIsLoading(true)
    setError(null)

    const unsubscribe = songsApi.subscribe(
      uid,
      (nextSongs) => {
        if (!isActive) return

        setSongs(nextSongs)
        setError(null)
        setIsLoading(false)
      },
      (subscribeError) => {
        if (!isActive) return

        setError(logAndWrap('load', subscribeError).message)
        setIsLoading(false)
      },
    )

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [uid, reloadKey])

  const status = useMemo<SongsStatus>(() => {
    if (isLoading && songs.length === 0) return { state: 'loading' }
    if (error && songs.length === 0) return { state: 'failed', message: error }

    return { state: 'ready', warning: error }
  }, [error, isLoading, songs.length])

  const retry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setReloadKey((key) => key + 1)
  }, [])

  const addSong = useCallback(
    (song: NewSong) => runSongOperation('add', () => songsApi.add(uid, song)),
    [uid],
  )

  const updateSong = useCallback(
    (id: string, patch: SongPatch) =>
      runSongOperation('update', () => songsApi.update(uid, id, patch)),
    [uid],
  )

  const restoreSong = useCallback(
    (song: Song) =>
      runSongOperation('restore', () => songsApi.restore(uid, song)),
    [uid],
  )

  const removeSong = useCallback(
    (id: string) => runSongOperation('remove', () => songsApi.remove(uid, id)),
    [uid],
  )

  return {
    songs,
    status,
    retry,
    addSong,
    restoreSong,
    updateSong,
    removeSong,
  }
}
