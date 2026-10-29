import { Wordmark } from '@/components/wordmark'
import { AvatarMenu } from '@/features/auth/components/avatar-menu'
import { ViewToggle } from '@/features/songs/components/view-toggle'
import type { ViewMode } from '@/features/songs/hooks/use-view-mode'

type AppHeaderProps = {
  songCount: number | null
  hasError: boolean
  displayName: string
  photoURL: string | null
  viewMode: ViewMode
  onToggleView: () => void
  onSignOut: () => Promise<void>
}

export function AppHeader({
  songCount,
  hasError,
  displayName,
  photoURL,
  viewMode,
  onToggleView,
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
      <div className="flex shrink-0 items-center gap-2">
        <ViewToggle viewMode={viewMode} onToggle={onToggleView} />
        <AvatarMenu
          displayName={displayName}
          photoURL={photoURL}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  )
}
