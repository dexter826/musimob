import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
      <main className="flex min-h-dvh w-full items-center justify-center bg-background px-6 sm:px-8 lg:px-12 xl:px-16">
        <Card className="flex w-full max-w-[560px] flex-col items-center px-6 py-16 text-center">
          <h1 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[34px]">
            Ứng dụng gặp sự cố
          </h1>
          <p className="mx-auto mt-2.5 max-w-[280px] text-[13.5px] leading-[1.55] text-muted-foreground lg:mt-3 lg:max-w-[380px] lg:text-[15px]">
            Có lỗi khi hiển thị trang này. Tải lại để tiếp tục.
          </p>
          <Button
            type="button"
            onClick={reloadApp}
            className="mt-6 h-11 px-4 text-[13px] font-semibold"
          >
            Tải lại trang
          </Button>
        </Card>
      </main>
    )
  }
}
