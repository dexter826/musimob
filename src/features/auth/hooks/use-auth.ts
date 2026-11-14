import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { authApi } from '../api/auth'
import type { User } from '../types'
import { isVerificationSkipped, skipVerification } from '../lib/verification'

export type PendingAction =
  | 'google'
  | 'email'
  | 'signUp'
  | 'reset'
  | 'verification'
  | 'addPassword'
  | null

export type SignUpValues = {
  displayName: string
  email: string
  password: string
}

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
    if (skippedUid === user.uid) return false

    return !isVerificationSkipped(user.uid)
  }, [user, skippedUid])

  // Trả về thông điệp lỗi, null nghĩa là thành công.
  const runAction = useCallback(
    async (
      action: PendingAction,
      task: () => Promise<void>,
    ): Promise<string | null> => {
      setPending(action)

      try {
        await task()
        return null
      } catch (caught) {
        return getErrorMessage(caught)
      } finally {
        setPending(null)
      }
    },
    [],
  )

  const signInWithGoogle = useCallback(async () => {
    setError(await runAction('google', () => authApi.signInWithGoogle()))
  }, [runAction])

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setError(
        await runAction('email', () =>
          authApi.signInWithEmailAndPassword(email, password),
        ),
      )
    },
    [runAction],
  )

  const createAccount = useCallback(
    async (values: SignUpValues) => {
      setError(
        await runAction('signUp', async () => {
          const uid = await authApi.createAccount(
            values.email,
            values.password,
            values.displayName,
          )

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
        }),
      )
    },
    [runAction],
  )

  const sendResetEmail = useCallback(
    async (email: string) => {
      const message = await runAction('reset', () =>
        authApi.sendPasswordResetEmail(email),
      )
      setError(message)

      return message
    },
    [runAction],
  )

  const checkResetCode = useCallback(
    (oobCode: string) => authApi.checkResetCode(oobCode),
    [],
  )

  const resetPassword = useCallback(
    async (oobCode: string, newPassword: string) => {
      const message = await runAction('reset', () =>
        authApi.resetPassword(oobCode, newPassword),
      )
      setError(message)

      return message
    },
    [runAction],
  )

  const resendVerification = useCallback(async () => {
    setError(
      await runAction('verification', () => authApi.sendVerificationEmail()),
    )
  }, [runAction])

  const reloadUser = useCallback(async () => {
    setError(
      await runAction('verification', async () => {
        const refreshed = await authApi.reloadUser()
        if (refreshed) setUser(refreshed)
      }),
    )
  }, [runAction])

  const linkPassword = useCallback(
    async (email: string, password: string) => {
      setError(null)

      return runAction('addPassword', async () => {
        await authApi.linkPassword(email, password)

        const refreshed = await authApi.reloadUser().catch(() => null)
        if (refreshed) setUser(refreshed)
      })
    },
    [runAction],
  )

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
