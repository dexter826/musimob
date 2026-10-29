# Rebuild giao diện musimob — “Sổ lưu”

Status: ready-for-agent (spec)
Date: 2026-10-29
Feature: `.scratch/rebuild-direction`
Prototype: `.scratch/rebuild-direction/prototype/index.html` (throwaway, chưa commit)
Ticket dir: `.scratch/rebuild-direction/issues/`

## 1. Mục tiêu

Thay toàn bộ lớp trình bày và hệ token của musimob bằng hướng “Sổ lưu”: light-native,
giấy + mực, bìa đĩa dẫn màu, coral là dấu sách. Giữ nguyên auth, Firestore, dữ liệu,
preview 30 giây và mọi luồng hiện có. Không thêm tính năng.

Xong khi: mọi màn hình/state hiện có dùng token mới; light + dark đạt checklist;
hành vi ngang bản cũ; `DESIGN.md`, `COPY.md`, `GLOSSARY.md` được viết lại và khớp code;
signed-in được kiểm bằng checklist do người dùng chạy (Q7=C), không có fixture/auth bypass.

## 2. Ngoài phạm vi

- Tính năng mới, playlist, thứ tự, phát toàn bài, chia sẻ, social, i18n, native app.
- Offline app shell / service worker (vẫn chưa chốt).
- Dọn dependency, đổi thư viện state/data, đổi schema Firestore.
- Title/OG/manifest branding rule (xem §8 flag 5).
- Test harness mới (Vitest/RTL) — xem §8 flag 6.
- Screenshot/DOM automation cho signed-in; người dùng tự kiểm.

## 3. Quyết định đã khóa

| # | Quyết định |
|---|------------|
| 1 | Hướng “Sổ lưu”, light-native; kết cấu cũ không đúng cảm giác; lỗi chính là thiếu hệ thống/kiểm chứng (1B). |
| 2 | Token 3 lớp: primitive → semantic → component (2B). |
| 3 | Xong = thị giác đổi rõ **và** checklist từng màn hình (3C). |
| 4 | Giữ tên + bộ logo/icon hiện có; palette và type tự do (4B). |
| 5 | ui-ux-pro-max: generator là nguồn đề xuất, không phải chuẩn; rule layer + checklist là ràng buộc (5B). |
| 6 | Giữ dual theme + preview một bài tại một thời điểm; mở lại shell/layout (6B). |
| 7 | Signed-in do người dùng kiểm theo checklist; không fixture (7C). |
| 8 | COPY.md: voice + thuật ngữ hiển thị mở, vẫn tiếng Việt; domain model đóng băng (8B). |
| 9 | Hướng: “sổ lưu yên tĩnh”, light-native, bìa đĩa dẫn màu, mật độ cao; dark là bộ đôi (9A). |
| 10 | Ba hợp đồng DESIGN.md / COPY.md / GLOSSARY.md viết lại; không persist MASTER.md (10A). |
| 11 | Dựng lại lớp trình bày (shell + components) trên hooks/data/audio hiện có; Radix chỉ giữ nếu hợp (11B). |
| 12 | Theme mặc định theo hệ thống; toggle 3 lựa chọn trong account menu (12A). |
| 13 | Chốt hướng bằng prototype tĩnh; Shell A được chọn (13B + “1. A”). |
| 14 | Motion tối giản: chỉ phản hồi thao tác, reduced-motion tắt hết (14A). |

Shell: **A — Trang sách**. List là view mặc định; grid của Shell B là view thứ hai.
Font: **Lora** (display) + **Be Vietnam Pro** (UI). Coral `#FF6A4D` là bookmark/accent.
Giữ tên/logo; bỏ mọi ràng buộc từ PRODUCT.md đã xóa.

## 4. Hệ thống thiết kế

### 4.1 Concept

Một trang giấy cho thư viện riêng. Bìa đĩa là màu trên diện rộng; chrome là mực và giấy.
Dấu sách coral đánh dấu bài đang nghe thử — signature và metaphor sở hữu. Không player,
không dashboard, không hero marketing, không card kit.

