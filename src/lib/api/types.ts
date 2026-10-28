export type User = {
  uid: string
  displayName: string
}

export type MusimobApi = {
  auth: {
    signInWithGoogle(): Promise<void>
    signOut(): Promise<void>
    onUserChanged(callback: (user: User | null) => void): () => void
    resolveRedirect(): Promise<void>
  }
}
