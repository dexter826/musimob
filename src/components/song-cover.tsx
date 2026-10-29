import { useState } from 'react'
import { Music2 } from 'lucide-react'
import { cn } from 'cn'

type SongCoverProps = {
  src: string
  className?: string
  iconClassName?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  onError?: () => void
}

export function SongCover({
  src,
  className,
  iconClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
  onError,
}: SongCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'grid shrink-0 place-items-center rounded-sm bg-muted text-muted-foreground',
          className,
        )}
      >
        <Music2 className={cn('size-5', iconClassName)} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt=""
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => {
        setFailedSrc(src)
        onError?.()
      }}
      className={cn('shrink-0 rounded-sm bg-muted object-cover', className)}
    />
  )
}
