# 01: Routing shell + topbar navigation

**What to build:** Đưa ứng dụng đã đăng nhập sang React Router v7 với ba route: `/` (Thư viện), `/albums` (Album), `/albums/:albumId` (chi tiết album). Hai route album có thể là placeholder ở ticket này. Topbar có nav cố định “Thư viện / Album” hoạt động ở mọi kích thước màn hình, active đúng route, wordmark đưa về `/`, view toggle chỉ hiện ở Thư viện. Thư viện hiện tại giữ nguyên toàn bộ hành vi.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Thư viện ở `/` hoạt động y như trước: list/grid, lọc, thêm bài, sửa, xóa/hoàn tác, preview, theme, avatar.
- [ ] Nav “Thư viện / Album” hiện trên mọi màn hình đã đăng nhập; active đúng ở `/`, `/albums`, `/albums/:albumId`; có `aria-current="page"`.
- [ ] Wordmark là link về `/`; trên mobile wordmark thu gọn còn symbol, topbar không tràn ở 360px.
- [ ] View toggle list/grid chỉ hiện ở Thư viện; ẩn ở các route Album.
- [ ] `/albums` và `/albums/:albumId` render placeholder có tiêu đề đúng, không crash; catch-all redirect về `/`.
- [ ] Refresh, mở URL trực tiếp, back/forward giữ đúng route; document title đổi theo route.
- [ ] Audio preview dừng khi đổi route.
- [ ] Auth gate giữ nguyên: chưa đăng nhập thấy màn hình đăng nhập; sau đăng nhập router mount tại URL hiện tại.
- [ ] Skip link dùng target chung cho mọi trang và hoạt động.
- [ ] Keyboard/focus cho nav và wordmark đạt yêu cầu accessibility.
- [ ] Design/copy contract được cập nhật cho topbar nav.
- [ ] `format:check`, `lint`, `build` pass.
