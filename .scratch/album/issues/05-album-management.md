# 05: Quản lý album: đổi tên, xóa, bỏ bài khỏi album

**What to build:** Album detail có action menu “Đổi tên album” và “Xóa album”. Đổi tên mở panel prefill tên hiện tại, trim, bắt buộc, không trùng album khác (được phép đổi hoa/thường của chính nó); lỗi inline; thành công có toast.

Xóa album mở confirm nêu rõ album và danh sách bài trong album sẽ bị xóa, bài hát vẫn còn trong Thư viện; nút an toàn “Giữ lại”, nút phá hủy “Xóa album”; không undo; xóa xong về `/albums` và có toast.

Mỗi row trong album detail có nút “Bỏ khỏi album” chạy ngay, không confirm; bài vẫn còn trong Thư viện; nếu bài đang preview thì dừng preview. Lỗi hiện toast và row vẫn còn.

**Blocked by:** 04 (Album detail có bài + album-first thêm bài).

**Status:** ready-for-agent

- [ ] Đổi tên album thành công; đổi hoa/thường của chính album được phép; trùng album khác bị chặn với lỗi inline.
- [ ] Xóa album có confirm; “Giữ lại” không xóa; “Xóa album” chỉ xóa album, toàn bộ bài vẫn còn trong Thư viện; không có undo; điều hướng về `/albums`.
- [ ] Bỏ bài khỏi album ngay, không confirm; bài vẫn còn trong Thư viện; count/cover album cập nhật.
- [ ] Bỏ bài đang preview khỏi album thì preview dừng.
- [ ] Xóa album khi đang preview bài trong album thì preview dừng và điều hướng đúng.
- [ ] Undo xóa bài từ Thư viện khôi phục lại membership đúng vị trí (kiểm tra lại sau khi có remove).
- [ ] `format:check`, `lint`, `build` pass.
