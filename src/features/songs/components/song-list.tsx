import { useState } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
  totalSongCount: number
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
const SKELETON_GRID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function SongListSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === 'grid') {
    return (
      <div role="status">
        <span className="sr-only">Đang tải danh sách…</span>
        <div
          aria-hidden="true"
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5"
        >
          {SKELETON_GRID.map((item) => (
            <div
              key={item}
              className="aspect-square rounded-xl bg-muted motion-safe:animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div role="status" className="flex flex-1 flex-col">
      <span className="sr-only">Đang tải danh sách…</span>
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          aria-hidden="true"
          className="flex items-center gap-3 px-3 py-2.5"
        >
          <div className="size-[50px] shrink-0 rounded-md bg-muted motion-safe:animate-pulse" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-3 w-2/5 rounded-sm bg-muted motion-safe:animate-pulse" />
            <div className="h-2.5 w-1/4 rounded-sm bg-muted motion-safe:animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

function SongListError({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-0 px-6 py-16 text-center">
      <ErrorAlert message={message} className="max-w-[360px] text-left" />
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-4 h-11 px-4 text-[13px] font-semibold"
      >
        Thử lại
      </Button>
    </Card>
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
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <p
        role="status"
        className="text-[13.5px] leading-[1.55] text-muted-foreground"
      >
        Không có bài nào khớp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          onClick={onSearchCatalog}
          className="h-9 px-3 text-[12.5px] font-semibold"
        >
          Tìm bài này
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onClear}
          className="h-9 px-3 text-[12.5px] font-semibold text-muted-foreground hover:text-foreground"
        >
          Xoá bộ lọc
        </Button>
      </div>
    </div>
  )
}

export function SongList({
  songs,
  totalSongCount,
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
    return <SongListError message={status.message} onRetry={onRetry} />
  }

  if (totalSongCount === 0) {
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
        <ul className="flex flex-col">
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
