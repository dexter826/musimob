# 09 — Avatar menu + theme menu + toasts

Status: ready-for-agent
Blocked by: 03, 04

## Mục tiêu

Menu tài khoản mới (gồm chọn giao diện) và toàn bộ toast theo hệ mới.

## File

- `src/features/auth/components/avatar-menu.tsx`
- `src/app/provider.tsx` (Toaster)
- `src/components/ui/sonner.tsx`
- `src/app/app.tsx` (toast save/delete/undo)
- `src/components/audio-preview-provider.tsx` (toast preview error)
- `src/index.css` (Sonner overrides mới)

## Yêu cầu

- Avatar menu: name, section “Giao diện” với 3 lựa chọn “Theo hệ thống / Sáng / Tối”
  (radio/check, dùng `next-themes`), separator, “Đăng xuất”; trigger 44 hit đã style ở 04.
- Theme: chọn → `setTheme`, persist `musimob:theme`, `.dark` + `color-scheme` + meta
  theme-color đồng bộ; “Theo hệ thống” theo OS; không nháy.
- Sign-out confirm giữ copy hiện có; lỗi “Không đăng xuất được. Thử lại.”.
- Toaster: bỏ theme hardcode; nền ink/paper đảo theo theme; action coral; radius 8;
  font 13; bottom-center; mobile offset trên FAB (≈96px); dark/light đúng.
- Toasts: save “Đã lưu bài”, delete “Đã xóa bài” + “Hoàn tác” (10s), restore loading/
  success/failure + “Thử lại”, preview “Bài này không có bản nghe thử” / “Không nghe thử
  được. Kiểm tra mạng rồi thử lại.”; aria-live từ Sonner; không mất action.
- Token thay hardcoded; focus/keyboard.

## Acceptance

- Theme 3 lựa chọn hoạt động + persist; OS default; meta/toaster khớp.
- Menu keyboard; sign-out confirm; toasts đúng theme/copy/offset; undo 10s chạy.
- 390/768/1440; light/dark; build/lint.

## Không làm

- Không đổi auth/Firestore/restore logic.
- Không đổi copy ngoài COPY.md; không đổi duration trừ flag 1.
