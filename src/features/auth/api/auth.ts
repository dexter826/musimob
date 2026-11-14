import {
  EmailAuthProvider,
  GoogleAuthProvider,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getRedirectResult,
  linkWithCredential,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth'
import { getErrorCode } from '@/lib/errors'
import { firebaseAuth } from '@/lib/firebase'
import type { SignInMethod, User } from '../types'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function getAuthErrorMessage(error: unknown, fallback: string): string {
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
      return 'Cách đăng nhập này chưa được bật cho ứng dụng.'
    case 'auth/user-disabled':
      return 'Tài khoản này đã bị khoá.'
    case 'auth/account-exists-with-different-credential':
      return 'Email này đã dùng để đăng nhập bằng Google. Hãy đăng nhập bằng Google, rồi thêm mật khẩu trong menu tài khoản.'
    case 'auth/email-already-in-use':
      return 'Email này đã có tài khoản. Hãy đăng nhập, hoặc đặt lại mật khẩu nếu quên.'
    case 'auth/invalid-email':
      return 'Email không hợp lệ. Kiểm tra lại địa chỉ.'
    case 'auth/missing-password':
      return 'Chưa nhập mật khẩu.'
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu. Cần tối thiểu 8 ký tự.'
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email hoặc mật khẩu không đúng. Thử lại.'
    case 'auth/requires-recent-login':
      return 'Phiên đăng nhập đã cũ. Hãy đăng nhập lại rồi thử.'
    case 'auth/credential-already-in-use':
      return 'Mật khẩu này đã gắn với một tài khoản khác. Hãy chọn mật khẩu khác.'
    case 'auth/missing-action-code':
    case 'auth/invalid-action-code':
      return 'Link này không còn dùng được. Hãy yêu cầu link mới.'
    case 'auth/expired-action-code':
      return 'Link đã hết hạn. Hãy yêu cầu link mới.'
    default:
      return fallback
  }
}

function getLinkPasswordErrorMessage(error: unknown): string {
  switch (getErrorCode(error)) {
    case 'auth/email-already-in-use':
    case 'auth/credential-already-in-use':
      return 'Email này đã gắn với một tài khoản khác. Hãy đăng nhập bằng tài khoản đó.'
    default:
      return getAuthErrorMessage(error, 'Không thêm được mật khẩu. Thử lại.')
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
  const signInMethods: SignInMethod[] = []

  for (const profile of user.providerData) {
    if (profile.providerId === 'google.com') {
      signInMethods.push('google')
    }
    if (profile.providerId === 'password') {
      signInMethods.push('password')
    }
  }

  return {
    uid: user.uid,
    displayName: user.displayName?.trim() || fallback,
    photoURL: user.photoURL,
    email: user.email,
    emailVerified: user.emailVerified,
    signInMethods,
  }
}

async function reauthenticateWithGoogle(user: FirebaseUser): Promise<void> {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)

    if (!credential) {
      throw new Error('Không lấy được thông tin đăng nhập từ Google.')
    }

    await reauthenticateWithCredential(user, credential)
  } catch (error) {
    throw new Error(
      getAuthErrorMessage(error, 'Không xác nhận lại được. Thử lại.'),
      { cause: error },
    )
  }
}

export type AuthApi = {
  signInWithGoogle(): Promise<void>
  signInWithEmailAndPassword(email: string, password: string): Promise<void>
  createAccount(
    email: string,
    password: string,
    displayName: string,
  ): Promise<string>
  sendPasswordResetEmail(email: string): Promise<void>
  checkResetCode(oobCode: string): Promise<string>
  resetPassword(oobCode: string, newPassword: string): Promise<void>
  sendVerificationEmail(): Promise<void>
  reloadUser(): Promise<User | null>
  linkPassword(email: string, password: string): Promise<void>
  signOut(): Promise<void>
  onUserChanged(callback: (user: User | null) => void): () => void
  resolveRedirect(): Promise<void>
}

export const authApi: AuthApi = {
  async signInWithGoogle() {
    try {
      await signInWithPopup(firebaseAuth, googleProvider)
    } catch (error) {
      if (shouldRedirectAfterPopupError(error)) {
        try {
          await signInWithRedirect(firebaseAuth, googleProvider)
          return
        } catch (redirectError) {
          throw new Error(
            getAuthErrorMessage(
              redirectError,
              'Không đăng nhập được. Thử lại.',
            ),
            {
              cause: redirectError,
            },
          )
        }
      }

      throw new Error(
        getAuthErrorMessage(error, 'Không đăng nhập được. Thử lại.'),
        {
          cause: error,
        },
      )
    }
  },

  async signInWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        normalizeEmail(email),
        password,
      )
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, 'Không đăng nhập được. Thử lại.'),
        { cause: error },
      )
    }
  },

  async createAccount(email, password, displayName) {
    let credential

    try {
      credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        normalizeEmail(email),
        password,
      )
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, 'Không tạo được tài khoản. Thử lại.'),
        { cause: error },
      )
    }

    try {
      await updateProfile(credential.user, { displayName })
    } catch (error) {
      console.error('Không cập nhật được tên hiển thị.', error)
    }

    return credential.user.uid
  },

  async sendPasswordResetEmail(email) {
    try {
      await sendPasswordResetEmail(firebaseAuth, normalizeEmail(email), {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      })
    } catch (error) {
      const code = getErrorCode(error)
      if (
        code === 'auth/user-not-found' ||
        code === 'auth/invalid-credential'
      ) {
        return
      }

      throw new Error(
        getAuthErrorMessage(error, 'Không gửi được email. Thử lại.'),
        { cause: error },
      )
    }
  },

  async checkResetCode(oobCode) {
    try {
      const info = await checkActionCode(firebaseAuth, oobCode)
      return info.data.email ?? ''
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, 'Link không hợp lệ. Hãy yêu cầu link mới.'),
        { cause: error },
      )
    }
  },

  async resetPassword(oobCode, newPassword) {
    try {
      await confirmPasswordReset(firebaseAuth, oobCode, newPassword)
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, 'Không đặt lại được mật khẩu. Thử lại.'),
        { cause: error },
      )
    }
  },

  async sendVerificationEmail() {
    const user = firebaseAuth.currentUser
    if (!user) {
      throw new Error('Bạn chưa đăng nhập.')
    }

    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/`,
        handleCodeInApp: false,
      })
    } catch (error) {
      throw new Error(
        getAuthErrorMessage(error, 'Không gửi được email xác minh. Thử lại.'),
        { cause: error },
      )
    }
  },

  async reloadUser() {
    const user = firebaseAuth.currentUser
    if (!user) {
      return null
    }

    await user.reload()

    return toUser(user)
  },

  async linkPassword(email, password) {
    const user = firebaseAuth.currentUser
    if (!user) {
      throw new Error('Bạn chưa đăng nhập.')
    }

    const credential = EmailAuthProvider.credential(
      normalizeEmail(email),
      password,
    )

    try {
      await linkWithCredential(user, credential)
    } catch (error) {
      if (getErrorCode(error) === 'auth/requires-recent-login') {
        await reauthenticateWithGoogle(user)

        try {
          await linkWithCredential(user, credential)
        } catch (retryError) {
          throw new Error(getLinkPasswordErrorMessage(retryError), {
            cause: retryError,
          })
        }

        return
      }

      throw new Error(getLinkPasswordErrorMessage(error), { cause: error })
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
      throw new Error(
        getAuthErrorMessage(error, 'Không đăng nhập được. Thử lại.'),
        {
          cause: error,
        },
      )
    }
  },
}
