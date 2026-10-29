import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type SongActionsMenuProps = {
  songTitle: string
  onEdit: () => void
  onDelete: () => void
  className?: string
}

export function SongActionsMenu({
  songTitle,
  onEdit,
  onDelete,
  className,
}: SongActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Tuỳ chọn cho ${songTitle}`}
          className={cn('size-9 text-muted-foreground', className)}
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuItem onSelect={onEdit}>
          <Pencil aria-hidden="true" />
          Sửa
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 aria-hidden="true" />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
