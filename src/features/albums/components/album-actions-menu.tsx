import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type AlbumActionsMenuProps = {
  albumName: string
  onRename: () => void
  onDelete: () => void
}

export function AlbumActionsMenu({
  albumName,
  onRename,
  onDelete,
}: AlbumActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Tuỳ chọn cho album ${albumName}`}
          className="size-11 shrink-0 text-muted-foreground"
        >
          <Ellipsis aria-hidden="true" className="size-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-lg border border-rule bg-popover p-1 shadow-none duration-[160ms] data-open:animate-none data-closed:animate-none"
      >
        <DropdownMenuItem
          onSelect={onRename}
          className="min-h-11 gap-2 px-2 py-2 text-sm"
        >
          <Pencil aria-hidden="true" className="size-4" />
          Đổi tên album
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onSelect={onDelete}
          className="min-h-11 gap-2 px-2 py-2 text-sm"
        >
          <Trash2 aria-hidden="true" className="size-4" />
          Xóa album
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
