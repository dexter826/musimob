import { useEffect, useState, type MouseEvent } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
          : 'Không xoá được bài. Thử lại.',
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá bài này?</AlertDialogTitle>
          <AlertDialogDescription>
            {song
              ? `“${song.title}” sẽ bị xoá khỏi thư viện. Bạn có thể hoàn tác ngay sau đó.`
              : ''}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error ? (
          <Alert
            variant="destructive"
            className="border-destructive/30 bg-destructive/10"
          >
            <AlertDescription className="text-[12.5px] leading-[1.5]">
              {error}
            </AlertDescription>
          </Alert>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting || !song}
            onClick={handleConfirm}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang xoá…
              </>
            ) : (
              'Xoá'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
