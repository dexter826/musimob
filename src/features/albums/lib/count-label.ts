import type { AlbumsStatus } from '../hooks/use-albums'

export function getAlbumCountLabel(
  status: AlbumsStatus,
  total: number,
): string {
  if (status.state === 'loading') return 'Đang tải…'
  if (status.state === 'failed') return 'Không tải được'

  return `${total} album`
}
