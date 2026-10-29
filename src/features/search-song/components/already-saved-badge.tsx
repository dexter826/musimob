import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function AlreadySavedBadge() {
  return (
    <Badge
      variant="secondary"
      className="h-6 gap-1 rounded-sm bg-surface-2 px-2 text-xs font-medium text-success"
    >
      <Check aria-hidden="true" className="size-3" />
      Đã lưu
    </Badge>
  )
}
