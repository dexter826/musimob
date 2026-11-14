import { useState, type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { PendingAction, SignUpValues } from '../hooks/use-auth'
import { AuthLayout } from './auth-layout'
import { EmailAuthForm } from './email-auth-form'
import { ForgotPasswordForm } from './forgot-password-form'

type AuthMode = 'sign-in' | 'sign-up' | 'reset'

type SignInScreenProps = {
  pending: PendingAction
  error: string | null
  onSignInWithGoogle: () => Promise<void>
  onSignInWithEmail: (email: string, password: string) => Promise<void>
  onCreateAccount: (values: SignUpValues) => Promise<void>
  onSendResetEmail: (email: string) => Promise<string | null>
  onClearError: () => void
}

const MODE_COPY: Record<AuthMode, { title: string; description: string }> = {
  'sign-in': {
    title: 'Thư viện riêng của bạn',
    description: 'Đăng nhập để vào thư viện bài hát của bạn.',
  },
  'sign-up': {
    title: 'Tạo tài khoản',
    description: 'Một tài khoản cho thư viện bài hát riêng của bạn.',
  },
  reset: {
    title: 'Đặt lại mật khẩu',
    description: 'Nhập email đã đăng ký để nhận link đặt lại mật khẩu.',
  },
}

function GoogleIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.07L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}

export function SignInScreen({
  pending,
  error,
  onSignInWithGoogle,
  onSignInWithEmail,
  onCreateAccount,
  onSendResetEmail,
  onClearError,
}: SignInScreenProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in')
  const copy = MODE_COPY[mode]

  function switchMode(nextMode: AuthMode) {
    onClearError()
    setMode(nextMode)
  }

  return (
    <AuthLayout title={copy.title} description={copy.description}>
      {mode === 'reset' ? (
        <ForgotPasswordForm
          pending={pending}
          error={error}
          onSendResetEmail={onSendResetEmail}
        />
      ) : (
        <EmailAuthForm
          mode={mode}
          pending={pending}
          error={error}
          onSignIn={onSignInWithEmail}
          onSignUp={onCreateAccount}
          onForgotPassword={
            mode === 'sign-in' ? () => switchMode('reset') : undefined
          }
        />
      )}

      {mode !== 'reset' ? (
        <>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-rule" />
            <span className="text-xs text-muted-foreground">hoặc</span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <Button
            type="button"
            onClick={() => void onSignInWithGoogle()}
            disabled={pending !== null}
            aria-busy={pending === 'google'}
            className="h-11 w-full gap-2 border border-control-border bg-surface text-[13px] font-semibold text-foreground hover:bg-surface-2"
          >
            {pending === 'google' ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang đăng nhập…
              </>
            ) : (
              <>
                <GoogleIcon className="size-[17px]" />
                Đăng nhập bằng Google
              </>
            )}
          </Button>
        </>
      ) : null}

      <div className="mt-2 text-center text-xs text-muted-foreground">
        {mode === 'sign-up' ? (
          <>
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={() => switchMode('sign-in')}
              className="inline-flex items-center py-1 font-semibold text-foreground underline underline-offset-4"
            >
              Đăng nhập
            </button>
          </>
        ) : mode === 'reset' ? (
          <button
            type="button"
            onClick={() => switchMode('sign-in')}
            className="inline-flex items-center py-1 font-semibold text-foreground underline underline-offset-4"
          >
            Quay lại đăng nhập
          </button>
        ) : (
          <>
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={() => switchMode('sign-up')}
              className="inline-flex items-center py-1 font-semibold text-foreground underline underline-offset-4"
            >
              Tạo tài khoản
            </button>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
