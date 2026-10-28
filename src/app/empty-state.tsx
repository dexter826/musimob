export function EmptyState() {
  return (
    <div className="px-6 pt-16 pb-14 text-center">
      <p className="text-[22px] font-semibold tracking-[-0.02em]">
        Chưa có bài nào
      </p>
      <p className="mx-auto mt-2.5 max-w-[260px] text-[13.5px] leading-[1.55] text-muted">
        Thêm bài đầu tiên để lần sau vào quán karaoke là có sẵn danh sách.
      </p>
      <button
        type="button"
        className="mt-6 rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-[#1a0a06]"
      >
        Thêm bài đầu tiên
      </button>
    </div>
  )
}
