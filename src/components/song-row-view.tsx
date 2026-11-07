import type { MouseEvent, ReactNode } from 'react'
import { cn } from 'cn'
import { PreviewButton } from '@/components/preview-button'
import { SongCover } from '@/components/song-cover'
import { useScrollIntoViewWhenActive } from '@/hooks/use-scroll-into-view'
import type { Song } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'

type SongRowViewProps = {
  song: Song
  isFirst?: boolean
  isFlashing?: boolean
  isSelected?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  onActivate?: () => void
}

function stopActivation(event: MouseEvent) {
  event.stopPropagation()
}

export function SongRowView({
  song,
  isFirst = false,
  isFlashing = false,
  isSelected = false,
  leading,
  trailing,
  onActivate,
}: SongRowViewProps) {
  const rowRef = useScrollIntoViewWhenActive<HTMLLIElement>(isFlashing)
  const { activeKey } = useAudioPreview()
  const isActive = activeKey === songPreviewKey(song.id)

  return (
    <li
      ref={rowRef}
      onClick={onActivate}
      data-selected={isSelected || undefined}
      className={cn(
        'group relative grid min-h-16 items-center gap-3.5 rounded-lg py-2 pr-2 pl-3 transition-colors duration-[160ms]',
        leading
          ? 'grid-cols-[auto_48px_minmax(0,1fr)_auto]'
          : 'grid-cols-[48px_minmax(0,1fr)_auto]',
        isActive ? 'bg-bookmark-soft' : 'hover:bg-secondary',
        !isActive && isSelected && 'bg-secondary',
        isSelected && 'ring-1 ring-primary/40',
        isFlashing &&
          'ring-2 ring-primary ring-offset-2 ring-offset-background',
      )}
    >
      {isActive ? (
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-[3px] rounded-r-sm bg-primary"
        />
      ) : null}
      {leading ? (
        <div className="contents" onClick={stopActivation}>
          {leading}
        </div>
      ) : null}
      <div className="relative size-12 shrink-0">
        <SongCover
          src={song.coverUrl}
          loading={isFirst ? 'eager' : 'lazy'}
          fetchPriority={isFirst ? 'high' : 'auto'}
          className="size-12"
        />
        <span className="contents" onClick={stopActivation}>
          <PreviewButton
            previewUrl={song.previewUrl}
            playKey={songPreviewKey(song.id)}
            title={song.title}
            artist={song.artist}
            className="absolute right-1 bottom-1"
          />
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-[14.5px] leading-[1.35] font-semibold">
          {song.title}
        </p>
        <p className="truncate text-[12.5px] leading-[1.4] text-muted-foreground">
          {song.artist}
        </p>
        {isActive ? (
          <p className="mt-0.5 text-xs font-medium text-bookmark-text">
            Đang nghe thử
          </p>
        ) : null}
      </div>
      {trailing ? (
        <div className="contents" onClick={stopActivation}>
          {trailing}
        </div>
      ) : null}
    </li>
  )
}
