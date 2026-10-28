import { cn } from 'cn'

type WordmarkProps = {
  className?: string
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <p
      translate="no"
      className={cn(
        'text-[17px] font-bold tracking-[-0.02em] sm:text-[18px] lg:text-[20px]',
        className,
      )}
    >
      musi<span className="text-primary">mob</span>
    </p>
  )
}
