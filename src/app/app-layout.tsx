import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PageShell } from '@/components/page-shell'
import { useAudioPreview } from '@/features/audio-preview'
import type { User } from '@/features/auth'
import type { useSongs, ViewMode } from '@/features/songs'
import type { useAlbums } from '@/features/albums'
import { AppHeader } from './app-header'
import type { AppOutletContext } from './app-outlet-context'

type AppLayoutProps = {
  user: User
  authError: string | null
  viewMode: ViewMode
  onToggleView: () => void
  onAddPassword: (password: string) => Promise<string | null>
  onSignOut: () => Promise<void>
  songsState: ReturnType<typeof useSongs>
  albumsState: ReturnType<typeof useAlbums>
}

export function AppLayout({
  user,
  authError,
  viewMode,
  onToggleView,
  onAddPassword,
  onSignOut,
  songsState,
  albumsState,
}: AppLayoutProps) {
  const { pathname } = useLocation()
  const { stop } = useAudioPreview()

  useEffect(() => {
    return stop
  }, [pathname, stop])

  const contextValue: AppOutletContext = {
    user,
    authError,
    viewMode,
    songsState,
    albumsState,
  }

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
        <Outlet context={contextValue} />
      </main>
    </PageShell>
  )
}
