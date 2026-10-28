import { AppHeader } from './app-header'
import { EmptyState } from './empty-state'

export function App() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[520px] bg-canvas">
      <AppHeader songCount={0} />
      <EmptyState />
    </div>
  )
}
