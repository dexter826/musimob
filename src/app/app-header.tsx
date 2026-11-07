import { Link, NavLink, useLocation } from 'react-router'
import { cn } from 'cn'
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

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'relative flex h-11 items-center px-2 text-sm font-medium whitespace-nowrap transition-colors duration-[160ms] md:px-3',
    isActive
      ? 'text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:bg-primary md:after:inset-x-3'
      : 'text-muted-foreground hover:text-foreground',
  )
}

export function AppHeader({
  displayName,
  photoURL,
  viewMode,
  onToggleView,
  onSignOut,
}: AppHeaderProps) {
  const { pathname } = useLocation()
  const showViewToggle = pathname === '/'

  return (
    <header className="flex h-[60px] items-center gap-2 md:h-16 md:gap-3">
      <div className="flex min-w-0 items-center gap-1 md:gap-5">
        <Link
          to="/"
          aria-label="MusiMOB – về Thư viện"
          className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg"
        >
          <Wordmark compactOnMobile />
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center">
          <NavLink to="/" end className={navLinkClassName}>
            Thư viện
          </NavLink>
          <NavLink to="/albums" className={navLinkClassName}>
            Album
          </NavLink>
        </nav>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-3">
        {showViewToggle ? (
          <ViewToggle viewMode={viewMode} onToggle={onToggleView} />
        ) : null}
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
