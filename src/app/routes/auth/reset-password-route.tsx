import { useAuthContext } from '@/app/auth-context'
import { ResetPasswordScreen } from '@/features/auth'

export function ResetPasswordRoute() {
  const { pending, error, checkResetCode, resetPassword } = useAuthContext()

  return (
    <ResetPasswordScreen
      error={error}
      isSubmitting={pending === 'reset'}
      onCheckCode={checkResetCode}
      onResetPassword={resetPassword}
    />
  )
}
