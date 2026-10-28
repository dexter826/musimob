import { Wordmark } from '@/components/wordmark'

type SignInScreenProps = {
  isSigningIn: boolean
  error: string | null
  onSignIn: () => Promise<void>
}

export function SignInScreen({
  isSigningIn,
  error,
  onSignIn,
}: SignInScreenProps) {
  return (
    <main className="auth-stage relative flex min-h-dvh w-full flex-col overflow-clip bg-canvas px-6 pt-6 pb-8 sm:px-8 lg:px-12 lg:pt-8 xl:px-16">
      <Wordmark />

      <div className="flex flex-1 flex-col justify-center pb-10 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center lg:gap-16 xl:gap-24">
          <div>
            <h1 className="max-w-[900px] text-[29px] leading-[1.04] font-semibold tracking-[-0.045em] min-[360px]:text-[34px] sm:text-[44px] lg:text-[clamp(48px,4.5vw,76px)]">
              Đăng nhập vào Musimob
            </h1>
            <p className="mt-4 max-w-[360px] text-[14px] leading-[1.6] text-muted sm:max-w-[420px] lg:mt-6 lg:text-[16px]">
              Danh sách bài hát của bạn được đồng bộ trên mọi thiết bị.
            </p>
          </div>

          <div className="mt-9 w-full sm:max-w-[400px] lg:mt-0 lg:max-w-none">
            <button
              type="button"
              onClick={() => void onSignIn()}
              disabled={isSigningIn}
              aria-busy={isSigningIn}
              className="w-full rounded-full bg-accent px-5 py-3.5 text-[14px] font-semibold text-accent-ink hover:bg-accent/90 active:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningIn ? 'Đang đăng nhập…' : 'Tiếp tục với Google'}
            </button>

            {error ? (
              <p
                role="alert"
                className="mt-3 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-[12.5px] leading-[1.5] text-danger"
              >
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
