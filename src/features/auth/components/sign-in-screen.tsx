import type { ComponentProps } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    <main className="auth-stage flex min-h-dvh w-full items-center justify-center bg-background px-5 py-6 sm:px-6 sm:py-10">
      <section className="relative flex min-h-[520px] w-full max-w-[560px] flex-col justify-between gap-12 overflow-clip rounded-lg border border-border bg-card p-6 sm:min-h-[560px] sm:p-9 lg:aspect-square lg:min-h-0 lg:p-11">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[320px] sm:-top-28 sm:-right-28 sm:size-[400px] lg:-top-32 lg:-right-32 lg:size-[460px]"
        >
          <svg viewBox="0 0 480 480" className="size-full">
            <g fill="none" stroke="var(--border)" strokeWidth="1">
              <circle cx="240" cy="240" r="236" opacity="0.55" />
              <circle cx="240" cy="240" r="206" opacity="0.45" />
              <circle cx="240" cy="240" r="176" opacity="0.38" />
              <circle cx="240" cy="240" r="146" opacity="0.32" />
              <circle cx="240" cy="240" r="118" opacity="0.28" />
            </g>
            <circle cx="240" cy="240" r="96" fill="var(--primary)" />
            <circle
              cx="240"
              cy="240"
              r="34"
              fill="none"
              stroke="var(--primary-foreground)"
              strokeOpacity="0.35"
            />
            <circle cx="240" cy="240" r="6" fill="var(--background)" />
          </svg>
        </div>

        <Wordmark className="relative text-[40px] leading-none tracking-[-0.04em] sm:text-[52px] lg:text-[64px]" />

        <div className="relative">
          <Separator />
          <div className="pt-6 lg:pt-7">
            <h1 className="text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[28px]">
              Đăng nhập
            </h1>

            <Button
              type="button"
              onClick={() => void onSignIn()}
              disabled={isSigningIn}
              aria-busy={isSigningIn}
              className="mt-5 h-12 w-full gap-2.5 text-[14px] font-semibold"
            >
              {isSigningIn ? (
                <>
                  <Spinner aria-hidden="true" className="size-4" />
                  Đang đăng nhập…
                </>
              ) : (
                <>
                  <span className="grid size-6 place-items-center rounded-full bg-white">
                    <GoogleIcon className="size-3.5" />
                  </span>
                  Tiếp tục với Google
                </>
              )}
            </Button>

            {error ? (
              <Alert
                variant="destructive"
                className="mt-3 border-destructive/30 bg-destructive/10 px-3.5 py-2.5"
              >
                <AlertDescription className="text-[12.5px] leading-[1.5]">
                  {error}
                </AlertDescription>
              </Alert>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}
