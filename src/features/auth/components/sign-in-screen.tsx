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
    <main className="auth-stage flex min-h-dvh w-full items-center justify-center bg-canvas px-6 py-12">
      <section className="w-full max-w-[440px] rounded-2xl border border-line bg-surface p-7 sm:p-10">
        <Wordmark />

        <h1 className="mt-7 text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[30px]">
          Đăng nhập
        </h1>

        <button
          type="button"
          onClick={() => void onSignIn()}
          disabled={isSigningIn}
          aria-busy={isSigningIn}
          className="mt-7 w-full rounded-full bg-accent px-5 py-3.5 text-[14px] font-semibold text-accent-ink hover:bg-accent/90 active:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
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
