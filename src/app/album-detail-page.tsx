import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ErrorAlert } from '@/components/error-alert'
import { SongCover } from '@/components/song-cover'
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

const ALBUMS_TITLE = 'MusiMOB: Album'

type AlbumDetailPageProps = {
  albumsState: ReturnType<typeof useAlbums>
  songsState: ReturnType<typeof useSongs>
}

export function AlbumDetailPage({
  albumsState,
  songsState,
}: AlbumDetailPageProps) {
  const { albumId } = useParams<{ albumId: string }>()
  const { albums, status: albumsStatus, retry: retryAlbums } = albumsState
  const { songs, status: songsStatus, retry: retrySongs } = songsState

  const album = albums.find((item) => item.id === albumId)
  const songsById = useMemo(() => getSongsById(songs), [songs])
  const albumSongs = useMemo(
    () => (album ? getAlbumSongs(album, songsById) : []),
    [album, songsById],
  )

  useDocumentTitle(album ? `MusiMOB: ${album.name}` : ALBUMS_TITLE)

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
          <div className="min-w-0">
            <h1 className="line-clamp-2 font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] break-words text-foreground max-md:text-[28px]">
              {album.name}
            </h1>
            <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
              {countLabel}
            </p>
          </div>
        </div>
      </div>

      {albumsStatus.warning ? (
        <ErrorAlert message={albumsStatus.warning} className="mb-3" />
      ) : null}

      {isSongsLoading ? (
        <AlbumSongsSkeleton />
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
            <ErrorAlert message={songsStatus.warning} className="mb-3" />
          ) : null}
          {albumSongs.length === 0 ? <AlbumDetailEmptyState /> : null}
        </>
      )}
    </div>
  )
}
