import { useCallback, useEffect, useState } from 'react'
import { songsApi } from '@/lib/api/songs'
import type { NewSong, Song, SongPatch } from '@/lib/api/types'
import { getErrorCode } from '@/lib/errors'

function getSongsErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'permission-denied':
      return 'Bạn không có quyền xem danh sách này.'
    case 'unavailable':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    case 'resource-exhausted':
      return 'Danh sách đang quá tải. Thử lại sau.'
    default:
      return 'Không tải được danh sách. Thử lại.'
  }
}

function getAddSongErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'permission-denied':
      return 'Bạn không có quyền thêm bài.'
    case 'unavailable':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    case 'invalid-argument':
      return 'Dữ liệu bài hát không hợp lệ.'
    default:
      return 'Không lưu được bài. Thử lại.'
  }
}

function getUpdateSongErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'permission-denied':
      return 'Bạn không có quyền sửa bài.'
    case 'unavailable':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    case 'invalid-argument':
      return 'Dữ liệu bài hát không hợp lệ.'
    case 'not-found':
      return 'Bài này không còn trong danh sách.'
    default:
      return 'Không lưu được thay đổi. Thử lại.'
  }
}

function getRemoveSongErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'permission-denied':
      return 'Bạn không có quyền xoá bài.'
    case 'unavailable':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    default:
      return 'Không xoá được bài. Thử lại.'
  }
}

function getRestoreSongErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'permission-denied':
      return 'Bạn không có quyền khôi phục bài.'
    case 'unavailable':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    default:
      return 'Không khôi phục được bài. Thử lại.'
  }
}

export function useSongs(uid: string) {
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setSongs([])
    setIsLoading(true)
    setError(null)
  }, [uid])

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

        console.error('Không tải được danh sách.', subscribeError)
        setError(getSongsErrorMessage(subscribeError))
        setIsLoading(false)
      },
    )

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [uid, reloadKey])

  const retry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setReloadKey((key) => key + 1)
  }, [])

  const addSong = useCallback(
    async (song: NewSong) => {
      try {
        return await songsApi.add(uid, song)
      } catch (addError) {
        console.error('Không lưu được bài.', addError)
        throw new Error(getAddSongErrorMessage(addError), { cause: addError })
      }
    },
    [uid],
  )

  const updateSong = useCallback(
    async (id: string, patch: SongPatch) => {
      try {
        await songsApi.update(uid, id, patch)
      } catch (updateError) {
        console.error('Không lưu được thay đổi.', updateError)
        throw new Error(getUpdateSongErrorMessage(updateError), {
          cause: updateError,
        })
      }
    },
    [uid],
  )

  const restoreSong = useCallback(
    async (song: Song) => {
      try {
        await songsApi.restore(uid, song)
      } catch (restoreError) {
        console.error('Không khôi phục được bài.', restoreError)
        throw new Error(getRestoreSongErrorMessage(restoreError), {
          cause: restoreError,
        })
      }
    },
    [uid],
  )

  const removeSong = useCallback(
    async (id: string) => {
      try {
        await songsApi.remove(uid, id)
      } catch (removeError) {
        console.error('Không xoá được bài.', removeError)
        throw new Error(getRemoveSongErrorMessage(removeError), {
          cause: removeError,
        })
      }
    },
    [uid],
  )

  return {
    songs,
    isLoading,
    error,
    retry,
    addSong,
    restoreSong,
    updateSong,
    removeSong,
  }
}
