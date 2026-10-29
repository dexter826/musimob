import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

function reloadApp() {
  window.location.reload()
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Lỗi khi hiển thị ứng dụng.', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-dvh w-full items-center justify-center bg-background px-6 py-16 text-center">
        <div className="w-full max-w-[420px]">
          <h1 className="font-serif text-[28px] leading-[1.2] font-medium tracking-[-0.01em] text-foreground">
            Ứng dụng gặp sự cố
          </h1>
          <p className="mx-auto mt-3 max-w-[320px] text-sm leading-[1.6] text-muted-foreground">
            Có lỗi khi hiển thị trang này. Tải lại để tiếp tục.
          </p>
          <Button
            type="button"
            onClick={reloadApp}
            className="mt-6 h-11 px-4 text-[13px] font-semibold"
          >
            Tải lại trang
          </Button>
        </div>
      </main>
    )
  }
}
