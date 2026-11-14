import { useAuthContext } from '@/app/auth-context'
import { SignInScreen } from '@/features/auth'

export function SignInRoute() {
  const {
    pending,
    error,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    sendResetEmail,
    clearError,
  } = useAuthContext()

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
