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
  coral-200: '#FFB3A4'
  coral-300: '#FF8A75'
  coral-500: '#FF6A4D'
  coral-600: '#F25B3D'
  coral-700: '#B23A27'
  moss-700: '#3F5D4E'
  red-700: '#A02C22'
  night-950: '#11130F'
  night-900: '#161814'
  night-800: '#1E201B'
  night-700: '#282B24'
  bone-100: '#EDEEE8'
  bone-400: '#A6A99E'
  primary: '{colors.coral-500}'
  primary-foreground: '{colors.ink-900}'
  background: '{colors.paper-100}'
  foreground: '{colors.ink-900}'
  surface: '{colors.paper-50}'
  surface-2: '{colors.paper-200}'
typography:
  display:
    fontFamily: 'Lora, Georgia, "Times New Roman", serif'
    fontSize: '38px'
    fontWeight: 500
    lineHeight: '1.08'
    letterSpacing: '-0.02em'
  headline-lg:
    fontFamily: 'Lora, Georgia, "Times New Roman", serif'
    fontSize: '34px'
    fontWeight: 500
    lineHeight: '1.08'
    letterSpacing: '-0.015em'
  headline-md:
    fontFamily: 'Lora, Georgia, "Times New Roman", serif'
    fontSize: '24px'
    fontWeight: 500
    lineHeight: '1.20'
  title:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '14.5px'
    fontWeight: 600
    lineHeight: '1.35'
  body:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: '1.6'
  label:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: '1.4'
  button:
    fontFamily: 'Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: '13px'
    fontWeight: 600
    lineHeight: '1'
rounded:
  sm: '2px'
  DEFAULT: '8px'
  md: '8px'
  lg: '12px'
  full: '9999px'
spacing:
  unit: '4px'
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  2xl: '48px'
  3xl: '64px'
  container-max: '1120px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.button}'
    rounded: '{rounded.md}'
    height: '44px'
    padding: '0 16px'
  button-ink:
    backgroundColor: '{colors.ink-900}'
    textColor: '{colors.paper-50}'
    typography: '{typography.button}'
    rounded: '{rounded.md}'
    height: '44px'
    padding: '0 16px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    typography: '{typography.button}'
    rounded: '{rounded.md}'
    height: '44px'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    height: '44px'
  badge:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.moss-700}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    height: '24px'
    padding: '0 8px'
  sheet:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.lg}'
  card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.md}'
---

## Overview

MusiMOB là cuốn sổ lưu bài hát riêng tư, yên tĩnh và được sắp đặt bằng tay. Thiết kế định hình theo triết lý "Sổ lưu": trang giấy là nền tảng; màu sắc đến từ bìa đĩa; mực là chữ viết; và một dấu sách màu coral duy nhất đánh dấu bài đang nghe hoặc điểm nhấn hành động. Sản phẩm không phải là trình phát nhạc, không phải dashboard quản trị và không phải trang landing page tiếp thị.

Hệ thống tuân thủ ba nguyên tắc thị giác nền tảng:
- **The Paper Rule:** Bề mặt phẳng tuyệt đối. Các tầng nội dung tách biệt bằng sắc độ giấy và đường viền 1px; không gradient, không kính mờ (glassmorphism), không hiệu ứng vân giấy hay giả lập nổi (skeuomorphism).
- **The Artwork Rule:** Khi có bìa đĩa, bìa đĩa là nguồn dẫn dắt màu sắc chính. Khung chrome hệ thống chỉ dùng giấy, mực và một điểm nhấn coral, không tranh chấp thị giác với nội dung.
- **The Answer-Only Rule:** Chuyển động (motion) chỉ xuất hiện để phản hồi tương tác tức thời (120–180ms), chỉ thay đổi màu, viền hoặc độ mờ (opacity). Tuyệt đối không có chuyển động trang trí hoặc tự động; tắt hoàn toàn khi `prefers-reduced-motion` bật.

## Colors

Bảng màu bắt nguồn từ sự tương phản tự nhiên giữa giấy ấm và mực đen, điểm xuyết bởi một dấu sách màu san hô (coral).

