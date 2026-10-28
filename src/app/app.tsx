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
    <div className="mx-auto min-h-dvh w-full max-w-[1120px] bg-canvas">
      <AppHeader
        songCount={0}
        displayName={user.displayName}
        onSignOut={signOut}
      />
      <main>
        {error ? (
          <p
            role="alert"
            className="mx-5 mb-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-[12.5px] leading-[1.5] text-danger"
          >
            {error}
          </p>
        ) : null}
        <EmptyState />
      </main>
    </div>
  )
}
