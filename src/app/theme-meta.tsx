import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const LIGHT = '#F4F3EE'
const DARK = '#11130F'

export function ThemeMeta() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', resolvedTheme === 'dark' ? DARK : LIGHT)
  }, [resolvedTheme])

  return null
}
