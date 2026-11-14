import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { useAlbums } from '@/features/albums'
import type { User } from '@/features/auth'
import { useSongs, useViewMode } from '@/features/songs'
import { AppLoading } from './app-loading'
import { useAuthContext } from './auth-context'
import { AlbumDetailRoute } from './routes/album-detail-route'
import { AlbumsRoute } from './routes/albums-route'
import { AppLayout } from './app-layout'
import { ResetPasswordRoute } from './routes/auth/reset-password-route'
import { SignInRoute } from './routes/auth/sign-in-route'
import { VerifyEmailRoute } from './routes/auth/verify-email-route'
import { DiscoverRoute } from './routes/discover-route'
import { LibraryRoute } from './routes/library-route'

const APP_TITLE = 'MusiMOB'

type SignedInAppProps = {
  user: User
  authError: string | null
  onAddPassword: (password: string) => Promise<string | null>
  onSignOut: () => Promise<void>
}

function SignedInApp({
  user,
  authError,
  onAddPassword,
  onSignOut,
}: SignedInAppProps) {
  const songsState = useSongs(user.uid)
  const albumsState = useAlbums(user.uid)
  const { viewMode, toggleViewMode } = useViewMode()

  return (
    <Routes>
      <Route
        element={
          <AppLayout
            user={user}
            authError={authError}
            viewMode={viewMode}
            onToggleView={toggleViewMode}
            onAddPassword={onAddPassword}
            onSignOut={onSignOut}
            songsState={songsState}
            albumsState={albumsState}
          />
        }
      >
        <Route index element={<LibraryRoute />} />
        <Route path="discover" element={<DiscoverRoute />} />
        <Route path="albums" element={<AlbumsRoute />} />
        <Route path="albums/:albumId" element={<AlbumDetailRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function AppGate() {
  const {
    user,
    isAuthLoading,
    error,
    needsVerification,
    linkPassword,
    signOut,
  } = useAuthContext()

  useEffect(() => {
    if (!user) document.title = APP_TITLE
  }, [user])

  if (isAuthLoading) {
    return <AppLoading />
  }

  if (!user) {
    return <SignInRoute />
  }

  if (needsVerification) {
    return <VerifyEmailRoute />
  }

  return (
    <SignedInApp
      key={user.uid}
      user={user}
      authError={error}
      onAddPassword={(password) => linkPassword(user.email ?? '', password)}
      onSignOut={signOut}
    />
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reset-password" element={<ResetPasswordRoute />} />
        <Route path="*" element={<AppGate />} />
      </Routes>
    </BrowserRouter>
  )
}
