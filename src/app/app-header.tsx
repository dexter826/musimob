import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  showAdd: boolean
  onAdd: () => void
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
  showAdd,
  onAdd,
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
        {showAdd ? (
          <Button
            type="button"
            onClick={onAdd}
            className="hidden h-9 gap-1.5 px-3 text-[12.5px] font-semibold lg:inline-flex"
          >
            <Plus aria-hidden="true" />
            Thêm bài
          </Button>
        ) : null}
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
