import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { getConfirmPasswordError, getPasswordError } from '../lib/validation'
import { AuthLayout } from './auth-layout'
import { PasswordField } from './password-field'

type ResetPasswordScreenProps = {
  error: string | null
  isSubmitting: boolean
  onCheckCode: (oobCode: string) => Promise<string>
  onResetPassword: (
    oobCode: string,
    newPassword: string,
  ) => Promise<string | null>
}

export function ResetPasswordScreen({
  error,
  isSubmitting,
  onCheckCode,
  onResetPassword,
}: ResetPasswordScreenProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const oobCode = searchParams.get('oobCode')
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [isInvalidLink, setIsInvalidLink] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!oobCode) {
      setIsInvalidLink(true)
      setIsChecking(false)
      return
    }

    let isActive = true

    onCheckCode(oobCode)
      .then((nextEmail) => {
        if (isActive) setEmail(nextEmail)
      })
      .catch(() => {
        if (isActive) setIsInvalidLink(true)
      })
      .finally(() => {
        if (isActive) setIsChecking(false)
      })

    return () => {
      isActive = false
    }
  }, [oobCode, onCheckCode])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting || !oobCode) return

    const nextPasswordError = getPasswordError(password)
    const nextConfirmError = getConfirmPasswordError(password, confirmPassword)

    setPasswordError(nextPasswordError)
    setConfirmError(nextConfirmError)

    if (nextPasswordError || nextConfirmError) return

    const message = await onResetPassword(oobCode, password)

    if (message) return

    setIsDone(true)
  }

  if (isInvalidLink) {
    return (
      <AuthLayout
        title="Link không dùng được"
        description="Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Hãy yêu cầu link mới."
      >
        <Button
          type="button"
          onClick={() => navigate('/')}
          className="h-11 w-full text-[13px] font-semibold"
        >
          Quay lại đăng nhập
        </Button>
      </AuthLayout>
    )
  }

  if (isDone) {
    return (
      <AuthLayout
        title="Đã đặt lại mật khẩu"
        description="Hãy đăng nhập bằng mật khẩu mới."
      >
        <Button
          type="button"
          onClick={() => navigate('/')}
          className="h-11 w-full text-[13px] font-semibold"
        >
          Đăng nhập
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      description={
        email ? (
          <>
            Chọn mật khẩu mới cho <strong>{email}</strong>.
          </>
        ) : (
          'Chọn mật khẩu mới cho tài khoản của bạn.'
        )
      }
    >
      {isChecking ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner aria-hidden="true" className="size-4" />
          Đang kiểm tra link…
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <PasswordField
            label="Mật khẩu mới"
            value={password}
            onChange={(value) => {
              setPassword(value)
              setPasswordError(null)
            }}
            error={passwordError ?? undefined}
            autoComplete="new-password"
            placeholder="••••••••"
          />

          <div className="mt-4">
            <PasswordField
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value)
                setConfirmError(null)
              }}
              error={confirmError ?? undefined}
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>

          {error ? <ErrorAlert message={error} className="mt-4" /> : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="mt-6 h-11 w-full gap-2 text-[13px] font-semibold"
          >
            {isSubmitting ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang đặt lại…
              </>
            ) : (
              'Đặt lại mật khẩu'
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
