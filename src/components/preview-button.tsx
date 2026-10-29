import { Pause, Play, VolumeX } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { Spinner } from '@/components/ui/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAudioPreview } from '@/lib/audio-preview-context'

type PreviewButtonProps = {
  previewUrl: string
  playKey: string
  title: string
  artist: string
  className?: string
}

const NO_PREVIEW_LABEL = 'Bài này không có bản nghe thử'

export function PreviewButton({
  previewUrl,
  playKey,
  title,
  artist,
  className,
}: PreviewButtonProps) {
  const { activeKey, isPlaying, isBuffering, toggle } = useAudioPreview()
  const isActive = activeKey === playKey
  const isActivePlaying = isActive && isPlaying
  const isActiveBuffering = isActive && isBuffering

  if (!previewUrl) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-disabled="true"
            aria-label={NO_PREVIEW_LABEL}
            onClick={() => toast(NO_PREVIEW_LABEL)}
            className={cn(
              'grid size-9 cursor-not-allowed place-items-center rounded-full',
              className,
            )}
          >
            <span className="grid size-7 place-items-center rounded-full bg-black/65 text-white/70">
              <VolumeX aria-hidden="true" className="size-3.5" />
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>{NO_PREVIEW_LABEL}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <button
      type="button"
      onClick={() => toggle(playKey, previewUrl)}
      aria-label={
        isActivePlaying ? 'Dừng nghe thử' : `Nghe thử ${title} - ${artist}`
      }
      aria-pressed={isActivePlaying}
      className={cn(
        'group grid size-9 place-items-center rounded-full',
        className,
      )}
    >
      <span
        className={cn(
          'grid size-7 place-items-center rounded-full transition-colors',
          isActivePlaying
            ? 'bg-primary text-primary-foreground group-hover:bg-primary/80'
            : 'bg-black/65 text-white group-hover:bg-black/80',
        )}
      >
        {isActiveBuffering ? (
          <Spinner aria-hidden="true" className="size-3.5" />
        ) : isActivePlaying ? (
          <Pause aria-hidden="true" className="size-3.5 fill-current" />
        ) : (
          <Play aria-hidden="true" className="size-3.5 fill-current" />
        )}
      </span>
    </button>
  )
}
