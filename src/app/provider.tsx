import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { AudioPreviewProvider } from '@/components/audio-preview-provider'
import { AuthContext } from './auth-context'
import { ThemeMeta } from './theme-meta'

type AppProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function AppProvider({ children }: AppProviderProps) {
  const auth = useAuth()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="musimob:theme"
      disableTransitionOnChange
    >
      <ThemeMeta />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AudioPreviewProvider>
            <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
          </AudioPreviewProvider>
        </TooltipProvider>
        <Toaster
          position="bottom-center"
          offset={{ bottom: 24 }}
          mobileOffset={{ bottom: 96 }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