### 4.2 Token

Ba lớp. Tên shadcn `--accent` được giữ cho **hover surface** (không phải coral); coral
nằm ở `--primary` / `--bookmark-*`.

**Primitive**

| Token | Value |
|---|---|
| paper-50 / 100 / 200 / 300 | `#FAF9F5` / `#F4F3EE` / `#ECEBE4` / `#DFDED4` |
| ink-900 / 700 / 600 / 400 | `#1A1B17` / `#3A3C35` / `#5B5E55` / `#8A8D83` |
| coral-050 / 500 / 600 / 700 | `#FCE8E2` / `#FF6A4D` / `#F25B3D` / `#B23A27` |
| coral-300 / 200 | `#FF8A75` / `#FFB3A4` |
| moss-700 | `#3F5D4E` |
| red-700 | `#A02C22` |
| night-950 / 900 / 800 / 700 | `#11130F` / `#161814` / `#1E201B` / `#282B24` |
| bone-100 / 400 | `#EDEEE8` / `#A6A99E` |

**Semantic** — light / dark

| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| `--background` | paper-100 | night-950 | nền trang |
| `--foreground` | ink-900 | bone-100 | chữ |
| `--surface` | paper-50 | night-900 | panel, card, sheet |
| `--surface-2` | paper-200 | night-800 | hover, skeleton, control nền |
| `--fg-muted` | ink-600 | bone-400 | phụ, placeholder |
| `--fg-subtle` | ink-400 | `#7C7F74` | icon phụ |
| `--rule` | `#D8D7CD` | `#2C2F27` | divider, viền trang trí |
| `--control-border` | `#7A7D73` | `#7C7F74` | viền input/control (≥3:1) |
| `--primary` | coral-500 | coral-300 | action chính, dấu sách |
| `--primary-hover` | coral-600 | `#FFA08E` | hover primary |
| `--primary-foreground` | ink-900 | night-950 | chữ trên coral |
| `--bookmark-text` | coral-700 | coral-200 | meta/chữ nhỏ coral |
| `--bookmark-soft` | coral-050 | `#2A1A16` | wash hàng active |
| `--success` | moss-700 | `#9DB8A6` | đã lưu |
| `--danger` | red-700 | `#FF9B8A` | xóa/lỗi |
| `--destructive-foreground` | paper-50 | night-950 | chữ trên danger |
| `--ink-action` | ink-900 | bone-100 | nút phụ đậm (Google) |
| `--ink-action-foreground` | paper-50 | night-950 | chữ nút phụ đậm |
| `--ink-action-hover` | ink-700 | `#FFFFFF` | hover nút phụ đậm |
| `--focus` | ink-900 | bone-100 | focus ring |

Shadcn alias: `--primary` = coral; `--primary-foreground` = trên coral; `--secondary`,
`--muted`, `--accent` = surface-2; `--muted-foreground` = fg-muted; `--border` = rule;
`--input` = control-border; `--ring` = focus; `--destructive` = danger;
`--destructive-foreground` = paper-50 light / night-950 dark; `--card` / `--popover` = surface.

**Component**

| Token | Value |
|---|---|
| `--cover-row` | `48px` |
| `--radius-cover` | `2px` |
| `--radius-control` | `8px` |
| `--radius-sheet` | `12px` |
| `--control-h` | `44px` |
| `--page-max` | `1120px` |
| `--gutter` | `clamp(20px, 5vw, 64px)` |
| `--topbar-h` / mobile | `64px` / `60px` |
| `--bookmark-w` | `3px` |
| `--fab-w` / `--fab-h` | `56px` / `64px` |
| `--motion-fast` | `160ms` |
| `--flash-duration` | `2000ms` |

Tailwind v4: `@theme inline` map `--color-*` → semantic vars; `:root` giữ bộ light,
`.dark` override bộ dark; `@custom-variant dark (&:is(.dark *))`; `color-scheme` theo
`.dark`. Component dùng token semantic/component, không dùng hex trực tiếp.

