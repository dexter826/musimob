---
name: MusiMOB
description: Sổ lưu bài hát riêng tư — sáng, giấy, mực, một dấu sách coral.
colors:
  paper-50: '#FAF9F5'
  paper-100: '#F4F3EE'
  paper-200: '#ECEBE4'
  paper-300: '#DFDED4'
  ink-900: '#1A1B17'
  ink-700: '#3A3C35'
  ink-600: '#5B5E55'
  ink-400: '#8A8D83'
  coral-050: '#FCE8E2'
  coral-500: '#FF6A4D'
  coral-600: '#F25B3D'
  coral-700: '#B23A27'
  coral-300: '#FF8A75'
  coral-200: '#FFB3A4'
  moss-700: '#3F5D4E'
  red-700: '#A02C22'
  night-950: '#11130F'
  night-900: '#161814'
  night-800: '#1E201B'
  night-700: '#282B24'
  bone-100: '#EDEEE8'
  bone-400: '#A6A99E'
typography:
  display:
    fontFamily: 'Lora, Georgia, "Times New Roman", serif'
    fontSize: '38px'
    fontWeight: 500
    lineHeight: '1.08'
    letterSpacing: '-0.02em'
  page-title:
    fontFamily: 'Lora, Georgia, "Times New Roman", serif'
    fontSize: '34px'
    fontWeight: 500
    lineHeight: '1.08'
    letterSpacing: '-0.015em'
  title:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '14.5px'
    fontWeight: 600
    lineHeight: '1.35'
    letterSpacing: '0'
  body:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: '1.6'
    letterSpacing: '0'
  meta:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '12.5px'
    fontWeight: 400
    lineHeight: '1.4'
    letterSpacing: '0'
  label:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: '1.4'
    letterSpacing: '0'
  button:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '13px'
    fontWeight: 600
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  cover: '2px'
  control: '8px'
  sheet: '12px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '6': '24px'
  '8': '32px'
  '12': '48px'
  '16': '64px'
components:
  button-primary:
    backgroundColor: '{colors.coral-500}'
    textColor: '{colors.ink-900}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    height: '44px'
  button-ink:
    backgroundColor: '{colors.ink-900}'
    textColor: '{colors.paper-50}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    height: '44px'
  badge-saved:
    backgroundColor: '{colors.paper-200}'
    textColor: '{colors.moss-700}'
    typography: '{typography.label}'
    rounded: '{rounded.cover}'
    height: '24px'
  sheet:
    backgroundColor: '{colors.paper-50}'
    borderColor: '{colors.paper-300}'
    rounded: '{rounded.sheet}'
  bookplate:
    backgroundColor: '{colors.paper-50}'
    borderColor: '{colors.paper-300}'
    rounded: '{rounded.cover}'
    offset: '6px'
  fab-add:
    backgroundColor: '{colors.coral-500}'
    textColor: '{colors.ink-900}'
    width: '56px'
    height: '64px'
---

# Design System: MusiMOB

## Overview

**Creative North Star: "Sổ lưu"**

MusiMOB là một cuốn sổ lưu riêng, không phải trình phát nhạc. Trang giấy là nền; bìa đĩa là
màu; mực là chữ; và đúng một dấu sách coral đánh dấu bài đang nghe thử. Cảm giác là sở hữu
riêng tư, yên tĩnh, được sắp bằng tay — không phải dashboard, không phải landing page,
không phải player.

**Key Characteristics:**

- Light-native: giấy ấm trung tính; dark là bộ đôi đầy đủ, không phải bản đảo màu.
- Bìa đĩa dẫn màu; chrome chỉ dùng giấy, mực, và một coral.
- Phẳng: surface tách bằng tông giấy và viền 1px; chỉ FAB đổ bóng.
- Lora cho tiêu đề trang/đăng nhập; Be Vietnam Pro cho toàn bộ UI.
- Mật độ cao: type UI 12–16px, hàng 64px, control 44px.
- Một điểm đến, không sidebar; mobile một cột.

