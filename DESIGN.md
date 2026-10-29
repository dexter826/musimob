---
name: musimob
description: Sổ lưu bài hát riêng tư — tối, ấm, kín đáo.
colors:
  ember-coral: '#ff6a4d'
  ember-ink: '#1a0a06'
  ember-warn: '#ff8a75'
  vinyl-black: '#050506'
  vinyl-card: '#131316'
  vinyl-raised: '#1c1c20'
  soft-white: '#f4f4f5'
  ash: '#8f8f9a'
  seam: '#2a2a30'
typography:
  display:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
    fontSize: '64px'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
    fontSize: '34px'
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
    fontSize: '14.5px'
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: '0em'
  body:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
    fontSize: '13.5px'
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: '0em'
  label:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0em'
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  xl: '12px'
spacing:
  step-2-5: '10px'
  step-3: '12px'
  step-4: '16px'
  step-5: '20px'
  step-6: '24px'
  step-8: '32px'
  step-10: '40px'
  step-16: '64px'
components:
  button-primary:
    backgroundColor: '{colors.ember-coral}'
    textColor: '{colors.ember-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.lg}'
    padding: '0 16px'
    height: '44px'
  button-outline:
    backgroundColor: '{colors.vinyl-black}'
    textColor: '{colors.soft-white}'
    rounded: '{rounded.lg}'
    height: '36px'
    width: '36px'
  button-ghost-icon:
    textColor: '{colors.ash}'
    rounded: '{rounded.lg}'
    height: '36px'
    width: '36px'
  input-search:
    backgroundColor: '{colors.vinyl-raised}'
    textColor: '{colors.soft-white}'
    rounded: '999px'
    padding: '0 12px'
    height: '44px'
  badge-saved:
    backgroundColor: '{colors.vinyl-raised}'
    textColor: '{colors.ash}'
    rounded: '{rounded.md}'
    padding: '0 10px'
    height: '28px'
  fab-add:
    backgroundColor: '{colors.ember-coral}'
    textColor: '{colors.ember-ink}'
    rounded: '999px'
    size: '56px'
---

# Design System: musimob

## Overview

**Creative North Star: "The Night Sleeve"**

musimob là một kệ đĩa than trong phòng tối: bìa đĩa là vật thể duy nhất bắt sáng, còn giá đỡ, nhãn và nút bấm lùi về màu than. Giao diện không gợi không khí "đang nghe nhạc" — không player, không sóng nhạc, không hàng chờ, chỉ một nút nghe thử 30 giây trên ảnh bìa — mà gợi cảm giác sở hữu: mở app ra là thấy đúng những bìa mình đã chọn, xếp trên một mặt phẳng yên tĩnh.

Sự ấm áp đến từ đúng một nguồn: Ember Coral, dùng như ngọn đèn nhỏ trong phòng — một hành động chính, một focus ring, chữ "mob" trong wordmark, chiếc đĩa coral trên màn đăng nhập. Mọi thứ còn lại là Vinyl Charcoal nhiều tầng với Soft White và Ash. Bề mặt phẳng, viền sáng 1px thay bóng đổ; chỉ nút thêm bài được phép nổi.

Mật độ cao, chữ nhỏ, nhịp đều: hàng danh sách 50px cover, type 11–14.5px, khoảng cách 10/12px. Cảm giác component là điềm tĩnh và chạm được — vật thể thật, phản hồi nhẹ, không trang trí thừa. Anti-reference: không giống UI trình phát streaming, không giống dashboard SaaS.

**Key Characteristics:**

- Nền than gần đen, đúng một accent coral
- Ảnh bìa dẫn dắt màu sắc; chrome trung tính
- Bề mặt phẳng + viền sáng 1px; chỉ FAB đổ bóng
- Type UI nhỏ (11–14.5px), hierarchy bằng weight và sắc độ
- Bo góc theo vai trò: 6px artwork, 8px control, 12px surface, pill cho tìm kiếm và hành động
- Mobile-first một cột; drawer tối đa 560px

