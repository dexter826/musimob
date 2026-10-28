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
    <main className="mx-auto flex min-h-dvh w-full max-w-[1120px] flex-col bg-canvas px-6 pt-6 pb-8 sm:px-8 lg:px-10 lg:pt-8">
      <Wordmark />

      <div className="flex flex-1 flex-col justify-center pb-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:pb-16">
        <div>
          <h1 className="max-w-[620px] text-[29px] leading-[1.06] font-semibold tracking-[-0.045em] min-[360px]:text-[34px] sm:text-[40px] lg:text-[52px] xl:text-[60px]">
            Chọn bài trước.
            <br />
            Vào quán khỏi nghĩ.
          </h1>
          <p className="mt-4 max-w-[300px] text-[14px] leading-[1.6] text-muted sm:max-w-[360px] lg:mt-5 lg:max-w-[420px] lg:text-[16px]">
            Đăng nhập để danh sách bài hát theo bạn trên mọi thiết bị.
          </p>
        </div>

        <div className="mt-9 w-full sm:mx-auto sm:max-w-[360px] lg:mt-0 lg:flex lg:max-w-none lg:flex-col lg:justify-center lg:self-stretch lg:border-l lg:border-line lg:pl-12">
          <button
            type="button"
            onClick={() => void onSignIn()}
            disabled={isSigningIn}
            aria-busy={isSigningIn}
            className="w-full rounded-full bg-accent px-5 py-3.5 text-[14px] font-semibold text-accent-ink hover:bg-accent/90 active:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningIn ? 'Đang mở Google…' : 'Đăng nhập bằng Google'}
          </button>

          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-3 text-[12.5px] leading-[1.5] text-danger"
            >
              {error}
            </p>
          ) : null}

          <p className="mt-3 text-center text-[12px] leading-[1.5] text-muted lg:text-left">
            Chỉ để đồng bộ danh sách. Không đăng bài, không nhắn tin.
          </p>
        </div>
      </div>
    </main>
  )
}
