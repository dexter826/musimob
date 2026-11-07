import { cn } from 'cn'
import { PreviewButton } from '@/components/preview-button'
import { SongCover } from '@/components/song-cover'
import { SelectionCheckbox } from '@/components/selection-checkbox'
import { useScrollIntoViewWhenActive } from '@/hooks/use-scroll-into-view'
import type { Song } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'
import { SongActionsMenu } from './song-actions-menu'

type SongGridProps = {
  songs: Song[]
  flashId: string | null
  onEdit: (song: Song) => void
  onDelete: (song: Song) => void
  selectedIds: ReadonlySet<string> | null
  onToggleSelection: (id: string) => void
}

type SongGridTileProps = {
  song: Song
  index: number
  isFlashing: boolean
  onEdit: () => void
  onDelete: () => void
  isSelected: boolean
  onToggleSelection?: () => void
}

function SongGridTile({
  song,
  index,
  isFlashing,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelection,
}: SongGridTileProps) {
  const tileRef = useScrollIntoViewWhenActive<HTMLLIElement>(isFlashing)
  const { activeKey } = useAudioPreview()
  const isActive = activeKey === songPreviewKey(song.id)

  return (
    <li
      ref={tileRef}
      onClick={onToggleSelection}
      data-selected={isSelected || undefined}
      className={cn(
        'group relative',
        isFlashing && 'outline-2 outline-offset-2 outline-primary',
        isSelected && 'rounded-sm ring-2 ring-control-border',
      )}
    >
      <div className="relative aspect-square">
        <SongCover
          src={song.coverUrl}
          loading={index < 6 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className="absolute inset-0 size-full rounded-sm"
          iconClassName="size-8"
        />
        {isActive ? (
          <span
            aria-hidden="true"
            className="absolute top-0 left-2.5 h-[26px] w-3.5 bg-primary [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
          />
        ) : null}
        <span onClick={(event) => event.stopPropagation()} className="contents">
          <PreviewButton
            previewUrl={song.previewUrl}
            playKey={songPreviewKey(song.id)}
            title={song.title}
            artist={song.artist}
            className="absolute right-1.5 bottom-1.5 size-7"
          />
        </span>
        {onToggleSelection ? (
          <div className="absolute top-1 right-1 rounded-lg bg-surface">
            <SelectionCheckbox
              label={`Chọn ${song.title}`}
              checked={isSelected}
              onChange={onToggleSelection}
            />
          </div>
        ) : (
          <div className="absolute top-1 right-1">
            <SongActionsMenu
              songTitle={song.title}
              onEdit={onEdit}
              onDelete={onDelete}
              className="bg-surface/90 text-foreground hover:bg-surface"
            />
          </div>
        )}
      </div>
      <p
        className={cn(
          'mt-2 line-clamp-1 text-[13.5px] leading-[1.35] font-medium',
          isActive ? 'text-bookmark-text' : 'text-foreground',
        )}
      >
        {song.title}
      </p>
      <p className="mt-0.5 truncate text-xs leading-[1.4] text-muted-foreground">
        {song.artist}
      </p>
    </li>
  )
}

export function SongGrid({
  songs,
  flashId,
  onEdit,
  onDelete,
  selectedIds,
  onToggleSelection,
}: SongGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 wide:grid-cols-4 widest:grid-cols-6">
      {songs.map((song, index) => (
        <SongGridTile
          key={song.id}
          song={song}
          index={index}
          isFlashing={song.id === flashId}
          onEdit={() => onEdit(song)}
          onDelete={() => onDelete(song)}
          isSelected={selectedIds?.has(song.id) ?? false}
          onToggleSelection={
            selectedIds ? () => onToggleSelection(song.id) : undefined
          }
        />
      ))}
    </ul>
  )
}
