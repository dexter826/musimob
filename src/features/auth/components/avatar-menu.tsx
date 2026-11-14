import { useState, type MouseEvent } from 'react'
import { toast } from 'sonner'
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
import { Spinner } from '@/components/ui/spinner'
import { AddPasswordDialog } from './add-password-dialog'

type AvatarMenuProps = {
  displayName: string
  photoURL: string | null
  email: string | null
  hasPassword: boolean
  onAddPassword: (password: string) => Promise<void>
  onSignOut: () => Promise<void>
}

export function AvatarMenu({
  displayName,
  photoURL,
  email,
  hasPassword,
  onAddPassword,
  onSignOut,
}: AvatarMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const initial = displayName.trim().charAt(0).toUpperCase() || 'B'
  const canAddPassword = Boolean(email) && !hasPassword

  async function handleSignOut(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (isSigningOut) return

    setIsSigningOut(true)

    try {
      await onSignOut()
      setIsConfirmOpen(false)
    } finally {
      setIsSigningOut(false)
    }
  }

  async function handleAddPassword(password: string) {
    await onAddPassword(password)
    toast.success('Đã thêm mật khẩu', {
      description: 'Hãy đăng nhập bằng email và mật khẩu.',
    })
  }

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

        <DropdownMenuContent
          align="end"
          className="w-60 rounded-lg border border-rule bg-popover p-1"
        >
          <DropdownMenuLabel className="flex flex-col gap-0.5 text-xs font-normal text-muted-foreground">
            <span className="truncate text-foreground">{displayName}</span>
            {email ? <span className="truncate">{email}</span> : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {canAddPassword ? (
            <DropdownMenuItem
              onSelect={() => setIsPasswordOpen(true)}
              className="min-h-11 py-2 text-sm font-medium"
            >
              Thêm mật khẩu
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            onSelect={() => setIsConfirmOpen(true)}
            className="min-h-11 py-2 text-sm font-medium"
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {canAddPassword ? (
        <AddPasswordDialog
          open={isPasswordOpen}
          email={email ?? ''}
          onOpenChange={setIsPasswordOpen}
          onSubmit={handleAddPassword}
        />
      ) : null}

      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={(nextOpen) => {
          if (isSigningOut) return
          setIsConfirmOpen(nextOpen)
        }}
      >
        <AlertDialogContent className="rounded-xl border border-rule bg-surface shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-[18px] leading-[1.2] font-medium">
              Đăng xuất?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-[1.6] text-muted-foreground">
              Bạn sẽ rời khỏi tài khoản này. Thư viện bài hát vẫn được giữ.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSigningOut}
              className="h-11 rounded-lg border-0 bg-transparent px-4 text-[13px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isSigningOut}
              aria-busy={isSigningOut}
              onClick={handleSignOut}
              className="h-11 gap-2 rounded-lg px-4 text-[13px] font-semibold"
            >
              {isSigningOut ? (
                <>
                  <Spinner aria-hidden="true" className="size-4" />
                  Đang đăng xuất…
                </>
              ) : (
                'Đăng xuất'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