- **Primary (`coral-500` / `#FF6A4D`):** Dấu sách duy nhất. Dùng độc quyền cho hành động chính quan trọng nhất, tab đang hoạt động và trạng thái nghe thử hiện hành.
- **Background (`paper-100` / `#F4F3EE`):** Nền giấy ấm trung tính cho toàn bộ ứng dụng. Trên chế độ tối chuyển sang `night-950` (`#11130F`).
- **Surface (`paper-50` / `#FAF9F5`):** Bề mặt giấy sáng nhất cho thẻ, sheet, hộp thoại và panel. Chế độ tối chuyển sang `night-900` (`#161814`).
- **Text & Foreground (`ink-900` / `#1A1B17`):** Mực đen sâu cho văn bản chính, đạt tỷ lệ tương phản 15.58:1 (AAA). Chế độ tối dùng `bone-100` (`#EDEEE8`, 15.84:1).
- **Secondary Text (`ink-600` / `#5B5E55`):** Mực xám cho văn bản phụ, nhãn và placeholder. Chế độ tối dùng `bone-400` (`#A6A99E`).
- **Borders & Dividers (`rule` / `#D8D7CD`):** Đường kẻ phân cách 1px mỏng nhẹ. Đường viền ô nhập liệu (`control-border` / `#7A7D73`) đảm bảo tỷ lệ tương phản ≥ 3:1.
- **Accents & Semantics:** `moss-700` (`#3F5D4E`) cho trạng thái đã lưu/thành công; `red-700` (`#A02C22`) cho cảnh báo và thao tác xóa.

## Typography

Hệ thống áp dụng chiến lược hai họ phông chữ (The Two-Voice Rule) phân định rõ ràng giữa chất văn học và tính công năng:

- **Headlines & Display:** Sử dụng **Lora** (Serif) với trọng lượng Medium (500) cho tiêu đề trang, tiêu đề phân mục lớn và tiêu đề hộp thoại, mang lại cảm giác trang trọng của sách in truyền thống.
- **UI & Content:** Sử dụng **Be Vietnam Pro** (Sans-serif) cho toàn bộ phần còn lại (tiêu đề bài hát, nội dung thân bài, nhãn nút, form nhập liệu và siêu dữ liệu). Không trộn thêm họ phông thứ ba.
- **Formatting:** Áp dụng Sentence case cho mọi tiêu đề và nhãn nút (chỉ viết hoa chữ đầu). Sử dụng `tabular-nums` cho số đếm và thời lượng, `text-wrap: balance` cho tiêu đề lớn, dấu ngoặc kép cong `“”`, ba chấm đơn `…` và gạch ngang en dash `–`.

## Layout & Spacing

Bố cục tổ chức theo mô hình tập trung, không thanh điều hướng bên (no sidebar), tối ưu cho trải nghiệm đọc liền mạch.

