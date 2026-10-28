import { useEffect, useRef, useState } from 'react'

type AvatarMenuProps = {
  displayName: string
  onSignOut: () => Promise<void>
}

export function AvatarMenu({ displayName, onSignOut }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const initial = displayName.trim().charAt(0).toUpperCase() || 'B'

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Mở tài khoản của ${displayName}`}
        aria-expanded={isOpen}
        aria-controls="avatar-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="relative grid size-9 place-items-center rounded-full bg-accent text-[12px] font-bold text-accent-ink after:absolute after:-inset-1 after:content-[''] hover:bg-accent/90 active:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {initial}
      </button>

      {isOpen ? (
        <div
          id="avatar-menu"
          role="group"
          aria-label="Tài khoản"
          className="absolute top-full right-0 z-20 mt-2 w-48 rounded-xl border border-line bg-surface p-1 shadow-menu"
        >
          <p className="truncate px-3 pt-2 pb-1 text-[12px] text-muted">
            {displayName}
          </p>
          <div className="my-1 h-px bg-line" />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              void onSignOut()
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-ink hover:bg-surface-2 active:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Đăng xuất
          </button>
        </div>
      ) : null}
    </div>
  )
}
