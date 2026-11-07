import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ListMinus, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { ErrorAlert } from '@/components/error-alert'
import { SongCover } from '@/components/song-cover'
import { SongRowView } from '@/components/song-row-view'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AddAlbumSongsPanel } from '@/features/albums/components/add-album-songs-panel'
import { AlbumActionsMenu } from '@/features/albums/components/album-actions-menu'
import { DeleteAlbumConfirm } from '@/features/albums/components/delete-album-confirm'
import { RenameAlbumPanel } from '@/features/albums/components/rename-album-panel'
import {
  AlbumDetailEmptyState,
  AlbumDetailNotFound,
  AlbumDetailSkeleton,
  AlbumSongsSkeleton,
} from '@/features/albums/components/album-detail-states'
import type { useAlbums } from '@/features/albums/hooks/use-albums'
import {
  getAlbumCoverUrl,
  getAlbumSongs,
  getSongsById,
} from '@/features/albums/lib/album-songs'
import type { useSongs } from '@/features/songs/hooks/use-songs'
import { useDocumentTitle } from '@/hooks/use-document-title'
import type { Album, Song } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'

const ALBUMS_TITLE = 'MusiMOB: Album'

type AlbumDetailPageProps = {
  albumsState: ReturnType<typeof useAlbums>
  songsState: ReturnType<typeof useSongs>
}

export function AlbumDetailPage(props: AlbumDetailPageProps) {
  const { albumId } = useParams<{ albumId: string }>()
  return <AlbumDetailContent key={albumId} {...props} albumId={albumId} />
}