### 4.3 Type

- Display: **Lora** 500. Page title 34/1.08 (mobile 28); sign-in 38/1.08 (mobile 30);
  empty/error heading 24/1.2.
- UI: **Be Vietnam Pro** 400/500/600. Song title 14.5/1.35 (600); artist/meta 12.5/1.4;
  body 14/1.6; label 12/1.4 (500); button 13/1 (600); input 15 desktop, 16 mobile.
- Cả hai có Vietnamese subset. Không all-caps labels, không mono labels, không
  middle-dot meta, không numbered markers.
- `text-wrap: balance` cho heading; `pretty` cho đoạn; `tabular-nums` cho số đếm.

### 4.4 Motion

Chỉ transition trạng thái 120–180ms (màu, viền, opacity); sheet/toast enter-exit;
flash 2s. Không scroll reveal, không entrance trang trí, không parallax.
`prefers-reduced-motion: reduce` tắt transition/animation và scroll mượt.

### 4.5 Shell

```
Desktop
┌ logo                              [view] [avatar] ┐  64px
│ Thư viện                        [tìm…] [+ Thêm bài] │
│ 12 bài                                             │
│ ▣  Tên bài                              ⋯          │
│ ▣  Tên bài / Đang nghe thử              ⋯          │
└────────────────────────────────────────────────────┘

Mobile 390
┌ logo                         [view] [avatar] ┐  60px
│ Thư viện                                    │
│ 12 bài                                      │
│ [tìm…]                                      │
│ ▣ Tên bài                              ⋯    │
│                              [bookmark FAB] │
└─────────────────────────────────────────────┘
```

- Desktop: content max 1120px, gutter clamp; topbar 64; title h1 34; search 280×44;
  add primary 44; view toggle 36 visual / 44 hit; avatar 32 visual / 44 hit.
- Mobile: topbar 60; h1 28; search full width; add chỉ còn FAB 56×64; FAB cách đáy
  `20px + env(safe-area-inset-bottom)`.
- List là mặc định; grid (anatomy Shell B) là view thứ hai: 6 cột desktop, 2 cột mobile,
  cover fluid, title 13.5/1.35, active = tab coral nhỏ + title coral + preview pause.
- View mode giữ `localStorage["musimob:view-mode"]`, default list.
- Skip link “Chuyển đến nội dung” → main; h1 luôn có; main landmark.
- Không sidebar; một điểm đến.

### 4.6 Sign-in

- Tấm **bookplate** giấy đặt lên **sleeve thương hiệu**: sleeve nền night, symbol coral
  (asset brand), tab coral; bookplate 360 desktop / 350 mobile, logo ngang light/dark,
  h1 “Thư viện riêng của bạn”, lede, nút ink “Đăng nhập bằng Google”, fine print.
- Không dùng bìa đĩa bên thứ ba (bìa trong prototype chỉ để dựng hình).
- Loading: nút disabled + “Đang đăng nhập…” + spinner; lỗi auth inline dưới nút,
  `role="alert"`. Không radial gradient, không vinyl.
- Title/manifest/OG giữ nguyên (§8 flag 5).

### 4.7 Component & state requirements

- **Preview**: nút 26px visual / 44 hit trên cover; play/pause; aria-label
  “Nghe thử {title}, {artist}” / “Dừng nghe thử {title}”; một bài tại một thời điểm;
  active row: tab 3px trái, wash `--bookmark-soft`, meta “Đang nghe thử”; grid: tab nhỏ
  trên cover + title `--bookmark-text` + pause. Không progress/timer/seek.
- **Flash** sau add/undo: ring coral 2px quanh row/cover, 2s, scrollIntoView; khác active.
- **Row actions**: nút ⋯ 32 visual / 44 hit, menu Sửa/Xóa; reveal 0.5 opacity trên
  hover/focus, luôn hiện trên touch.
