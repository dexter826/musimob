import { Link } from 'react-router'
import { SongCover } from '@/components/song-cover'
import type { Album, Song } from '@/lib/api/types'
import { getAlbumCoverUrl, getAlbumSongs } from '../lib/album-songs'

type AlbumCardProps = {
  album: Album
  songsById: Map<string, Song>
}

export function AlbumCard({ album, songsById }: AlbumCardProps) {
  const albumSongs = getAlbumSongs(album, songsById)
  const countLabel = `${albumSongs.length} bài`
  const coverUrl = getAlbumCoverUrl(albumSongs)

  return (
    <Link
      to={`/albums/${album.id}`}
      aria-label={`${album.name}, ${countLabel}`}
      className="flex min-w-0 flex-col rounded-lg border border-rule bg-surface p-2 transition-colors duration-[160ms] hover:bg-surface-2"
    >
      <div className="relative aspect-square">
        <SongCover
          src={coverUrl}
          className="absolute inset-0 size-full rounded-sm"
          iconClassName="size-8"
        />
      </div>
      <span className="mt-2 line-clamp-2 text-[13.5px] leading-[1.35] font-medium break-words text-foreground">
        {album.name}
      </span>
      <span className="mt-0.5 text-xs leading-[1.4] text-muted-foreground tabular-nums">
        {countLabel}
      </span>
    </Link>
  )
}
