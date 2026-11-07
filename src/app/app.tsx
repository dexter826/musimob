import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { useAlbums } from '@/features/albums/hooks/use-albums'
import { SignInScreen } from '@/features/auth/components/sign-in-screen'
import { useSongs } from '@/features/songs/hooks/use-songs'
import { useViewMode } from '@/features/songs/hooks/use-view-mode'
import type { User } from '@/lib/api/types'
import { AlbumDetailPage } from './album-detail-page'
import { AlbumsPage } from './albums-page'
import { AppLayout } from './app-layout'
import { AppLoading } from './app-loading'
import { useAuthContext } from './auth-context'
import { LibraryPage } from './library-page'

const APP_TITLE = 'MusiMOB'

type SignedInAppProps = {
  user: User
  authError: string | null
  onSignOut: () => Promise<void>
}

function SignedInApp({ user, authError, onSignOut }: SignedInAppProps) {
  const songsState = useSongs(user.uid)
  const albumsState = useAlbums(user.uid)
  const { viewMode, toggleViewMode } = useViewMode()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              user={user}
              viewMode={viewMode}
              onToggleView={toggleViewMode}
              onSignOut={onSignOut}
            />
          }
        >
          <Route
            index
            element={
              <LibraryPage
                authError={authError}
                viewMode={viewMode}
                songsState={songsState}
                albumsState={albumsState}
              />
            }
          />
          <Route
            path="albums"
            element={
              <AlbumsPage albumsState={albumsState} songsState={songsState} />
            }
          />
          <Route
            path="albums/:albumId"
            element={
              <AlbumDetailPage
                albumsState={albumsState}
                songsState={songsState}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export function App() {
  const { user, isAuthLoading, isSigningIn, error, signIn, signOut } =
    useAuthContext()

  useEffect(() => {
    if (!user) document.title = APP_TITLE
  }, [user])

  if (isAuthLoading) {
    return <AppLoading />
  }

  if (!user) {
    return (
      <SignInScreen isSigningIn={isSigningIn} error={error} onSignIn={signIn} />
    )
  }

  return (
    <SignedInApp
      key={user.uid}
      user={user}
      authError={error}
      onSignOut={signOut}
    />
  )
}
