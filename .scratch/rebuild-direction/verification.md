# Verification — Sổ lưu rebuild

Date: 2026-10-30
Branch: `rebuild/so-luu`
Last code commit: `5d413f1`
Ticket 12 changes docs only; app code unchanged.

## Build / lint

```bash
npm run build   # pass (tsc -b + vite build)
npm run lint    # pass
```

- CSS bundle: 175.8KB → **67.6KB** after pruning 48 unused `ui/` files.
- JS bundle: 1.17MB; Vite warns chunk >500KB. Pre-existing; not handled.
- No new dependency; dead deps flagged, not removed:
  shiki, date-fns, @base-ui/react, @shadcn/react, cmdk, embla-carousel-react,
  input-otp, react-day-picker, react-resizable-panels, recharts.

## Static checks (agent)

- Sign-in 1440 + 768, light + dark: pass. Screenshots:
  `shots/signin-light-1440.png`, `signin-dark-1440.png`,
  `signin-light-768.png`, `signin-dark-768.png`.
- App loading dark 1440: `shots/app-loading-dark-1440.png`.
- 390: headless Edge min viewport ≈500, ảnh 390 không phải layout 390 thật;
  mobile classes đã áp; user chốt bằng DevTools 390.
- Sign-in error/loading, error boundary: code-checked, chưa trigger.
- Token contrast (from DESIGN.md): ink/paper 15.58; graphite/paper 5.95;
  bookmark-text/paper 5.36; ink/coral 6.12; bone/night 15.84;
  coral-light/night 6.31; control-border/paper ≥3.
- A11y code checks: ErrorAlert `role="alert"`; Spinner aria “Đang tải”;
  reduced-motion global; menu items min-h-11; skip link + `main#library-main`;
  cover `alt=""`; icon-only labels; `lang="vi"`; focus-visible base.
- Copy: `xóa`; lowercase `musimob`; no old `Musimob` in docs (except COPY avoid row).
- Old tokens: app code + DESIGN/COPY/GLOSSARY clean; remaining mentions are
  intentional (COPY avoid row, spec history, this report's grep).
- `ui/` closure: 14 files used; 48 removed; build confirms.
- `components.json`: alias `@/lib/utils` broken; not used by app; flag only.

## Verified

- Signed-in QA B1–B15 + C1–C10 — pass (user-run, 2026-10-30).
- Google sign-in; Firestore reads/writes; 30s preview audio — exercised by the user.
- 390/768/1440; light/dark/system; zoom 200%.

## Not verified

- Sign-in loading/error and error boundary (A2/A3/A5): not triggered; code-checked.
- Không có test harness; bundle chunk warning; dead deps/title flags.

## Fix pass (review findings)

- `sửa hết đi`: ErrorAlert retry 44, SearchField/PageShell/LibraryToolbar,
  edit duplicate check, filter stops preview, actions 32/44 + reveal,
  grid 900/1200, theme-color reads `--background`, unused tokens removed.
- Build/lint/format: pass (2026-10-30).
- Grid regression from user screenshot: arbitrary `min-[900px]` emitted before
  `sm`, so 3 columns won on desktop. Replaced with theme breakpoints
  `--breakpoint-wide` (900) / `--breakpoint-widest` (1200).
- B2 grid re-run: pass (user-run, 2026-10-30).
- Static: app-loading 1440 dark aligned; theme-color dark resolves `#11130f`.
- Chưa commit.

## Rename pass (MusiMOB)

- Tên hiển thị: `MusiMOB`; `musimob` chỉ còn trong ID kỹ thuật, package, repo, URL và hồ sơ cũ.
- Đã đổi: `index.html`, `site.webmanifest`, title app, `Wordmark` (symbol + text
  Be Vietnam Pro 700), lede sign-in, bỏ fine print; COPY/DESIGN/GLOSSARY, brand README/preview.
- Asset (C): `public/` 15 file runtime; `assets/brand` còn 9 file gồm `symbol.svg`, 4 biến
  thể logo ngang, nguồn OG/Twitter, README và OFL. Bỏ logo dọc, wordmark-only, symbol mono,
  PNG brand, app-icon 1024 và preview. Tổng 24 file.
- Build/lint/format: pass. Static: loading + wordmark 1440 light/dark; OG 1200×630;
  Twitter 1200×600; lockup PNG RGBA đúng kích thước.
- Signed-in QA D1–D4 (header, sign-in, title/PWA, share): **pass** (user, 2026-10-30).
- Nhánh `rebrand/musimob`, commit `896d1b7`.

## Next

- Push + PR; non-blocking flags: dead deps, `components.json` alias, title/OG, no test harness, chunk warning.
