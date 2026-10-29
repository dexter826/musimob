import { useEffect, useRef } from 'react'
import { cn } from 'cn'
import { SongCover } from '@/components/song-cover'
import type { Song } from '@/lib/api/types'
import { SongActionsMenu } from './song-actions-menu'

type SongRowProps = {
  song: Song
  isFirst: boolean
  isFlashing: boolean
  onEdit: (song: Song) => void
  onDelete: (song: Song) => void
}

export function SongRow({
  song,
  isFirst,
  isFlashing,
  onEdit,
  onDelete,
}: SongRowProps) {
  const rowRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!isFlashing) return

    rowRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }, [isFlashing])

  return (
    <li ref={rowRef} className="flex items-center gap-3 px-3 py-2.5">
      <SongCover
        src={song.coverUrl}
        loading={isFirst ? 'eager' : 'lazy'}
        fetchPriority={isFirst ? 'high' : 'auto'}
        className={cn(
          'size-[50px]',
          isFlashing && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] leading-[1.35] font-semibold">
          {song.title}
        </p>
        <p className="truncate text-[12.5px] leading-[1.4] text-muted-foreground">
          {song.artist}
        </p>
      </div>
      <SongActionsMenu
        songTitle={song.title}
        onEdit={() => onEdit(song)}
        onDelete={() => onDelete(song)}
        className="shrink-0"
      />
    </li>
  )
}
