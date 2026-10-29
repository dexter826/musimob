import { useEffect, useState, type MouseEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
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
import { Spinner } from '@/components/ui/spinner'
import type { Song } from '@/lib/api/types'

type DeleteConfirmProps = {
  song: Song | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (song: Song) => Promise<void>
}

export function DeleteConfirm({
  song,
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setIsDeleting(false)
      setError(null)
    }
  }, [open])

  async function handleConfirm(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (!song || isDeleting) return

    setIsDeleting(true)
    setError(null)

    try {
      await onConfirm(song)
      onOpenChange(false)
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Không xóa được bài. Thử lại.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isDeleting) return
        onOpenChange(nextOpen)
      }}
    >
      <AlertDialogContent className="rounded-xl border border-rule bg-surface shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-[18px] leading-[1.2] font-medium">
            Xóa bài này?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-[1.6] text-muted-foreground">
            {song
              ? `“${song.title}” sẽ bị xóa khỏi thư viện. Bạn có thể hoàn tác ngay sau đó.`
              : ''}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error ? <ErrorAlert message={error} /> : null}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-11 rounded-lg border-0 bg-transparent px-4 text-[13px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting || !song}
            onClick={handleConfirm}
            className="h-11 gap-2 rounded-lg px-4 text-[13px] font-semibold"
          >
            {isDeleting ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang xóa…
              </>
            ) : (
              'Xóa'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
