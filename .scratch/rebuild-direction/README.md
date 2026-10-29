# musimob — prototype “Sổ lưu”

Throwaway direction study for the 2026-10-29 rebuild. Static HTML/CSS, not production code.
Mục đích: chốt hướng thị giác, shell và chất liệu trước khi viết spec.

## Brief

- Sản phẩm: thư viện bài hát riêng tư, dùng hằng ngày, tiếng Việt, web/PWA.
- Không player, không playlist, không social; chỉ lưu, tìm, sửa, xóa và nghe thử 30 giây.
- Ràng buộc: giữ tên + logo; palette/type tự do; font phải có Vietnamese subset; dual theme.
- Hướng đã chốt: “sổ lưu yên tĩnh”, light-native, bìa đĩa dẫn màu, mật độ cao.

## Kế hoạch thiết kế

**Concept: tấm ex libris trong một cuốn sổ lưu.**
Giao diện là một trang giấy: mực, giấy, và đúng một dấu sách coral. Bìa đĩa là nguồn màu duy nhất
trên diện rộng. Dấu sách đánh dấu đúng bài đang nghe thử — vừa là signature, vừa là metaphor sở hữu.

### Màu

Light-native:

- `paper` `#F4F3EE`, `surface` `#FAF9F5`, `rule` `#D8D7CD`
- `ink` `#1A1B17`, `graphite` `#5B5E55`
- `bookmark` `#FF6A4D` (logo coral; chỉ dùng cho tab, action chính, focus/accent)
- `bookmark-text` `#B23A27` (text nhỏ trên giấy), `bookmark-soft` `#FCE8E2`
- `moss` `#3F5D4E` (đã lưu), `danger` `#A02C22`

Dark counterpart:

- `night` `#11130F`, `raised` `#1E201B`, `bone` `#EDEEE8`, `bone-muted` `#A6A99E`
- `bookmark` `#FF8A75`

Coral trên giấy chỉ đạt 2.55:1 nên không dùng làm text; text coral dùng `#B23A27` (5.36:1).
Ink trên coral đạt 6.12:1; dark dùng `#FF8A75` trên nền than (6.31:1).

### Kiểu chữ

- **Lora** — tiêu đề trang và tiêu đề đăng nhập; Vietnamese subset đã kiểm.
- **Be Vietnam Pro** — toàn bộ UI, nhãn, metadata; Vietnamese subset đã kiểm.
- Scale: 12 meta, 14.5 title hàng, 16 input trên mobile, 28–34 page title, 38 sign-in.
- Không all-caps, không mono labels, không middle-dot meta strings.

### Layout

Shell A — Trang sách (đề xuất):

```
┌ logo                              [view] [avatar] ┐
│ Thư viện                        [tìm…] [+ Thêm bài] │
│ 12 bài                                             │
│ ▣  Tên bài                              ⋯          │
│ ▣  Tên bài / Đang nghe thử              ⋯          │
└────────────────────────────────────────────────────┘
```

Shell B — Kệ:

```
┌ logo [tìm…]              12 bài [view] [+ Thêm] [avatar] ┐
│ ▣ ▣ ▣ ▣ ▣ ▣                                               │
│ Title  Title  Title  Title  Title  Title                  │
└───────────────────────────────────────────────────────────┘
```

Đăng nhập:

```
        ┌──────────────┐
        │    cover     │
        │   ┌──────────┴────────┐
        │   │    bookplate      │
        └───┤    sign in        │
            └───────────────────┘
```

- Mobile 390px: tiêu đề thu còn 28px, tìm kiếm một hàng, add thành dấu sách nổi ở đáy.
- Breakpoint dự kiến: 720px; grid 6 cột desktop → 2 cột mobile.
- Control 44px; cover 2px radius; control 8px; dấu sách là hình ribbon.

### Nguyên tắc

1. Bìa đĩa là màu; UI là giấy và mực.
2. Coral chỉ dành cho dấu sách và hành động chính.
3. Không card, không shadow, trừ tấm bookplate và một FAB.
4. Lora giữ chất “sổ”; Be Vietnam Pro giữ mật độ.
5. Motion chỉ trả lời thao tác; reduced-motion tắt hết.

### Đã cân nhắc và loại

- Cream + serif tương phản cao + terracotta: default AI, không phải lựa chọn cho brief này.
- Hero lớn: bìa đĩa mới là thứ đặc trưng nhất; tiêu đề chỉ là đầu trang.
- Card kit (cùng radius/shadow cho mọi thứ): hàng và bìa có nhịp riêng.
- Mono labels, all-caps eyebrow, middle-dot meta, numbered markers: không dùng.
- Vinyl/record motif cũ: thay bằng ex libris + cover thật.

## Xem prototype

```bash
python -m http.server 4173 --directory .scratch/rebuild-direction/prototype
```

Mở `http://localhost:4173/` (thêm `?theme=dark` để xem bản tối).
Hoặc mở trực tiếp `prototype/index.html`; cần mạng để tải Google Fonts.

Ảnh chụp: `../shots/full-light-tall.png` và `../shots/full-dark.png`.

Prototype, `assets/covers` và ảnh chụp là **local-only**, không commit (đã exclude trong
`.git/info/exclude`).

## Có gì trong prototype

- Style tile: token 3 lớp, swatches light/dark, type, buttons, search, hàng đang nghe, toast,
  lỗi, skeleton, empty, radius.
- Shell A desktop (list), Shell B desktop (grid), sign-in desktop, mobile library + sign-in.
- Theme switch hoạt động; nút preview đổi trạng thái đang nghe (một bài tại một thời điểm).

## Không có trong prototype

Add/edit/delete sheet, avatar menu, search result, error/loading toàn màn hình, auth thật,
menu tùy chọn hàng, toast động. Đây là nghiên cứu hướng, không phải bản dựng sản phẩm.

## Kiểm chứng

- Ảnh chụp bằng Chrome/Edge headless ở 1440px, light + dark.
- Interaction test bằng Chrome headless: preview toggle giữ đúng một hàng active, aria-label
  đổi play/pause; theme switch đổi `data-theme` và `aria-checked`.
- Chưa kiểm tra signed-in, chưa có dữ liệu thật; bìa đĩa lấy từ iTunes Search API chỉ để dựng hình.

## Ghi chú Web Interface Guidelines

Không có vi phạm critical trong prototype. Các mục còn lại là hành vi production:

- `index.html:130` — toast mẫu tĩnh; bản thật cần `role="status"`/`aria-live="polite"`.
- `index.html:179` — số “12 bài” hardcoded; bản thật dùng `Intl.NumberFormat`.
- `index.html:178` — screen title đang là h3 trong showcase; app thật dùng h1.
- `index.html:205` — các nút `aria-haspopup="menu"` chưa có menu; prototype chỉ dựng affordance.
- View mode/filter chưa sync URL; quyết định ở spec.
- Font đang tải qua Google Fonts CSS; production nên self-host hoặc preload subset.
