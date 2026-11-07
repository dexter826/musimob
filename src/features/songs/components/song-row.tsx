import { SongRowView } from '@/components/song-row-view'
import { SelectionCheckbox } from '@/components/selection-checkbox'
import type { Song } from '@/lib/api/types'
import { SongActionsMenu } from './song-actions-menu'

type SongRowProps = {
  song: Song
  isFirst: boolean
  isFlashing: boolean
  onEdit: (song: Song) => void
  onDelete: (song: Song) => void
  isSelected: boolean
  onToggleSelection?: (id: string) => void
}

export function SongRow({
  song,
  isFirst,
  isFlashing,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelection,
}: SongRowProps) {
  return (
    <SongRowView
      song={song}
      isFirst={isFirst}
      isFlashing={isFlashing}
      isSelected={isSelected}
      onActivate={
        onToggleSelection ? () => onToggleSelection(song.id) : undefined
      }
      leading={
        onToggleSelection ? (
          <SelectionCheckbox
            label={`Chọn ${song.title}`}
            checked={isSelected}
            onChange={() => onToggleSelection(song.id)}
          />
        ) : undefined
      }
      trailing={
        onToggleSelection ? undefined : (
          <SongActionsMenu
            songTitle={song.title}
            onEdit={() => onEdit(song)}
            onDelete={() => onDelete(song)}
            className="shrink-0"
          />
        )
      }
    />
  )
}
