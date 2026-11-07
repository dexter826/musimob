import type { Album } from '@/lib/api/types'

export function normalizeAlbumName(name: string): string {
  return name.trim()
}

export function getAlbumNameError(
  name: string,
  albums: Album[],
  ignoreAlbumId?: string,
): string | null {
  const normalizedName = normalizeAlbumName(name)
  if (!normalizedName) return 'Nhập tên album.'

  const nameKey = normalizedName.toLowerCase()
  const isDuplicate = albums.some(
    (album) =>
      album.id !== ignoreAlbumId &&
      normalizeAlbumName(album.name).toLowerCase() === nameKey,
  )

  return isDuplicate ? 'Tên album đã tồn tại. Chọn tên khác.' : null
}
