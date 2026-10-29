import { Bookmark, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type EmptyStateProps = {
  onAdd: () => void
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <Bookmark aria-hidden="true" className="size-6 text-primary" />
      <h2 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium text-foreground">
        Chưa có bài nào
      </h2>
      <p className="mx-auto mt-2 max-w-[320px] text-sm leading-[1.6] text-muted-foreground">
        Bài hát bạn thêm sẽ xuất hiện ở đây.
      </p>
      <Button
        type="button"
        onClick={onAdd}
        className="mt-6 h-11 gap-2 px-4 text-[13px] font-semibold"
      >
        <Plus aria-hidden="true" className="size-4" />
        Thêm bài đầu tiên
      </Button>
    </div>
  )
}
