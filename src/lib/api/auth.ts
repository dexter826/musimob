import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { getErrorCode } from '../errors'
import { firebaseAuth } from './firebase'
import type { MusimobApi, User } from './types'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

function getAuthErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Bạn đã đóng cửa sổ đăng nhập.'
    case 'auth/network-request-failed':
      return 'Mất kết nối. Kiểm tra mạng rồi thử lại.'
    case 'auth/too-many-requests':
      return 'Quá nhiều lần thử. Đợi một lát rồi thử lại.'
    case 'auth/unauthorized-domain':
      return 'Tên miền này chưa được phép đăng nhập.'
    case 'auth/operation-not-allowed':
      return 'Đăng nhập Google chưa được bật cho ứng dụng này.'
    case 'auth/user-disabled':
      return 'Tài khoản này đã bị khoá.'
    case 'auth/account-exists-with-different-credential':
      return 'Email này đã dùng một cách đăng nhập khác.'
    default:
      return 'Không đăng nhập được. Thử lại.'
  }
}

function shouldRedirectAfterPopupError(error: unknown): boolean {
  const code = getErrorCode(error)
  return (
    code === 'auth/popup-blocked' ||
    code === 'auth/operation-not-supported-in-this-environment'
  )
}

function toUser(user: FirebaseUser): User {
  const fallback = user.email?.split('@')[0]?.trim() || 'Bạn'

  return {
    uid: user.uid,
    displayName: user.displayName?.trim() || fallback,
    photoURL: user.photoURL,
  }
}

export const authApi: MusimobApi['auth'] = {
  async signInWithGoogle() {
    try {
      await signInWithPopup(firebaseAuth, googleProvider)
    } catch (error) {
      if (shouldRedirectAfterPopupError(error)) {
        try {
          await signInWithRedirect(firebaseAuth, googleProvider)
          return
        } catch (redirectError) {
          throw new Error(getAuthErrorMessage(redirectError), {
            cause: redirectError,
          })
        }
      }

      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },

  async signOut() {
    await firebaseSignOut(firebaseAuth)
  },

  onUserChanged(callback) {
    return onAuthStateChanged(firebaseAuth, (user) => {
      callback(user ? toUser(user) : null)
    })
  },

  async resolveRedirect() {
    try {
      await getRedirectResult(firebaseAuth)
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
}
