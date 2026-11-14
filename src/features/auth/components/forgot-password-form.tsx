import { useState, type FormEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { PendingAction } from '../hooks/use-auth'
import { getEmailError } from '../lib/validation'
import { EmailField } from './email-field'

type ForgotPasswordFormProps = {
  pending: PendingAction
  error: string | null
  onSendResetEmail: (email: string) => Promise<string | null>
}

export function ForgotPasswordForm({
  pending,
  error,
  onSendResetEmail,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const isPending = pending === 'reset'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPending) return

    const nextError = getEmailError(email)
    setEmailError(nextError)

    if (nextError) return

    const message = await onSendResetEmail(email.trim())

    if (message) return

    setSentTo(email.trim())
  }

  if (sentTo) {
    return (
      <div className="border-l-[3px] border-primary bg-surface-2 px-3 py-2.5">
        <p className="text-sm leading-[1.6] text-foreground">
          Nếu {sentTo} đã có tài khoản, link đặt lại mật khẩu đã được gửi tới
          địa chỉ đó.
        </p>
        <p className="mt-1 text-xs leading-[1.5] text-muted-foreground">
          Chưa thấy? Kiểm tra thư mục spam hoặc đợi ít phút.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <EmailField
        value={email}
        onChange={(value) => {
          setEmail(value)
          setEmailError(null)
        }}
        error={emailError ?? undefined}
      />

      {error ? <ErrorAlert message={error} className="mt-3" /> : null}

      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="mt-6 h-11 w-full gap-2 text-[13px] font-semibold"
      >
        {isPending ? (
          <>
            <Spinner aria-hidden="true" className="size-4" />
            Đang gửi email…
          </>
        ) : (
          'Gửi link đặt lại mật khẩu'
        )}
      </Button>
    </form>
  )
}
