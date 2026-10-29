import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-dvh bg-background px-[var(--gutter)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[var(--page-max)] flex-col">
        {children}
      </div>
    </div>
  )
}
