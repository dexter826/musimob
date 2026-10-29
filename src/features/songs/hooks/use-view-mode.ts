import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'musimob:view-mode'

export type ViewMode = 'list' | 'grid'

function readStoredViewMode(): ViewMode {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'grid' ? 'grid' : 'list'
  } catch {
    return 'list'
  }
}

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(readStoredViewMode)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, viewMode)
    } catch {
      // localStorage có thể bị chặn; kiểu xem vẫn đổi trong phiên hiện tại.
    }
  }, [viewMode])

  const toggleViewMode = useCallback(() => {
    setViewMode((current) => (current === 'list' ? 'grid' : 'list'))
  }, [])

  return { viewMode, toggleViewMode }
}