## Colors

Bảng màu là một căn phòng tối có đúng một ngọn đèn: than nhiều tầng, một coral ấm, không màu nào khác chen vào.

### Primary

- **Ember Coral** (#ff6a4d): nút hành động chính, focus ring, chữ "mob" trong wordmark, avatar (nền chữ cái khi không có ảnh), FAB, đĩa coral ở màn đăng nhập, dấu check trạng thái. Không dùng cho khối nền lớn.
- **Ember Ink** (#1a0a06): chữ và icon đặt trên nền coral.
- **Ember Warn** (#ff8a75): chữ cảnh báo và hành động xoá. Là sắc coral nhạt hơn, không phải accent thứ hai.

### Neutral

- **Vinyl Black** (#050506): canvas toàn app, theme-color, nền của input outline.
- **Vinyl Card** (#131316): card, popover, mặt drawer, tấm đăng nhập.
- **Vinyl Raised** (#1c1c20): nền ô tìm kiếm (60% opacity), track của segmented tabs, hover surface, fallback của cover.
- **Soft White** (#f4f4f5): chữ chính. Không dùng trắng tinh khiết cho body.
- **Ash** (#8f8f9a): ca sĩ, đếm bài, placeholder, icon phụ, chữ mô tả.
- **Seam** (#2a2a30): viền 1px của input, nút outline, divider. Card dùng ring trắng 10% thay vì seam.

### Named Rules

**The One Ember Rule.** Coral chiếm ≤10% diện tích mỗi màn hình. Sự hiếm là điểm nhấn; thêm accent thứ hai là phá hệ.

**The Artwork Leads Rule.** Khi trên màn hình có ảnh bìa, màu của ảnh là màu chủ đạo; chrome không được cạnh tranh với nó.

## Typography

**Display Font:** Be Vietnam Pro (với ui-sans-serif, system-ui, Segoe UI)
**Body Font:** Be Vietnam Pro (cùng stack)
**Label/Mono Font:** không có; một family duy nhất cho toàn bộ giao diện

**Character:** Một family duy nhất, dấu tiếng Việt dày và rõ. Cỡ lớn dùng tracking âm; ở UI nhỏ, hierarchy đến từ weight 600 và màu Ash/Soft White chứ không từ cỡ chữ.

### Hierarchy

- **Display** (700, 40–64px, line-height 1, tracking −0.04em): wordmark ở màn đăng nhập; không dùng cho nội dung.
- **Headline** (600, 18–34px, line-height 1.15, tracking −0.02em): tiêu đề empty state, tiêu đề drawer 18px.
- **Title** (600, 14.5px, line-height 1.35, tracking 0): tên bài trong danh sách.
- **Body** (400, 13–13.5px, line-height 1.5–1.55): copy phụ, mô tả empty state, nội dung alert (12.5px).
- **Label** (500, 11–12.5px, line-height 1.4): đếm bài, badge, trạng thái, meta.

### Named Rules

**The Small-Type Rule.** Type UI sống ở 11–14.5px, kể cả số lẻ .5px — đó là mật độ có chủ đích. Chỉ heading mới vượt 18px. Tăng weight hoặc đổi sang Soft White thay vì tăng cỡ chữ.

## Layout

- **Khung trang:** mobile-first, một cột, mọi thứ neo vào cạnh màn hình; gutter 24px → 32px (sm) → 48px (lg) → 64px (xl); header padding-top 20px → 28px (lg).
- **Danh sách:** phẳng, hàng padding 12px ngang / 10px dọc; ô lọc cách danh sách 16px.
- **Lưới cover:** 2 cột (gap 10px) → 3 (12px) → 4 (16px) → 5.
- **Drawer:** rộng tối đa 560px, cao tối đa 85dvh, bo góc trên, chừa safe-area đáy 20px.
- **FAB:** cố định phải 24/32/48/64px, đáy 20px + safe-area.
- **Màn đăng nhập:** lề ngoài 20px, một tấm tối đa 560px, padding trong 24px → 36px → 44px (lg), cao tối thiểu 520px → 560px, vuông ở lg.
- **Trục dọc:** nội dung co giãn; trạng thái rỗng/lỗi chiếm trọn phần còn lại.

## Elevation & Depth

Hệ phẳng mặc định. Card không đổ bóng: độ nổi đến từ ba tầng màu than (Vinyl Black → Vinyl Card → Vinyl Raised) và một viền sáng 1px (ring trắng 10% hoặc seam). Bóng chỉ xuất hiện ở vật thể nổi và lớp phủ tạm thời; màn đăng nhập thêm một quầng coral radial 12% ở mép trên để tạo không khí đèn phòng.

### Shadow Vocabulary

- **Floating action** (`0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)`): chỉ dành cho FAB.
- **Segmented active** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`): tab đang chọn trong segmented control.

### Named Rules

**The One Floating Object Rule.** Chỉ nút thêm bài được đổ bóng ở trạng thái nghỉ. Mọi surface khác phẳng; nếu cần tách khỏi nền, dùng seam hoặc ring, không dùng shadow.

## Shapes

Bo góc theo vai trò, không theo một thang duy nhất: artwork 6px, control và button 8px, surface (card, tile, drawer) 12px, pill cho ô tìm kiếm và nút lưu, hình tròn cho avatar và FAB. Viền luôn 1px. Drawer chỉ bo hai góc trên. Ảnh bìa là hình vuông bo nhẹ, không đeo khung; tile lưới cắt vuông tuyệt đối và phủ scrim đen ở đáy.

### Named Rules

**Round by Role.** Pill chỉ dành cho ô tìm kiếm và hành động lưu. Đừng bo tròn mọi thứ; surface giữ 12px, artwork giữ 6px.

## Components

### Buttons

- **Shape:** bo 8px; hành động chính cao 44px, nút mặc định 32px, nút đăng nhập 48px.
- **Primary:** nền Ember Coral, chữ Ember Ink, semibold 13–14px, padding ngang 16px; hover giảm còn 80% opacity; active dịch xuống 1px; focus viền coral + ring 3px coral/50.
- **Secondary / Ghost:** outline dùng nền canvas + viền seam, hover Vinyl Raised; ghost không viền, icon Ash, hover Vinyl Raised. Nút icon 36px.
- **Loading:** giữ nguyên kích thước, thay nhãn bằng spinner 16px + nhãn trạng thái tải (COPY.md); không đổi layout.

### Chips

- **Style:** badge trạng thái đã lưu nền Vinyl Raised, chữ Ash, cao 28px, bo 6px, type 11.5px medium, icon check 12px. Không dùng badge cho trang trí.

### Cards / Containers

- **Corner Style:** 12px.
- **Background:** Vinyl Card.
- **Shadow Strategy:** không bóng; ring 1px trắng 10% (xem Elevation & Depth).
- **Border:** ring thay border; divider bên trong dùng seam.
- **Internal Padding:** 16px (trạng thái rỗng/lỗi dùng 24px ngang, 64px dọc).

### Inputs / Fields

- **Style:** cao 44px; ô lọc bo 8px, ô tìm kiếm trong drawer bo pill; nền Vinyl Raised 60%; viền 1px seam; chữ 16px trên mobile, 14px từ md.
- **Focus:** viền Ember Coral + ring 3px coral/50; không đổi nền.
- **Error / Disabled:** viền Ember Warn, chữ lỗi 12px Ember Warn; disabled giảm opacity 50%.

### Navigation

- **Header:** wordmark 17–20px bold, phần "mob" màu coral; dưới là đếm bài 12px Ash; bên phải là toggle xem (outline icon 36px) và avatar 36px hình tròn, vùng chạm 44px. Avatar dùng ảnh đại diện Google khi có, cắt `object-cover`; khi không có ảnh (hoặc ảnh lỗi) hiện chữ cái đầu của tên trên nền Ember Coral, chữ Ember Ink bold 12px.
- **Menu:** dropdown nền popover, item 13px, mục xoá dùng Ember Warn; trigger là ghost icon 36px.

### Song row (signature)

Hàng phẳng cao ~70px: cover 50px bo 6px, cách chữ 12px; tên bài 14.5px semibold truncate; ca sĩ 12.5px Ash truncate; menu ellipsis 36px bên phải. Không separator giữa các hàng — khoảng trắng và nhịp 10px giữ danh sách.

### Song tile (signature)

Ô vuông bo 12px, cover phủ kín, scrim đen 90% → 40% → trong suốt từ đáy; tên bài trắng 12.5px semibold, ca sĩ trắng 60% 11px; menu ellipsis nổi góc trên phải trên nền đen 65%.

### Preview control

Nút tròn 28px đặt giữa artwork, vùng chạm 36px: list dùng trên cover 50px, grid dùng giữa tile. Nền đen 65%, icon trắng 14px. Đang phát: nền Ember Coral, icon Ember Ink. Đang tải: spinner thay icon. Không có bản nghe thử: giữ nút với icon loa gạch, chữ mờ 70%, kèm tooltip và toast nêu lý do — không ẩn nút. Không progress, không seek, không volume.

### Floating add (signature)

Nút tròn 56px Ember Coral, icon plus 24px Ember Ink, bóng "Floating action"; cố định đáy phải với safe-area. Đây là vật thể nổi duy nhất của app.

### Add/edit panel

Mobile: drawer tối đa 560px, bo 12px hai góc trên, nền popover, viền seam trên; tay nắm 100×4px Vinyl Raised; cao theo nội dung, tối đa 85dvh. Header: tiêu đề trái, hành động phụ nhập tay và nút đóng phải.
Web ≥768px: dialog giữa màn hình rộng 560px, cùng nội dung, cao tối đa 85dvh. Thêm bài dùng ô tìm là nội dung chính; nhập tay thay nội dung trong cùng khung với nút quay lại. Không dùng segmented tabs.

### Sign-in sleeve (signature)

Một tấm Vinyl Card bo 8px (ngoại lệ có chủ đích của surface 12px) đặt trên canvas, có quầng coral radial 12% phía trên. Góc phải là hình đĩa than: các vòng tròn 1px seam mờ dần, đĩa coral đặc với lỗ tâm màu nền. Wordmark 40/52/64px. Đúng một hành động Google cao 48px — sự quen thuộc là nhiệm vụ, không phải chỗ để sáng tạo.

## Do's and Don'ts

### Do:

- **Do** giữ coral ≤10% mỗi màn hình và chỉ dùng cho hành động, focus, dấu trạng thái.
- **Do** để ảnh bìa mang màu; nếu cover thiếu, dùng Vinyl Raised + icon nhạc Ash.
- **Do** giữ type UI trong khoảng 11–14.5px và tạo thứ bậc bằng weight/sắc độ.
- **Do** dùng viền 1px (seam hoặc ring trắng 10%) để tách surface thay vì đổ bóng.
- **Do** giữ vùng chạm tối thiểu 36px, hành động chính 44px, FAB 56px.
- **Do** viết copy tiếng Việt ngắn, lỗi nói rõ việc cần làm tiếp theo.

### Don't:

- **Don't** thêm player, progress bar, hàng chờ hay điều khiển phát toàn bài; chỉ có nút nghe thử 30 giây trên ảnh bìa.
- **Don't** thêm thẻ số liệu, chart, hay chrome dashboard nhiều khu vực.
- **Don't** thêm accent hue thứ hai; gradient chỉ được dùng cho scrim của tile và quầng đăng nhập.
- **Don't** bo tròn mọi thứ thành pill; pill chỉ cho tìm kiếm và hành động lưu.
- **Don't** đổ bóng cho card hoặc hàng danh sách.
- **Don't** dùng trắng tinh khiết cho chữ; body là Soft White, phụ là Ash.
