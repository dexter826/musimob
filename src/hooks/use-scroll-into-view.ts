import { useEffect, useRef } from 'react'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollIntoViewWhenActive<T extends HTMLElement>(
  isActive: boolean,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!isActive) return

    ref.current?.scrollIntoView({
      block: 'nearest',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [isActive])

  return ref
}
