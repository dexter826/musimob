import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PageShell } from '@/components/page-shell'
import type { ViewMode } from '@/features/songs/hooks/use-view-mode'
import type { User } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { AppHeader } from './app-header'

type AppLayoutProps = {
  user: User
  viewMode: ViewMode
  onToggleView: () => void
  onSignOut: () => Promise<void>
}

export function AppLayout({
  user,
  viewMode,
  onToggleView,
  onSignOut,
}: AppLayoutProps) {
  const { pathname } = useLocation()
  const { stop } = useAudioPreview()

  useEffect(() => {
    return stop
  }, [pathname, stop])

  return (
    <PageShell>
      <a href="#main-content" className="skip-link">
        Chuyển đến nội dung
      </a>
      <AppHeader
        displayName={user.displayName}
        photoURL={user.photoURL}
        viewMode={viewMode}
        onToggleView={onToggleView}
        onSignOut={onSignOut}
      />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </PageShell>
  )
}