- **Filter**: 44px; label sr-only; clear X aria “Xóa bộ lọc”, refocus; instant,
  case-insensitive title+artist; count hiển thị “x / y bài” khi có filter.
- **Add**: primary coral desktop; FAB mobile; ẩn cả hai khi thư viện trống — chỉ empty
  state có CTA “Thêm bài đầu tiên”. Không hai CTA cùng state.
- **States**: skeleton list/grid + `role="status"` sr-only; error inline + “Thử lại”;
  empty “Chưa có bài nào” + “Bài hát bạn thêm sẽ xuất hiện ở đây.” + CTA; filter-empty
  “Không có bài nào khớp.” + “Xóa bộ lọc” + “Tìm bài này”.
- **Sheets**: add/edit/delete dùng surface, `--radius-sheet`, border rule, header 18px;
  mobile drawer (<768), desktop dialog; input 44/16; focus trap/Escape; overscroll contain;
  error cạnh field; nút pending disabled + nhãn “Đang …”.
- **Toasts**: Sonner, bottom-center; nền ink/paper đảo theo theme; action coral;
  save/delete/undo/restore-error/preview-error; undo 10s (flag 1); mobile offset trên FAB.
- **Theme**: account menu có “Giao diện” — “Theo hệ thống / Sáng / Tối”; default system;
  lưu `musimob:theme`; `.dark` + `color-scheme` + meta theme-color đồng bộ; no-flash;
  Toaster theo theme.
- **Sign-out**: giữ confirm hiện có; copy hiện có.

## 5. Màn hình & hành vi

| Màn hình/state | Yêu cầu chính |
|---|---|
| Sign-in (signed out) | Bookplate + brand sleeve; h1/lede/Google button/fine print; loading/error; light/dark; 390/768/1440. |
| App loading | Wordmark + “Đang tải…”; paper/ink; role=status. |
| Error boundary | “Ứng dụng gặp sự cố” + “Tải lại trang”; paper/ink. |
| Library shell | Logo, view toggle, avatar; h1 “Thư viện”; count; search; add; skip link; light/dark. |
| List | 48px cover, 64px row, active bookmark, ⋯ menu, preview; hover; focus; long title truncate. |
| Grid | 6/2 cột, cover fluid, active tab/title/pause; hover; focus. |
| Filter | Instant, clear, refocus, count x/y, filter-empty actions. |
| Empty | Chỉ CTA “Thêm bài đầu tiên”; header add/FAB ẩn. |
| Loading/error | Skeleton + status; error + retry; auth warning inline. |
| Add panel | Search/manual modes; search states/errors; save/loading/already-saved; manual form validation/duplicate/cover hint; focus/escape. |
| Edit | Form prefilled; previewUrl không sửa; save. |
| Delete | Confirm copy hiện có; deleting; error; undo toast 10s. |
| Avatar menu | Name, theme radio, sign out; confirm. |
| Toasts | Save/delete/undo/restore error/preview error; theme; aria-live. |

Hành vi bất biến: auth popup→redirect; Firestore `users/{uid}/songs` orderBy createdAt desc,
persistent cache; sourceId dedupe; trimmed writes; restore same doc id/createdAt;
search 400ms/2 chars/10s timeout/429/cache; preview single audio, buffering/error, stops
on sheet close/search change/delete/sign-out; flash 2s + scroll; filter prefill; view
persistence; title switching hiện có.

## 6. Copy & domain

- Ngôn ngữ: tiếng Việt, sentence case, ngắn, trực tiếp; “xóa” (không “xoá”).
- Thuật ngữ UI chuẩn: **bài** cho item đã lưu (Thêm bài, 12 bài, Xóa bài, Đã lưu bài);
  **bài hát** trong câu giải thích; **nghệ sĩ** cho artist (thay “ca sĩ”); **thư viện**,
  **đã lưu**, **nghe thử**, **tài khoản**, **giao diện**.
