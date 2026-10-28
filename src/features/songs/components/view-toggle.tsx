import { LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ViewMode } from '../hooks/use-view-mode'

type ViewToggleProps = {
  viewMode: ViewMode
  onToggle: () => void
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  const label =
    viewMode === 'list' ? 'Chuyển sang lưới' : 'Chuyển sang danh sách'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="size-9 rounded-lg"
    >
      {viewMode === 'list' ? (
        <LayoutGrid aria-hidden="true" />
      ) : (
        <List aria-hidden="true" />
      )}
    </Button>
  )
}
