import { useCallback, useEffect, useState } from 'react'
import { songsApi } from '@/lib/api/songs'
import type { NewSong, Song } from '@/lib/api/types'
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
        await songsApi.add(uid, song)
      } catch (addError) {
        console.error('Không lưu được bài.', addError)
        throw new Error(getAddSongErrorMessage(addError), { cause: addError })
      }
    },
    [uid],
  )

  return { songs, isLoading, error, retry, addSong }
}
