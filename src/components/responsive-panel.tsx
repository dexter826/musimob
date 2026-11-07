import { useRef, type ReactNode } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

type ResponsivePanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  headerAction?: ReactNode
  onBack?: () => void
  backLabel?: string
  children: ReactNode
}

type PanelHeaderProps = {
  title: ReactNode
  description: ReactNode
  headerAction?: ReactNode
  onBack?: () => void
  backLabel: string
  onClose: () => void
}

const titleClassName =
  'font-serif text-[18px] leading-[1.2] font-medium tracking-[-0.01em]'

const headerIconClass =
  'grid size-11 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors duration-[160ms] hover:bg-secondary hover:text-foreground'

function PanelHeader({
  title,
  description,
  headerAction,
  onBack,
  backLabel,
  onClose,
}: PanelHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-5 pt-3">
      {onBack ? (
        <button
          type="button"
          aria-label={backLabel}
          onClick={onBack}
          className={headerIconClass}
        >
          <ArrowLeft aria-hidden="true" className="size-[18px]" />
        </button>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title}
        {description}
      </div>
      {headerAction ? (
        <div className="flex shrink-0 items-center gap-1">{headerAction}</div>
      ) : null}
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className={headerIconClass}
      >
        <X aria-hidden="true" className="size-[18px]" />
      </button>
    </div>
  )
}

export function ResponsivePanel({
  open,
  onOpenChange,
  title,
  description,
  headerAction,
  onBack,
  backLabel = 'Quay lại',
  children,
}: ResponsivePanelProps) {
  const isMobile = useIsMobile()
  const panelRef = useRef<HTMLDivElement>(null)

  function handleOpenAutoFocus(event: Event) {
    event.preventDefault()
    panelRef.current?.focus()
  }

  const titleNode = isMobile ? (
    <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
  ) : (
    <DialogTitle className={titleClassName}>{title}</DialogTitle>
  )

  const descriptionNode = isMobile ? (
    <DrawerDescription className="sr-only">{description}</DrawerDescription>
  ) : (
    <DialogDescription className="sr-only">{description}</DialogDescription>
  )

  const body = (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="flex min-h-0 flex-1 flex-col outline-none"
    >
      <PanelHeader
        title={titleNode}
        description={descriptionNode}
        headerAction={headerAction}
        onBack={onBack}
        backLabel={backLabel}
        onClose={() => onOpenChange(false)}
      />
      {children}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className="mx-auto flex h-auto max-h-[85dvh] w-full max-w-[560px] flex-col overscroll-contain rounded-t-xl border-t border-rule bg-surface shadow-none data-[vaul-drawer-direction=bottom]:max-h-[85dvh]"
          onOpenAutoFocus={handleOpenAutoFocus}
        >
          {body}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-[560px] flex-col gap-0 overflow-hidden overscroll-contain rounded-xl border border-rule bg-surface p-0 shadow-none sm:max-w-[560px]"
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        {body}
      </DialogContent>
    </Dialog>
  )
}
