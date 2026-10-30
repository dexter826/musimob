# Bộ logo MusiMOB

Hướng A đã chốt: chữ **m** trên bìa coral, đĩa trắng lệch góc. Chữ và đĩa đã tách nhau để không dính nét khi thu nhỏ.

## File dùng trong ứng dụng

| File trong `public/` | Công dụng |
| --- | --- |
| `icon.svg` | Nguồn icon đầy màu, nền than kín, không bo sẵn góc ngoài |
| `icon-192.png`, `icon-512.png` | Icon PWA thông thường |
| `icon-maskable.svg`, `icon-maskable-512.png` | Icon maskable riêng, hình thu vào vùng an toàn |
| `apple-touch-icon.png` | Apple Touch Icon 180×180; iOS tự bo góc |
| `favicon.svg` | Favicon vector |
| `favicon.ico` | Favicon đa kích thước 16/32/48 px |
| `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` | Favicon PNG dự phòng |
| `site.webmanifest` | Tên app, màu, chế độ standalone và khai báo icon |
| `opengraph.png` | Ảnh chia sẻ Open Graph 1200×630 |
| `twitter.png` | Ảnh thẻ Twitter/X 1200×600 |

`index.html` đã liên kết favicon, Apple Touch Icon và manifest. Manifest/icon không thay thế service worker và không cung cấp khả năng offline. Metadata Open Graph và Twitter/X dùng URL production tuyệt đối; nguồn ảnh SVG nằm tại `opengraph.svg` và `twitter.svg`.

## Logo dùng ngoài ứng dụng

Bộ gọn gồm symbol và bốn biến thể logo ngang. Wordmark trong app là text Be Vietnam Pro 700 đặt cạnh symbol, không dùng ảnh wordmark riêng.

- `symbol.svg`: biểu tượng màu nền trong suốt, dùng trên nền tối.
- `logo-horizontal.svg`: logo ngang cho nền tối.
- `logo-horizontal-light.svg`: logo ngang cho nền sáng.
- `logo-horizontal-black.svg`, `logo-horizontal-white.svg`: hai bản đơn sắc.
- `opengraph.svg`, `twitter.svg`: nguồn ảnh chia sẻ; bản PNG nằm trong `public/`.
- Không có wordmark-only, logo dọc hay PNG lockup trong repo. Khi cần file ngoài app, dùng logo ngang và render PNG từ SVG.

Các file SVG lockup dùng text Be Vietnam Pro 700 và import font từ Google Fonts. Khi mở trực tiếp trong trình duyệt, font sẽ tải; khi nhúng qua `<img>`, trình duyệt có thể không tải font ngoài. Bản PNG trong `public/` là bản tự chứa.

## Màu và cách dùng

| Màu | HEX | RGB |
| --- | --- | --- |
| Coral | `#ff6a4d` | 255, 106, 77 |
| Than | `#0a0a0b` | 10, 10, 11 |
| Trắng dịu | `#f4f4f5` | 244, 244, 245 |

- Font gốc: **Be Vietnam Pro Bold**, giấy phép SIL Open Font License 1.1. Wordmark trong SVG là text, cần font Be Vietnam Pro 700; PNG đã render sẵn. Giấy phép kèm trong `OFL.txt`.
- Khoảng trống tối thiểu ngoài biên hình nhìn thấy: bằng đường kính lỗ đĩa (16 đơn vị trên canvas 256).
- Icon chuẩn: từ 32 px; favicon có thể dùng ở 16 px, nhưng chữ và lỗ đĩa giảm độ rõ.
- Logo ngang: tối thiểu 180 px chiều rộng. Nhỏ hơn nên dùng biểu tượng riêng.
- Bản màu nền tối: dùng trên nền than đồng nhất. Nền sáng dùng bản `-light`, hoặc đơn sắc đen.
- Không kéo méo, xoay riêng từng phần, thêm bóng/gradient, đổi font, hoặc đặt bản màu trực tiếp trên ảnh nhiều chi tiết.
- Không dùng icon thông thường làm maskable: dùng bản maskable riêng. Toàn bộ hình của bản đó nằm trong vòng tròn an toàn bán kính 40% canvas.
- Màu RGB là chuẩn cho sản phẩm web; chưa làm bản in thử hay chốt màu spot/CMYK.

## Xuất lại PNG

Ví dụ, từ thư mục repo:

```powershell
python .agents/skills/logo-design/scripts/render_png.py public/icon.svg -o public/icon-192.png --size 192
python .agents/skills/logo-design/scripts/render_png.py public/icon.svg -o public/icon-512.png --size 512
python .agents/skills/logo-design/scripts/render_png.py public/icon.svg -o public/apple-touch-icon.png --size 180
python .agents/skills/logo-design/scripts/render_png.py public/icon-maskable.svg -o public/icon-maskable-512.png --size 512
python .agents/skills/logo-design/scripts/render_png.py public/favicon.svg --ico public/favicon.ico --ico-sizes 16 32 48
```

Ảnh social và logo ngang cần Be Vietnam Pro 700; render từ `opengraph.svg`, `twitter.svg` hoặc `logo-horizontal.svg` trong trình duyệt đã có font.

Chưa thực hiện tra cứu bảo hộ nhãn hiệu; các file này không phải xác nhận pháp lý về tính độc quyền.
