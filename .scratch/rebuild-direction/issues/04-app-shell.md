# 04 — App shell: topbar, h1, count, skip link

Status: ready-for-agent
Blocked by: 03

## Mục tiêu

Dựng shell A (title-first): topbar + h1 “Thư viện” + count + skip link; chừa slot cho
search/add (05). Giữ nguyên filter/list cũ tạm thời.

## File

- `src/app/app.tsx`
- `src/app/app-header.tsx`
- `src/components/wordmark.tsx` → thay bằng logo brand (hoặc file mới `brand-logo.tsx`)
- `src/index.css` (style shell nếu cần)

## Yêu cầu

- Topbar desktop 64px, mobile 60px; logo ngang dùng asset `assets/brand/*` (light/dark),
  không vẽ lại wordmark; view toggle 36 visual / 44 hit; avatar trigger 32 visual / 44 hit.
- `main` landmark + skip link “Chuyển đến nội dung”; h1 “Thư viện” 34/28; count dưới h1
  (`12 bài`, chờ 05 cho semantics filter).
- Title block: h1/count bên trái; slot search + add bên phải desktop; mobile stack.
- Nền `--background`, chữ `--foreground`; content max 1120, gutter clamp; không sidebar.
- Empty-library: giữ logic ẩn add affordance; empty CTA ở ticket 06.
- Bỏ count khỏi topbar cũ; bỏ header CTA cũ; view toggle giữ hook `useViewMode`.
- Avatar menu content tạm giữ bản cũ; chỉ style trigger; menu mới ở 09.
- Không đổi title/OG.

## Acceptance

- 1440/768/390: shell đúng; không scroll ngang; h1 đúng cấp; skip link hoạt động.
- Logo light/dark đúng; focus-visible rõ; control ≥44 hit.
- Build/lint pass; list/filter cũ vẫn render trong shell mới.

## Không làm

- Không làm filter/search/add mới (05), list/grid (06), avatar menu (09).
- Không đổi behavior auth/data/preview.
