export const MIN_PASSWORD_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getEmailError(email: string): string | null {
  const value = email.trim()

  if (!value) {
    return 'Nhập email.'
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Email không hợp lệ. Kiểm tra lại địa chỉ.'
  }

  return null
}

export function getPasswordError(password: string): string | null {
  if (!password) {
    return 'Nhập mật khẩu.'
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Mật khẩu cần tối thiểu ${MIN_PASSWORD_LENGTH} ký tự.`
  }

  return null
}

export function getConfirmPasswordError(
  password: string,
  confirmPassword: string,
): string | null {
  if (!confirmPassword) {
    return 'Nhập lại mật khẩu.'
  }

  if (password !== confirmPassword) {
    return 'Hai mật khẩu không khớp. Nhập lại mật khẩu mới.'
  }

  return null
}
