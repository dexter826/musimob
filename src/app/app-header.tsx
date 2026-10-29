import { Wordmark } from '@/components/wordmark'
import { AvatarMenu } from '@/features/auth/components/avatar-menu'
import { ViewToggle } from '@/features/songs/components/view-toggle'
import type { SongsStatus } from '@/features/songs/hooks/use-songs'
import type { ViewMode } from '@/features/songs/hooks/use-view-mode'

type AppHeaderProps = {
  status: SongsStatus
  songCount: number
  displayName: string
  photoURL: string | null
  viewMode: ViewMode
  onToggleView: () => void
  onSignOut: () => Promise<void>
}

function getCountLabel(status: SongsStatus, songCount: number): string {
  if (status.state === 'loading') return 'Đang tải…'
  if (status.state === 'failed') return 'Không tải được'

  return `${songCount} bài`
}

export function AppHeader({
  status,
  songCount,
  displayName,
  photoURL,
  viewMode,
  onToggleView,
  onSignOut,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-6 pt-5 pb-3 sm:px-8 lg:px-12 lg:pt-7 xl:px-16">
      <div>
        <Wordmark />
        <p className="mt-1 text-[12px] text-muted-foreground">
          {getCountLabel(status, songCount)}
        </p>
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
