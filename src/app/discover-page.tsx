import { useDocumentTitle } from '@/hooks/use-document-title'
import type { useSongs } from '@/features/songs/hooks/use-songs'

const DISCOVER_TITLE = 'MusiMOB: Khám phá'

type DiscoverPageProps = {
  songsState: ReturnType<typeof useSongs>
}

export function DiscoverPage({ songsState }: DiscoverPageProps) {
  useDocumentTitle(DISCOVER_TITLE)
  void songsState

  return (
    <div className="flex flex-1 flex-col pb-10">
      <div className="flex items-end justify-between gap-6 pt-7 pb-5 max-md:flex-col max-md:items-stretch max-md:gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-balance text-foreground max-md:text-[28px]">
            Khám phá
          </h1>
          <p className="mt-2 text-xs font-medium text-muted-foreground tabular-nums">
            Gợi ý ngẫu nhiên từ kho nhạc và ca sĩ đã lưu
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {/* Nội dung danh sách 12 bài hát sẽ được triển khai tại Ticket 02 */}
      </div>
    </div>
  )
}
