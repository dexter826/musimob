# 12 — Verification + QA checklist + final report

Status: ready-for-agent
Blocked by: 11

## Mục tiêu

Kiểm chứng phần agent làm được; giao checklist signed-in cho người dùng; báo cáo
trung thực phần chưa kiểm.

## File

- `.scratch/rebuild-direction/qa-checklist.md`
- `.scratch/rebuild-direction/verify/` (ảnh chụp)
- `.scratch/rebuild-direction/verification.md` (báo cáo)

## Yêu cầu

- Agent: build/lint/Prettier; grep token/copy/old hex; contrast tính từ token;
  screenshot **sign-in/static** 390/768/1440 light/dark bằng Chrome headless; kiểm
  DOM/computed-style cho sign-in, focus, font, theme-color.
- QA checklist per screen/state:
  - Signed-out: sign-in default/loading/error, app loading, error boundary.
  - Signed-in: list, grid, filter, filter-empty, empty, active preview, flash, add search
    (default/loading/empty/error/rate-limit/saved), manual form (validation/duplicate/
    saving/error), edit, delete confirm/deleting/error/undo, avatar menu, theme 3 lựa chọn,
    toasts save/delete/undo/preview-error.
  - Checks: contrast, 44px, focus visible/không bị che, keyboard, reduced-motion,
    390/768/1440, zoom 200%, long title/artist, empty string, aria-label, safe-area.
- Không fixture/auth bypass; không tự đăng nhập.
- Báo cáo: liệt kê surface đã kiểm/ chưa kiểm; signed-in chỉ “đạt” khi người dùng trả
  checklist; trước đó ghi “chưa kiểm”.
- Nếu prototype được đưa lên branch `prototype/soloi`, trỏ spec/README vào branch thay
  vì `.scratch` (chỉ khi user đồng ý).

## Acceptance

- `qa-checklist.md` đủ màn hình/state; `verification.md` có kết quả + giới hạn.
- Ảnh sign-in/static đủ breakpoint/theme; không claim signed-in đã kiểm.
- Không sửa app code trong ticket này (trừ lỗi phát hiện → tạo ticket mới).

## Không làm

- Không tự chạy signed-in; không thêm auth bypass; không đổi design.
