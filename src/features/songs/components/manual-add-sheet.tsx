import { ResponsivePanel } from '@/components/responsive-panel'
import type { NewSong, Song } from '../types'
import { ManualForm } from './manual-form'

type ManualAddSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  songs: Song[]
  onAddManual: (song: NewSong) => Promise<void>
}

export function ManualAddSheet({
  open,
  onOpenChange,
  songs,
  onAddManual,
}: ManualAddSheetProps) {
  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Nhập bài thủ công"
      description="Điền thông tin để lưu bài hát mới vào Thư viện cá nhân."
    >
      <div className="p-4 sm:p-6">
        <ManualForm
          initialTitle=""
          focusSignal={open ? 1 : 0}
          songs={songs}
          onAdd={onAddManual}
          onDone={() => onOpenChange(false)}
        />
      </div>
    </ResponsivePanel>
  )
}
