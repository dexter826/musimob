const STORAGE_PREFIX = 'musimob:verification-skipped:'

export function isVerificationSkipped(uid: string): boolean {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + uid) === '1'
  } catch {
    return false
  }
}

export function skipVerification(uid: string): void {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + uid, '1')
  } catch {
    // localStorage có thể bị chặn; bỏ qua xác minh chỉ giữ trong phiên hiện tại.
  }
}
