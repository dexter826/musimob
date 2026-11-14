import type { ReactNode } from 'react'
import { Wordmark } from '@/components/wordmark'

type AuthLayoutProps = {
  title: string
  description: ReactNode
  children: ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-background px-5 py-10 sm:px-8">
      <section className="relative w-full max-w-[420px] rounded-sm border border-rule bg-surface p-6 shadow-[6px_6px_0_0_var(--surface-2)] sm:p-8">
        <span
          aria-hidden="true"
          className="absolute -top-6 right-9 h-12 w-4 bg-primary [clip-path:polygon(0_100%,100%_100%,100%_0%,50%_18%,0_0%)]"
        />

        <Wordmark className="h-7 text-[15.5px]" />

        <h1 className="mt-8 font-serif text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-foreground max-md:text-[28px]">
          {title}
        </h1>
        <div className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-muted-foreground max-md:text-sm">
          {description}
        </div>

        <div className="mt-7">{children}</div>
      </section>
    </main>
  )
}
