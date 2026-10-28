# Musimob — Map

## Destination

Một spec v1 build được cho Musimob: app web cá nhân lưu danh sách bài hát để chọn khi đi karaoke. Xong khi spec đủ rõ để `/to-spec` rồi `/to-tickets` cắt thành ticket build.

## Notes

- Người dùng: nhiều người, đăng ký mở bằng tài khoản Google. Mỗi người một danh sách riêng. Thực tế chủ yếu một người dùng, nhưng app phải hoàn chỉnh như sản phẩm thật.
- v1: danh sách phẳng. Thêm, sửa, xoá, tìm trong danh sách.
- Mỗi bài: tên bài, ca sĩ, ảnh bìa.
- Nguồn bài: nhập tay, và tìm qua iTunes Search API.
- iTunes Search API: `country=vn`, không key, `Access-Control-Allow-Origin: *` nên gọi được từ browser, 20 req/phút, tối đa 200 kết quả mỗi query.
- Đồng bộ nhiều thiết bị: **bắt buộc trong v1**, qua Firestore.
- Không có: random "hát gì giờ", trạng thái bài, tag, chia sẻ, phát nhạc.
- UI tiếng Việt.
- Repo hiện trống. Chưa có source.
- Skills nên đọc: `grilling`, `domain-modeling`, `prototype`, `frontend-design`.

## Decisions so far

- [Nền tảng và stack](decisions/01-nen-tang-va-stack.md): Web PWA, Vite + React + TypeScript, Tailwind v4, TanStack Query cho iTunes, `vite-plugin-pwa`. Không Next.js, không native. _(Zustand + persist và "hosting tĩnh" đã bị sửa bởi ticket Lưu trữ dữ liệu.)_
- [Cách gọi iTunes trong 20 req/phút](decisions/02-goi-itunes-api.md): debounce 400ms và query ≥ 2 ký tự, `staleTime` 10 phút, `gcTime` 30 phút, không retry 429, `country` cố định `vn`, bài đã lưu hiện kèm nhãn "Đã lưu".
- [Lưu trữ dữ liệu](decisions/04-luu-tru-du-lieu.md): Firestore là nguồn sự thật, đồng bộ nhiều thiết bị bắt buộc trong v1, không xuất/nhập JSON, ảnh bìa lưu URL và Workbox cache.
- [Đồng bộ Firestore và đăng nhập](decisions/06-dong-bo-firestore-va-dang-nhap.md): Google sign-in mở cho mọi tài khoản, `users/{uid}/songs/{songId}`, `onSnapshot` + offline persistence, bỏ Zustand, last-write-wins, rules chỉ chủ sở hữu.
- [Deploy và hosting](decisions/05-deploy-va-hosting.md): Firebase Hosting, `musimob.web.app`, App Check bật từ đầu, GitHub Actions deploy khi push `main`, gói Spark, không preview channel.
- [Bố cục danh sách và luồng thêm bài](decisions/03-bo-cuc-danh-sach.md): bố cục D — header có nút đổi kiểu xem, danh sách dày mặc định và lưới ảnh là kiểu phụ, thêm bài bằng bottom sheet hai tab, sửa/xoá qua nút `⋯`.

## Not yet specified

- Nút "hát gì giờ" bốc ngẫu nhiên một bài
- Chia sẻ danh sách cho bạn
- Lời bài hát
- Tag và lọc theo tag
- Nhập hàng loạt từ danh sách có sẵn
- Xử lý bài trùng khi thêm
- Ảnh bìa dự phòng khi API không trả về

## Out of scope

- Phát nhạc, streaming
- Soạn nhạc, hiển thị sheet music
- Chấm điểm, luyện giọng
- Mạng xã hội, bình luận, feed
