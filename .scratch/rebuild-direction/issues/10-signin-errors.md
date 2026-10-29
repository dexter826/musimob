# 10 — Sign-in + app loading + error boundary

Status: ready-for-agent
Blocked by: 03

## Mục tiêu

Dựng lại màn đăng nhập theo “bookplate trên brand sleeve”, app loading và error
boundary theo hệ mới.

## File

- `src/features/auth/components/sign-in-screen.tsx`
- `src/app/app-loading.tsx`
- `src/components/error-boundary.tsx`
- `src/lib/api/auth.ts` (giữ mapping lỗi; chỉ đổi nếu COPY.md yêu cầu)
- `src/components/brand-logo.tsx` (từ 04)

## Yêu cầu

- Sign-in: nền `--background`, không radial/vinyl; composition bookplate + sleeve.
  Sleeve dùng **brand art** (night sleeve + symbol coral/asset `assets/brand`), không
  dùng bìa iTunes của prototype. Bookplate 360/350, logo ngang light/dark, h1 Lora
  “Thư viện riêng của bạn”, lede, nút ink “Đăng nhập bằng Google” (G icon), fine print
  “Chỉ bạn thấy thư viện của mình.”.
- Loading: nút disabled, `aria-busy`, nhãn “Đang đăng nhập…” + spinner.
- Error: `role="alert"` dưới nút, copy mapping hiện có; thử lại được.
- App loading: wordmark/logo + “Đang tải…” + `role="status"`; paper/ink.
- Error boundary: “Ứng dụng gặp sự cố” + “Có lỗi khi hiển thị trang này. Tải lại để tiếp tục.”
  + “Tải lại trang”; paper/ink; focus.
- Light/dark; 390/768/1440; không dùng ảnh bên thứ ba; không gradient.

## Acceptance

- Signed-out ở 390/768/1440 light/dark; contrast; focus; button 44; loading/error states;
  logo đúng; build/lint.
- Không regression auth popup→redirect (không đổi logic).

## Không làm

- Không đổi Auth/Firebase logic; không đổi title/OG.
- Không dựng fixture/auth bypass.
