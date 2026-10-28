import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { AuthContext } from './auth-context'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
