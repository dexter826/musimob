import { Wordmark } from '@/components/wordmark'
import { AvatarMenu } from '@/features/auth/components/avatar-menu'

type AppHeaderProps = {
  songCount: number
  displayName: string
  onSignOut: () => Promise<void>
}

export function AppHeader({
  songCount,
  displayName,
  onSignOut,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 sm:px-8 lg:px-10 lg:pt-7">
      <div>
        <Wordmark />
        <p className="mt-1 text-[12px] text-muted">
          {songCount} bài, đồng bộ qua Google
        </p>
      </div>
      <AvatarMenu displayName={displayName} onSignOut={onSignOut} />
    </header>
  )
}
