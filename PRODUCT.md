# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Bạn và một vài người quen dùng chung — nhóm nhỏ, không phải sản phẩm đại chúng. Mỗi người đăng nhập bằng Google và sở hữu đúng một Thư viện riêng tư. Không có onboarding cho người lạ, không có mời hay tham gia nhóm.

## Product Purpose

musimob lưu lại những bài hát người dùng yêu thích và đồng bộ chúng trên mọi thiết bị. Thành công là việc mở app hằng ngày, lưu và tìm lại bài hát không vướng gì; không đo bằng số người dùng mới.

## Positioning

Một sổ lưu nhạc, không phải trình phát: bài hát được lưu nguyên văn từ nguồn nhạc ngoài hoặc nhập tay, không phát, không xếp thứ tự, không chia sẻ. Danh tính bài hát lấy theo id của nguồn (bài nhập tay theo tên bài + nghệ sĩ sau chuẩn hoá), nên cách viết tên hay tên nghệ sĩ đổi vẫn là một bài.

## Operating Context

- Web app chạy tại https://musi-mob.web.app (Firebase Hosting, project `musi-mob`).
- Đăng nhập bằng Google; popup mặc định, tự chuyển sang redirect khi popup bị chặn.
- Thêm bài bằng tìm kiếm trên nguồn nhạc iTunes, hoặc nhập tay khi không tìm thấy.
- Xem dạng danh sách hoặc lưới; lọc theo tên bài/nghệ sĩ; sửa metadata; xoá có xác nhận.
- Dữ liệu nằm trong Firestore và có persistent local cache cho dữ liệu; không có service worker hay offline app shell.
- Giao diện tiếng Việt toàn bộ; font Be Vietnam Pro.

## Capabilities and Constraints

- Một tài khoản ↔ một thư viện riêng tư; Firestore rules chỉ cho chủ tài khoản đọc/ghi `users/{uid}/songs`.
- Sản phẩm cố định: không phát nhạc, không playlist/thứ tự, không chia sẻ, không social.
- Nguồn nhạc duy nhất hiện tại là iTunes Search API, gọi trực tiếp từ client; lỗi giới hạn tần suất được xử lý và hiển thị.
- Bài lưu từ nguồn mang `sourceId` (trackId); bài nhập tay không có. Sửa tay chỉ đổi được title/artist/coverUrl.
- Nền tảng: chỉ web/PWA (manifest và icon đã có), không có kế hoạch app native.
- Ngôn ngữ UI: tiếng Việt là ràng buộc lâu dài, không làm i18n.
- Chưa chốt: có làm offline app shell (service worker) lâu dài hay không — ticket 07 đã loại trừ khỏi phạm vi bàn giao hiện tại.
- Stack hiện tại: React 19 + Vite + Tailwind v4, Firebase Auth + Firestore.

## Brand Commitments

- Tên **musimob**; wordmark đang có trong giao diện không đổi.
- Bộ logo đã chốt "Hướng A": chữ *m* trên bìa coral, đĩa trắng lệch góc; nguồn tại `assets/brand/` và `public/`.
- Màu thương hiệu: coral `#ff6a4d`, than `#0a0a0b`, trắng dịu `#f4f4f5`.
- Font gốc Be Vietnam Pro (SIL OFL 1.1). Không kéo méo, xoay riêng phần, thêm bóng/gradient, đổi font, hoặc đặt bản màu trực tiếp trên nền nhiều chi tiết.
- Giọng điệu: tiếng Việt, ngắn, trực tiếp; copy lỗi nói việc cần làm ("Mất kết nối. Kiểm tra mạng rồi thử lại.").

## Evidence on Hand

- Bộ nhận diện đầy đủ: `assets/brand/` (SVG nguồn, PNG, preview.html) và icon/favicon/OG trong `public/`.
- Không có testimonial, số liệu người dùng, press, pricing hay nội dung marketing nào — future work không được bịa.

## Product Principles

1. Lưu là hành động duy nhất: mọi tính năng phục vụ việc lưu, tìm và giữ bài hát; phát nhạc, thứ tự và chia sẻ nằm ngoài sản phẩm.
2. Riêng tư tuyệt đối: không ai thấy hay đếm được thư viện của người khác.
3. Ổn định trước mới lạ: đồng bộ đa thiết bị đáng tin cậy và thao tác hằng ngày mượt quan trọng hơn tính năng mới.
4. Tiếng Việt là ngôn ngữ gốc: copy, định dạng ngày giờ và thông báo viết cho người Việt, không phải bản dịch.
5. Giữ đúng dữ liệu nguồn: bài lưu từ catalog giữ nguyên tên, nghệ sĩ và ảnh nguồn tại thời điểm lưu; người dùng chỉ sửa tay trong thư viện của chính mình.
