import { useState } from 'react'
import { Music2 } from 'lucide-react'
import type { Song } from '@/lib/api/types'

type SongCoverProps = {
  song: Song
  isFirst: boolean
}

type SongRowProps = {
  song: Song
  isFirst: boolean
}

function SongCover({ song, isFirst }: SongCoverProps) {
  const [hasError, setHasError] = useState(false)

  if (!song.coverUrl || hasError) {
    return (
      <div
        aria-hidden="true"
        className="grid size-[50px] shrink-0 place-items-center rounded-md bg-muted text-muted-foreground"
      >
        <Music2 className="size-5" />
      </div>
    )
  }

  return (
    <img
      src={song.coverUrl}
      alt=""
      loading={isFirst ? 'eager' : 'lazy'}
      fetchPriority={isFirst ? 'high' : 'auto'}
      decoding="async"
      onError={() => setHasError(true)}
      className="size-[50px] shrink-0 rounded-md bg-muted object-cover"
    />
  )
}

export function SongRow({ song, isFirst }: SongRowProps) {
  return (
    <li className="flex items-center gap-3 px-3 py-2.5">
      <SongCover key={song.coverUrl} song={song} isFirst={isFirst} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] leading-[1.35] font-semibold">
          {song.title}
        </p>
        <p className="truncate text-[12.5px] leading-[1.4] text-muted-foreground">
          {song.artist}
        </p>
      </div>
    </li>
  )
}
