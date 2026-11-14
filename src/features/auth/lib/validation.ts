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
