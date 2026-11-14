import { useState, type FormEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { getConfirmPasswordError, getPasswordError } from '../lib/validation'
import { PasswordField } from './password-field'

type AddPasswordDialogProps = {
  open: boolean
  email: string
  onOpenChange: (open: boolean) => void
  onSubmit: (password: string) => Promise<string | null>
}

export function AddPasswordDialog({
  open,
  email,
  onOpenChange,
  onSubmit,
}: AddPasswordDialogProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  function resetForm() {
    setPassword('')
    setConfirmPassword('')
    setPasswordError(null)
    setConfirmError(null)
    setSubmitError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) return

    const nextPasswordError = getPasswordError(password)
    const nextConfirmError = getConfirmPasswordError(password, confirmPassword)

    setPasswordError(nextPasswordError)
    setConfirmError(nextConfirmError)

    if (nextPasswordError || nextConfirmError) return

    setIsSaving(true)

    const message = await onSubmit(password)

    if (message) {
      setSubmitError(message)
      setIsSaving(false)
      return
    }

    resetForm()
    onOpenChange(false)
    setIsSaving(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSaving) return
        if (!nextOpen) resetForm()
        onOpenChange(nextOpen)
      }}
    >
      <DialogContent className="max-w-[420px] gap-5 rounded-xl border border-rule bg-surface p-6 shadow-none">
        <DialogHeader>
          <DialogTitle className="font-serif text-[20px] leading-[1.2] font-medium">
            Thêm mật khẩu
          </DialogTitle>
          <DialogDescription className="text-sm leading-[1.6] text-muted-foreground">
            Đặt mật khẩu cho {email} để đăng nhập mà không cần Google.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <PasswordField
            label="Mật khẩu"
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

          {submitError ? (
            <ErrorAlert message={submitError} className="mt-4" />
          ) : null}

          <Button
            type="submit"
            disabled={isSaving}
            aria-busy={isSaving}
            className="mt-6 h-11 w-full gap-2 text-[13px] font-semibold"
          >
            {isSaving ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang thêm…
              </>
            ) : (
              'Thêm mật khẩu'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