## Colors

### Primitive palette

| Token       | Value     | Token       | Value     |
| ----------- | --------- | ----------- | --------- |
| `paper-50`  | `#FAF9F5` | `ink-900`   | `#1A1B17` |
| `paper-100` | `#F4F3EE` | `ink-700`   | `#3A3C35` |
| `paper-200` | `#ECEBE4` | `ink-600`   | `#5B5E55` |
| `paper-300` | `#DFDED4` | `ink-400`   | `#8A8D83` |
| `coral-050` | `#FCE8E2` | `moss-700`  | `#3F5D4E` |
| `coral-500` | `#FF6A4D` | `red-700`   | `#A02C22` |
| `coral-600` | `#F25B3D` | `night-950` | `#11130F` |
| `coral-700` | `#B23A27` | `night-900` | `#161814` |
| `coral-300` | `#FF8A75` | `night-800` | `#1E201B` |
| `coral-200` | `#FFB3A4` | `night-700` | `#282B24` |
| `bone-100`  | `#EDEEE8` | `bone-400`  | `#A6A99E` |

### Semantic tokens

| Token                      | Light       | Dark        | Use                          |
| -------------------------- | ----------- | ----------- | ---------------------------- |
| `--background`             | `paper-100` | `night-950` | Nền trang                    |
| `--foreground`             | `ink-900`   | `bone-100`  | Chữ chính                    |
| `--surface`                | `paper-50`  | `night-900` | Panel, sheet, popover, card  |
| `--surface-2`              | `paper-200` | `night-800` | Hover, skeleton, nền control |
| `--fg-muted`               | `ink-600`   | `bone-400`  | Chữ phụ, placeholder         |
| `--fg-subtle`              | `ink-400`   | `#7C7F74`   | Icon phụ                     |
| `--rule`                   | `#D8D7CD`   | `#2C2F27`   | Divider, viền trang trí      |
| `--control-border`         | `#7A7D73`   | `#7C7F74`   | Viền input/control (≥3:1)    |
| `--primary`                | `coral-500` | `coral-300` | Hành động chính, dấu sách    |
| `--primary-hover`          | `coral-600` | `#FFA08E`   | Hover primary                |
| `--primary-foreground`     | `ink-900`   | `night-950` | Chữ/icon trên coral          |
| `--bookmark-text`          | `coral-700` | `coral-200` | Chữ nhỏ coral                |
| `--bookmark-soft`          | `coral-050` | `#2A1A16`   | Wash hàng đang nghe          |
| `--success`                | `moss-700`  | `#9DB8A6`   | Đã lưu                       |
| `--danger`                 | `red-700`   | `#FF9B8A`   | Xóa, lỗi                     |
| `--destructive-foreground` | `paper-50`  | `night-950` | Chữ trên danger              |
| `--ink-action`             | `ink-900`   | `bone-100`  | Nút phụ đậm                  |
| `--ink-action-foreground`  | `paper-50`  | `night-950` | Chữ nút phụ đậm              |
| `--ink-action-hover`       | `ink-700`   | `#FFFFFF`   | Hover nút phụ đậm            |
| `--focus`                  | `ink-900`   | `bone-100`  | Focus ring                   |

Tailwind v4 maps semantic tokens through `@theme inline`; `.dark` swaps the set. Shadcn
aliases: `--primary` = coral; `--secondary`, `--muted`, `--accent` = `surface-2`;
`--secondary-foreground`, `--accent-foreground` = `foreground`; `--muted-foreground` =
`fg-muted`; `--border` = `rule`; `--input` = `control-border`; `--ring` = `focus`;
`--destructive` = `danger`; `--destructive-foreground` = above; `--card` / `--popover` =
`surface`. The shadcn `--accent` is a hover surface, never coral.

### Contrast

