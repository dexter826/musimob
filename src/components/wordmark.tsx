import { cn } from 'cn'
import logoLight from '../../assets/brand/logo-horizontal-light.svg'
import logoDark from '../../assets/brand/logo-horizontal.svg'

type WordmarkProps = {
  className?: string
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      translate="no"
      className={cn('inline-flex h-[26px] items-center', className)}
    >
      <img
        src={logoLight}
        alt="musimob"
        width={88}
        height={26}
        className="h-full w-auto dark:hidden"
      />
      <img
        src={logoDark}
        alt="musimob"
        width={88}
        height={26}
        className="hidden h-full w-auto dark:block"
      />
    </span>
  )
}
