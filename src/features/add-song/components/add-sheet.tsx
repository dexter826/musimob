import { useEffect, useState, type ReactNode } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import type { NewSong } from '@/lib/api/types'
import { ManualForm } from './manual-form'

type AddSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (song: NewSong) => Promise<void>
  renderSearchTab: (onSwitchToManual: () => void) => ReactNode
}

type AddTab = 'itunes' | 'manual'

export function AddSheet({
  open,
  onOpenChange,
  onAdd,
  renderSearchTab,
}: AddSheetProps) {
  const [tab, setTab] = useState<AddTab>('itunes')

  useEffect(() => {
    if (!open) {
      setTab('itunes')
    }
  }, [open])

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex max-h-[85dvh] w-full max-w-[560px] flex-col">
        <DrawerHeader className="px-5 pt-2 pb-0 text-left">
          <DrawerTitle className="text-[18px] font-semibold tracking-[-0.02em]">
            Thêm bài
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Tìm bài trên iTunes hoặc nhập tay.
          </DrawerDescription>
        </DrawerHeader>

        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as AddTab)}
          className="min-h-0 flex-1 gap-0"
        >
          <div className="px-5 pt-4">
            <TabsList className="group-data-horizontal/tabs:h-10 w-full p-1">
              <TabsTrigger
                value="itunes"
                className="h-8 flex-1 text-[13px]"
              >
                iTunes
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="h-8 flex-1 text-[13px]"
              >
                Nhập tay
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="itunes"
            forceMount
            className="mt-4 flex min-h-0 flex-1 flex-col px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] data-[state=inactive]:hidden"
          >
            {renderSearchTab(() => setTab('manual'))}
          </TabsContent>

          <TabsContent
            value="manual"
            forceMount
            className="mt-4 min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] data-[state=inactive]:hidden"
          >
            <ManualForm onAdd={onAdd} onDone={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
