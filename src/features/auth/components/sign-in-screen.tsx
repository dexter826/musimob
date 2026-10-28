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
    <main className="auth-stage relative flex min-h-dvh w-full flex-col overflow-clip bg-canvas lg:flex-row">
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8 sm:px-8 lg:px-12 lg:pt-8 xl:px-16">
        <Wordmark />

        <div className="flex flex-1 items-center py-10 lg:py-0">
          <h1 className="max-w-[900px] text-[29px] leading-[1.04] font-semibold tracking-[-0.03em] min-[360px]:text-[34px] sm:text-[44px] lg:text-[clamp(52px,5vw,88px)]">
            Danh sách bài hát của bạn
          </h1>
        </div>
      </div>

      <section className="border-t border-line bg-surface px-6 py-10 sm:px-8 lg:flex lg:w-[clamp(380px,32vw,520px)] lg:shrink-0 lg:flex-col lg:justify-center lg:border-t-0 lg:border-l lg:px-12 lg:py-16 xl:px-14">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
          Đăng nhập
        </h2>

        <button
          type="button"
          onClick={() => void onSignIn()}
          disabled={isSigningIn}
          aria-busy={isSigningIn}
          className="mt-6 w-full rounded-full bg-accent px-5 py-3.5 text-[14px] font-semibold text-accent-ink hover:bg-accent/90 active:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
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
      </section>
    </main>
  )
}
