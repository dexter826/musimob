import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AddSheet } from '@/features/add-song/components/add-sheet'
import { SignInScreen } from '@/features/auth/components/sign-in-screen'
import { SongSearch } from '@/features/search-song/components/song-search'
import { SongList } from '@/features/songs/components/song-list'
import { useSongs } from '@/features/songs/hooks/use-songs'
import type { User } from '@/lib/api/types'
import { useAuthContext } from './auth-context'
import { AppHeader } from './app-header'
import { AppLoading } from './app-loading'

type SignedInAppProps = {
  user: User
  authError: string | null
  onSignOut: () => Promise<void>
}

function SignedInApp({ user, authError, onSignOut }: SignedInAppProps) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const { songs, isLoading, error, retry, addSong } = useSongs(user.uid)

  const songCount = isLoading && songs.length === 0 ? null : songs.length
  const hasError = error !== null && songs.length === 0

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <AppHeader
        songCount={songCount}
        hasError={hasError}
        displayName={user.displayName}
        onSignOut={onSignOut}
      />
      <main className="flex flex-1 flex-col px-6 pb-24 sm:px-8 lg:px-12 lg:pb-28 xl:px-16">
        {authError ? (
          <Alert
            variant="destructive"
            className="mb-3 border-destructive/30 bg-destructive/10"
          >
            <AlertDescription className="text-[12.5px] leading-[1.5]">
              {authError}
            </AlertDescription>
          </Alert>
        ) : null}
        <SongList
          songs={songs}
          isLoading={isLoading}
          error={error}
          onAdd={() => setIsAddOpen(true)}
          onRetry={retry}
        />
      </main>

      <Button
        type="button"
        aria-label="Thêm bài"
        onClick={() => setIsAddOpen(true)}
        className="fixed right-6 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 size-14 rounded-full p-0 shadow-lg shadow-black/40 sm:right-8 lg:right-12 lg:bottom-8 xl:right-16"
      >
        <Plus aria-hidden="true" className="size-6" />
      </Button>

      <AddSheet
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onAdd={addSong}
        renderSearchTab={(onSwitchToManual) => (
          <SongSearch
            songs={songs}
            onAdd={addSong}
            onSwitchToManual={onSwitchToManual}
          />
        )}
      />
    </div>
  )
}

export function App() {
  const { user, isAuthLoading, isSigningIn, error, signIn, signOut } =
    useAuthContext()

  if (isAuthLoading) {
    return <AppLoading />
  }

  if (!user) {
    return (
      <SignInScreen
        isSigningIn={isSigningIn}
        error={error}
        onSignIn={signIn}
      />
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
