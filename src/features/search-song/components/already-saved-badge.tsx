import { Badge } from '@/components/ui/badge'

export function AlreadySavedBadge() {
  return (
    <Badge
      variant="secondary"
      className="h-6 rounded-sm bg-surface-2 px-2 text-xs font-medium text-success"
    >
      Đã lưu
    </Badge>
  )
}
