# 02: Prefactor: shared song row view

**What to build:** Tách phần hiển thị chung của một row bài hát (cover, nút preview, tiêu đề/nghệ sĩ, trạng thái “Đang nghe thử”, flash/scroll-into-view, selected state) thành component dùng chung, có slot `leading` và `trailing`, để dùng lại ở Thư viện, album detail, album-first picker và chế độ Chọn mà không vượt qua ranh giới feature.

Row hiện tại của Thư viện trở thành wrapper mỏng, truyền menu sửa/xóa vào slot `trailing`. Không thay đổi giao diện hay hành vi của Thư viện.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Row Thư viện trông và hoạt động y như trước: cover, preview, “Đang nghe thử”, flash sau khi thêm/khôi phục, scroll-into-view, menu sửa/xóa.
- [ ] Component dùng chung hỗ trợ `leading` (checkbox), `trailing` (menu/nút bỏ), selected state và click handler mà không phá preview/actions.
- [ ] Không có import feature → feature; component dùng chung nằm đúng lớp shared.
- [ ] Keyboard/focus và accessible name của row không đổi.
- [ ] Không phát sinh copy mới.
- [ ] `format:check`, `lint`, `build` pass.
