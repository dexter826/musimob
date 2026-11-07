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
import type { Album } from '@/lib/api/types'

type DeleteAlbumConfirmProps = {
  album: Album | null
  onClose: () => void
  onConfirm: (album: Album) => Promise<void>
}

export function DeleteAlbumConfirm({
  album,
  onClose,
  onConfirm,
}: DeleteAlbumConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!album) setError(null)
  }, [album])

  async function handleConfirm(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!album || isDeleting) return
    setIsDeleting(true)
    setError(null)
    try {
      await onConfirm(album)
      onClose()
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Không xóa được album. Thử lại.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog
      open={Boolean(album)}
      onOpenChange={(open) => {
        if (!open && !isDeleting) onClose()
      }}
    >
      <AlertDialogContent className="rounded-xl border border-rule bg-surface shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-[18px] leading-[1.2] font-medium">
            Xóa album?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-[1.6] break-words text-muted-foreground">
            {album
              ? `Album “${album.name}” và danh sách bài trong album sẽ bị xóa. Bài hát vẫn còn trong Thư viện. Hành động này không thể hoàn tác.`
              : ''}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? <ErrorAlert message={error} /> : null}
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-11 rounded-lg border-0 bg-transparent px-4 text-[13px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Giữ lại
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting || !album}
            aria-busy={isDeleting}
            onClick={handleConfirm}
            className="h-11 gap-2 rounded-lg px-4 text-[13px] font-semibold"
          >
            {isDeleting ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang xóa…
              </>
            ) : (
              'Xóa album'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
