import type { ComponentProps } from 'react'
import symbol from '../../../../assets/brand/symbol.svg'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Wordmark } from '@/components/wordmark'

type SignInScreenProps = {
  isSigningIn: boolean
  error: string | null
  onSignIn: () => Promise<void>
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
  isSigningIn,
  error,
  onSignIn,
}: SignInScreenProps) {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-background px-5 py-10 sm:px-8">
      <div className="relative w-full max-w-[560px]">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 aspect-square w-[180px] rounded-sm bg-[var(--night-900)] sm:w-[320px]"
        >
          <img
            src={symbol}
            alt=""
            width={96}
            height={96}
            className="absolute top-1/2 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2 sm:w-24"
          />
          <span className="absolute -top-2 right-8 h-12 w-4 bg-primary [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]" />
        </div>

        <section className="relative z-10 mx-auto mt-24 w-full max-w-[350px] rounded-sm border border-rule bg-surface p-6 shadow-[6px_6px_0_0_var(--surface-2),6px_6px_0_1px_var(--rule)] sm:mx-0 sm:mt-[120px] sm:max-w-[360px] sm:p-8">
          <Wordmark className="h-7" />

          <h1 className="mt-10 font-serif text-[38px] leading-[1.08] font-medium tracking-[-0.02em] text-foreground max-md:text-[30px]">
            Thư viện riêng của bạn
          </h1>
          <p className="mt-3 max-w-[28ch] text-[15px] leading-[1.6] text-muted-foreground max-md:text-sm">
            Lưu và đồng bộ danh sách bài hát trên mọi thiết bị.
          </p>

          <Button
            type="button"
            onClick={() => void onSignIn()}
            disabled={isSigningIn}
            aria-busy={isSigningIn}
            className="mt-7 h-11 w-full gap-2 bg-ink-action text-[13px] font-semibold text-ink-action-foreground hover:bg-ink-action-hover"
          >
            {isSigningIn ? (
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

          {error ? <ErrorAlert message={error} className="mt-3" /> : null}

          <p className="mt-3.5 text-xs leading-[1.5] text-muted-foreground">
            Chỉ bạn thấy thư viện của mình.
          </p>
        </section>
      </div>
    </main>
  )
}
