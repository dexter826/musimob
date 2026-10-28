import { Card } from '@/components/ui/card'

export function EmptyState() {
  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-0 px-6 py-16 text-center lg:mt-2 lg:rounded-[28px] lg:px-10 lg:py-20">
      <h1 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[34px]">
        Chưa có bài nào
      </h1>
      <p className="mx-auto mt-2.5 max-w-[280px] text-[13.5px] leading-[1.55] text-muted-foreground lg:mt-3 lg:max-w-[380px] lg:text-[15px]">
        Bài hát bạn thêm sẽ xuất hiện ở đây.
      </p>
    </Card>
  )
}
