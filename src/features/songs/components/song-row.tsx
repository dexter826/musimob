import { SongRowView } from '@/components/song-row-view'
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
  return (
    <SongRowView
      song={song}
      isFirst={isFirst}
      isFlashing={isFlashing}
      trailing={
        <SongActionsMenu
          songTitle={song.title}
          onEdit={() => onEdit(song)}
          onDelete={() => onDelete(song)}
          className="shrink-0"
        />
      }
    />
  )
}
