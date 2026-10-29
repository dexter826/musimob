import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type AvatarMenuProps = {
  displayName: string
  photoURL: string | null
  onSignOut: () => Promise<void>
}

export function AvatarMenu({
  displayName,
  photoURL,
  onSignOut,
}: AvatarMenuProps) {
  const initial = displayName.trim().charAt(0).toUpperCase() || 'B'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Mở tài khoản của ${displayName}`}
          className="grid size-11 place-items-center rounded-full transition-opacity active:opacity-80 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Avatar className="size-9 after:border-primary-foreground/20">
            {photoURL ? <AvatarImage src={photoURL} alt="" /> : null}
            <AvatarFallback className="bg-primary text-[12px] font-bold text-primary-foreground">
              {initial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate text-[12px] font-normal text-muted-foreground">
          {displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => void onSignOut()}
          className="py-2.5 text-[13px] font-medium"
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
