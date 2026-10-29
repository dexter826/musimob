import { useRef, type ReactNode } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  children: ReactNode
}

type PanelHeaderProps = {
  title: ReactNode
  description: ReactNode
  headerAction?: ReactNode
  onBack?: () => void
  onClose: () => void
}

const titleClassName = 'text-[18px] font-semibold tracking-[-0.02em]'

function PanelHeader({
  title,
  description,
  headerAction,
  onBack,
  onClose,
}: PanelHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-5 pt-3">
      {onBack ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          aria-label="Quay lại tìm kiếm"
          onClick={onBack}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title}
        {description}
      </div>
      {headerAction ? (
        <div className="flex shrink-0 items-center gap-1">{headerAction}</div>
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label="Đóng"
        onClick={onClose}
      >
        <X aria-hidden="true" />
      </Button>
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
        onClose={() => onOpenChange(false)}
      />
      {children}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className="mx-auto flex h-auto max-h-[85dvh] w-full max-w-[560px] flex-col data-[vaul-drawer-direction=bottom]:max-h-[85dvh]"
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
        className="flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-[560px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[560px]"
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        {body}
      </DialogContent>
    </Dialog>
  )
}
