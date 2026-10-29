# 03 — ThemeProvider + no-flash + Toaster theme

Status: ready-for-agent
Blocked by: 02

## Mục tiêu

Bật dual theme: mặc định theo hệ thống, có persistence, no-flash, meta theme-color
và Toaster đổi theo theme. Chưa làm UI chọn theme (ticket 09).

## File

- `src/app/provider.tsx`
- `src/components/ui/sonner.tsx` (nếu cần)
- `index.html` (`suppressHydrationWarning` nếu cần)
- file mới `src/app/theme-meta.tsx` (hoặc hook tương đương)

## Yêu cầu

- Dùng `next-themes` (đã có dependency): `attribute="class"`, `defaultTheme="system"`,
  `enableSystem`, `storageKey="musimob:theme"`, `disableTransitionOnChange`.
- `.dark` trên `<html>` điều khiển token; CSS `color-scheme` đã có ở ticket 02.
- Meta `theme-color` theo resolved theme: `#F4F3EE` light, `#11130F` dark; cập nhật khi
  theme/system đổi; giá trị ban đầu khớp để không nháy.
- Toaster: bỏ `theme="dark"` hardcode; dùng theme/resolvedTheme; giữ vị trí bottom-center,
  offset/mobile offset (có thể chỉnh ở ticket 09).
- Không nháy sai theme khi load (next-themes script); kiểm bằng reload ở system dark/light.

## Acceptance

- Mặc định theo `prefers-color-scheme`; đổi OS → app đổi.
- `localStorage["musimob:theme"]` được set khi API `setTheme` được gọi (test bằng console
  hoặc tạm; UI ở 09).
- `.dark`, `color-scheme`, meta theme-color, Toaster khớp nhau.
- Build/lint pass; không console error.

## Không làm

- Không làm menu/theme radio (09).
- Không đổi token (02) hay component khác.