| Pair                       | Ratio   |
| -------------------------- | ------- |
| Ink trên paper             | 15.58:1 |
| Graphite trên paper        | 5.95:1  |
| `bookmark-text` trên paper | 5.36:1  |
| Ink trên coral             | 6.12:1  |
| Control border trên paper  | 3.0:1+  |
| Bone trên night            | 15.84:1 |
| Coral-light trên night     | 6.31:1  |

**The One Bookmark Rule.** Coral là dấu sách: tab 3px, nút chính, preview đang phát, meta
“Đang nghe thử”. Không dùng coral cho khối nền lớn, heading, hay trang trí. Trên giấy, coral
chỉ làm mark hoặc chữ lớn; chữ nhỏ dùng `bookmark-text`.

**The Artwork Rule.** Khi có bìa đĩa, màu của bìa là màu chủ đạo. Chrome không cạnh tranh
với bìa, không thêm hue thứ hai.

**The Paper Rule.** Không gradient, không glass, không texture. Surface tách bằng tông giấy
và viền 1px; độ sâu chỉ đến từ tấm bookplate và FAB.

## Typography

- **Display — Lora 500.** Tiêu đề trang 34/1.08 (−0.015em); sign-in 38/1.08 (−0.02em);
  mobile 28/30.
- **UI — Be Vietnam Pro 400/500/600.** Song title 14.5/1.35 (600); artist/meta 12.5/1.4;
  body 14/1.6; label 12/1.4 (500); button 13/1 (600); input 16 mobile, 15 desktop.
- **Wordmark — Be Vietnam Pro 700.** `Musi` màu foreground, `MOB` coral; cao 26; đặt cạnh
  symbol, không dùng asset wordmark cũ.
- **Section — Lora 500 24/1.2** cho empty/error; **panel — Lora 500 18/1.2** cho sheet header.
- Sentence case cho heading, nút, nhãn. Không all-caps labels, không mono labels, không
  middle-dot meta, không numbered markers.
- `text-wrap: balance` cho heading; `pretty` cho đoạn; `tabular-nums` cho số đếm.
- Line length dưới 80ch; serif chỉ dùng ở tiêu đề, không dùng cho body dài.

**The Two-Voice Rule.** Lora chỉ xuất hiện ở tiêu đề trang/đăng nhập/section/panel. Mọi
thứ khác là Be Vietnam Pro. Không trộn thêm family thứ ba.

## Layout

### Shell A — Trang sách (mặc định)

```
Desktop ≥768
┌ logo                       [view] [theme] [avatar] ┐  64px
│ Thư viện                        [tìm…] [+ Thêm bài] │
│ 12 bài                                             │
│ ▣  Tên bài                              ⋯          │
│ ▣  Tên bài / Đang nghe thử              ⋯          │
└────────────────────────────────────────────────────┘

Mobile <768
┌ logo                [view] [theme] [avatar] ┐  60px
│ Thư viện                                    │
│ 12 bài                                      │
│ [tìm…]                                      │
│ ▣ Tên bài                              ⋯    │
│                              [bookmark FAB] │
└─────────────────────────────────────────────┘
```

- Content max 1120px; gutter `clamp(20px, 5vw, 64px)`; topbar 64/60.
- Desktop: search 280×44; add primary 44; view toggle và theme toggle 36 visual/44 hit; avatar 32/44.
- Mobile: search full width; add chỉ còn FAB 56×64; FAB cách đáy
  `20px + env(safe-area-inset-bottom)`.
- List là view mặc định. Grid là view thứ hai.
- `main` landmark; h1 luôn hiện; skip link “Chuyển đến nội dung”.
- Không sidebar; một điểm đến.

### Lists and grid

- List row 64px; cover 48px; gap 14px; 2px gap giữa hàng; không separator.
- Grid: 2 cột <640; 3 cột 640–899; 4 cột 900–1199; 6 cột ≥1200. Gap 24×16 desktop,
  20×12 mobile.
