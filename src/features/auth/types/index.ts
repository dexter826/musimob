export type SignInMethod = 'google' | 'password'

export type User = {
  uid: string
  displayName: string
  photoURL: string | null
  email: string | null
  emailVerified: boolean
  signInMethods: SignInMethod[]
}
