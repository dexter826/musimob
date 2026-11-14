import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PageShell } from '@/components/page-shell'
import { useAudioPreview } from '@/features/audio-preview'
import type { User } from '@/features/auth'
import type { useSongs, ViewMode } from '@/features/songs'
import type { useAlbums } from '@/features/albums'
import { AppHeader } from '../app-header'
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
    stop()
  }, [pathname, stop])

  const contextValue: AppOutletContext = {
    user,
    authError,
    viewMode,
    songsState,
    albumsState,
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-coral-200">
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
      <main className="flex flex-1 flex-col">
        <PageShell>
          <Outlet context={contextValue} />
        </PageShell>
      </main>
    </div>
  )
}
