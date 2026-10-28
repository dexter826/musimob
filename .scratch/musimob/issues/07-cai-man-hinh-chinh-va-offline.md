# 07 — Cài màn hình chính và offline

Status: ready-for-agent
Blocked by: 04

## Mục tiêu

Cài lên màn hình chính như app thật. Vào quán sóng yếu vẫn mở được danh sách và ảnh đã xem. Thêm bài khi mất mạng, có mạng thì tự đồng bộ.

## Việc

- `vite-plugin-pwa`: `registerType: 'autoUpdate'`.
- Manifest: `name` và `short_name` là `Musimob`, `display: 'standalone'`, `theme_color`, `background_color`, `start_url: '/'`.
- Icon 192×192 và 512×512 trong `public/`. Nguồn là một SVG, xuất PNG. Không dùng icon mặc định của template.
- Workbox:
  - Precache app shell.
  - Runtime cache ảnh bìa iTunes: `CacheFirst`, tối đa 200 ảnh, 30 ngày.
  - Không cache request Firestore; SDK tự lo offline persistence.
- Firestore đã bật `persistentLocalCache` ở ticket 03. Ticket này kiểm tra lại luồng ghi offline: thêm bài khi mất mạng, bài nằm trong cache, có mạng thì lên Firestore.
- Không thêm màn hình "app offline" riêng. App shell lấy từ cache.

## Xong khi

- Chrome DevTools → Application → Manifest không báo lỗi; Lighthouse báo cài được.
- Cài lên điện thoại Android hoặc iOS, mở từ icon, chạy standalone không có thanh địa chỉ.
- Bật máy bay, mở app từ icon: danh sách vẫn hiện, ảnh đã xem trước đó vẫn hiện.
- Đang mất mạng, thêm một bài bằng tay: bài hiện trong danh sách.
- Bật mạng lại: bài vừa thêm lên Firestore, mở máy khác thấy.
- Deploy production xong, reload một lần, sau đó mất mạng vẫn mở được app.

Không viết test.
