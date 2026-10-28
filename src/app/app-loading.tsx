import { Wordmark } from '@/components/wordmark'

export function AppLoading() {
  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-[1120px] place-items-center bg-canvas">
      <div className="text-center">
        <Wordmark />
        <p role="status" className="mt-2 text-[12px] text-muted">
          Đang kiểm tra tài khoản…
        </p>
      </div>
    </div>
  )
}
