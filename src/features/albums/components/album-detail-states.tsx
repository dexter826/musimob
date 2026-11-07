import { Link } from 'react-router'
import { Disc3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SKELETON_ROWS = [0, 1, 2]

export function AlbumSongsSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-0.5">
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          className="flex min-h-16 items-center gap-3.5 rounded-lg py-2 pr-2 pl-3"
        >
          <div className="size-12 shrink-0 rounded-sm bg-surface-2" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-3 w-2/5 rounded-sm bg-surface-2" />
            <div className="h-2.5 w-1/4 rounded-sm bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AlbumDetailSkeleton() {
  return (
    <div role="status" className="flex flex-1 flex-col pb-24 md:pb-10">
      <span className="sr-only">Đang tải album…</span>
      <div aria-hidden="true" className="pt-7 pb-5">
        <div className="h-5 w-16 rounded-sm bg-surface-2" />
        <div className="mt-5 flex items-end gap-4">
          <div className="size-20 shrink-0 rounded-sm bg-surface-2" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-8 w-1/2 rounded-sm bg-surface-2" />
            <div className="h-3 w-16 rounded-sm bg-surface-2" />
          </div>
        </div>
      </div>
      <AlbumSongsSkeleton />
    </div>
  )
}

export function AlbumDetailEmptyState({
  onAdd,
  isLibraryEmpty,
}: {
  onAdd: () => void
  isLibraryEmpty: boolean
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <Disc3 aria-hidden="true" className="size-6 text-primary" />
      <h2 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium text-foreground">
        Album chưa có bài nào
      </h2>
      <p className="mx-auto mt-2 max-w-[320px] text-sm leading-[1.6] text-muted-foreground">
        {isLibraryEmpty
          ? 'Thêm bài vào Thư viện trước khi chọn cho album.'
          : 'Thêm bài đã lưu vào album để bắt đầu gom nhạc.'}
      </p>
      {isLibraryEmpty ? (
        <Button asChild className="mt-6 h-11">
          <Link to="/">Về Thư viện</Link>
        </Button>
      ) : (
        <Button type="button" onClick={onAdd} className="mt-6 h-11">
          Thêm bài vào album
        </Button>
      )}
    </div>
  )
}

export function AlbumDetailNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <Disc3 aria-hidden="true" className="size-6 text-muted-foreground" />
      <h2 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium text-foreground">
        Không tìm thấy album
      </h2>
      <p className="mx-auto mt-2 max-w-[320px] text-sm leading-[1.6] text-muted-foreground">
        Album có thể đã bị xóa.
      </p>
      <Button asChild className="mt-6 h-11 px-4 text-[13px] font-semibold">
        <Link to="/albums">Về danh sách album</Link>
      </Button>
    </div>
  )
}
