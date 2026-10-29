import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const initial = displayName.trim().charAt(0).toUpperCase() || 'B'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`Mở tài khoản của ${displayName}`}
            className="grid size-11 place-items-center rounded-full transition-opacity active:opacity-80 disabled:opacity-50"
          >
            <Avatar className="size-8 border border-control-border">
              {photoURL ? <AvatarImage src={photoURL} alt="" /> : null}
              <AvatarFallback className="bg-surface-2 text-xs font-semibold text-foreground">
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
            onSelect={() => setIsConfirmOpen(true)}
            className="py-2.5 text-[13px] font-medium"
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đăng xuất?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ rời khỏi tài khoản này. Thư viện bài hát vẫn được giữ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={() => void onSignOut()}>
              Đăng xuất
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
