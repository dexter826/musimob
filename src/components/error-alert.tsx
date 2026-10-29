import { cn } from 'cn'
import { Alert, AlertDescription } from '@/components/ui/alert'

type ErrorAlertProps = {
  message: string
  className?: string
}

export function ErrorAlert({ message, className }: ErrorAlertProps) {
  return (
    <Alert
      variant="destructive"
      className={cn('border-destructive/30 bg-destructive/10', className)}
    >
      <AlertDescription className="text-[12.5px] leading-[1.5]">
        {message}
      </AlertDescription>
    </Alert>
  )
}
