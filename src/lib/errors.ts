export function getErrorCode(error: unknown): string {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return ''
  }

  const code = (error as { code?: unknown }).code
  return typeof code === 'string' ? code : ''
}
