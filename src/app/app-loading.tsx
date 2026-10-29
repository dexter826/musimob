import { Spinner } from '@/components/ui/spinner'
import { Wordmark } from '@/components/wordmark'

export function AppLoading() {
  return (
    <div className="min-h-dvh bg-background px-5 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1120px] flex-col">
        <div className="flex h-[60px] items-center md:h-16">
          <Wordmark />
        </div>
        <p
          role="status"
          className="flex flex-1 items-center justify-center gap-2 pb-16 text-sm text-muted-foreground"
        >
          <Spinner className="size-3.5" aria-label="Đang tải" />
          Đang tải…
        </p>
      </div>
    </div>
  )
}
