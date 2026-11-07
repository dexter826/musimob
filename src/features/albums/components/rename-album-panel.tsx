import { ResponsivePanel } from '@/components/responsive-panel'
import type { Album } from '@/lib/api/types'
import { AlbumNameForm } from './album-name-form'

type RenameAlbumPanelProps = {
  album: Album
  albums: Album[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onRename: (name: string) => Promise<void>
}

export function RenameAlbumPanel({
  album,
  albums,
  open,
  onOpenChange,
  onRename,
}: RenameAlbumPanelProps) {
  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Đổi tên album"
      description="Nhập tên mới cho album."
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        {open ? (
          <AlbumNameForm
            albums={albums}
            initialName={album.name}
            ignoreAlbumId={album.id}
            submitLabel="Lưu tên"
            pendingLabel="Đang lưu…"
            fallbackErrorMessage="Không đổi được tên album. Thử lại."
            autoFocus
            onSubmit={onRename}
          />
        ) : null}
      </div>
    </ResponsivePanel>
  )
}