- Sheet: mobile drawer <768; desktop dialog ≥768; rộng tối đa 560px; cao 85dvh.
- Sign-in: composition 560px; bookplate 360px; sleeve 320px; mobile bookplate 350/100%,
  sleeve 180px.
- Breakpoints: 640, 768, 900, 1200. Không dùng fixed px container.

## Elevation & Depth

Hệ phẳng. Ba tầng giấy: `background` → `surface` → `surface-2`; tách bằng viền 1px `rule`
hoặc `control-border`.

- **Bookplate:** tấm giấy `surface` có một tấm `surface-2` lệch 6px phía sau (offset sheet,
  không blur).
- **FAB:** vật thể nổi duy nhất; `drop-shadow(0 8px 18px rgb(26 27 23 / 18%))` ở trạng thái
  nghỉ.
- **Không shadow** cho row, card, sheet, header, menu, toast.

**The One Floating Object Rule.** Chỉ FAB được đổ bóng. Bookplate dùng tấm giấy lệch, không
dùng shadow mờ.

## Shapes

- Cover: 2px. Control/button/input/menu: 8px. Sheet: 12px. Badge: 2px.
- Avatar và preview: hình tròn. Dấu sách: ribbon/notch, không phải pill.
- Không pill cho search/button; không bo một radius cho mọi thứ.

**The Round by Role Rule.** Bìa giữ 2px; control 8px; sheet 12px; chip 2px. Chỉ avatar và
preview được tròn.

## Components

### Buttons

- **Primary:** coral/ink; cao 44; padding 0 14; radius 8; type button. Hover `primary-hover`;
  focus ring 2px `focus` offset 2; active giữ nguyên layout; disabled opacity 50%.
- **Ink:** nền `ink-action`, chữ `ink-action-foreground`; dùng cho Google sign-in và hành
  động phụ đậm. Hover `ink-action-hover`.
- **Ghost:** nền trong suốt, viền 1px `control-border`, chữ `foreground`; hover `surface-2`.
- **Icon:** 36 visual / 44 hit; radius 8; màu `fg-muted`; hover `surface-2` + `foreground`;
  luôn có `aria-label`. Icon-only không có nhãn chữ.
- **Loading:** giữ kích thước; spinner 16px + nhãn trạng thái; `aria-busy`; disabled.
- Không gradient, không shadow, không pill.

### Search and view toggle

- Search: cao 44; radius 8; nền `surface`; viền 1px `control-border`; icon search 16;
  input 15/16; placeholder `fg-muted`; label sr-only; nút clear 44 hit, aria “Xóa bộ lọc”,
  refocus input; focus ring 2px `focus`.
- View toggle: một nút icon 36 visual / 44 hit; aria “Chuyển sang dạng lưới” hoặc
  “Chuyển sang dạng danh sách”; trạng thái không chỉ bằng màu (icon + aria).

### Chips and badges

- **Đã lưu:** cao 24; radius 2; nền `surface-2`; chữ `success` 12/500; padding 0 8; không
  icon trang trí. Badge chỉ xuất hiện ở trạng thái đã lưu, không dùng để trang trí.

### Navigation and account

- Topbar: logo ngang (symbol + wordmark 14.5/700) cao 26; h1 34/28; count 12 `fg-muted`; search/add;
  view toggle; theme toggle; avatar 32 visual/44 hit.
- Avatar: ảnh Google nếu có; fallback chữ cái đầu trên `surface-2`, chữ `foreground` 12/600;
  viền 1px `control-border`; aria “Mở tài khoản của {name}”.
- Account menu: surface, radius 8, border `rule`; name label; separator; “Đăng xuất”.
  Trigger/focus/keyboard theo Radix.

### Song row (signature)

