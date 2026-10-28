# Musimob — Map

## Destination

Một spec build được cho Musimob: app web cá nhân lưu danh sách bài hát và đồng bộ nhiều thiết bị. Xong khi spec đủ rõ để `/to-spec` rồi `/to-tickets` cắt thành ticket build.

## Notes

- Người dùng: đăng ký mở bằng tài khoản Google. Mỗi người một danh sách riêng.
- Danh sách phẳng. Thêm, sửa, xoá, tìm trong danh sách.
- Mỗi bài: tên bài, ca sĩ, ảnh bìa.
- Nguồn bài: nhập tay, và tìm qua iTunes Search API.
- iTunes Search API: `country=vn`, không key, `Access-Control-Allow-Origin: *` nên gọi được từ browser, 20 req/phút, tối đa 200 kết quả mỗi query.
- Đồng bộ nhiều thiết bị: **bắt buộc**, qua Firestore.
- Không có: trạng thái bài, tag, chia sẻ, phát nhạc.
- UI tiếng Việt.

## Decisions so far

- [Nền tảng và stack](decisions/01-nen-tang-va-stack.md): Web PWA, Vite + React + TypeScript, Tailwind v4, TanStack Query cho iTunes, `vite-plugin-pwa`. Không Next.js, không native. _(Zustand + persist và "hosting tĩnh" đã bị sửa bởi ticket Lưu trữ dữ liệu.)_
- [Cách gọi iTunes trong 20 req/phút](decisions/02-goi-itunes-api.md): debounce 400ms và query ≥ 2 ký tự, `staleTime` 10 phút, `gcTime` 30 phút, không retry 429, `country` cố định `vn`, bài đã lưu hiện kèm nhãn "Đã lưu".
- [Lưu trữ dữ liệu](decisions/04-luu-tru-du-lieu.md): Firestore là nguồn sự thật, đồng bộ nhiều thiết bị bắt buộc, không xuất/nhập JSON, ảnh bìa lưu URL và Workbox cache.
- [Đồng bộ Firestore và đăng nhập](decisions/06-dong-bo-firestore-va-dang-nhap.md): Google sign-in mở cho mọi tài khoản, `users/{uid}/songs/{songId}`, `onSnapshot` + offline persistence, bỏ Zustand, last-write-wins, rules chỉ chủ sở hữu.
- [Deploy và hosting](decisions/05-deploy-va-hosting.md): Firebase Hosting, `musi-mob.web.app`, GitHub Actions deploy khi push `main`, gói Spark, không preview channel, không App Check.
- [Bố cục danh sách và luồng thêm bài](decisions/03-bo-cuc-danh-sach.md): bố cục D — header có nút đổi kiểu xem, danh sách dày mặc định và lưới ảnh là kiểu phụ, thêm bài bằng bottom sheet hai tab, sửa/xoá qua nút `⋯`.

## Not yet specified

- Chia sẻ danh sách.
- Lời bài hát.
- Tag và lọc theo tag.
- Nhập hàng loạt từ danh sách có sẵn.
- Xử lý bài trùng khi thêm.
- Ảnh bìa dự phòng khi API không trả về.

## Out of scope

- Phát nhạc, streaming
- Mạng xã hội, bình luận, feed
