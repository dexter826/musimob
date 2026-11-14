import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { useAlbums } from '@/features/albums'
import {
  ResetPasswordScreen,
  SignInScreen,
  VerifyEmailScreen,
  type User,
} from '@/features/auth'
import { useSongs, useViewMode } from '@/features/songs'
import { AlbumDetailPage } from './album-detail-page'
import { AlbumsPage } from './albums-page'
import { AppLayout } from './app-layout'
import { AppLoading } from './app-loading'
import { useAuthContext } from './auth-context'
import { DiscoverPage } from './discover-page'
import { LibraryPage } from './library-page'

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
            viewMode={viewMode}
            onToggleView={toggleViewMode}
            onAddPassword={onAddPassword}
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
          path="discover"
          element={<DiscoverPage songsState={songsState} />}
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
  )
}

function AppGate() {
  const {
    user,
    isAuthLoading,
    pending,
    error,
    needsVerification,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    sendResetEmail,
    resendVerification,
    reloadUser,
    linkPassword,
    signOut,
    clearError,
  } = useAuthContext()

  useEffect(() => {
    if (!user) document.title = APP_TITLE
  }, [user])

  if (isAuthLoading) {
    return <AppLoading />
  }

  if (!user) {
    return (
      <SignInScreen
        pending={pending}
        error={error}
        onSignInWithGoogle={signInWithGoogle}
        onSignInWithEmail={signInWithEmail}
        onCreateAccount={createAccount}
        onSendResetEmail={sendResetEmail}
        onClearError={clearError}
      />
    )
  }

  if (needsVerification) {
    return (
      <VerifyEmailScreen
        email={user.email}
        pending={pending}
        error={error}
        onResend={resendVerification}
        onCheck={reloadUser}
        onSignOut={signOut}
      />
    )
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
  const { pending, error, checkResetCode, resetPassword } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/reset-password"
          element={
            <ResetPasswordScreen
              error={error}
              isSubmitting={pending === 'reset'}
              onCheckCode={checkResetCode}
              onResetPassword={resetPassword}
            />
          }
        />
        <Route path="*" element={<AppGate />} />
      </Routes>
    </BrowserRouter>
  )
}
