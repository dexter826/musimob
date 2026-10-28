# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Người dùng quản lý danh sách bài hát trên nhiều thiết bị. Mỗi tài khoản Google có một danh sách riêng.

## Product Purpose

Musimob lưu danh sách bài hát và đồng bộ bằng tài khoản Google. Mục tiêu: mở app, thấy danh sách, thêm một bài trong dưới ba mươi giây. Thành công là danh sách còn nguyên khi đổi thiết bị.

## Positioning

Một danh sách bài hát cá nhân: tìm bài bằng iTunes, xem được khi mất mạng. Không phải mạng xã hội, không phải app phát nhạc.

## Operating Context

Người dùng thêm bài từ điện thoại hoặc laptop, tra lại danh sách khi cần, kể cả khi mạng yếu. Giao diện tiếng Việt, không có bộ chuyển ngôn ngữ.

## Capabilities and Constraints

- Đăng nhập Google qua Firebase Auth; đăng ký mở cho mọi tài khoản Google.
- Danh sách phẳng, mỗi bài có tên, ca sĩ, ảnh bìa.
- Thêm tay hoặc tìm qua iTunes Search API (`country=vn`).
- Sửa, xoá, lọc theo tên bài hoặc ca sĩ.
- Xem dạng danh sách dày hoặc lưới ảnh bìa; nhớ kiểu xem trong `localStorage`.
- Firestore là nguồn sự thật, `users/{uid}/songs/{songId}`, đồng bộ realtime, offline persistence, last-write-wins.
- PWA cài được lên màn hình chính; vẫn xem được khi mất mạng.
- Khung app dùng toàn bộ chiều ngang trên desktop; mobile một cột. Màn đăng nhập là khung vuông tối đa 560px, căn giữa; form nằm ở đáy khung.
- Stack: Vite 8, React 19, TypeScript 5.9, Tailwind CSS v4, shadcn/ui (Radix), TanStack Query, `vite-plugin-pwa`.
- Không viết test tự động; kiểm tra bằng tay.
- Không App Check.
- Ngoài phạm vi: phát nhạc, chia sẻ, lời bài hát, tag, nhập hàng loạt, preview channel, tên miền riêng.

## Brand Commitments

Tên `Musimob`, wordmark `musimob`. Giao diện và nội dung tiếng Việt. Giọng trực tiếp, cụ thể, không dùng tiếng Anh trong UI.

## Evidence on Hand

Không có testimonial, số liệu người dùng, logo khách hàng hay benchmark. Không được bịa các loại nội dung này.

## Product Principles

1. Danh sách là trung tâm; mọi thứ khác phục vụ việc thêm và tra bài.
2. Thêm bài phải xong trong dưới ba mươi giây.
3. Dữ liệu thuộc về một người; không có nhánh đọc công khai.
4. Mất mạng không được chặn việc xem và thêm bài.
5. Quen thuộc thắng mới lạ: người dùng không có thời gian học giao diện.

## Accessibility & Inclusion

Chưa có chuẩn accessibility riêng. Giao diện phải dùng được bằng bàn phím, focus thấy rõ, chữ đủ tương phản trên nền tối, và dùng được trên điện thoại lẫn laptop.
