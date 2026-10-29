# 02 — Token foundation, fonts, meta/manifest

Status: ready-for-agent
Blocked by: 01

## Mục tiêu

Thay toàn bộ lớp token trong `src/index.css` bằng hệ 3 lớp của spec; nạp Lora +
Be Vietnam Pro; chỉnh meta/manifest cho light-native. Chưa restyle component.

## File

- `src/index.css`
- `index.html`
- `public/site.webmanifest`

## Yêu cầu

- `@theme inline` map `--color-*` → semantic vars; `:root` giữ light, `.dark` override
  dark; `@custom-variant dark (&:is(.dark *))`; `color-scheme` theo theme.
- Primitive/semantic/component đúng spec §4.2. Shadcn alias: `--primary` = coral;
  `--secondary`/`--muted`/`--accent` = surface-2; `--input` = control-border;
  `--ring` = focus; `--destructive` = danger.
- Giữ base cần thiết: border, selection, focus-visible 2px, scrollbar, touch-action;
  bỏ palette dark-only cũ, chart/sidebar tokens, `.auth-stage` radial, Sonner override cũ.
- Fonts: Lora 400/500/600 + Be Vietnam Pro 400/500/600 (bỏ weight không dùng nếu được);
  preconnect; `display=swap`; `--font-ui` / `--font-display`.
- `index.html`: bỏ `class="dark"` (ticket 03 sẽ set), meta theme-color `#F4F3EE`;
  manifest `theme_color`/`background_color` `#F4F3EE`; giữ mask-icon coral và icon wiring.
- Không restyle component; app có thể trông lệch cho tới các ticket sau.

## Acceptance

- `npm run build` pass; app render được.
- Toggle `.dark` trên `<html>` đổi đúng bộ semantic; `color-scheme` đổi.
- Cặp contrast chính: ink/paper 15.58; graphite/paper 5.95; coral-text/paper 5.36;
  ink/coral 6.12; bone/night 15.84; coral-light/night 6.31; control-border/paper ≥3.
- Không còn hex cũ ngoài primitive; không còn `#050506`; không còn chart/sidebar token.
- Fonts load, không flash quá mức (swap), không 404.

## Không làm

- Không mount ThemeProvider (ticket 03).
- Không sửa component/screen; không đổi copy; không dọn dependency.
