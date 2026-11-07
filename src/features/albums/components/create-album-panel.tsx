import { ResponsivePanel } from '@/components/responsive-panel'
import type { Album } from '@/lib/api/types'
import { AlbumNameForm } from './album-name-form'

type CreateAlbumPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  albums: Album[]
  onCreate: (name: string) => Promise<void>
}

export function CreateAlbumPanel({
  open,
  onOpenChange,
  albums,
  onCreate,
}: CreateAlbumPanelProps) {
  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Tạo album"
      description="Đặt tên cho album mới."
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <AlbumNameForm
          key={open ? 'open' : 'closed'}
          albums={albums}
          submitLabel="Tạo album"
          pendingLabel="Đang tạo…"
          fallbackErrorMessage="Không tạo được album. Thử lại."
          autoFocus
          onSubmit={onCreate}
        />
      </div>
    </ResponsivePanel>
  )
}
