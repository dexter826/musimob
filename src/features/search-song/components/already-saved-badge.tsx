import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function AlreadySavedBadge() {
  return (
    <Badge
      variant="secondary"
      className="h-7 gap-1 rounded-md px-2.5 text-[11.5px] font-medium text-muted-foreground"
    >
      <Check aria-hidden="true" />
      Đã lưu
    </Badge>
  )
}
