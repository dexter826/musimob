import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import type { useAlbums } from '@/features/albums/hooks/use-albums'
import {
  AlbumGrid,
  AlbumGridSkeleton,
} from '@/features/albums/components/album-grid'
import { AlbumsEmptyState } from '@/features/albums/components/albums-empty-state'
import { CreateAlbumPanel } from '@/features/albums/components/create-album-panel'
import { getAlbumCountLabel } from '@/features/albums/lib/count-label'
import { getSongsById } from '@/features/albums/lib/album-songs'
import type { useSongs } from '@/features/songs/hooks/use-songs'
import { useDocumentTitle } from '@/hooks/use-document-title'

const ALBUMS_TITLE = 'MusiMOB: Album'

type AlbumsPageProps = {
  albumsState: ReturnType<typeof useAlbums>
  songsState: ReturnType<typeof useSongs>
}

export function AlbumsPage({ albumsState, songsState }: AlbumsPageProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const navigate = useNavigate()
  const { albums, status, retry, createAlbum } = albumsState
  const { songs, status: songsStatus, retry: retrySongs } = songsState

  useDocumentTitle(ALBUMS_TITLE)

  const songsById = useMemo(() => getSongsById(songs), [songs])
  const showCreateButton = status.state === 'ready' && albums.length > 0
  const showSkeleton =
    status.state === 'loading' ||
    (status.state === 'ready' &&
      albums.length > 0 &&
      songsStatus.state === 'loading')
  const countLabel = getAlbumCountLabel(status, albums.length)

  async function handleCreate(name: string) {
    const albumId = await createAlbum(name)
    toast.success('Đã tạo album', { description: name })
    setIsCreateOpen(false)
    navigate(`/albums/${albumId}`)
  }

  return (
    <>
      <div className="flex flex-1 flex-col pb-10">
        <div className="flex items-end justify-between gap-6 pt-7 pb-5 max-md:flex-col max-md:items-stretch max-md:gap-3">
          <div className="min-w-0">
            <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-foreground max-md:text-[28px]">
              Album
            </h1>
            <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
              {countLabel}
            </p>
          </div>
          {showCreateButton ? (
            <Button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="h-11 shrink-0 gap-2 px-4 text-[13px] font-semibold max-md:w-full"
            >
              <Plus aria-hidden="true" className="size-4" />
              Tạo album
            </Button>
          ) : null}
        </div>

        {showSkeleton ? (
          <AlbumGridSkeleton />
        ) : status.state === 'failed' ? (
          <div className="flex flex-1 items-center justify-center px-6 py-16">
            <ErrorAlert
              message={status.message}
              onRetry={retry}
              className="w-full max-w-[440px]"
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-3">
            {status.warning ? <ErrorAlert message={status.warning} /> : null}
            {songsStatus.state === 'failed' ? (
              <ErrorAlert message={songsStatus.message} onRetry={retrySongs} />
            ) : songsStatus.state === 'ready' && songsStatus.warning ? (
              <ErrorAlert message={songsStatus.warning} />
            ) : null}
            {albums.length === 0 ? (
              <AlbumsEmptyState onCreate={() => setIsCreateOpen(true)} />
            ) : (
              <AlbumGrid albums={albums} songsById={songsById} />
            )}
          </div>
        )}
      </div>

      <CreateAlbumPanel
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        albums={albums}
        onCreate={handleCreate}
      />
    </>
  )
}
