import { cn } from 'cn'

type ErrorAlertProps = {
  message: string
  className?: string
}

export function ErrorAlert({ message, className }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'border-l-[3px] border-danger bg-surface-2 px-3 py-2.5 text-sm leading-[1.6] text-danger',
        className,
      )}
    >
      {message}
    </div>
  )
}
