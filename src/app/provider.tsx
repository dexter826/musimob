import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { AuthContext } from './auth-context'

type AppProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function AppProvider({ children }: AppProviderProps) {
  const auth = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
      <Toaster
        theme="dark"
        position="bottom-center"
        offset={{ bottom: 24 }}
        mobileOffset={{ bottom: 88 }}
      />
    </QueryClientProvider>
  )
}
