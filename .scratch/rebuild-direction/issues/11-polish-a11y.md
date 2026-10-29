# 11 — Polish, a11y, prune ui, docs sync

Status: ready-for-agent
Blocked by: 04, 05, 06, 07, 08, 09, 10

## Mục tiêu

Đưa toàn bộ rebuild về cùng chuẩn: hết hardcode cũ, a11y/checklist, prune ui closure,
đồng bộ docs; không thêm feature.

## File

- toàn bộ component đã dựng lại
- `src/components/ui/**` (prune theo import closure)
- `src/index.css`
- `DESIGN.md`, `COPY.md`, `GLOSSARY.md` (sync nếu lệch)
- `components.json` (flag, không sửa trừ khi thêm shadcn)

## Yêu cầu

- Grep sạch hex cũ/`#050506`, `Night Sleeve`, class hardcode không token, radius/shadow
  cũ trong các file đã rebuild; token semantic/component thay thế.
- Prune `src/components/ui` về closure thực dùng; không xoá package khỏi package.json;
  flag dead deps (shiki, date-fns, …) không xoá.
- `Spinner` aria-label tiếng Việt (“Đang tải”); icon-only đủ aria-label; decorative icon
  `aria-hidden`; cover alt="" trong row/card; heading hierarchy; skip link; `lang="vi"`.
- Focus-visible toàn bộ control; 44 hit; contrast text ≥4.5, UI ≥3; reduced-motion;
  safe-area FAB; không scroll ngang; long title/artist; empty strings.
- Docs sync code: token names/values, copy, component specs; không còn PRODUCT.md;
  COPY.md dùng “xóa”; không all-caps/mono labels.
- Manifest/theme-color/icons/font weights khớp; không unused weight.
- Flag `components.json` alias `@/lib/utils` (không sửa nếu không thêm shadcn).
- Không xoá dead code có sẵn ngoài phạm vi rebuild; chỉ xoá thứ rebuild làm mồ côi.

## Acceptance

- `npm run build`, lint, Prettier pass.
- Grep checklist sạch; ui closure chỉ còn file được import.
- Checklist a11y spot pass; docs khớp code.
- Không dependency mới.

## Không làm

- Không thêm test harness, không dọn dependency, không đổi behavior.
