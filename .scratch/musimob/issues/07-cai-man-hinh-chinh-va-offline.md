# 07 — Bộ logo, icon cài màn hình chính và ảnh chia sẻ

Status: done
Blocked by: 04

## Mục tiêu

Bộ logo đầy đủ, icon web/cài màn hình chính và ảnh chia sẻ Open Graph, Twitter/X. Người dùng đã bỏ phần offline khỏi phạm vi ticket ngày 2026-10-29.

## Việc

- Manifest: `name` và `short_name` là `Musimob`, `display: 'standalone'`, `theme_color`, `background_color`, `start_url: '/'`.
- Icon 192×192 và 512×512 trong `public/`, nguồn SVG, không dùng icon template.
- Apple Touch Icon 180×180, favicon SVG/ICO/PNG, icon maskable riêng.
- Bộ logo SVG/PNG: biểu tượng, wordmark, ngang/dọc, nền sáng/tối, đơn sắc; hướng dẫn và giấy phép font.
- Ảnh Open Graph 1200×630 và Twitter/X 1200×600; metadata trong HTML dùng URL production tuyệt đối.
- Không triển khai `vite-plugin-pwa`, Workbox, cache shell/ảnh hay kiểm tra ghi offline. Firestore persistence có sẵn từ ticket 03 được giữ nguyên.

## Xong khi

- Đủ tài sản logo/icon và hướng dẫn sử dụng; SVG đã outline.
- PNG/ICO đúng kích thước, manifest và các liên kết trong HTML trỏ tới file có thật.
- Open Graph và Twitter/X có ảnh, tiêu đề, mô tả, alt; ảnh có nguồn SVG.
- `lint`, `build` và kiểm tra tĩnh tài sản pass. Không coi offline hoặc khả năng cài đặt trên thiết bị là đã được xác minh.

Không viết test.

## Comments

- 2026-10-29: Người dùng yêu cầu bỏ offline, thêm ảnh Open Graph/Twitter rồi chốt ticket 07, commit và push. Phạm vi và tiêu chí đã cập nhật tương ứng; các yêu cầu offline ban đầu không được tính là đã triển khai. Đã thêm `public/opengraph.png` (1200×630), `public/twitter.png` (1200×600), nguồn SVG và metadata chia sẻ. Chuyển `done` theo phạm vi mới.

- 2026-10-29: Người dùng chọn concept A — bìa coral + chữ m + đĩa trắng, yêu cầu bộ logo đầy đủ. Đã thêm SVG nguồn, icon PWA 192/512, maskable riêng 512, Apple Touch Icon 180, favicon SVG/ICO (16/32/48) và PNG dự phòng, `site.webmanifest`; liên kết trong `index.html`. Bộ thương hiệu ở `assets/brand/`: biểu tượng màu/đơn sắc, wordmark outline, logo ngang/dọc cho nền sáng/tối, PNG, giấy phép font và hướng dẫn. Kiểm tra tĩnh kích thước PNG/ICO, SVG outline, đường dẫn manifest/head và bản build pass; `lint`, `build`, `git diff --check` pass. Chưa triển khai service worker, cache ảnh hoặc xác minh ghi offline; chưa commit/deploy. Khi thêm `vite-plugin-pwa`, giữ một nguồn manifest duy nhất, không sinh manifest thứ hai bên cạnh `public/site.webmanifest`.
