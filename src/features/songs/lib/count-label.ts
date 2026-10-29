import type { SongsStatus } from '../hooks/use-songs'

type CountLabelInput = {
  status: SongsStatus
  total: number
  filtered: number
  isFiltering: boolean
}

export function getCountLabel({
  status,
  total,
  filtered,
  isFiltering,
}: CountLabelInput): string {
  if (status.state === 'loading') return 'Đang tải…'
  if (status.state === 'failed') return 'Không tải được'

  return isFiltering ? `${filtered} / ${total} bài` : `${total} bài`
}
