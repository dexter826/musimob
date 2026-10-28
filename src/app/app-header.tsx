type AppHeaderProps = {
  songCount: number
}

export function AppHeader({ songCount }: AppHeaderProps) {
  return (
    <header className="px-5 pt-5 pb-3">
      <p className="text-[17px] font-bold tracking-[-0.02em]">
        musi<span className="text-accent">mob</span>
      </p>
      <p className="mt-1 text-[11.5px] text-muted">
        {songCount} bài · đồng bộ qua Google
      </p>
    </header>
  )
}
