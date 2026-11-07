# 08: Integration QA + docs audit

**What to build:** Chạy full manual QA checklist của spec Album trên luồng hoàn chỉnh, rà toàn bộ trạng thái empty/loading/error/warning, album not-found, undo membership, selection edge cases, responsive 360px, keyboard/focus, toast so với bottom action bar, và preview khi đổi route.

Rà lại design/copy contract để khớp implementation; sửa các lỗi cross-ticket phát hiện được. Không thêm tính năng mới, không thêm test runner.

**Blocked by:** 05 (Quản lý album: đổi tên, xóa, bỏ bài khỏi album), 07 (Tạo album inline trong album picker).

**Status:** ready-for-agent

- [ ] Toàn bộ 20 mục manual QA trong spec Album pass, hoặc lỗi phát hiện đã được sửa.
- [ ] Empty/loading/error/warning được kiểm tra ở trang Album, album detail và cả hai picker.
- [ ] Album not-found và catch-all route hoạt động.
- [ ] Xóa bài → ẩn khỏi album → Hoàn tác khôi phục membership đúng vị trí.
- [ ] Selection qua filter, reset khi đổi route, Escape, đóng picker giữ selection đều đúng.
- [ ] Mobile 360px: topbar, bottom bar, panel, toast không tràn/che nhau; desktop: grid và dialog đúng.
- [ ] Keyboard/focus/aria được kiểm tra ở nav, card, checkbox, panel, bottom bar.
- [ ] Design/copy contract nhất quán với implementation; không còn mâu thuẫn với spec.
- [ ] `format:check`, `lint`, `build` pass.
- [ ] Không thêm test runner.
