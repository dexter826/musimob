import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { authApi } from '@/lib/api/auth'
import type { User } from '@/lib/api/types'
import { isVerificationSkipped, skipVerification } from '../lib/verification'

export type PendingAction =
  'google' | 'email' | 'signUp' | 'reset' | 'verification' | 'link' | null

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Không hoàn tất được. Thử lại.'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [pending, setPending] = useState<PendingAction>(null)
  const [error, setError] = useState<string | null>(null)
  const [skippedUid, setSkippedUid] = useState<string | null>(null)

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

  const needsVerification = useMemo(() => {
    if (!user) return false
    if (user.emailVerified) return false
    if (!user.signInMethods.includes('password')) return false
    if (user.signInMethods.includes('google')) return false
    if (skippedUid === user.uid) return false

    return !isVerificationSkipped(user.uid)
  }, [user, skippedUid])

  const run = useCallback(
    async (action: PendingAction, task: () => Promise<void>) => {
      setError(null)
      setPending(action)

      try {
        await task()
      } catch (caught) {
        setError(getErrorMessage(caught))
      } finally {
        setPending(null)
      }
    },
    [],
  )

  const signInWithGoogle = useCallback(async () => {
    await run('google', () => authApi.signInWithGoogle())
  }, [run])

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      await run('email', () =>
        authApi.signInWithEmailAndPassword(email, password),
      )
    },
    [run],
  )

  const createAccount = useCallback(
    async (email: string, password: string, displayName: string) => {
      await run('signUp', async () => {
        const uid = await authApi.createAccount(email, password, displayName)

        try {
          await authApi.sendVerificationEmail()
        } catch {
          // Không gửi được email xác minh thì không kẹt người dùng ngoài Thư viện.
          skipVerification(uid)
          setSkippedUid(uid)
          toast.error('Không gửi được email xác minh', {
            description:
              'Bạn vẫn dùng được Thư viện. Hãy kiểm tra lại địa chỉ email sau.',
          })
        }
      })
    },
    [run],
  )

  const sendResetEmail = useCallback(async (email: string) => {
    setError(null)
    setPending('reset')

    try {
      await authApi.sendPasswordResetEmail(email)
    } catch (caught) {
      setError(getErrorMessage(caught))
      throw caught
    } finally {
      setPending(null)
    }
  }, [])

  const checkResetCode = useCallback(async (oobCode: string) => {
    return authApi.checkResetCode(oobCode)
  }, [])

  const resetPassword = useCallback(
    async (oobCode: string, newPassword: string) => {
      setError(null)
      setPending('reset')

      try {
        await authApi.resetPassword(oobCode, newPassword)
      } finally {
        setPending(null)
      }
    },
    [],
  )

  const resendVerification = useCallback(async () => {
    await run('verification', () => authApi.sendVerificationEmail())
  }, [run])

  const reloadUser = useCallback(async () => {
    await run('verification', async () => {
      const refreshed = await authApi.reloadUser()
      if (refreshed) setUser(refreshed)
    })
  }, [run])

  const linkPassword = useCallback(async (email: string, password: string) => {
    setError(null)
    setPending('link')

    try {
      await authApi.linkPassword(email, password)
    } finally {
      setPending(null)
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

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    isAuthLoading,
    pending,
    error,
    needsVerification,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    sendResetEmail,
    checkResetCode,
    resetPassword,
    resendVerification,
    reloadUser,
    linkPassword,
    signOut,
    clearError,
  }
}

export type AuthState = ReturnType<typeof useAuth>
