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
          className={cn(
            "relative size-8 rounded-lg text-muted-foreground after:absolute after:-inset-1.5 after:content-[''] md:opacity-50 md:group-hover:opacity-100 md:group-focus-within:opacity-100 data-[state=open]:opacity-100 focus-visible:opacity-100",
            className,
          )}
        >
          <Ellipsis aria-hidden="true" className="size-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-lg border border-rule bg-popover p-1"
      >
        <DropdownMenuItem
          onSelect={onEdit}
          className="min-h-11 gap-2 px-2 py-2 text-sm"
        >
          <Pencil aria-hidden="true" className="size-4" />
          Sửa
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onSelect={onDelete}
          className="min-h-11 gap-2 px-2 py-2 text-sm"
        >
          <Trash2 aria-hidden="true" className="size-4" />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
