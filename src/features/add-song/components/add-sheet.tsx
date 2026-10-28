import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import type { NewSong } from '@/lib/api/types'
import { ManualForm } from './manual-form'

type AddSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (song: NewSong) => Promise<void>
}

export function AddSheet({ open, onOpenChange, onAdd }: AddSheetProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-[560px]">
        <DrawerHeader className="px-5 pt-2 pb-0 text-left">
          <DrawerTitle className="text-[18px] font-semibold tracking-[-0.02em]">
            Thêm bài
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Nhập thông tin bài hát muốn thêm.
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 overflow-y-auto px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <ManualForm onAdd={onAdd} onDone={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
