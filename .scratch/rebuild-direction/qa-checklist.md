# QA — Sổ lưu rebuild

Status: passed — user-run 2026-10-30
Branch: `rebuild/so-luu`
Run: signed-in by the user; agent already checked sign-in/static.
Không dùng fixture/auth bypass. Không sửa app code trong ticket này.

## Cách chạy

1. `npm run dev`, mở app, đăng nhập Google.
2. Chạy từng state ở 390, 768, 1440; light, dark, system; zoom 200%.
3. Ghi `pass` / `fail` + ghi chú; chụp màn hình nếu fail.
4. Fail → tạo ticket mới, không sửa trực tiếp trong lúc QA.

## A. Signed-out (agent static)

| # | State | Kiểm | Kết quả |
|---|-------|------|---------|
| A1 | Sign-in mặc định | Bookplate + brand sleeve; logo; h1 Lora; lede; nút ink “Đăng nhập bằng Google”; fine print; không bìa ngoài | pass 768/1440 light+dark; 390 cần user |
| A2 | Sign-in loading | Nút disabled, spinner, “Đang đăng nhập…”, `aria-busy` | chưa trigger |
| A3 | Sign-in error | Đóng popup / mất mạng; message đúng, `role="alert"` | chưa trigger |
| A4 | App loading | Logo + “Đang tải…” + `role="status"`; logo thẳng hàng shell | pass dark 1440 |
| A5 | Error boundary | “Ứng dụng gặp sự cố”; “Tải lại trang”; focus | chưa trigger |

## B. Signed-in (user)

| # | State | Kiểm |
|---|-------|------|
| B1 | List | Row 64, cover 48, hover, active tab/wash/meta, actions 44, long title/artist |
| B2 | Grid | 2/3/4/6 cột, title/artist dưới cover, active tab/title/pause, actions |
| B3 | Filter | Gõ, xóa, refocus, count “x / y bài”, không scroll ngang |
| B4 | Filter-empty | “Không có bài nào khớp.”; Xóa bộ lọc; Tìm bài này; 2 CTA 44 |
| B5 | Empty | “Chưa có bài nào”; CTA duy nhất; header/FAB ẩn |
| B6 | Active preview | Một bài; play/pause; row/grid; stop khi đóng sheet, đổi filter, xóa, đăng xuất; thiếu preview tooltip/toast |
| B7 | Flash | Thêm/undo: ring 2s + scroll; reduced-motion không smooth |
| B8 | Add — search | Hint, loading, empty, error, rate-limit, timeout; Lưu/Đang lưu; Đã lưu; save error |
| B9 | Add — manual | Validation, duplicate, cover hint, saving, error; Enter/IME |
| B10 | Edit | Prefill; previewUrl không sửa; validation; lưu; đóng khi xong |
| B11 | Delete | Copy; loading; không đóng khi xóa; error; undo 10s; retry |
| B12 | Avatar menu | Name; Giao diện 3 lựa chọn; Đăng xuất confirm/loading/error |
| B13 | Toasts | Save/delete/undo/restore error/preview error; theme; action; aria-live |
| B14 | Theme | Light/dark/system; persist; meta theme-color; no flash |
| B15 | Loading/error/warning | Skeleton; error + Thử lại; auth warning; không layout jump |

## C. Cross-cutting

| # | Kiểm |
|---|------|
| C1 | Contrast: text ≥4.5:1; border/control ≥3:1; light + dark |
| C2 | Hit target ≥44×44: header, filter, actions, preview, FAB, sheets, menus, toasts |
| C3 | Focus-visible 2px; không bị che; keyboard đi hết luồng |
| C4 | `prefers-reduced-motion`: không smooth scroll/transition; flash giữ trạng thái cuối |
| C5 | Responsive 390/768/1440; không scroll ngang; safe-area FAB |
| C6 | Zoom 200%: không cắt chữ/CTA |
| C7 | Title/artist dài; title rỗng; artist rỗng; cover lỗi |
| C8 | aria-label icon-only; alt ảnh; heading hierarchy; skip link; `lang="vi"` |
| C9 | Toasts/errors `role="status"`/`alert`; aria-live |
| C10 | 30s preview: nghe được, pause/resume, stop đúng; không progress/seek |

## Kết quả

- Agent: A1 (768/1440 light+dark), A4 dark — pass.
- User: B1–B15 + C1–C10 — **pass** (2026-10-30).
- A2/A3/A5: chưa trigger; code-checked.
- Signed-in visual: **đạt** (user-run).
