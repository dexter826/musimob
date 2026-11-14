import { useAuthContext } from '@/app/auth-context'
import { VerifyEmailScreen } from '@/features/auth'

export function VerifyEmailRoute() {
  const { user, pending, error, resendVerification, reloadUser, signOut } =
    useAuthContext()

  return (
    <VerifyEmailScreen
      email={user?.email ?? null}
      pending={pending}
      error={error}
      onResend={resendVerification}
      onCheck={reloadUser}
      onSignOut={signOut}
    />
  )
}
