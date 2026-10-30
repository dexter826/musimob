import { Wordmark } from '@/components/wordmark'
import { AvatarMenu } from '@/features/auth/components/avatar-menu'
import { ViewToggle } from '@/features/songs/components/view-toggle'
import type { ViewMode } from '@/features/songs/hooks/use-view-mode'
import { ThemeToggle } from './theme-toggle'

type AppHeaderProps = {
  displayName: string
  photoURL: string | null
  viewMode: ViewMode
  onToggleView: () => void
  onSignOut: () => Promise<void>
}

export function AppHeader({
  displayName,
  photoURL,
  viewMode,
  onToggleView,
  onSignOut,
}: AppHeaderProps) {
  return (
    <header className="flex h-[60px] items-center justify-between gap-3 md:h-16">
      <Wordmark />
      <div className="flex shrink-0 items-center gap-3">
        <ViewToggle viewMode={viewMode} onToggle={onToggleView} />
        <ThemeToggle />
        <AvatarMenu
          displayName={displayName}
          photoURL={photoURL}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  )
}
