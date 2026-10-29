import { useState } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import type { Song, SongPatch } from '@/lib/api/types'
import type { SongsStatus } from '../hooks/use-songs'
import type { ViewMode } from '../hooks/use-view-mode'
import { DeleteConfirm } from './delete-confirm'
import { EditSheet } from './edit-sheet'
import { EmptyState } from './empty-state'
import { SongGrid } from './song-grid'
import { SongRow } from './song-row'

type SongListProps = {
  songs: Song[]
  allSongs: Song[]
  viewMode: ViewMode
  status: SongsStatus
  flashId: string | null
  onAdd: () => void
  onSearchCatalog: () => void
  onRetry: () => void
  onClearFilter: () => void
  onUpdate: (id: string, patch: SongPatch) => Promise<void>
  onRemove: (song: Song) => Promise<void>
}

const SKELETON_ROWS = [0, 1, 2, 3, 4]
const SKELETON_GRID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function SongListSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === 'grid') {
    return (
      <div role="status">
        <span className="sr-only">Đang tải danh sách…</span>
        <div
          aria-hidden="true"
          className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 wide:grid-cols-4 widest:grid-cols-6"
        >
          {SKELETON_GRID.map((item) => (
            <div key={item}>
              <div className="aspect-square rounded-sm bg-surface-2" />
              <div className="mt-2 h-3 w-3/4 rounded-sm bg-surface-2" />
              <div className="mt-1.5 h-2.5 w-1/2 rounded-sm bg-surface-2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div role="status" className="flex flex-1 flex-col gap-0.5">
      <span className="sr-only">Đang tải danh sách…</span>
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          aria-hidden="true"
          className="flex min-h-16 items-center gap-3.5 rounded-lg py-2 pr-2 pl-3"
        >
          <div className="size-12 shrink-0 rounded-sm bg-surface-2" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-3 w-2/5 rounded-sm bg-surface-2" />
            <div className="h-2.5 w-1/4 rounded-sm bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

function FilterEmptyState({
  onClear,
  onSearchCatalog,
}: {
  onClear: () => void
  onSearchCatalog: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h2 className="font-serif text-[20px] leading-[1.2] font-medium text-foreground">
        Không có bài nào khớp.
      </h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          onClick={onSearchCatalog}
          className="h-11 px-4 text-[13px] font-semibold"
        >
          Tìm bài này
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onClear}
          className="h-11 px-4 text-[13px] font-semibold text-muted-foreground hover:text-foreground"
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  )
}

export function SongList({
  songs,
  allSongs,
  viewMode,
  status,
  flashId,
  onAdd,
  onSearchCatalog,
  onRetry,
  onClearFilter,
  onUpdate,
  onRemove,
}: SongListProps) {
  const [editTarget, setEditTarget] = useState<Song | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Song | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  function openEdit(song: Song) {
    setEditTarget(song)
    setIsEditOpen(true)
  }

  function openDelete(song: Song) {
    setDeleteTarget(song)
    setIsDeleteOpen(true)
  }

  if (status.state === 'loading') {
    return <SongListSkeleton viewMode={viewMode} />
  }

  if (status.state === 'failed') {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <ErrorAlert
          message={status.message}
          onRetry={onRetry}
          className="w-full max-w-[440px]"
        />
      </div>
    )
  }

  if (allSongs.length === 0) {
    return <EmptyState onAdd={onAdd} />
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      {status.warning ? <ErrorAlert message={status.warning} /> : null}

      {songs.length === 0 ? (
        <FilterEmptyState
          onClear={onClearFilter}
          onSearchCatalog={onSearchCatalog}
        />
      ) : viewMode === 'grid' ? (
        <SongGrid
          songs={songs}
          flashId={flashId}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      ) : (
        <ul className="flex flex-col gap-0.5">
          {songs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              isFirst={index === 0}
              isFlashing={song.id === flashId}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </ul>
      )}

      <EditSheet
        song={editTarget}
        songs={allSongs}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={onUpdate}
      />
      <DeleteConfirm
        song={deleteTarget}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={onRemove}
      />
    </div>
  )
}
