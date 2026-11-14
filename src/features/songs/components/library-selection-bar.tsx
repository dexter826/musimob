import { useLayoutEffect, useRef, type Ref } from 'react'
import { Button } from '@/components/ui/button'

type LibrarySelectionBarProps = {
  count: number
  onClear: () => void
  onAdd: () => void
  addButtonRef: Ref<HTMLButtonElement>
}

export function LibrarySelectionBar({
  count,
  onClear,
  onAdd,
  addButtonRef,
}: LibrarySelectionBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const style = document.documentElement.style
    const previousHeight = style.getPropertyValue('--library-selection-height')
    const updateHeight = () => {
      style.setProperty(
        '--library-selection-height',
        `${bar.getBoundingClientRect().height}px`,
      )
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(bar)
    return () => {
      observer.disconnect()
      if (previousHeight)
        style.setProperty('--library-selection-height', previousHeight)
      else style.removeProperty('--library-selection-height')
    }
  }, [])

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Thao tác với bài đã chọn"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-surface px-[clamp(20px,5vw,64px)] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-2">
        <p
          aria-live="polite"
          className="text-xs font-medium text-muted-foreground tabular-nums max-md:w-full"
        >
          Đã chọn {count} bài
        </p>
        <div className="flex items-center gap-2 max-md:w-full">
          <Button
            type="button"
            variant="ghost"
            disabled={count === 0}
            onClick={onClear}
            className="h-11 px-3 text-[13px] font-semibold"
          >
            Bỏ chọn
          </Button>
          <Button
            type="button"
            disabled={count === 0}
            onClick={onAdd}
            ref={addButtonRef}
            className="h-11 px-4 text-[13px] font-semibold max-md:flex-1"
          >
            Thêm vào album
          </Button>
        </div>
      </div>
    </div>
  )
}
