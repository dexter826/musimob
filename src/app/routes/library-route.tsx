import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { ErrorAlert } from '@/components/error-alert'
import { useDocumentTitle } from '@/hooks/use-document-title'
import {
  getCountLabel,
  getSavedSortOption,
  LibrarySelectionBar,
  LibraryToolbar,
  ManualAddSheet,
  SongList,
  sortSongs,
  SORT_STORAGE_KEY,
  type LibrarySortOption,
  type NewSong,
  type Song,
} from '@/features/songs'
import { AlbumPicker } from '@/features/albums'
import { songPreviewKey, useAudioPreview } from '@/features/audio-preview'
import { useAppOutletContext } from '../app-outlet-context'

const SONGS_TITLE = 'MusiMOB: Thư viện'

export function LibraryRoute() {
  const { authError, viewMode, songsState, albumsState } = useAppOutletContext()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [sortOption, setSortOption] =
    useState<LibrarySortOption>(getSavedSortOption)
  const [flashId, setFlashId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string> | null>(null)
  const [isAlbumPickerOpen, setIsAlbumPickerOpen] = useState(false)
  const selectionToggleRef = useRef<HTMLButtonElement>(null)
  const addToAlbumRef = useRef<HTMLButtonElement>(null)
  const wasSelecting = useRef(false)
  const wasAlbumPickerOpen = useRef(false)
  const { activeKey, stop } = useAudioPreview()
  const { songs, status, retry, addSong, restoreSong, updateSong, removeSong } =
    songsState

  useDocumentTitle(SONGS_TITLE)

  function handleSortChange(next: LibrarySortOption) {
    setSortOption(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(SORT_STORAGE_KEY, next)
    }
  }

  const songIds = useMemo(() => new Set(songs.map((song) => song.id)), [songs])
  const selectedSongIds = selectedIds
    ? [...selectedIds].filter((id) => songIds.has(id))
    : []
  const isSelecting = selectedIds !== null

  useEffect(() => {
    if (status.state !== 'ready') return
    setSelectedIds((current) => {
      if (!current) return current
      const next = new Set([...current].filter((id) => songIds.has(id)))
      if (current.size > 0 && next.size === 0) return null
      return next.size === current.size ? current : next
    })
  }, [songIds, status.state])

  useEffect(() => {
    if (!isSelecting) setIsAlbumPickerOpen(false)
    if (wasSelecting.current && !isSelecting)
      selectionToggleRef.current?.focus()
    wasSelecting.current = isSelecting
  }, [isSelecting])

  useEffect(() => {
    if (wasAlbumPickerOpen.current && !isAlbumPickerOpen && isSelecting)
      addToAlbumRef.current?.focus()
    wasAlbumPickerOpen.current = isAlbumPickerOpen
  }, [isAlbumPickerOpen, isSelecting])

  useEffect(() => {
    if (!isSelecting || isAlbumPickerOpen) return
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      setSelectedIds(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isSelecting, isAlbumPickerOpen])

  function toggleSongSelection(id: string) {
    setSelectedIds((current) => {
      if (!current) return current
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleAddToAlbums(albumIds: string[]) {
    if (selectedSongIds.length === 0) return
    await albumsState.addSongs(albumIds, selectedSongIds)
    toast.success(
      albumIds.length === 1
        ? `Đã thêm ${selectedSongIds.length} bài vào album`
        : `Đã thêm ${selectedSongIds.length} bài vào ${albumIds.length} album`,
    )
  }

  useEffect(() => {
    if (!flashId) return

    const timer = window.setTimeout(() => setFlashId(null), 2000)
    return () => window.clearTimeout(timer)
  }, [flashId])

  function openManualAdd() {
    setIsAddOpen(true)
  }

  function handleFilterChange(value: string) {
    if (value !== filterQuery) stop()
    setFilterQuery(value)
  }

  async function handleManualAdd(song: NewSong) {
    const id = await addSong(song)
    toast.success('Đã lưu bài', { description: song.title })
    setFlashId(id)
  }

  async function undoDelete(song: Song) {
    const toastId = toast.loading('Đang khôi phục…', {
      description: song.title,
    })

    try {
      await restoreSong(song)
      setFlashId(song.id)
      toast.success('Đã khôi phục bài', {
        id: toastId,
        description: song.title,
      })
    } catch (restoreError) {
      toast.error('Không khôi phục được bài', {
        id: toastId,
        description:
          restoreError instanceof Error
            ? `${song.title} - ${restoreError.message}`
            : song.title,
        duration: 10000,
        action: {
          label: 'Thử lại',
          onClick: () => {
            void undoDelete(song)
          },
        },
      })
    }
  }

  async function handleRemove(song: Song) {
    if (activeKey === songPreviewKey(song.id)) stop()
    await removeSong(song.id)
    toast('Đã xóa bài', {
      description: song.title,
      duration: 10000,
      action: {
        label: 'Hoàn tác',
        onClick: () => {
          void undoDelete(song)
        },
      },
    })
  }

  const filteredSongs = useMemo(() => {
    const query = filterQuery.trim().toLowerCase()
    const matching = query
      ? songs.filter(
          (song) =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query),
        )
      : songs

    return sortSongs(matching, sortOption)
  }, [songs, filterQuery, sortOption])

  const isLibraryEmpty = status.state === 'ready' && songs.length === 0
  const isFiltering = filterQuery.trim().length > 0
  const countLabel = getCountLabel({
    status,
    total: songs.length,
    filtered: filteredSongs.length,
    isFiltering,
  })

  return (
    <>
      <div
        style={
          isSelecting
            ? {
                paddingBottom:
                  'calc(var(--library-selection-height, 0px) + 24px)',
              }
            : undefined
        }
        className={cn(
          'flex flex-1 flex-col',
          isLibraryEmpty ? 'pb-6' : 'pb-24 md:pb-10',
        )}
      >
        <LibraryToolbar
          countLabel={countLabel}
          filterQuery={filterQuery}
          onFilterChange={handleFilterChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onManualAdd={openManualAdd}
          isLibraryEmpty={isLibraryEmpty}
          isSelecting={isSelecting}
          selectionToggleRef={selectionToggleRef}
          onToggleSelection={() =>
            setSelectedIds((current) => (current ? null : new Set()))
          }
        />
        {authError ? <ErrorAlert message={authError} className="mb-3" /> : null}
        <SongList
          songs={filteredSongs}
          allSongs={songs}
          viewMode={viewMode}
          status={status}
          flashId={flashId}
          onAdd={openManualAdd}
          onRetry={retry}
          onClearFilter={() => handleFilterChange('')}
          onUpdate={updateSong}
          onRemove={handleRemove}
          selectedIds={selectedIds}
          onToggleSelection={toggleSongSelection}
        />
      </div>

      {isLibraryEmpty || isSelecting ? null : (
        <button
          type="button"
          aria-label="Nhập bài thủ công"
          title="Nhập bài thủ công"
          onClick={openManualAdd}
          className="bookmark-fab"
        >
          <Plus aria-hidden="true" className="size-[22px]" />
        </button>
      )}

      {isSelecting ? (
        <LibrarySelectionBar
          addButtonRef={addToAlbumRef}
          count={selectedSongIds.length}
          onClear={() => setSelectedIds(new Set())}
          onAdd={() => {
            stop()
            setIsAlbumPickerOpen(true)
          }}
        />
      ) : null}

      <AlbumPicker
        open={isSelecting && isAlbumPickerOpen && selectedSongIds.length > 0}
        onOpenChange={setIsAlbumPickerOpen}
        albums={albumsState.albums}
        songs={songs}
        status={albumsState.status}
        onRetry={albumsState.retry}
        onAdd={handleAddToAlbums}
        onAdded={() => setSelectedIds(null)}
        onCreate={albumsState.createAlbum}
      />

      <ManualAddSheet
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        songs={songs}
        onAddManual={handleManualAdd}
      />
    </>
  )
}
