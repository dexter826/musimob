import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HorizontalScrollRowProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  headerExtra?: ReactNode
  children: ReactNode
}

export function HorizontalScrollRow({
  title,
  subtitle,
  action,
  headerExtra,
  children,
}: HorizontalScrollRowProps) {
  const scrollRef = useRef<HTMLUListElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  function updateScrollButtons() {
    const el = scrollRef.current
    if (!el) return
    const tolerance = 4
    setCanScrollLeft(el.scrollLeft > tolerance)
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance,
    )
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [children])

  function handleScroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const offset = Math.max(280, el.clientWidth * 0.75)
    el.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    })
  }

  function handleMouseDown(e: React.MouseEvent<HTMLUListElement>) {
    const el = scrollRef.current
    if (!el) return
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
    if (!isDraggingRef.current) return
    const el = scrollRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.2
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true
    }
    el.scrollLeft = scrollLeftRef.current - walk
  }

  function handleMouseUpOrLeave() {
    isDraggingRef.current = false
  }

  function handleClickCapture(e: React.MouseEvent<HTMLUListElement>) {
    if (hasDraggedRef.current) {
      e.stopPropagation()
      hasDraggedRef.current = false
    }
  }

  return (
    <section className="relative flex flex-col gap-3 py-3">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-serif text-[22px] leading-[1.2] font-medium tracking-[-0.01em] text-foreground sm:text-[24px]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {action}
          <div className="hidden md:flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Cuộn trái danh mục ${title}`}
              disabled={!canScrollLeft}
              onClick={() => handleScroll('left')}
              className="size-11 rounded-md"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Cuộn phải danh mục ${title}`}
              disabled={!canScrollRight}
              onClick={() => handleScroll('right')}
              className="size-11 rounded-md"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {headerExtra ? <div className="pt-1">{headerExtra}</div> : null}

      <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
        <ul
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onClickCapture={handleClickCapture}
          className="flex cursor-grab gap-4 overflow-x-auto scroll-smooth pb-2 pt-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {children}
        </ul>
      </div>
    </section>
  )
}
