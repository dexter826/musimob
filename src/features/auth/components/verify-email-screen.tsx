import { useState } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { PendingAction } from '../hooks/use-auth'
import { AuthLayout } from './auth-layout'

type VerifyEmailScreenProps = {
  email: string | null
  pending: PendingAction
  error: string | null
  onResend: () => Promise<void>
  onCheck: () => Promise<void>
  onSignOut: () => Promise<void>
}

export function VerifyEmailScreen({
  email,
  pending,
  error,
  onResend,
  onCheck,
  onSignOut,
}: VerifyEmailScreenProps) {
  const [isChecked, setIsChecked] = useState(false)
  const isPending = pending === 'verification'

  async function handleCheck() {
    await onCheck()
    setIsChecked(true)
  }

  return (
    <AuthLayout
      title="Kiểm tra email của bạn"
      description={
        email ? (
          <>
            Mở link xác minh trong email gửi tới <strong>{email}</strong> để vào
            thư viện bài hát của bạn.
          </>
        ) : (
          'Mở link xác minh trong email của bạn để vào thư viện bài hát.'
        )
      }
    >
      {error ? <ErrorAlert message={error} className="mb-4" /> : null}

      {isChecked ? (
        <p className="mb-4 text-xs leading-[1.5] text-muted-foreground">
          Chưa thấy xác nhận. Hãy mở lại link trong email hoặc gửi lại bên dưới.
        </p>
      ) : null}

      <Button
        type="button"
        onClick={() => void handleCheck()}
        disabled={isPending}
        aria-busy={isPending}
        className="h-11 w-full gap-2 text-[13px] font-semibold"
      >
        {isPending ? (
          <>
            <Spinner aria-hidden="true" className="size-4" />
            Đang kiểm tra…
          </>
        ) : (
          'Kiểm tra xác minh'
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() => void onResend()}
        disabled={isPending}
        className="mt-3 h-11 w-full text-[13px] font-semibold"
      >
        Gửi lại email xác minh
      </Button>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() => void onSignOut()}
          className="inline-flex items-center py-1 text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Đăng xuất
        </button>
      </div>
    </AuthLayout>
  )
}
