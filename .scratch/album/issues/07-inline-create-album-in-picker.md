# 07: Tạo album inline trong album picker

**What to build:** Trong album picker của luồng song-first, có entry “Tạo album mới”. Bấm vào thì chuyển ngay trong cùng panel sang view tạo album (không mở dialog lồng dialog): title “Tạo album”, form tên, back arrow quay lại picker, nút X đóng cả panel.

Tạo thành công thì quay lại picker với album mới được chọn sẵn; nếu subscription chưa kịp trả album mới, hiện trạng thái chờ ngắn và tự chọn khi album xuất hiện. Empty state “Chưa có album nào” cũng có CTA tạo album, xóa bỏ dead-end.

Nút back của panel dùng chung cần nhận accessible label theo ngữ cảnh (mặc định “Quay lại”, flow album dùng “Quay lại danh sách album”).

**Blocked by:** 06 (Song-first: chế độ Chọn + album picker (nhiều album)).

**Status:** ready-for-agent

- [ ] Khi chưa có album, picker có CTA “Tạo album mới”; tạo xong album mới được chọn sẵn và thêm bài được ngay trong panel.
- [ ] View tạo album có back arrow quay lại picker, giữ nguyên selection trước đó; X đóng cả panel; không có dialog lồng nhau.
- [ ] Tên rỗng/trùng hiện lỗi inline; có pending state “Đang tạo…”.
- [ ] Album mới xuất hiện và được chọn đúng một lần khi subscription cập nhật; không crash/duplicate.
- [ ] Accessible label của nút back đúng ngữ cảnh album.
- [ ] `format:check`, `lint`, `build` pass.
- [ ] Design/copy contract được cập nhật cho view tạo album trong picker.
