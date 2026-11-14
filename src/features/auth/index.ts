export { AvatarMenu } from './components/avatar-menu'
export { AuthLayout } from './components/auth-layout'
export { EmailAuthForm } from './components/email-auth-form'
export { ForgotPasswordForm } from './components/forgot-password-form'
export { AddPasswordDialog } from './components/add-password-dialog'
export { EmailField } from './components/email-field'
export { PasswordField } from './components/password-field'
export { SignInScreen } from './components/sign-in-screen'
export { ResetPasswordScreen } from './components/reset-password-screen'
export { VerifyEmailScreen } from './components/verify-email-screen'

export {
  useAuth,
  type AuthState,
  type PendingAction,
  type SignUpValues,
} from './hooks/use-auth'

export {
  MIN_PASSWORD_LENGTH,
  getEmailError,
  getPasswordError,
  getConfirmPasswordError,
} from './lib/validation'
export { isVerificationSkipped, skipVerification } from './lib/verification'

export { authApi, type AuthApi } from './api/auth'
export type { User, SignInMethod } from './types'
