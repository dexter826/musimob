import { LayoutGrid, List } from 'lucide-react'
import type { ViewMode } from '../hooks/use-view-mode'

type ViewToggleProps = {
  viewMode: ViewMode
  onToggle: () => void
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  const label =
    viewMode === 'list' ? 'Chuyển sang dạng lưới' : 'Chuyển sang dạng danh sách'

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors duration-[160ms] after:absolute after:-inset-1 after:content-[''] hover:bg-secondary hover:text-foreground"
    >
      {viewMode === 'list' ? (
        <LayoutGrid aria-hidden="true" className="size-[18px]" />
      ) : (
        <List aria-hidden="true" className="size-[18px]" />
      )}
    </button>
  )
}
