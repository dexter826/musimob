import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeMeta() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return

    const frame = requestAnimationFrame(() => {
      const background = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim()
      if (!background) return

      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', background)
    })

    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])

  return null
}
