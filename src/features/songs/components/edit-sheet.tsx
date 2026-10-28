import { SongForm } from '@/components/song-form'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import type { Song, SongPatch } from '@/lib/api/types'

type EditSheetProps = {
  song: Song | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, patch: SongPatch) => Promise<void>
}

export function EditSheet({
  song,
  open,
  onOpenChange,
  onSave,
}: EditSheetProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex max-h-[85dvh] w-full max-w-[560px] flex-col">
        <DrawerHeader className="px-5 pt-2 pb-0 text-left">
          <DrawerTitle className="text-[18px] font-semibold tracking-[-0.02em]">
            Sửa bài
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Sửa tên bài, ca sĩ hoặc URL ảnh bìa.
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          {song ? (
            <SongForm
              key={`${song.id}-${song.updatedAt.toMillis()}`}
              initialValues={{
                title: song.title,
                artist: song.artist,
                coverUrl: song.coverUrl,
              }}
              submitLabel="Lưu thay đổi"
              pendingLabel="Đang lưu…"
              resetOnSuccess={false}
              onSubmit={(values) => onSave(song.id, values)}
              onSuccess={() => onOpenChange(false)}
            />
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
