import { SongCover } from '@/components/song-cover'
import type { Song } from '@/lib/api/types'

type SongGridProps = {
  songs: Song[]
}

export function SongGrid({ songs }: SongGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
      {songs.map((song, index) => (
        <li
          key={song.id}
          className="relative aspect-square overflow-hidden rounded-xl bg-muted"
        >
          <SongCover
            src={song.coverUrl}
            loading={index < 5 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="absolute inset-0 size-full rounded-xl"
            iconClassName="size-8"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-2.5">
            <p className="truncate text-[12.5px] leading-[1.3] font-semibold text-white">
              {song.title}
            </p>
            <p className="truncate text-[11px] leading-[1.4] text-white/60">
              {song.artist}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
