import { Wordmark } from '@/components/wordmark'

export function AppLoading() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-canvas px-6 pt-6 pb-8 sm:px-8 lg:px-12 lg:pt-8 xl:px-16">
      <Wordmark />
      <p
        role="status"
        className="flex flex-1 items-center justify-center pb-16 text-[12px] text-muted"
      >
        Đang kiểm tra tài khoản…
      </p>
    </div>
  )
}