- **Container:** Độ rộng khung chứa tối đa là `1120px`, luôn căn giữa với khoảng đệm hai bên `clamp(20px, 5vw, 64px)`.
- **Rhythm:** Thang khoảng cách xây dựng nghiêm ngặt trên đơn vị cơ sở 4px (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Breakpoints:** Các mốc thích ứng chuẩn gồm 640px (`sm`), 768px (`md`), 900px (`lg`), 1200px (`xl`).
- **Touch Targets:** Mọi phần tử tương tác đều duy trì diện tích chạm tối thiểu `44×44px` trên cả thiết bị di động và máy tính bàn.

## Elevation & Depth

Độ sâu không gian được xây dựng thông qua kỹ thuật xếp tầng giấy phẳng (Tonal Layering) thay vì bóng đổ.

- **Tonal Layers:** Các tầng nội dung phân cấp từ nền (`background`) lên bề mặt (`surface`) và vùng tương tác (`surface-2`), phân định bằng đường kẻ 1px `rule` hoặc `control-border`.
- **The One Floating Object Rule:** Chỉ một vật thể duy nhất trong hệ thống được phép đổ bóng mờ là nút hành động nổi (FAB) với `drop-shadow(0 8px 18px rgb(26 27 23 / 18%))`. Toàn bộ thẻ, sheet, hộp thoại, thanh tiêu đề và toast đều phẳng tuyệt đối (0px shadow).
- **Offset Sheet:** Khi cần thể hiện độ dày của giấy xếp chồng, sử dụng tấm nền lệch 6px không làm mờ (`offset: 6px`) thay cho hiệu ứng bóng mờ.

## Shapes

Ngôn ngữ hình khối phản ánh ngữ nghĩa của từng phần tử (The Round by Role Rule):

- **Media & Artwork:** Bo góc tối thiểu `2px` (`rounded.sm`) giữ cạnh sắc nét như bìa sách giấy thật.
- **Controls & Buttons:** Bo góc `8px` (`rounded.md`) cho nút bấm, ô nhập liệu và các phần tử điều khiển tương tác.
- **Sheets & Panels:** Bo góc `12px` (`rounded.lg`) cho các bề mặt nổi lớn như sheet hoặc dialog.
- **Badges:** Bo góc `2px` (`rounded.sm`) tạo nhãn nhỏ gọn gàng.
- **Avatars & Floating Controls:** Bo tròn hoàn toàn (`rounded.full` / `9999px`).
- **Constraints:** Tuyệt đối không dùng hình viên thuốc (pill shape) cho nút bấm hoặc thanh tìm kiếm; không áp dụng một bán kính bo góc cho mọi thành phần.

## Components

### Action Elements

Nút bấm chính (Primary Button) sử dụng màu nền san hô với chữ đen mực (`height: 44px`, bo góc `8px`), biểu thị hành động quyết định. Nút phụ nhấn mạnh (Ink Button) dùng nền đen mực và chữ giấy trắng. Nút Ghost giữ nền trong suốt với viền mảnh 1px. Mọi icon button có kích thước thị giác 36px nhưng luôn nằm trong diện tích chạm 44px và bắt buộc kèm `aria-label`.

### Containers & Surfaces

Thẻ và panel là các bề mặt phẳng dùng nền `surface`, phân tách bằng viền 1px `rule`. Hộp thoại (dialog) và sheet có độ rộng tối đa `560px`, bo góc `12px`, tiêu đề dùng phông Lora và bắt buộc có bẫy tiêu điểm (focus trap) cùng phím tắt `Escape`.

### Inputs & Forms

Ô nhập liệu có chiều cao tiêu chuẩn `44px`, bo góc `8px`, nền `surface` và viền 1px `control-border`. Cỡ chữ tối thiểu 16px trên màn hình di động để tránh trình duyệt tự động phóng to. Vòng nét chỉ thị tiêu điểm (`focus-visible`) rộng 2px với offset 2px.

### Badges & Feedback

Badge chỉ xuất hiện ở trạng thái xác nhận (cao `24px`, bo góc `2px`, nền `surface-2`, chữ `moss-700` 12px/500). Thông báo nổi (Toast) hiển thị ngắn gọn ở cạnh dưới màn hình, không che khuất các phần tử điều khiển cốt lõi.

## Do's and Don'ts

- Do dùng màu san hô (`coral`) như chiếc dấu sách thiêng liêng — chỉ xuất hiện ở điểm nhấn tương tác cao nhất.
- Do để bìa đĩa và hình ảnh dẫn dắt màu sắc; khung chrome hệ thống giữ vai trò trung tính (giấy và mực).
- Do tuân thủ triệt để nguyên tắc hai giọng nói: Lora cho tiêu đề văn học, Be Vietnam Pro cho toàn bộ giao diện.
- Do duy trì diện tích chạm tối thiểu 44×44px cho mọi phần tử tương tác.
- Do phân tách các tầng bề mặt bằng sắc độ giấy và viền 1px mảnh.
- Don't xây dựng trình phát nhạc hoàn chỉnh (player, seek bar, volume control, playback queue).
- Don't đưa vào bảng điều khiển (dashboard), biểu đồ quản trị hoặc khối tiếp thị phong cách landing page.
- Don't sử dụng gradient, kính mờ (glassmorphism), texture hạt hay màu nhấn rực rỡ thứ hai.
- Don't dùng bóng đổ (drop-shadow) cho thẻ, sheet, hộp thoại hay menu (ngoại trừ duy nhất nút FAB).
- Don't dùng hình viên thuốc (pill shape) cho nút bấm hoặc thanh tìm kiếm; không bo tròn một bán kính cho mọi thành phần.
- Don't dùng màu trắng tinh khiết (`#FFFFFF`) cho chữ trên nền tối; luôn dùng tông trắng xương (`bone-100`).
- Don't sử dụng chữ hoa toàn bộ (ALL-CAPS) cho nhãn hoặc siêu dữ liệu.