function AlbumDetailContent({
  albumsState,
  songsState,
  albumId,
}: AlbumDetailPageProps & { albumId: string | undefined }) {
  const {
    albums,
    status: albumsStatus,
    retry: retryAlbums,
    addSongs,
    renameAlbum,
    removeAlbum,
    removeSong,
  } = albumsState
  const { songs, status: songsStatus, retry: retrySongs } = songsState
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Album | null>(null)
  const [removingSongIds, setRemovingSongIds] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const isActive = useRef(true)
  const { activeKey, stop } = useAudioPreview()

  useEffect(() => {
    isActive.current = true
    return () => {
      isActive.current = false
    }
  }, [])

  // Keep the confirmation mounted while Firestore applies its optimistic delete.
  const album =
    albums.find((item) => item.id === albumId) ??
    (deleteTarget?.id === albumId ? deleteTarget : undefined)
  const songsById = useMemo(() => getSongsById(songs), [songs])
  const albumSongs = useMemo(
    () => (album ? getAlbumSongs(album, songsById) : []),
    [album, songsById],
  )

  useDocumentTitle(album ? `MusiMOB: ${album.name}` : ALBUMS_TITLE)

  useEffect(() => {
    if (!activeKey || songsStatus.state !== 'ready') return
    const visibleSongs = isAddOpen ? songs : albumSongs
    if (!visibleSongs.some((song) => songPreviewKey(song.id) === activeKey))
      stop()
  }, [activeKey, albumSongs, isAddOpen, songs, songsStatus.state, stop])

  async function handleAddSongs(songIds: string[]) {
    if (!album) return
    await addSongs([album.id], songIds)
    toast.success(`Đã thêm ${songIds.length} bài vào album`)
  }

  async function handleRename(name: string) {
    if (!album) return
    await renameAlbum(album.id, name)
    setIsRenameOpen(false)
    toast.success('Đã đổi tên album', { description: name })
  }

  async function handleDelete(target: Album) {
    await removeAlbum(target.id)
    if (!isActive.current) return
    stop()
    navigate('/albums')
    toast.success('Đã xóa album', { description: target.name })
  }

  async function handleRemoveSong(song: Song) {
    if (!album || removingSongIds.has(song.id)) return
    if (activeKey === songPreviewKey(song.id)) stop()
    setRemovingSongIds((current) => new Set(current).add(song.id))
    try {
      await removeSong(album.id, song.id)
      toast.success('Đã bỏ bài khỏi album', { description: song.title })
    } catch (error) {
      toast.error('Không bỏ được bài khỏi album', {
        description: error instanceof Error ? error.message : 'Thử lại.',
      })
    } finally {
      setRemovingSongIds((current) => {
        const next = new Set(current)
        next.delete(song.id)
        return next
      })
    }
  }

  if (albumsStatus.state === 'loading') {
    return <AlbumDetailSkeleton />
  }

  if (albumsStatus.state === 'failed') {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <ErrorAlert
          message={albumsStatus.message}
          onRetry={retryAlbums}
          className="w-full max-w-[440px]"
        />
      </div>
    )
  }

  if (!album) {
    return <AlbumDetailNotFound />
  }

  const isSongsLoading = songsStatus.state === 'loading'
  const isSongsFailed = songsStatus.state === 'failed'
  const countLabel = isSongsLoading
    ? 'Đang tải…'
    : isSongsFailed
      ? 'Không tải được'
      : `${albumSongs.length} bài`
  const coverUrl =
    isSongsLoading || isSongsFailed ? '' : getAlbumCoverUrl(albumSongs)

  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-10">
      <div className="pt-7 pb-5">
        <Link
          to="/albums"
          className="mb-4 inline-flex h-11 items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors duration-[160ms] hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Album
        </Link>
        <div className="flex items-end gap-4">
          <SongCover
            src={coverUrl}
            loading="eager"
            fetchPriority="high"
            className="size-20 shrink-0 rounded-sm"
            iconClassName="size-6"
          />
          <div className="min-w-0 flex-1">
            <h1 className="line-clamp-2 font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] break-words text-foreground max-md:text-[28px]">
              {album.name}
            </h1>
            <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
              {countLabel}
            </p>
          </div>
          <AlbumActionsMenu
            albumName={album.name}
            onRename={() => setIsRenameOpen(true)}
            onDelete={() => setDeleteTarget(album)}
          />
        </div>
      </div>

      {albumsStatus.warning ? (
        <ErrorAlert
          message={albumsStatus.warning}
          onRetry={retryAlbums}
          className="mb-3"
        />
      ) : null}

      {isSongsLoading ? (
        <div role="status">
          <span className="sr-only">Đang tải bài trong album…</span>
          <AlbumSongsSkeleton />
        </div>
      ) : isSongsFailed ? (
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <ErrorAlert
            message={songsStatus.message}
            onRetry={retrySongs}
            className="w-full max-w-[440px]"
          />
        </div>
      ) : (
        <>
          {songsStatus.warning ? (
            <ErrorAlert
              message={songsStatus.warning}
              onRetry={retrySongs}
              className="mb-3"
            />
          ) : null}
          {albumSongs.length === 0 ? (
            <AlbumDetailEmptyState
              onAdd={() => setIsAddOpen(true)}
              isLibraryEmpty={songs.length === 0}
            />
          ) : (
            <>
              <div className="mb-3 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setIsAddOpen(true)}
                  className="h-11 gap-2 text-[13px] font-semibold"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  Thêm bài
                </Button>
              </div>
              <ul className="flex flex-col gap-0.5">
                {albumSongs.map((song, index) => (
                  <SongRowView
                    key={song.id}
                    song={song}
                    isFirst={index === 0}
                    trailing={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Bỏ ${song.title} khỏi album`}
                        disabled={removingSongIds.has(song.id)}
                        aria-busy={removingSongIds.has(song.id)}
                        onClick={() => void handleRemoveSong(song)}
                        className="size-11 shrink-0 text-muted-foreground"
                      >
                        {removingSongIds.has(song.id) ? (
                          <Spinner aria-hidden="true" className="size-4" />
                        ) : (
                          <ListMinus
                            aria-hidden="true"
                            className="size-[18px]"
                          />
                        )}
                      </Button>
                    }
                  />
                ))}
              </ul>
            </>
          )}
          <AddAlbumSongsPanel
            key={album.id}
            album={album}
            songs={songs}
            open={isAddOpen}
            onOpenChange={setIsAddOpen}
            onAdd={handleAddSongs}
            warning={songsStatus.warning}
            onRetry={retrySongs}
          />
        </>
      )}
      <RenameAlbumPanel
        album={album}
        albums={albums}
        open={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        onRename={handleRename}
      />
      <DeleteAlbumConfirm
        album={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
