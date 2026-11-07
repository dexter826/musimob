import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { ErrorAlert } from '@/components/error-alert'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { AddSheet } from '@/features/add-song/components/add-sheet'
import { SongSearch } from '@/features/search-song/components/song-search'
import { LibraryToolbar } from '@/features/songs/components/library-toolbar'
import { SongList } from '@/features/songs/components/song-list'
import type { useSongs } from '@/features/songs/hooks/use-songs'
import type { ViewMode } from '@/features/songs/hooks/use-view-mode'
import { getCountLabel } from '@/features/songs/lib/count-label'
import type { NewSong, Song } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'

const SONGS_TITLE = 'MusiMOB: Thư viện'

type LibraryPageProps = {
  authError: string | null
  viewMode: ViewMode
  songsState: ReturnType<typeof useSongs>
}

export function LibraryPage({
  authError,
  viewMode,
  songsState,
}: LibraryPageProps) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addSeed, setAddSeed] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [flashId, setFlashId] = useState<string | null>(null)
  const { activeKey, stop } = useAudioPreview()
  const { songs, status, retry, addSong, restoreSong, updateSong, removeSong } =
    songsState

  useDocumentTitle(SONGS_TITLE)

  useEffect(() => {
    if (!flashId) return

    const timer = window.setTimeout(() => setFlashId(null), 2000)
    return () => window.clearTimeout(timer)
  }, [flashId])

  function openAdd(term = '') {
    setAddSeed(term)
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

  async function handleSearchAdd(song: NewSong) {
    await addSong(song)
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
    if (!query) return songs

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query),
    )
  }, [songs, filterQuery])

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
        className={cn(
          'flex flex-1 flex-col',
          isLibraryEmpty ? 'pb-6' : 'pb-24 md:pb-10',
        )}
      >
        <LibraryToolbar
          countLabel={countLabel}
          filterQuery={filterQuery}
          onFilterChange={handleFilterChange}
          onAdd={() => openAdd(filterQuery.trim())}
          isLibraryEmpty={isLibraryEmpty}
        />
        {authError ? <ErrorAlert message={authError} className="mb-3" /> : null}
        <SongList
          songs={filteredSongs}
          allSongs={songs}
          viewMode={viewMode}
          status={status}
          flashId={flashId}
          onAdd={() => openAdd()}
          onSearchCatalog={() => openAdd(filterQuery.trim())}
          onRetry={retry}
          onClearFilter={() => handleFilterChange('')}
          onUpdate={updateSong}
          onRemove={handleRemove}
        />
      </div>

      {isLibraryEmpty ? null : (
        <button
          type="button"
          aria-label="Thêm bài"
          onClick={() => openAdd(filterQuery.trim())}
          className="bookmark-fab"
        >
          <Plus aria-hidden="true" className="size-[22px]" />
        </button>
      )}

      <AddSheet
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        initialTerm={addSeed}
        songs={songs}
        onAddManual={handleManualAdd}
        renderSearch={(search) => (
          <SongSearch {...search} songs={songs} onAdd={handleSearchAdd} />
        )}
      />
    </>
  )
}
