# 04: Album detail có bài + album-first thêm bài

**What to build:** Album detail hiển thị các bài đã lưu theo đúng thứ tự `songIds`, join với danh sách bài hiện tại và ẩn bài đã bị xóa khỏi Thư viện. Cover, count và thứ tự cập nhật realtime. Preview hoạt động như trong Thư viện.

Nút “Thêm bài” mở panel album-first: chỉ liệt kê bài đã lưu **chưa có** trong album; lọc theo tiêu đề/nghệ sĩ; chọn nhiều bài; footer hiển thị số đã chọn; thêm một lần vào album. Có empty state cho Thư viện rỗng và trường hợp tất cả bài đã có trong album. Lỗi giữ panel mở và cho thử lại.

**Blocked by:** 02 (Prefactor: shared song row view), 03 (Album data + danh sách + tạo album + detail shell).

**Status:** ready-for-agent

- [ ] Thêm nhiều bài vào album; thứ tự trong album đúng thứ tự chọn; không tạo bài trùng.
- [ ] Bài đã có trong album không xuất hiện trong picker.
- [ ] Cover/count/thứ tự album detail cập nhật realtime sau khi thêm.
- [ ] Picker lọc được theo tiêu đề/nghệ sĩ; count đúng; nút thêm disabled khi chưa chọn bài.
- [ ] Empty state Thư viện rỗng có CTA về Thư viện; empty state “Tất cả bài đã có trong album” đúng copy.
- [ ] Xóa một bài khỏi Thư viện: bài biến mất khỏi album và count; Hoàn tác đưa bài về đúng vị trí cũ.
- [ ] Lỗi thêm bài giữ panel mở, hiện lỗi, không mất selection.
- [ ] Preview trong album detail hoạt động; trạng thái “Đang nghe thử” đúng.
- [ ] `format:check`, `lint`, `build` pass.
