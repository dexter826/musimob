# 08: Integration QA + docs audit

**What to build:** Agent rà code theo checklist của spec Album và chạy format/lint/build. Người dùng thực hiện full manual QA trên luồng hoàn chỉnh: empty/loading/error/warning, album not-found, undo membership, selection edge cases, responsive 360px, keyboard/focus, toast so với bottom action bar, và preview khi đổi route. Agent không chạy browser test.

Rà implementation theo quy chuẩn giao diện và câu chữ chung; sửa các lỗi cross-ticket phát hiện được. Không thêm tính năng mới, không thêm test runner.

**Blocked by:** 05 (Quản lý album: đổi tên, xóa, bỏ bài khỏi album), 07 (Tạo album inline trong album picker).

**Status:** ready-for-human

- [ ] Toàn bộ 20 mục manual QA trong spec Album pass, hoặc lỗi phát hiện đã được sửa.
- [ ] Empty/loading/error/warning được kiểm tra ở trang Album, album detail và cả hai picker.
- [ ] Album not-found và catch-all route hoạt động.
- [ ] Xóa bài → ẩn khỏi album → Hoàn tác khôi phục membership đúng vị trí.
- [ ] Selection qua filter, reset khi đổi route, Escape, đóng picker giữ selection đều đúng.
- [ ] Mobile 360px: topbar, bottom bar, panel, toast không tràn/che nhau; desktop: grid và dialog đúng.
- [ ] Keyboard/focus/aria được kiểm tra ở nav, card, checkbox, panel, bottom bar.
- [ ] Implementation tuân thủ quy chuẩn giao diện, câu chữ chung và spec.
- [x] `format:check`, `lint`, `build` pass.
- [x] Không thêm test runner.

## Comments

Agent đã rà code và sửa các nhánh tích hợp; chưa xác nhận manual QA. Các checkbox hành vi ở trên giữ nguyên cho đến khi người dùng kiểm tra.

### Kết quả rà code

- `src/lib/api/albums.ts`: tạo/đổi tên trim tên; thêm bài dùng batch + arrayUnion; bỏ bài dùng arrayRemove; xóa album chỉ xóa document album.
- `src/lib/api/songs.ts` + `src/features/albums/lib/album-songs.ts`: xóa bài không sửa tham chiếu album; khôi phục dùng cùng ID; join giữ thứ tự và ẩn ID thiếu. Undo thực tế với Firestore vẫn cần QA.
- `src/app/library-page.tsx`: selection có thứ tự, giữ qua filter; lọc ID bài không còn; mode reset khi route unmount; Escape không thoát mode trong lúc picker đang mở.
- `src/features/albums/components/album-picker.tsx`: chọn nhiều album, tạo album trong cùng panel, chọn ID mới đúng một lần và đợi subscription trước khi thêm.
- `src/app/app.tsx`, `src/app/app-layout.tsx`: routes và catch-all; auth gate; cleanup preview khi đổi pathname.
- `src/app/library-selection-bar.tsx`, `src/app/provider.tsx`: đo chiều cao bottom bar cho padding nội dung và offset toast. Chưa kiểm tra hình ảnh ở 360px/desktop.
- `firestore.rules`: điều kiện owner-only có cho album; workflow deploy có `hosting,firestore:rules`. Chưa deploy hoặc thử quyền bằng tài khoản thật.

### Các nhánh đã sửa, cần kiểm tra lại bằng tay

1. Tải bài thất bại: danh sách album không hiển thị count `0 bài` từ dữ liệu chưa tải; thử lại phải khôi phục card/count/cover.
2. Subscription lỗi sau khi đã có cache: warning ở trang Album/detail và picker album-first có nút thử lại. Picker song-first đã có retry.
3. Album-first chọn hết bài khả dụng rồi thêm: trong lúc chờ ghi phải giữ pending state, không chuyển sớm sang empty state; khi ghi lỗi phải giữ selection để thử lại, kể cả khi snapshot rollback đến chậm.
4. Back/forward giữa hai ID album: panel và selection không đi theo sang album khác. Xóa album đang chờ ghi rồi rời trang: phản hồi muộn không kéo người dùng về `/albums`.
5. Screen reader: trạng thái tải bài trong album có thông báo; trang not-found có heading h1.

### Xác minh đã chạy

- `npm run format:check`: pass.
- `npm run lint`: pass.
- `npm run build`: pass; còn cảnh báo bundle >500 kB, không chặn build.
- `git diff --check`: pass.
- Không browser test, không thêm automated tests/test runner, không sửa `DESIGN.md` hay `COPY.md`.

### Bàn giao QA

Thực hiện đủ 20 mục tại `../spec.md`, phần **Testing Decisions → Manual QA checklist**, và các tình huống bổ sung ở trên. Chỉ đánh dấu hoàn tất ticket sau khi có kết quả QA thực tế; rà code và build không thay thế việc kiểm tra UI/Firestore.
