# Bộ logo Musimob

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

`index.html` đã liên kết favicon, Apple Touch Icon và manifest. Manifest/icon không thay thế service worker và không cung cấp khả năng offline.
Theo yêu cầu chốt lại phạm vi ticket 07, service worker/offline không nằm trong phần bàn giao này. Metadata Open Graph và Twitter/X dùng URL production tuyệt đối; nguồn ảnh SVG outline nằm tại `opengraph.svg` và `twitter.svg` trong thư mục này.

## Logo dùng ngoài ứng dụng

File SVG ở thư mục này đều đã chuyển chữ thành path, không cần cài font để hiển thị:

- `symbol.svg`: biểu tượng màu nền trong suốt, dùng trên nền tối.
- `symbol-black.svg`, `symbol-white.svg`, `symbol-coral.svg`: biểu tượng một màu; phần chữ, lỗ đĩa và khoảng tách đĩa là vùng trong suốt thật.
- `wordmark.svg`: chữ `musimob`, phần `mob` màu coral, dùng trên nền tối.
- `wordmark-light.svg`: wordmark dùng trên nền sáng.
- `logo-horizontal.svg`, `logo-stacked.svg`: biểu tượng ghép wordmark theo chiều ngang/dọc, dùng trên nền tối.
- Hậu tố `-light`: bản màu cho nền sáng. Hậu tố `-black` / `-white`: bản đơn sắc tương ứng.
- `app-icon-1024.png`: icon 1024×1024 để bàn giao.
- `png/`: bản PNG nền trong suốt của biểu tượng, logo ngang và logo dọc. Giữ khoảng trống của canvas khi sử dụng.
- `preview.html`: bảng xem các biến thể và icon ở kích thước thật.

Không thay wordmark đang có trong giao diện; các lockup này phục vụ tài sản thương hiệu.

## Màu và cách dùng

| Màu | HEX | RGB |
| --- | --- | --- |
| Coral | `#ff6a4d` | 255, 106, 77 |
| Than | `#0a0a0b` | 10, 10, 11 |
| Trắng dịu | `#f4f4f5` | 244, 244, 245 |

- Font gốc: **Be Vietnam Pro Bold**, giấy phép SIL Open Font License 1.1. Chữ đã chuyển outline; giấy phép kèm trong `OFL.txt`.
- Khoảng trống tối thiểu ngoài biên hình nhìn thấy: bằng đường kính lỗ đĩa (16 đơn vị trên canvas 256).
- Icon chuẩn: từ 32 px; favicon có thể dùng ở 16 px, nhưng chữ và lỗ đĩa giảm độ rõ.
- Logo ngang: tối thiểu 180 px chiều rộng; logo dọc: 120 px. Nhỏ hơn nên dùng biểu tượng riêng.
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

Chưa thực hiện tra cứu bảo hộ nhãn hiệu; các file này không phải xác nhận pháp lý về tính độc quyền.
