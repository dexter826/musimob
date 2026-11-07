import { cn } from 'cn'
import symbol from '../../assets/brand/symbol.svg'

type WordmarkProps = {
  className?: string
  compactOnMobile?: boolean
}

export function Wordmark({ className, compactOnMobile }: WordmarkProps) {
  return (
    <span
      role="img"
      aria-label="MusiMOB"
      translate="no"
      className={cn(
        'inline-flex h-[26px] items-center gap-[3px] text-[14.5px]',
        className,
      )}
    >
      <img
        src={symbol}
        alt=""
        width={26}
        height={26}
        className="h-full w-auto"
      />
      <span
        aria-hidden="true"
        className={cn(
          'font-bold leading-none tracking-[-0.015em]',
          compactOnMobile && 'max-md:hidden',
        )}
      >
        <span className="text-foreground">Musi</span>
        <span className="text-[var(--coral-500)]">MOB</span>
      </span>
    </span>
  )
}
