import { Wordmark } from '@/components/wordmark'
import { AvatarMenu } from '@/features/auth/components/avatar-menu'

type AppHeaderProps = {
  songCount: number | null
  hasError: boolean
  displayName: string
  onSignOut: () => Promise<void>
}

export function AppHeader({
  songCount,
  hasError,
  displayName,
  onSignOut,
}: AppHeaderProps) {
  const countLabel = hasError
    ? 'Không tải được'
    : songCount === null
      ? 'Đang tải…'
      : `${songCount} bài`

  return (
    <header className="flex items-center justify-between gap-3 px-6 pt-5 pb-3 sm:px-8 lg:px-12 lg:pt-7 xl:px-16">
      <div>
        <Wordmark />
        <p className="mt-1 text-[12px] text-muted-foreground">{countLabel}</p>
      </div>
      <AvatarMenu displayName={displayName} onSignOut={onSignOut} />
    </header>
  )
}
