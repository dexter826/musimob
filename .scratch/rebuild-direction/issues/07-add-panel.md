# 07 — Add panel: search + manual form

Status: ready-for-agent
Blocked by: 04, 05

## Mục tiêu

Restyle toàn bộ panel thêm bài (search/manual) theo hệ mới; giữ nguyên hành vi iTunes,
validation, prefill, dedupe.

## File

- `src/features/add-song/components/add-sheet.tsx`
- `src/components/responsive-panel.tsx`
- `src/features/search-song/components/song-search.tsx`
- `src/features/search-song/components/search-input.tsx`
- `src/features/search-song/components/search-result-row.tsx`
- `src/features/search-song/components/already-saved-badge.tsx`
- `src/components/song-form.tsx`
- `src/features/add-song/components/manual-form.tsx`
- vendored ui nếu cần style (sheet/dialog/input/field/button)

## Yêu cầu

- Mobile <768: drawer; desktop: dialog; max 560, 85dvh; surface, `--radius-sheet`,
  border rule; header 18px; close/back 44 hit; focus trap/Escape/overscroll contain.
- Search mode: title “Thêm bài”; desc theo COPY.md; action “Nhập thủ công”; input 44/16
  (placeholder/aria theo COPY.md); states: <2 chars, loading, empty, error/rate-limit/timeout,
  retry; result rows với “Lưu”/“Đang lưu”, “Đã lưu”, save error; cover 48.
- Manual mode: title “Nhập thủ công”; back; fields “Tên bài”, “Nghệ sĩ”, “URL ảnh bìa”;
  validation/duplicate/cover hint; submit “Lưu bài”/“Đang lưu…”; prefill từ filter;
  Enter/IME behavior giữ nguyên.
- Lỗi cạnh field; pending disabled + nhãn; không mất dữ liệu khi đóng/mở trong flow hiện có.
- Token thay hardcoded; light/dark; không dùng bìa bên thứ ba.

## Acceptance

- Mở từ desktop add + mobile FAB + “Tìm bài này”; search states; save; already-saved;
  manual validation/duplicate/saving; error; 390/768/1440; light/dark; keyboard/focus;
  build/lint.

## Không làm

- Không đổi API/throttle/cache iTunes, dedupe, Firestore.
- Không làm edit/delete/account/toasts (08/09).
