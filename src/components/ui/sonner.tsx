import { useTheme } from '@/hooks/use-theme'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 shrink-0 text-success" />,
        info: <InfoIcon className="size-4 shrink-0 text-foreground" />,
        warning: (
          <TriangleAlertIcon className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        ),
        error: <OctagonXIcon className="size-4 shrink-0 text-danger" />,
        loading: (
          <Loader2Icon className="size-4 shrink-0 animate-spin text-foreground" />
        ),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-full max-w-[calc(100vw-32px)] sm:w-[356px] items-start gap-2.5 rounded-lg border border-border bg-popover px-3.5 py-2.5 text-popover-foreground shadow-none text-[13px]',
          icon: 'size-4 shrink-0 mt-0.5',
          content: 'flex flex-1 flex-col gap-0.5 min-w-0',
          title: 'text-[13px] font-semibold leading-5 text-foreground',
          description: 'text-xs leading-4 text-muted-foreground',
          actionButton:
            'self-center ml-auto inline-flex h-8 shrink-0 items-center rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-hover',
          cancelButton:
            'self-center ml-auto inline-flex h-8 shrink-0 items-center rounded-md bg-secondary px-3 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80',
          closeButton:
            'absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
