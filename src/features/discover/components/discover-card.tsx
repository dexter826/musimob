import { cn } from 'cn'
import {
  PreviewButton,
  catalogPreviewKey,
  useAudioPreview,
} from '@/features/audio-preview'
import { SongCover } from '@/features/songs'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { CatalogTrack } from '@/features/catalog'

type DiscoverCardProps = {
  song: CatalogTrack
  index: number
  isSaved?: boolean
  isSaving?: boolean
  onSave?: (song: CatalogTrack) => void
  className?: string
}

export function DiscoverCard({
  song,
  index,
  isSaved = false,
  isSaving = false,
  onSave,
  className,
}: DiscoverCardProps) {
  const { activeKey } = useAudioPreview()
  const isActive = activeKey === catalogPreviewKey(song.trackId)

  return (
    <li className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-2">
        <SongCover
          src={song.coverUrl}
          loading={index < 6 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className="absolute inset-0 size-full rounded-sm object-cover"
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
            playKey={catalogPreviewKey(song.trackId)}
            title={song.title}
            artist={song.artist}
            className="absolute right-1.5 bottom-1.5 size-7"
          />
        </span>

        <div className="absolute top-1.5 right-1.5">
          {isSaved ? (
            <span className="inline-flex h-7 items-center rounded-sm border border-rule bg-surface px-2 text-[11px] font-semibold text-success">
              Đã lưu
            </span>
          ) : onSave ? (
            <Button
              type="button"
              size="sm"
              disabled={isSaving}
              onClick={() => onSave(song)}
              aria-label={`Lưu ${song.title}, ${song.artist}`}
              className="h-8 min-w-11 px-2.5 text-xs font-semibold"
            >
              {isSaving ? <Spinner className="size-3" /> : 'Lưu bài'}
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-2 min-w-0">
        <p
          className={cn(
            'line-clamp-1 text-[13.5px] leading-[1.35] font-medium',
            isActive ? 'text-primary' : 'text-foreground',
          )}
          title={song.title}
        >
          {song.title}
        </p>
        <p
          className="mt-0.5 truncate text-xs leading-[1.4] text-muted-foreground"
          title={song.artist}
        >
          {song.artist}
        </p>
      </div>
    </li>
  )
}
