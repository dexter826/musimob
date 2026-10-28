export function EmptyState() {
  return (
    <div className="px-6 pt-16 pb-14 text-center sm:pt-24 lg:pt-32">
      <h1 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[30px]">
        Chưa có bài nào
      </h1>
      <p className="mx-auto mt-2.5 max-w-[260px] text-[13.5px] leading-[1.55] text-muted lg:max-w-[340px] lg:text-[14.5px]">
        Thêm bài đầu tiên để lần sau vào quán karaoke là có sẵn danh sách.
      </p>
      <button
        type="button"
        className="mt-6 rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-accent-ink hover:bg-accent/90 active:bg-accent/80"
      >
        Thêm bài đầu tiên
      </button>
    </div>
  )
}
