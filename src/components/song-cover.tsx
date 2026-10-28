import { useState } from 'react'
import { Music2 } from 'lucide-react'
import { cn } from 'cn'

type SongCoverProps = {
  src: string
  className?: string
  iconClassName?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function SongCover({
  src,
  className,
  iconClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
}: SongCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'grid shrink-0 place-items-center rounded-md bg-muted text-muted-foreground',
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
      onError={() => setFailedSrc(src)}
      className={cn('shrink-0 rounded-md bg-muted object-cover', className)}
    />
  )
}
