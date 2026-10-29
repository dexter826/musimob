import { cn } from 'cn'

type ErrorAlertProps = {
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorAlert({ message, onRetry, className }: ErrorAlertProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 border-l-[3px] border-danger bg-surface-2 px-3 py-1.5',
        className,
      )}
    >
      <p
        role="alert"
        className="min-w-0 py-1 text-sm leading-[1.6] text-danger"
      >
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-11 shrink-0 items-center rounded-lg px-3 text-[13px] font-semibold text-danger underline underline-offset-2"
        >
          Thử lại
        </button>
      ) : null}
    </div>
  )
}
