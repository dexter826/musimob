# 06: Song-first: chế độ Chọn + album picker (nhiều album)

**What to build:** Thư viện có chế độ “Chọn” ở toolbar, hoạt động ở cả list và grid. Khi bật: hiện checkbox và trạng thái đã chọn, ẩn nút thêm bài/FAB và menu sửa/xóa; click row/tile toggle chọn; preview vẫn hoạt động. “Hủy” hoặc Escape thoát chế độ chọn.

Selection là tập ID có thứ tự, giữ qua thay đổi bộ lọc, tự loại ID không còn trong Thư viện, và reset khi đổi route. Bottom action bar hiển thị “Đã chọn N bài”, nút “Bỏ chọn” và “Thêm vào album” (disabled khi N = 0), không che nội dung hay toast.

“Thêm vào album” mở album picker: danh sách album mới nhất trước, mỗi album có checkbox, cover, tên, count; chọn nhiều album; footer hiển thị số album đã chọn; thêm một lần vào tất cả album đã chọn. Thành công đóng panel, thoát chế độ chọn, xóa selection và có toast. Đóng panel giữa chừng giữ nguyên selection. Khi chưa có album, hiện empty state tạm thời trỏ sang trang Album (inline create sẽ ở ticket 07).

**Blocked by:** 02 (Prefactor: shared song row view), 04 (Album detail có bài + album-first thêm bài).

**Status:** ready-for-agent

- [ ] Bật/tắt chế độ Chọn bằng “Chọn”/“Hủy” và Escape; nút thêm bài/FAB ẩn khi đang chọn.
- [ ] Checkbox và selected state hiện ở cả list và grid; click row/tile toggle; click preview không toggle; menu sửa/xóa ẩn.
- [ ] Selection giữ qua đổi filter; count gồm cả bài đang bị lọc; bài bị xóa khỏi Thư viện tự rời selection.
- [ ] Bottom bar hiển thị count đúng, “Bỏ chọn” hoạt động, nút thêm disabled khi N = 0, không che nội dung/toast.
- [ ] Chọn nhiều bài, mở picker, chọn nhiều album, thêm; membership có ở tất cả album; selection được clear; toast đúng.
- [ ] Picker hiển thị album mới nhất trước với cover/count; empty state khi chưa có album.
- [ ] Đóng picker giữa chừng giữ selection; lỗi thêm bài giữ panel mở.
- [ ] Mobile 360px và desktop đều dùng được; keyboard/focus/aria đạt yêu cầu.
- [ ] `format:check`, `lint`, `build` pass.