- Cao 64; cover 48/2; title 14.5/600 truncate; artist 12.5/400 `fg-muted` truncate;
  actions ⋯ 32 visual/44 hit; preview 26 visual/44 hit.
- Hover: `surface-2`. Active: tab coral 3px trái, wash `bookmark-soft`, meta
  “Đang nghe thử” 12/500 `bookmark-text`, preview pause coral; chỉ một hàng active.
- Flash add/undo: ring 2px `primary` 2s + scrollIntoView; khác active.
- Không separator; khoảng trắng và nhịp giữ danh sách.

### Grid card (view thứ hai)

- Cover fluid, radius 2; title 13.5/500 line-clamp 1; artist 12/400 `fg-muted` truncate;
  preview 28 visual/44 hit.
- Active: tab coral nhỏ trên cover, title `bookmark-text`, pause coral; không scrim,
  không gradient, không card nền.

### Preview control

- Nút tròn 26 visual/44 hit trên cover; nền `surface`, viền `rule`, icon play/pause
  `foreground`; hover/active nền `primary`, icon `primary-foreground`.
- Đang phát: pause; đang tải: spinner; không có preview: giữ nút với icon loa gạch,
  `aria-disabled`, tooltip + toast lý do — không ẩn nút.
- Không progress, không seek, không volume, không timer.

### Active listening state

- Một bài tại một thời điểm. Row: tab + wash + meta + pause. Grid: tab + title + pause.
- Trạng thái không chỉ bằng màu: có text “Đang nghe thử” và icon pause.
- Dừng khi đóng sheet, đổi filter, xóa bài đang phát, đăng xuất/unmount.

### Floating add (mobile only)

- Nút 56×64, hình dấu sách (clip-path notch), nền `primary`, icon plus 22
  `primary-foreground`, drop-shadow.
- Chỉ hiện <768 và khi thư viện có bài. Empty state dùng CTA riêng.
- aria “Thêm bài”; focus ring trên bounding box; safe-area.

**The One Add CTA Rule.** Mỗi trạng thái chỉ có một lối thêm bài: thư viện trống dùng CTA
trong empty state và ẩn cả add ở title row lẫn FAB; có bài thì dùng add ở title row từ
768px và FAB dưới 768px.

### Add/edit panel

- Mobile <768: drawer; desktop: dialog; max 560, 85dvh; nền `surface`; radius 12; viền
  `rule`; header 18 Lora; close/back 44; focus trap/Escape/overscroll contain.
- Search mode: input 44/16; result rows cover 48; save button 44; badge “Đã lưu”.
- Manual/edit: fields 44; label; error cạnh field; cover hint; submit 44; pending
  disabled + “Đang lưu…”.
- Không segmented tabs; chuyển mode bằng header action/back.

### Delete confirmation

- AlertDialog surface, radius 12; title “Xóa bài này?”; body nêu hậu quả + undo;
  “Huỷ” ghost; “Xóa” danger; loading “Đang xóa…”; không đóng khi deleting; lỗi + thử lại.
- Destructive có undo window 10s; không xóa ngầm.

### Sign-in bookplate (signature)

- Composition bookplate + brand sleeve. Sleeve nền `night-900`, symbol coral từ asset
  brand, tab coral; không dùng bìa bên thứ ba.
- Bookplate 360 desktop/100% mobile; nền `surface`; viền 1px `rule`; radius 2; tấm
  `surface-2` lệch 6px; logo ngang light/dark; h1 38/30 Lora; lede 15/14; nút ink 44
  “Đăng nhập bằng Google”; fine print 12 `fg-muted`.
- Không radial gradient, không vinyl, không hero marketing. Loading/error theo COPY.md.

### Toasts

- Sonner bottom-center; nền ink/paper đảo theo theme; radius 8; chữ 13; action coral;
  mobile offset trên FAB; aria-live.
- Save/delete/undo/restore-error/preview-error; action “Hoàn tác”/“Thử lại”; không che
  control.

### Empty, loading, error

