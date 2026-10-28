import { useCallback, useEffect, useState } from 'react'
import { authApi } from '@/lib/api/auth'
import type { User } from '@/lib/api/types'

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Không đăng nhập được. Thử lại.'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    let isAuthSettled = false
    let isRedirectSettled = false

    // Redirect kết thúc sau khi observer bắn; chỉ tắt loading khi cả hai đã xong
    // để không flash màn đăng nhập khi quay về từ Google.
    function finishLoading() {
      if (isActive && isAuthSettled && isRedirectSettled) {
        setIsAuthLoading(false)
      }
    }

    const unsubscribe = authApi.onUserChanged((nextUser) => {
      if (!isActive) return

      setUser(nextUser)
      if (nextUser) {
        setError(null)
      }

      isAuthSettled = true
      finishLoading()
    })

    authApi
      .resolveRedirect()
      .catch((redirectError: unknown) => {
        if (isActive) {
          setError(getErrorMessage(redirectError))
        }
      })
      .finally(() => {
        isRedirectSettled = true
        finishLoading()
      })

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(async () => {
    setError(null)
    setIsSigningIn(true)

    try {
      await authApi.signInWithGoogle()
    } catch (signInError) {
      setError(getErrorMessage(signInError))
    } finally {
      setIsSigningIn(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setError(null)

    try {
      await authApi.signOut()
    } catch (signOutError) {
      setError('Không đăng xuất được. Thử lại.')
      console.error('Không đăng xuất được.', signOutError)
    }
  }, [])

  return {
    user,
    isAuthLoading,
    isSigningIn,
    error,
    signIn,
    signOut,
  }
}

export type AuthState = ReturnType<typeof useAuth>
