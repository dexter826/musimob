import { useCallback, useEffect, useMemo, useState } from 'react'
import { albumsApi } from '@/lib/api/albums'
import type { Album } from '@/lib/api/types'
import { getErrorCode } from '@/lib/errors'

export type AlbumsStatus =
  | { state: 'loading' }
  | { state: 'failed'; message: string }
  | { state: 'ready'; warning: string | null }

type AlbumOperation =
  'load' | 'create' | 'addSongs' | 'rename' | 'remove' | 'removeSong'

const PERMISSION_MESSAGES: Record<AlbumOperation, string> = {
  load: 'Bạn không có quyền xem danh sách album.',
  create: 'Bạn không có quyền tạo album.',
  addSongs: 'Bạn không có quyền thêm bài vào album.',
  rename: 'Bạn không có quyền đổi tên album.',
  remove: 'Bạn không có quyền xóa album.',
  removeSong: 'Bạn không có quyền bỏ bài khỏi album.',
}

const FALLBACK_MESSAGES: Record<AlbumOperation, string> = {
  load: 'Không tải được danh sách album. Thử lại.',
  create: 'Không tạo được album. Thử lại.',
  addSongs: 'Không thêm được bài vào album. Thử lại.',
  rename: 'Không đổi được tên album. Thử lại.',
  remove: 'Không xóa được album. Thử lại.',
  removeSong: 'Không bỏ được bài khỏi album. Thử lại.',
}

const LOG_LABELS: Record<AlbumOperation, string> = {
  load: 'Không tải được danh sách album.',
  create: 'Không tạo được album.',
  addSongs: 'Không thêm được bài vào album.',
  rename: 'Không đổi được tên album.',
  remove: 'Không xóa được album.',
  removeSong: 'Không bỏ được bài khỏi album.',
}

function albumErrorMessage(operation: AlbumOperation, error: unknown): string {
  const code = getErrorCode(error)

  if (code === 'permission-denied') return PERMISSION_MESSAGES[operation]
  if (code === 'unavailable') {
    return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
  }
  if (
    (operation === 'create' || operation === 'rename') &&
    code === 'invalid-argument'
  ) {
    return 'Tên album không hợp lệ.'
  }
  if (operation !== 'load' && operation !== 'create' && code === 'not-found') {
    return 'Album này không còn trong danh sách.'
  }

  return FALLBACK_MESSAGES[operation]
}

function logAndWrap(operation: AlbumOperation, error: unknown): Error {
  console.error(LOG_LABELS[operation], error)
  return new Error(albumErrorMessage(operation, error), { cause: error })
}

async function runAlbumOperation<T>(
  operation: AlbumOperation,
  work: () => Promise<T>,
): Promise<T> {
  try {
    return await work()
  } catch (operationError) {
    throw logAndWrap(operation, operationError)
  }
}

export function useAlbums(uid: string) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    setIsLoading(true)
    setError(null)

    const unsubscribe = albumsApi.subscribe(
      uid,
      (nextAlbums) => {
        if (!isActive) return

        setAlbums(nextAlbums)
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

  const status = useMemo<AlbumsStatus>(() => {
    if (isLoading && albums.length === 0) return { state: 'loading' }
    if (error && albums.length === 0) return { state: 'failed', message: error }

    return { state: 'ready', warning: error }
  }, [error, isLoading, albums.length])

  const retry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setReloadKey((key) => key + 1)
  }, [])

  const createAlbum = useCallback(
    (name: string) =>
      runAlbumOperation('create', () => albumsApi.create(uid, name)),
    [uid],
  )

  const addSongs = useCallback(
    (albumIds: string[], songIds: string[]) =>
      runAlbumOperation('addSongs', () =>
        albumsApi.addSongs(uid, albumIds, songIds),
      ),
    [uid],
  )

  const renameAlbum = useCallback(
    (id: string, name: string) =>
      runAlbumOperation('rename', () => albumsApi.rename(uid, id, name)),
    [uid],
  )
  const removeAlbum = useCallback(
    (id: string) =>
      runAlbumOperation('remove', () => albumsApi.remove(uid, id)),
    [uid],
  )
  const removeSong = useCallback(
    (albumId: string, songId: string) =>
      runAlbumOperation('removeSong', () =>
        albumsApi.removeSong(uid, albumId, songId),
      ),
    [uid],
  )

  return {
    albums,
    status,
    retry,
    createAlbum,
    addSongs,
    renameAlbum,
    removeAlbum,
    removeSong,
  }
}