- **Empty:** title 24 Lora “Chưa có bài nào”; body 14 `fg-muted`; một CTA primary
  “Thêm bài đầu tiên”; ẩn add ở header/FAB.
- **Filter-empty:** title 20 Lora “Không có bài nào khớp.”; body; “Xóa bộ lọc” + “Tìm bài này”.
- **Loading:** skeleton list/grid dùng `surface-2`; `role="status"` + sr-only
  “Đang tải danh sách…”; không shimmer.
- **Error:** alert nền `surface-2`, viền trái 3px `danger`, text `danger`; action “Thử lại”;
  không mã kỹ thuật.

### Theme

- Light-native; dark đầy đủ. Mặc định theo `prefers-color-scheme`; “Theo hệ thống” chỉ là
  điểm khởi đầu, sau lần chọn đầu tiên người dùng điều khiển bằng nút theme. Lưu `musimob:theme`.
- Theme toggle ở topbar: một nút icon 36 visual/44 hit; icon thể hiện hành động (đang sáng →
  `Moon`, đang tối → `Sun`); aria “Chuyển sang giao diện tối” / “Chuyển sang giao diện sáng”;
  bấm chuyển Sáng ↔ Tối.
- `.dark` trên `<html>` + `color-scheme` + meta theme-color (`#F4F3EE` / `#11130F`);
  no-flash; Toaster theo theme.
- Không chỉ đổi màu accent; phải đổi toàn bộ semantic set.

### Accessibility

- Contrast: text ≥4.5:1; UI/border ≥3:1. Coral trên giấy không dùng làm text nhỏ.
- Hit target ≥44×44; icon 36/32 visual được phép nếu hit 44.
- `:focus-visible` 2px `focus`, offset 2; focus không bị sticky/overlay che.
- `<label>` hoặc `aria-label` cho mọi control; icon-only có nhãn; decorative icon
  `aria-hidden`; cover trong row/card `alt=""`; logo `alt="MusiMOB"`.
- Heading hierarchy: h1 “Thư viện” hoặc “Thư viện riêng của bạn”; section/panel dùng h2/h3.
- `role="status"` cho loading; `role="alert"` cho lỗi; `aria-live` cho toast.
- `prefers-reduced-motion` tắt transition/scroll mượt; `touch-action: manipulation`;
  safe-area cho FAB; không khóa zoom.

## Motion

- Transition trạng thái 120–180ms, chỉ màu/viền/opacity.
- Flash 2000ms; sheet/toast enter-exit; không scroll reveal, không parallax, không
  entrance trang trí.
- `prefers-reduced-motion: reduce` tắt tất cả; flash vẫn hiện trạng thái cuối.

**The Answer-Only Rule.** Motion chỉ trả lời thao tác (mở, lưu, xóa, đổi theme). Không
chuyển động để gây chú ý.

## Do's and Don'ts

### Do

- Giữ coral như dấu sách: tab, primary, preview active, meta “Đang nghe thử”.
- Để bìa đĩa mang màu; chrome giấy/mực.
- Dùng Lora cho tiêu đề, Be Vietnam Pro cho UI.
- Giữ mật độ: row 64, control 44, type 12–16.
- Tách surface bằng tông giấy + viền 1px.
- Viết tiếng Việt ngắn, lỗi nêu bước tiếp theo.

### Don't

- Không player, progress bar, queue, seek, volume, hay phát toàn bài.
- Không dashboard, chart, landing page, hero marketing, card kit.
- Không gradient, glass, texture, glow, hay accent hue thứ hai.
- Không pill cho search/button; không bo một radius cho mọi thứ.
- Không shadow cho row/card/sheet/menu/toast.
- Không dùng trắng tinh khiết cho body text; dùng paper/bone.
- Không all-caps labels, mono labels, middle-dot meta, numbered marker.
- Không dùng bìa bên thứ ba ở sign-in.
