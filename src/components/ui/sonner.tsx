import { useTheme } from 'next-themes'
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
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--ink-action)',
          '--normal-text': 'var(--ink-action-foreground)',
          '--normal-border': 'var(--ink-action)',
          '--border-radius': 'var(--radius-control)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast text-[13px]',
          description: 'text-xs opacity-80',
          actionButton:
            'rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary-hover',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
