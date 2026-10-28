import { createContext, useContext } from 'react'
import type { AuthState } from '@/features/auth/hooks/use-auth'

export const AuthContext = createContext<AuthState | null>(null)

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext phải nằm trong AppProvider.')
  }

  return context
}
