import { cn } from 'cn'
import { PreviewButton } from '@/components/preview-button'
import { SongCover } from '@/components/song-cover'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { SearchResult } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { catalogPreviewKey } from '@/lib/preview-key'

type DiscoverCardProps = {
  song: SearchResult
  index: number
  isSaving?: boolean
  onSave?: (song: SearchResult) => void
}

export function DiscoverCard({
  song,
  index,
  isSaving = false,
  onSave,
}: DiscoverCardProps) {
  const { activeKey } = useAudioPreview()
  const isActive = activeKey === catalogPreviewKey(song.trackId)

  return (
    <li className="group relative flex flex-col">
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

        {onSave ? (
          <div className="absolute top-1.5 right-1.5">
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
          </div>
        ) : null}
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
