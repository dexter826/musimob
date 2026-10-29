import { useMemo } from 'react'
import { ResponsivePanel } from '@/components/responsive-panel'
import { SongForm } from '@/components/song-form'
import type { Song, SongPatch } from '@/lib/api/types'
import { getSongKey } from '@/lib/song-key'

type EditSheetProps = {
  song: Song | null
  songs: Song[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, patch: SongPatch) => Promise<void>
}

export function EditSheet({
  song,
  songs,
  open,
  onOpenChange,
  onSave,
}: EditSheetProps) {
  const otherKeys = useMemo(
    () =>
      new Set(
        songs
          .filter((item) => item.id !== song?.id)
          .map((item) => getSongKey(item.title, item.artist)),
      ),
    [songs, song],
  )

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Sửa bài"
      description="Sửa tên bài, nghệ sĩ hoặc URL ảnh bìa."
    >
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
            validate={(values) =>
              otherKeys.has(getSongKey(values.title, values.artist))
                ? 'Bài này đã có trong thư viện.'
                : null
            }
            onSubmit={(values) => onSave(song.id, values)}
            onSuccess={() => onOpenChange(false)}
          />
        ) : null}
      </div>
    </ResponsivePanel>
  )
}
