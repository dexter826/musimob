import { useId, useState, type FormEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import type { PendingAction } from '../hooks/use-auth'
import { getEmailError } from '../lib/validation'

type ForgotPasswordFormProps = {
  pending: PendingAction
  error: string | null
  onSendResetEmail: (email: string) => Promise<void>
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
  const fieldId = useId()
  const emailErrorId = `${fieldId}-email-error`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPending) return

    const nextError = getEmailError(email)
    setEmailError(nextError)

    if (nextError) return

    try {
      await onSendResetEmail(email.trim())
      setSentTo(email.trim())
    } catch {
      // Lỗi hiển thị qua ErrorAlert, giữ nguyên form để gửi lại.
    }
  }

  if (sentTo) {
    return (
      <div className="border-l-[3px] border-primary bg-surface-2 px-3 py-2.5">
        <p className="text-sm leading-[1.6] text-foreground">
          Đã gửi link đặt lại mật khẩu tới {sentTo}.
        </p>
        <p className="mt-1 text-xs leading-[1.5] text-muted-foreground">
          Nếu chưa thấy, hãy kiểm tra thư mục spam hoặc đợi ít phút.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field data-invalid={Boolean(emailError)}>
        <FieldLabel htmlFor={fieldId} className="text-xs font-medium">
          Email
        </FieldLabel>
        <Input
          id={fieldId}
          type="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setEmailError(null)
          }}
          autoComplete="email"
          placeholder="nguyenvana@domain.com"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? emailErrorId : undefined}
          className="h-11 bg-surface text-base md:text-[15px]"
        />
        {emailError ? (
          <FieldError id={emailErrorId} className="text-xs">
            {emailError}
          </FieldError>
        ) : null}
      </Field>

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
