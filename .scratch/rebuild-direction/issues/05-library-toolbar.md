# 05 — Library toolbar: filter, add, FAB, count

Status: ready-for-agent
Blocked by: 04

## Mục tiêu

Thay filter/add/FAB và count trong shell A; giữ hành vi filter hiện có.

## File

- `src/app/app.tsx`
- `src/features/songs/components/filter-input.tsx`
- (tuỳ chọn) `src/features/songs/components/library-toolbar.tsx`

## Yêu cầu

- Search/filter 44px, 280px desktop, full mobile; label sr-only; icon search;
  placeholder theo COPY.md; nút clear X aria “Xóa bộ lọc”, refocus input.
- Filter instant, case-insensitive title+artist; không persist; count dưới h1:
  “12 bài” bình thường, “3 / 12 bài” khi filter (flag 2 trong spec).
- Add primary coral “Thêm bài” desktop trong title row; mobile chỉ FAB 56×64 dạng dấu sách,
  `aria-label="Thêm bài"`, safe-area; ẩn cả hai khi thư viện trống (empty CTA ở 06).
- `Tìm bài này` (06) và add mở panel với term hiện tại; prop/callback giữ nguyên.
- Không hai CTA add trong cùng state; topbar không còn add/count.
- Dùng token; light/dark.

## Acceptance

- Filter gõ/clear/refocus đúng; count x/y đúng; add desktop mở panel; FAB mobile mở panel;
  empty library không còn add ở toolbar.
- 1440/768/390; focus ring; 44 hit; không scroll ngang; build/lint.

## Không làm

- Không restyle list/grid (06), panel (07), menu (08).
- Không đổi logic filter/prefill ngoài label/count.
