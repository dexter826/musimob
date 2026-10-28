import { Spinner } from '@/components/ui/spinner'
import { Wordmark } from '@/components/wordmark'

export function AppLoading() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-background px-6 pt-6 pb-8 sm:px-8 lg:px-12 lg:pt-8 xl:px-16">
      <Wordmark />
      <p
        role="status"
        className="flex flex-1 items-center justify-center gap-2 pb-16 text-[12px] text-muted-foreground"
      >
        <Spinner className="size-3.5" aria-label="Đang tải" />
        Đang tải…
      </p>
    </div>
  )
}
