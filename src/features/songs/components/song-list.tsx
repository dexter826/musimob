import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Song } from '@/lib/api/types'
import { EmptyState } from './empty-state'
import { SongRow } from './song-row'

type SongListProps = {
  songs: Song[]
  isLoading: boolean
  error: string | null
  onAdd: () => void
  onRetry: () => void
}

const SKELETON_ROWS = [0, 1, 2, 3, 4]

function SongListSkeleton() {
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
      <Alert
        variant="destructive"
        className="max-w-[360px] border-destructive/30 bg-destructive/10 text-left"
      >
        <AlertDescription className="text-[12.5px] leading-[1.5]">
          {message}
        </AlertDescription>
      </Alert>
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

export function SongList({
  songs,
  isLoading,
  error,
  onAdd,
  onRetry,
}: SongListProps) {
  if (isLoading && songs.length === 0) {
    return <SongListSkeleton />
  }

  if (error && songs.length === 0) {
    return <SongListError message={error} onRetry={onRetry} />
  }

  if (songs.length === 0) {
    return <EmptyState onAdd={onAdd} />
  }

  return (
    <div className="flex flex-col gap-3">
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

      <ul className="flex flex-col">
        {songs.map((song, index) => (
          <SongRow key={song.id} song={song} isFirst={index === 0} />
        ))}
      </ul>
    </div>
  )
}
