import { Alert, AlertDescription } from '@/components/ui/alert'
import { SignInScreen } from '@/features/auth/components/sign-in-screen'
import { useAuthContext } from './auth-context'
import { AppHeader } from './app-header'
import { AppLoading } from './app-loading'
import { EmptyState } from './empty-state'

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
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <AppHeader
        songCount={0}
        displayName={user.displayName}
        onSignOut={signOut}
      />
      <main className="flex flex-1 flex-col px-6 pb-6 sm:px-8 lg:px-12 lg:pb-10 xl:px-16">
        {error ? (
          <Alert
            variant="destructive"
            className="mb-3 border-destructive/30 bg-destructive/10"
          >
            <AlertDescription className="text-[12.5px] leading-[1.5]">
              {error}
            </AlertDescription>
          </Alert>
        ) : null}
        <EmptyState />
      </main>
    </div>
  )
}
