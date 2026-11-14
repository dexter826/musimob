import { useState, type FormEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import type { PendingAction, SignUpValues } from '../hooks/use-auth'
import { getEmailError, getPasswordError } from '../lib/validation'
import { EmailField } from './email-field'
import { PasswordField } from './password-field'

type EmailAuthFormProps = {
  mode: 'sign-in' | 'sign-up'
  pending: PendingAction
  error: string | null
  onSignIn: (email: string, password: string) => Promise<void>
  onSignUp: (values: SignUpValues) => Promise<void>
  onForgotPassword?: () => void
}

type FormErrors = {
  displayName?: string
  email?: string
  password?: string
}

export function EmailAuthForm({
  mode,
  pending,
  error,
  onSignIn,
  onSignUp,
  onForgotPassword,
}: EmailAuthFormProps) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const isSignUp = mode === 'sign-up'
  const isPending = pending === (isSignUp ? 'signUp' : 'email')
  const nameFieldId = 'auth-display-name'

  function clearFieldError(field: keyof FormErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPending) return

    const nextErrors: FormErrors = {
      displayName: isSignUp
        ? displayName.trim()
          ? undefined
          : 'Nhập tên hiển thị.'
        : undefined,
      email: getEmailError(email) ?? undefined,
      password: getPasswordError(password) ?? undefined,
    }

    setErrors(nextErrors)

    if (nextErrors.displayName || nextErrors.email || nextErrors.password) {
      return
    }

    if (isSignUp) {
      await onSignUp({
        displayName: displayName.trim(),
        email: email.trim(),
        password,
      })
      return
    }

    await onSignIn(email.trim(), password)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-4">
        {isSignUp ? (
          <Field data-invalid={Boolean(errors.displayName)}>
            <FieldLabel htmlFor={nameFieldId} className="text-xs font-medium">
              Tên hiển thị
            </FieldLabel>
            <Input
              id={nameFieldId}
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value)
                clearFieldError('displayName')
              }}
              autoComplete="name"
              aria-invalid={Boolean(errors.displayName)}
              className="h-11 bg-surface text-base md:text-[15px]"
            />
            {errors.displayName ? (
              <FieldError className="text-xs">{errors.displayName}</FieldError>
            ) : null}
          </Field>
        ) : null}

        <EmailField
          value={email}
          onChange={(value) => {
            setEmail(value)
            clearFieldError('email')
          }}
          error={errors.email}
        />

        <PasswordField
          label="Mật khẩu"
          value={password}
          onChange={(value) => {
            setPassword(value)
            clearFieldError('password')
          }}
          error={errors.password}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          placeholder="••••••••"
        />
      </FieldGroup>

      {error ? <ErrorAlert message={error} className="mt-3" /> : null}

      {onForgotPassword ? (
        <div className="mt-1 flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="inline-flex items-center py-1 text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Quên mật khẩu?
          </button>
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="mt-4 h-11 w-full gap-2 text-[13px] font-semibold"
      >
        {isPending ? (
          <>
            <Spinner aria-hidden="true" className="size-4" />
            {isSignUp ? 'Đang tạo tài khoản…' : 'Đang đăng nhập…'}
          </>
        ) : isSignUp ? (
          'Tạo tài khoản'
        ) : (
          'Đăng nhập'
        )}
      </Button>
    </form>
  )
}
