import { PageShell } from '@/components/page-shell'
import { Spinner } from '@/components/ui/spinner'
import { Wordmark } from '@/components/wordmark'

export function AppLoading() {
  return (
    <PageShell>
      <div className="flex h-[60px] items-center md:h-16">
        <Wordmark />
      </div>
      <p
        role="status"
        className="flex flex-1 items-center justify-center gap-2 pb-16 text-sm text-muted-foreground"
      >
        <Spinner aria-hidden="true" className="size-3.5" />
        Đang tải…
      </p>
    </PageShell>
  )
}
