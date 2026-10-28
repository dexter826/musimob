import { SongCover } from '@/components/song-cover'
import type { Song } from '@/lib/api/types'

type SongRowProps = {
  song: Song
  isFirst: boolean
}

export function SongRow({ song, isFirst }: SongRowProps) {
  return (
    <li className="flex items-center gap-3 px-3 py-2.5">
      <SongCover
        src={song.coverUrl}
        loading={isFirst ? 'eager' : 'lazy'}
        fetchPriority={isFirst ? 'high' : 'auto'}
        className="size-[50px]"
      />
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
