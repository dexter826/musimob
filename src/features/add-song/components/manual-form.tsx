import { SongForm } from '@/components/song-form'
import type { NewSong } from '@/lib/api/types'

type ManualFormProps = {
  onAdd: (song: NewSong) => Promise<void>
  onDone: () => void
}

export function ManualForm({ onAdd, onDone }: ManualFormProps) {
  return (
    <SongForm
      submitLabel="Lưu bài"
      pendingLabel="Đang lưu…"
      onSubmit={onAdd}
      onSuccess={onDone}
    />
  )
}
