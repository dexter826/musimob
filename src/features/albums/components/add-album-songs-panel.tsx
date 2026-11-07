import { useEffect, useId, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ErrorAlert } from '@/components/error-alert'
import { ResponsivePanel } from '@/components/responsive-panel'
import { SearchField } from '@/components/search-field'
import { SelectionCheckbox } from '@/components/selection-checkbox'
import { SongRowView } from '@/components/song-row-view'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { Album, Song } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'

type AddAlbumSongsPanelProps = {
  album: Album
  songs: Song[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (songIds: string[]) => Promise<void>
  warning: string | null
  onRetry: () => void
}

export function AddAlbumSongsPanel({
  open,
  onOpenChange,
  ...props
}: AddAlbumSongsPanelProps) {
  const { stop } = useAudioPreview()

  useEffect(() => {
    if (open) stop()
    return () => stop()
  }, [open, stop])

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={onOpenChange}
      title="Thêm bài vào album"
      description="Chọn bài đã lưu chưa có trong album."
    >
      {open ? (
        <AddAlbumSongsContent {...props} onClose={() => onOpenChange(false)} />
      ) : null}
    </ResponsivePanel>
  )
}

function AddAlbumSongsContent({
  album,
  songs,
  onAdd,
  onClose,
  warning,
  onRetry,
}: Omit<AddAlbumSongsPanelProps, 'open' | 'onOpenChange'> & {
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { stop } = useAudioPreview()
  const searchId = useId()
  const availableSongs = useMemo(() => {
    const existingIds = new Set(album.songIds)
    return songs.filter((song) => !existingIds.has(song.id))
  }, [album.songIds, songs])
  const availableIds = useMemo(
    () => new Set(availableSongs.map((song) => song.id)),
    [availableSongs],
  )
  const selectedSongIds = [...selectedIds].filter((id) => availableIds.has(id))
  const normalizedQuery = query.trim().toLowerCase()
  const filteredSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(normalizedQuery) ||
      song.artist.toLowerCase().includes(normalizedQuery),
  )

  useEffect(() => {
    if (isSaving || error) return
    setSelectedIds((current) => {
      const next = new Set([...current].filter((id) => availableIds.has(id)))
      return next.size === current.size ? current : next
    })
  }, [availableIds, isSaving, error])

  function toggleSong(id: string) {
    if (isSaving) return
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function changeQuery(value: string) {
    stop()
    setQuery(value)
  }

  async function handleAdd() {
    if (isSaving || selectedSongIds.length === 0) return
    setIsSaving(true)
    setError(null)
    try {
      await onAdd(selectedSongIds)
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

  if (availableSongs.length === 0 && !isSaving && !error) {
    const isLibraryEmpty = songs.length === 0
    return (
      <div className="flex flex-col items-center px-5 py-12 text-center">
        {warning ? (
          <ErrorAlert
            message={warning}
            onRetry={onRetry}
            className="mb-3 text-left"
          />
        ) : null}
        <h2 className="font-serif text-[24px] leading-[1.2] font-medium">
          {isLibraryEmpty
            ? 'Thư viện chưa có bài nào'
            : 'Tất cả bài đã có trong album'}
        </h2>
        <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
          {isLibraryEmpty
            ? 'Thêm bài vào Thư viện trước khi chọn cho album.'
            : 'Bài mới lưu sẽ xuất hiện ở đây.'}
        </p>
        {isLibraryEmpty ? (
          <Button asChild className="mt-6 h-11">
            <Link to="/" onClick={onClose}>
              Về Thư viện
            </Link>
          </Button>
        ) : (
          <Button type="button" onClick={onClose} className="mt-6 h-11">
            Đóng
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="shrink-0 px-5 pt-4 pb-3">
        {warning ? (
          <ErrorAlert message={warning} onRetry={onRetry} className="mb-3" />
        ) : null}
        <SearchField
          id={searchId}
          name="album-song-filter"
          value={query}
          onChange={changeQuery}
          showClear
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-3">
        {filteredSongs.length === 0 && isSaving ? (
          <p
            role="status"
            className="px-3 py-12 text-center text-sm text-muted-foreground"
          >
            Đang thêm bài vào album…
          </p>
        ) : filteredSongs.length === 0 ? (
          <div className="px-3 py-12 text-center">
            <h2 className="font-serif text-xl font-medium">
              Không có bài nào khớp.
            </h2>
            <Button
              type="button"
              variant="ghost"
              onClick={() => changeQuery('')}
              className="mt-4 h-11"
            >
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {filteredSongs.map((song, index) => (
              <SongRowView
                key={song.id}
                song={song}
                isFirst={index === 0}
                isSelected={selectedIds.has(song.id)}
                onActivate={() => toggleSong(song.id)}
                leading={
                  <SelectionCheckbox
                    label={`Chọn ${song.title}`}
                    checked={selectedIds.has(song.id)}
                    disabled={isSaving}
                    onChange={() => toggleSong(song.id)}
                  />
                }
              />
            ))}
          </ul>
        )}
      </div>
      <div className="shrink-0 border-t border-rule px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        {error ? <ErrorAlert message={error} className="mb-3" /> : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            aria-live="polite"
            className="text-xs font-medium text-muted-foreground tabular-nums"
          >
            Đã chọn {isSaving ? selectedIds.size : selectedSongIds.length} bài
          </p>
          <Button
            type="button"
            disabled={isSaving || selectedSongIds.length === 0}
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
