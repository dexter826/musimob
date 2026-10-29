# 08 — Actions menu + edit + delete + undo

Status: ready-for-agent
Blocked by: 06

## Mục tiêu

Restyle menu hàng, form sửa và xác nhận xóa; giữ undo/restore hiện có.

## File

- `src/features/songs/components/song-actions-menu.tsx`
- `src/features/songs/components/edit-sheet.tsx`
- `src/features/songs/components/delete-confirm.tsx`
- `src/components/song-form.tsx`
- `src/app/app.tsx` (remove/undo/flash)

## Yêu cầu

- Menu ⋯: trigger 44 hit; “Sửa”, “Xóa”; keyboard/focus; surface/popover token.
- Edit sheet: prefilled; previewUrl không sửa; labels/validation/duplicate như manual;
  “Lưu thay đổi”/“Đang lưu…”; đóng khi thành công; lỗi cạnh field.
- Delete confirm: copy hiện có (“Xóa bài này?”, mô tả, “Huỷ”/“Xóa”); loading
  “Đang xóa…”; không đóng khi deleting; lỗi + thử lại; dừng preview nếu đang phát bài đó.
- Undo: giữ toast 10s + restore same doc id/createdAt + flash; failure “Không khôi phục
  được bài” + “Thử lại”. Toaster styling là ticket 09; ở đây giữ call/copy.
- Token thay hardcoded; light/dark; focus/44.

## Acceptance

- Menu mở bằng chuột/phím; edit save; delete confirm/loading/error; undo/restore; preview
  dừng khi xóa bài đang nghe; 390/768/1440; light/dark; build/lint.

## Không làm

- Không đổi Firestore/restore logic; không style Toaster (09).
- Không đổi copy ngoài COPY.md.
