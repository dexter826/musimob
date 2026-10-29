# 01 — Viết lại DESIGN.md, COPY.md, GLOSSARY.md

Status: ready-for-agent
Blocked by: —

## Mục tiêu

Ba hợp đồng mới thay cho bản cũ, khớp spec §4–§6 và prototype “Sổ lưu”.
Không sửa app code.

## File

- `DESIGN.md` — viết lại từ đầu, không bám outline “Night Sleeve”.
- `COPY.md` — voice, thuật ngữ, toàn bộ chuỗi UI.
- `GLOSSARY.md` — domain terms/invariants, thuật ngữ hiển thị mới.

## Yêu cầu

### DESIGN.md

- Concept “Sổ lưu”, light-native, bìa đĩa dẫn màu, coral là dấu sách; anti-reference:
  không player/dashboard/landing/card kit.
- Token 3 lớp đúng spec §4.2: primitive, semantic (light/dark), component; mapping
  Tailwind v4 `@theme inline` + `:root` + `.dark`; ghi rõ shadcn `--accent` là hover
  surface, coral nằm ở `--primary` / `--bookmark-*`.
- Type Lora + Be Vietnam Pro, scale và role; Vietnamese subset; không all-caps/mono labels.
- Shell A (title-first, list default, grid secondary), mobile 390, FAB; kích thước/radius.
- Component spec cho: preview/active row/flash, filter, add, empty/filter-empty,
  skeleton/error, sheets (add/edit/delete), menu, theme, toasts, sign-in.
- Motion 120–180ms + reduced-motion; a11y: contrast 4.5/3, 44px, focus-visible,
  aria-label, alt, skip link, heading hierarchy.
- Là hợp đồng thị giác: rules + numbers; không ghi trạng thái repo/tiến độ.

### COPY.md

- Voice: tiếng Việt, sentence case, ngắn, trực tiếp; “xóa” (không “xoá”).
- Thuật ngữ: **bài** (item đã lưu), **bài hát** (câu giải thích), **nghệ sĩ** (thay
  “ca sĩ” trong label/aria), **thư viện**, **đã lưu**, **nghe thử**, **tài khoản**,
  **giao diện**.
- Bảng chuỗi theo màn hình: shell/sign-in/empty/filter/add search/manual/edit/delete/
  account/theme/toasts/errors/aria. Giữ nguyên copy lỗi auth/undo hiện có nếu không có
  lý do đổi; mỗi lỗi nêu việc cần làm.
- Chuỗi mới chốt theo spec §6; filter count “x / y bài”.
- Ghi chú orthography; không middle dot, không numbered marker, không emoji.

### GLOSSARY.md

- Domain đóng băng: bài hát identity (sourceId hoặc normalized title+artist), “đã lưu”
  chỉ thư viện của chính mình, preview 30s, không playlist/order/share, undo in-memory.
- Cập nhật thuật ngữ hiển thị mới (nghệ sĩ, bài) nhưng không đổi mô hình.
- Không nhắc PRODUCT.md.

## Acceptance

- Ba file tự nhất quán; token/type/copy khớp spec và prototype.
- Không còn “Night Sleeve”, cursor invariant cũ, PRODUCT.md, màu `#050506`,
  chuỗi “Ca sĩ” trong bảng chuỗi (trừ ghi chú lịch sử nếu cần).
- Không có mâu thuẫn DESIGN.md ↔ COPY.md ↔ GLOSSARY.md.

## Kiểm chứng

```bash
grep -rn "Night Sleeve\|PRODUCT.md\|#050506\|xoá" DESIGN.md COPY.md GLOSSARY.md
```

Kết quả rỗng (trừ ghi chú orthography “xoá” nếu có).

## Không làm

- Không sửa `src/`, `index.html`, prototype hay AGENTS.md.
- Không khôi phục PRODUCT.md.
