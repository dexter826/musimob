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

const buttonClass =
  "grid size-[26px] place-items-center rounded-full border border-rule bg-surface text-foreground transition-colors duration-[160ms] after:absolute after:-inset-[9px] after:content-['']"

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
              buttonClass,
              'cursor-not-allowed text-muted-foreground',
              className,
            )}
          >
            <VolumeX aria-hidden="true" className="size-3" />
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
        isActivePlaying
          ? `Dừng nghe thử ${title}`
          : `Nghe thử ${title}, ${artist}`
      }
      aria-pressed={isActivePlaying}
      className={cn(
        buttonClass,
        isActive
          ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary-hover'
          : 'hover:border-transparent hover:bg-primary hover:text-primary-foreground',
        className,
      )}
    >
      {isActiveBuffering ? (
        <Spinner aria-hidden="true" className="size-3" />
      ) : isActivePlaying ? (
        <Pause aria-hidden="true" className="size-3 fill-current" />
      ) : (
        <Play aria-hidden="true" className="size-3 fill-current" />
      )}
    </button>
  )
}
