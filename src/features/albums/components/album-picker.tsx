import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { cn } from 'cn'
import { ErrorAlert } from '@/components/error-alert'
import { ResponsivePanel } from '@/components/responsive-panel'
import { SelectionCheckbox } from '@/components/selection-checkbox'
import { SongCover } from '@/components/song-cover'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { Album, Song } from '@/lib/api/types'
import type { AlbumsStatus } from '../hooks/use-albums'
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
}

export function AlbumPicker({
  open,
  onOpenChange,
  ...props
}: AlbumPickerProps) {
  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Thêm vào album"
      description="Chọn album để thêm những bài đã chọn."
    >
      {open ? (
        <AlbumPickerContent {...props} onClose={() => onOpenChange(false)} />
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
  onClose,
}: Omit<AlbumPickerProps, 'open' | 'onOpenChange'> & { onClose: () => void }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const songsById = useMemo(() => getSongsById(songs), [songs])
  const albumIds = new Set(albums.map((album) => album.id))
  const selectedAlbumIds = [...selectedIds].filter((id) => albumIds.has(id))

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
    if (isSaving || selectedAlbumIds.length === 0 || status.state !== 'ready')
      return
    setIsSaving(true)
    setError(null)
    try {
      await onAdd(selectedAlbumIds)
      onClose()
    } catch (addError) {
      setError(
        addError instanceof Error
          ? addError.message
          : 'Không thêm được bài vào album. Thử lại.',
      )
    } finally {
      setIsSaving(false)
    }
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
                <Button asChild className="mt-6 h-11">
                  <Link to="/albums" onClick={onClose}>
                    Về trang Album
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {albums.map((album) => {
                  const albumSongs = getAlbumSongs(album, songsById)
                  const isSelected = selectedAlbumIds.includes(album.id)
                  return (
                    <li
                      key={album.id}
                      onClick={() => toggleAlbum(album.id)}
                      className={cn(
                        'flex min-h-16 items-center gap-3 rounded-lg py-2 pr-2 hover:bg-secondary',
                        isSelected && 'bg-secondary ring-1 ring-primary/40',
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
