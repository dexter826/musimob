export function DiscoverSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Đang tải danh sách bài hát"
      className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 wide:grid-cols-4 widest:grid-cols-6"
    >
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className="flex flex-col">
          <div className="aspect-square w-full animate-pulse rounded-sm bg-surface-2" />
          <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-surface-2" />
          <div className="mt-1 h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        </div>
      ))}
    </div>
  )
}