- Copy mới/chốt: sign-in “Thư viện riêng của bạn” / “Lưu và đồng bộ danh sách bài hát
  trên mọi thiết bị.” / “Đăng nhập bằng Google” / “Chỉ bạn thấy thư viện của mình.”;
  empty “Chưa có bài nào” / “Bài hát bạn thêm sẽ xuất hiện ở đây.” / “Thêm bài đầu tiên”;
  filter-empty “Không có bài nào khớp.” / “Xóa bộ lọc” / “Tìm bài này”; theme “Giao diện” /
  “Theo hệ thống” / “Sáng” / “Tối”; active “Đang nghe thử”.
- Giữ nguyên copy lỗi/auth/undo hiện có trừ khi COPY.md quyết định khác; mọi lỗi phải
  nói việc cần làm. Full table ở `COPY.md` (ticket 01).
- Domain đóng băng: Song identity (sourceId hoặc normalized title+artist); “Đã lưu” chỉ
  thư viện của chính mình; 30s preview; không playlist/order/share; undo in-memory.
  `GLOSSARY.md` viết lại theo thuật ngữ mới, không đổi mô hình.

## 7. Kiểm chứng

- **Agent**: `npm run build`, lint, Prettier; grep hex cũ/Night Sleeve/`#050506`;
  contrast tính từ token (text ≥4.5, UI ≥3); DOM/computed-style cho sign-in/static;
  screenshot sign-in 390/768/1440 light/dark (Chrome headless).
- **Người dùng** (Q7=C): checklist từng màn hình signed-in tại
  `.scratch/rebuild-direction/qa-checklist.md`; chạy sau ticket 11; trả kết quả.
  Trước đó mọi báo cáo phải ghi rõ signed-in chưa được kiểm.
- Không fixture, không auth bypass, không claim signed-in đã đạt checklist.
- Không có test harness; không thêm Vitest/RTL trong scope này (flag 6).

## 8. Giả định / flag (default, user có thể veto)

1. **Undo 10s** như code hiện tại; memory cũ ghi 5s. Giữ 10s để không đổi hành vi.
2. **Count “x / y bài”** khi filter — sửa label backlog; nếu không muốn, giữ “y bài”.
3. **“Nghệ sĩ”** thay “Ca sĩ” trong label/aria; “bài hát” trong câu giải thích.
4. **Sign-in sleeve** dùng brand art (night sleeve + symbol coral), không dùng bìa iTunes.
5. **Title/OG/manifest branding**: không đổi trong rebuild; code hiện tại lowercase/gạch
   ngang, memory ghi “musimob — …” em dash — tách pass riêng nếu muốn.
6. **No test harness**: giữ verification build/lint/static + checklist tay.
7. **Prototype branch**: chưa tạo; sẽ tạo `prototype/soloi` nếu user đồng ý, rồi trỏ
   spec/ticket 12 vào branch thay vì `.scratch`.

## 9. Tickets

Thứ tự và blocking edges:

| # | Ticket | Blocked by |
|---|---|---|
| 01 | Viết lại DESIGN.md / COPY.md / GLOSSARY.md | — |
| 02 | Token foundation + fonts + meta/manifest | 01 |
| 03 | ThemeProvider + no-flash + Toaster theme | 02 |
| 04 | App shell: topbar, h1, count, skip link | 03 |
| 05 | Library toolbar: filter, add, FAB, empty/filter-empty | 04 |
| 06 | Song list + grid + row/card + active preview + states | 05 |
| 07 | Add panel: search + manual form | 04, 05 |
| 08 | Actions menu + edit + delete + undo | 06 |
| 09 | Avatar menu + theme menu + toasts | 03, 04 |
| 10 | Sign-in + loading + error boundary | 03 |
| 11 | Polish, a11y, prune ui, docs sync | 04–10 |
| 12 | Verification + QA checklist + final report | 11 |

Frontier ban đầu: 01. Mọi ticket tự chứa; đọc spec + prototype + COPY.md trước khi làm.
Không sửa app code trước khi user duyệt spec/tickets.
