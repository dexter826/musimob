# 06 — Song list + grid + active preview + states

Status: ready-for-agent
Blocked by: 05

## Mục tiêu

Dựng view list mặc định và grid thứ hai theo anatomy “Sổ lưu”; đưa active preview,
flash, skeleton, error, empty/filter-empty vào hệ mới.

## File

- `src/features/songs/components/song-list.tsx`
- `src/features/songs/components/song-row.tsx`
- `src/features/songs/components/song-grid.tsx` (+ `song-card.tsx` nếu tách)
- `src/components/preview-button.tsx`
- `src/components/song-cover.tsx`
- `src/features/songs/components/empty-state.tsx`
- `src/app/app.tsx` (active/ flash props nếu cần)

## Yêu cầu

- List: row 64px, cover 48px/2px radius, title 14.5/600, artist 12.5; hover surface-2;
  ⋯ menu trigger 44 hit (menu 08); preview 26 visual/44 hit.
- Active row: `activeKey === songPreviewKey(song.id)` → tab coral 3px trái, wash
  `--bookmark-soft`, meta “Đang nghe thử”, preview pause; một bài tại một thời điểm.
  Giữ stop behaviors hiện có (sheet close, search change, delete, sign-out).
- Grid: 6 cột desktop, 2 cột mobile; cover fluid; active = tab nhỏ trên cover + title
  `--bookmark-text` + pause; title 13.5 line-clamp 1.
- Flash add/undo: ring coral 2px 2s + scrollIntoView; reduced-motion aware; khác active.
- Preview: aria-label “Nghe thử {title}, {artist}” / “Dừng nghe thử {title}”; missing URL
  focusable/aria-disabled + tooltip/toast như cũ; không progress/timer.
- Empty: “Chưa có bài nào” + “Bài hát bạn thêm sẽ xuất hiện ở đây.” + CTA “Thêm bài đầu tiên”;
  đây là CTA add duy nhất khi trống.
- Filter-empty: “Không có bài nào khớp.” + “Xóa bộ lọc” + “Tìm bài này” (seed add term).
- Skeleton list/grid + `role="status"` sr-only “Đang tải danh sách…”; error card + “Thử lại”;
  auth warning inline.
- Cover alt="" trong row/card (title/artist đã mang nghĩa); long title truncate;
  view mode persistence giữ nguyên.
- Token thay toàn bộ hardcoded cũ trong các file này.

## Acceptance

- 1440/768/390; light/dark; list/grid; active một bài; pause/resume; flash; skeleton/error;
  empty/filter-empty; keyboard/focus; 44 hit; không scroll ngang; build/lint.

## Không làm

- Không làm add/edit/delete panel/menu (07/08).
- Không đổi logic data/audio/search.
