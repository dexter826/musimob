import { cn } from 'cn'
import { PreviewButton } from '@/components/preview-button'
import { SongCover } from '@/components/song-cover'
import { useScrollIntoViewWhenActive } from '@/hooks/use-scroll-into-view'
import type { Song } from '@/lib/api/types'
import { songPreviewKey } from '@/lib/preview-key'
import { SongActionsMenu } from './song-actions-menu'

type SongGridProps = {
  songs: Song[]
  flashId: string | null
  onEdit: (song: Song) => void
  onDelete: (song: Song) => void
}

type SongGridTileProps = {
  song: Song
  index: number
  isFlashing: boolean
  onEdit: () => void
  onDelete: () => void
}

function SongGridTile({
  song,
  index,
  isFlashing,
  onEdit,
  onDelete,
}: SongGridTileProps) {
  const tileRef = useScrollIntoViewWhenActive<HTMLLIElement>(isFlashing)

  return (
    <li
      ref={tileRef}
      className={cn(
        'relative aspect-square overflow-hidden rounded-xl bg-muted',
        isFlashing && 'outline-2 outline-offset-2 outline-primary',
      )}
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
      <PreviewButton
        previewUrl={song.previewUrl}
        playKey={songPreviewKey(song.id)}
        title={song.title}
        artist={song.artist}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="truncate text-[12.5px] leading-[1.3] font-semibold text-white">
          {song.title}
        </p>
        <p className="truncate text-[11px] leading-[1.4] text-white/60">
          {song.artist}
        </p>
      </div>
      <div className="absolute top-1.5 right-1.5">
        <SongActionsMenu
          songTitle={song.title}
          onEdit={onEdit}
          onDelete={onDelete}
          className="bg-black/65 text-white hover:bg-black/80 hover:text-white"
        />
      </div>
    </li>
  )
}

export function SongGrid({ songs, flashId, onEdit, onDelete }: SongGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
      {songs.map((song, index) => (
        <SongGridTile
          key={song.id}
          song={song}
          index={index}
          isFlashing={song.id === flashId}
          onEdit={() => onEdit(song)}
          onDelete={() => onDelete(song)}
        />
      ))}
    </ul>
  )
}
