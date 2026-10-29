import { useLayoutEffect, useState, type ReactNode } from 'react'
import { ResponsivePanel } from '@/components/responsive-panel'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NewSong, Song } from '@/lib/api/types'
import { ManualForm } from './manual-form'

type SearchPanelProps = {
  term: string
  onTermChange: (term: string) => void
  onSwitchToManual: (term: string) => void
  autoFocus: boolean
  focusToken: number
}

type AddSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTerm: string
  songs: Song[]
  onAddManual: (song: NewSong) => Promise<void>
  renderSearch: (props: SearchPanelProps) => ReactNode
}

type AddMode = 'search' | 'manual'

type ManualSeed = {
  term: string
  nonce: number
}

export function AddSheet({
  open,
  onOpenChange,
  initialTerm,
  songs,
  onAddManual,
  renderSearch,
}: AddSheetProps) {
  const isMobile = useIsMobile()
  const [mode, setMode] = useState<AddMode>('search')
  const [searchTerm, setSearchTerm] = useState(initialTerm)
  const [manualSeed, setManualSeed] = useState<ManualSeed | null>(null)
  const [searchFocusToken, setSearchFocusToken] = useState(0)
  const [manualFocusToken, setManualFocusToken] = useState(0)

  useLayoutEffect(() => {
    if (!open) return

    setMode('search')
    setSearchTerm(initialTerm)
    setManualSeed(null)
  }, [open, initialTerm])

  function openManualWithTerm(term: string) {
    const nextTerm = term.trim()
    setMode('manual')
    if (nextTerm) {
      setManualSeed((current) => ({
        term: nextTerm,
        nonce: (current?.nonce ?? 0) + 1,
      }))
    }
    setManualFocusToken((current) => current + 1)
  }

  function backToSearch() {
    setMode('search')
    setSearchFocusToken((current) => current + 1)
  }

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title={mode === 'manual' ? 'Nhập tay' : 'Thêm bài'}
      description={
        mode === 'manual'
          ? 'Nhập tên bài, ca sĩ và URL ảnh bìa.'
          : 'Tìm bài trên iTunes hoặc nhập tay.'
      }
      onBack={mode === 'manual' ? backToSearch : undefined}
      headerAction={
        mode === 'search' ? (
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2.5 text-[12.5px] font-semibold text-muted-foreground hover:text-foreground"
            onClick={() => openManualWithTerm(searchTerm)}
          >
            Nhập tay
          </Button>
        ) : undefined
      }
    >
      <div
        className={
          mode === 'search'
            ? 'flex min-h-0 flex-1 flex-col px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]'
            : 'hidden'
        }
      >
        {renderSearch({
          term: searchTerm,
          onTermChange: setSearchTerm,
          onSwitchToManual: openManualWithTerm,
          autoFocus: !isMobile,
          focusToken: searchFocusToken,
        })}
      </div>

      <div
        className={
          mode === 'manual'
            ? 'min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]'
            : 'hidden'
        }
      >
        <ManualForm
          key={manualSeed?.nonce ?? 0}
          initialTitle={manualSeed?.term ?? ''}
          focusSignal={manualFocusToken}
          songs={songs}
          onAdd={onAddManual}
          onDone={() => onOpenChange(false)}
        />
      </div>
    </ResponsivePanel>
  )
}
