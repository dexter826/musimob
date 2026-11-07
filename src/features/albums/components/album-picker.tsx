import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { ErrorAlert } from '@/components/error-alert'
import { ResponsivePanel } from '@/components/responsive-panel'
import { SelectionCheckbox } from '@/components/selection-checkbox'
import { SongCover } from '@/components/song-cover'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { Album, Song } from '@/lib/api/types'
import type { AlbumsStatus } from '../hooks/use-albums'
import { AlbumNameForm } from './album-name-form'
import {
  getAlbumCoverUrl,
  getAlbumSongs,
  getSongsById,
} from '../lib/album-songs'

type AlbumPickerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  albums: Album[]
  songs: Song[]
  status: AlbumsStatus
  onRetry: () => void
  onAdd: (albumIds: string[]) => Promise<void>
  onAdded: () => void
  onCreate: (name: string) => Promise<string>
}

export function AlbumPicker({
  open,
  onOpenChange,
  ...props
}: AlbumPickerProps) {
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (!open) setIsCreating(false)
  }, [open])

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title={isCreating ? 'Tạo album' : 'Thêm vào album'}
      description={
        isCreating
          ? 'Đặt tên cho album mới.'
          : 'Chọn album để thêm những bài đã chọn.'
      }
      onBack={isCreating ? () => setIsCreating(false) : undefined}
      backLabel="Quay lại danh sách album"
    >
      {open ? (
        <AlbumPickerContent
          {...props}
          isCreating={isCreating}
          onCreatingChange={setIsCreating}
          onClose={() => onOpenChange(false)}
        />
      ) : null}
    </ResponsivePanel>
  )
}

function AlbumPickerContent({
  albums,
  songs,
  status,
  onRetry,
  onAdd,
  onAdded,
  onClose,
  onCreate,
  isCreating,
  onCreatingChange,
}: Omit<AlbumPickerProps, 'open' | 'onOpenChange'> & {
  onClose: () => void
  isCreating: boolean
  onCreatingChange: (creating: boolean) => void
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingCreatedId, setPendingCreatedId] = useState<string | null>(null)
  const createButtonRef = useRef<HTMLButtonElement>(null)
  const isActive = useRef(true)
  const songsById = useMemo(() => getSongsById(songs), [songs])
  const albumIds = new Set(albums.map((album) => album.id))
  const selectedAlbumIds = [...selectedIds].filter((id) => albumIds.has(id))
  const isWaitingForAlbum =
    pendingCreatedId !== null && !albumIds.has(pendingCreatedId)

  useEffect(() => {
    isActive.current = true
    return () => {
      isActive.current = false
    }
  }, [])

  useEffect(() => {
    if (
      pendingCreatedId &&
      albums.some((album) => album.id === pendingCreatedId)
    ) {
      setPendingCreatedId(null)
    }
  }, [albums, pendingCreatedId])

  useEffect(() => {
    if (!isCreating) createButtonRef.current?.focus()
  }, [isCreating])

  async function handleCreate(name: string) {
    const id = await onCreate(name)
    toast.success('Đã tạo album', { description: name })
    if (!isActive.current) return
    setSelectedIds((current) => new Set(current).add(id))
    setPendingCreatedId(id)
    setError(null)
    onCreatingChange(false)
  }

  function toggleAlbum(id: string) {
    if (isSaving) return
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleAdd() {
    if (
      isSaving ||
      isWaitingForAlbum ||
      selectedAlbumIds.length === 0 ||
      status.state !== 'ready'
    )
      return
    setIsSaving(true)
    setError(null)
    try {
      await onAdd(selectedAlbumIds)
      if (!isActive.current) return
      onAdded()
      onClose()
    } catch (addError) {
      if (!isActive.current) return
      setError(
        addError instanceof Error
          ? addError.message
          : 'Không thêm được bài vào album. Thử lại.',
      )
    } finally {
      if (isActive.current) setIsSaving(false)
    }
  }

  if (isCreating) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <AlbumNameForm
          albums={albums}
          submitLabel="Tạo album"
          pendingLabel="Đang tạo…"
          fallbackErrorMessage="Không tạo được album. Thử lại."
          autoFocus
          onSubmit={handleCreate}
        />
      </div>
    )
  }

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-3">
        {status.state === 'loading' ? (
          <p
            role="status"
            className="py-8 text-center text-sm text-muted-foreground"
          >
            Đang tải danh sách album…
          </p>
        ) : status.state === 'failed' ? (
          <ErrorAlert message={status.message} onRetry={onRetry} />
        ) : (
          <>
            {status.warning ? (
              <ErrorAlert
                message={status.warning}
                onRetry={onRetry}
                className="mb-3"
              />
            ) : null}
            {albums.length === 0 ? (
              <div className="py-8 text-center">
                <h2 className="font-serif text-[24px] leading-[1.2] font-medium">
                  Chưa có album nào
                </h2>
                <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                  Tạo album trước khi thêm bài đã chọn.
                </p>
                <Button
                  ref={createButtonRef}
                  type="button"
                  onClick={() => onCreatingChange(true)}
                  disabled={isWaitingForAlbum || isSaving}
                  className="mt-6 h-11"
                >
                  Tạo album mới
                </Button>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                <li>
                  <Button
                    ref={createButtonRef}
                    type="button"
                    variant="ghost"
                    onClick={() => onCreatingChange(true)}
                    disabled={isSaving || isWaitingForAlbum}
                    className="mb-2 h-11 w-full justify-start gap-2 text-[13px] font-semibold"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                    Tạo album mới
                  </Button>
                </li>
                {albums.map((album) => {
                  const albumSongs = getAlbumSongs(album, songsById)
                  const isSelected = selectedAlbumIds.includes(album.id)
                  return (
                    <li
                      key={album.id}
                      onClick={() => toggleAlbum(album.id)}
                      className={cn(
                        'flex min-h-16 items-center gap-3 rounded-lg py-2 pr-2 hover:bg-secondary',
                        isSelected && 'bg-secondary ring-1 ring-control-border',
                      )}
                    >
                      <SelectionCheckbox
                        label={`Chọn album ${album.name}`}
                        checked={isSelected}
                        disabled={isSaving}
                        onChange={() => toggleAlbum(album.id)}
                      />
                      <SongCover
                        src={getAlbumCoverUrl(albumSongs)}
                        className="size-12"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-[14.5px] leading-[1.35] font-semibold break-words">
                          {album.name}
                        </p>
                        <p className="text-xs leading-[1.4] text-muted-foreground tabular-nums">
                          {albumSongs.length} bài
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </div>
      <div className="shrink-0 border-t border-rule px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        {isWaitingForAlbum ? (
          <p
            role="status"
            className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Spinner aria-hidden="true" className="size-4" />
            Đang tải album vừa tạo…
          </p>
        ) : null}
        {error ? <ErrorAlert message={error} className="mb-3" /> : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            aria-live="polite"
            className="text-xs font-medium text-muted-foreground tabular-nums"
          >
            Đã chọn {selectedAlbumIds.length} album
          </p>
          <Button
            type="button"
            disabled={
              isSaving ||
              isWaitingForAlbum ||
              selectedAlbumIds.length === 0 ||
              status.state !== 'ready'
            }
            aria-busy={isSaving}
            onClick={() => void handleAdd()}
            className="h-11 gap-2 text-[13px] font-semibold"
          >
            {isSaving ? (
              <>
                <Spinner aria-hidden="true" className="size-4" />
                Đang thêm…
              </>
            ) : (
              'Thêm vào album'
            )}
          </Button>
        </div>
      </div>
    </>
  )
}
