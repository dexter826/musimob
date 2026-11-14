import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PageShell } from '@/components/page-shell'
import type { ViewMode } from '@/features/songs'
import type { User } from '@/features/auth'
import { useAudioPreview } from '@/features/audio-preview'
import { AppHeader } from './app-header'

type AppLayoutProps = {
  user: User
  viewMode: ViewMode
  onToggleView: () => void
  onAddPassword: (password: string) => Promise<string | null>
  onSignOut: () => Promise<void>
}

export function AppLayout({
  user,
  viewMode,
  onToggleView,
  onAddPassword,
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
        email={user.email}
        hasPassword={user.signInMethods.includes('password')}
        viewMode={viewMode}
        onToggleView={onToggleView}
        onAddPassword={onAddPassword}
        onSignOut={onSignOut}
      />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </PageShell>
  )
}
