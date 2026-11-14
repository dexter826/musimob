import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/features/auth'
import { AudioPreviewProvider } from '@/features/audio-preview'
import { AuthContext } from './auth-context'
import { ThemeMeta } from './theme-meta'

type AppProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function AppProvider({ children }: AppProviderProps) {
  const auth = useAuth()

  return (
    <ThemeProvider>
      <ThemeMeta />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AudioPreviewProvider>
            <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
          </AudioPreviewProvider>
        </TooltipProvider>
        <Toaster
          position="bottom-center"
          offset={{
            bottom: 'calc(var(--library-selection-height, 0px) + 24px)',
          }}
          mobileOffset={{
            bottom:
              'max(96px, calc(var(--library-selection-height, 0px) + 12px))',
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
