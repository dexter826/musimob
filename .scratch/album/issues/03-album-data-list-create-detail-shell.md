# 03: Album data + danh sách + tạo album + detail shell

**What to build:** Album có dữ liệu thật: lưu dưới `users/{uid}/albums/{albumId}` với tên, danh sách ID bài hát và timestamps; có security rule owner-only; API realtime subscribe + create; hook quản lý trạng thái loading/failed/ready kèm retry.

Trang `/albums` hiển thị grid card album mới nhất trước, cover lấy từ bài còn tồn tại đầu tiên, count là số bài còn tồn tại. Người dùng tạo album chỉ bằng tên; tên được trim, bắt buộc, không trùng case-insensitive; lỗi hiện inline; tạo xong mở trang chi tiết album mới.

Trang `/albums/:albumId` có shell: back link về danh sách, cover, tên, count, empty state, not-found state, loading/error. Ticket này chưa có thêm bài, đổi tên hay xóa album.

**Blocked by:** 01 (Routing shell + topbar navigation).

**Status:** ready-for-agent

- [ ] Tạo album thành công; album xuất hiện đầu danh sách, mở được trang chi tiết, refresh vẫn còn.
- [ ] Tên rỗng/toàn khoảng trắng và tên trùng (khác hoa/thường/khoảng trắng) hiện lỗi inline; không tạo album.
- [ ] Trang Album có đủ empty/loading/error; “Thử lại” hoạt động; empty state có CTA “Tạo album đầu tiên”.
- [ ] Album card hiển thị cover/count derive từ bài còn tồn tại; placeholder khi chưa có bài; card là link đến detail.
- [ ] Album detail hiển thị tên, back link, count, empty state; ID không tồn tại hiện “Không tìm thấy album” + lối về danh sách.
- [ ] Firestore rule cho phép owner đọc/ghi album và chặn người khác; rule file sẵn sàng để deploy.
- [ ] Chưa hiện nút/action thêm bài, đổi tên, xóa album.
- [ ] `format:check`, `lint`, `build` pass.
