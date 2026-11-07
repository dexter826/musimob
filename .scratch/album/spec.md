# Spec: Album

Status: ready-for-agent
Feature: album
Created: 2026-11-07

## Problem Statement

Người dùng đã lưu nhiều bài hát vào Thư viện nhưng không có cách nào nhóm chúng theo album. Khi muốn nghe lại một nhóm bài theo chủ đề, họ phải nhớ tên bài và tìm thủ công trong toàn bộ Thư viện.

Catalog bên ngoài không cung cấp metadata album đủ đáng tin cậy để tự động nhóm, nên cách duy nhất đúng là để người dùng tự tạo album và tự chọn các bài **đã lưu** để đưa vào album. Việc này không được tạo bản sao bài hát, không bắt người dùng lưu lại bài, và không làm mất dữ liệu khi xóa album.

## Solution

Thêm Album như một container độc lập với Thư viện:

- Người dùng tạo album chỉ với tên.
- Một bài hát có thể nằm trong nhiều album. Album chỉ lưu tham chiếu đến bài hát, không sở hữu hay sao chép dữ liệu bài.
- Có hai luồng thêm bài:
  - **Album-first:** mở album → chọn các bài đã lưu chưa có trong album → thêm.
  - **Song-first:** ở Thư viện, bật chế độ Chọn → chọn nhiều bài → thêm vào một hoặc nhiều album.
- Album có trang danh sách và trang chi tiết; điều hướng qua topbar.
- Xóa album không xóa bài. Xóa bài khỏi Thư viện không làm hỏng album; UI ẩn bài đã mất, và Hoàn tác khôi phục lại tư cách thành viên album.
- Ảnh bìa album lấy từ bài hát còn tồn tại đầu tiên trong album.
- Album rỗng được giữ lại cho đến khi người dùng tự xóa.

## User Stories

1. Là người dùng, tôi muốn xem danh sách album của mình để biết mình đã tạo những nhóm nào.
2. Là người dùng, tôi muốn tạo album mới chỉ bằng tên để bắt đầu gom bài.
3. Là người dùng, tôi muốn tạo album ngay trong lúc chọn album khi thêm bài, để không bị chặn giữa luồng.
4. Là người dùng, tôi muốn đổi tên album để sửa lỗi gõ hoặc đổi mục đích nhóm.
5. Là người dùng, tôi muốn không tạo được hai album trùng tên (không phân biệt hoa/thường) để danh sách dễ phân biệt.
6. Là người dùng, tôi muốn xóa album sau khi xác nhận, và biết rằng bài hát vẫn còn trong Thư viện.
7. Là người dùng, tôi muốn giữ album rỗng để có thể thêm bài sau.
8. Là người dùng, tôi muốn mở album để xem các bài bên trong.
9. Là người dùng, tôi muốn thấy ảnh bìa album lấy từ bài đầu tiên còn tồn tại.
10. Là người dùng, tôi muốn thấy số bài thực tế còn tồn tại trong album.
11. Là người dùng, tôi muốn mở album và thêm nhiều bài đã lưu cùng lúc.
12. Là người dùng, tôi muốn chỉ thấy những bài chưa có trong album khi thêm từ trang album.
13. Là người dùng, tôi muốn tìm bài trong panel thêm bài để chọn nhanh khi Thư viện dài.
14. Là người dùng, tôi muốn chọn nhiều bài trong Thư viện bằng chế độ “Chọn”.
15. Là người dùng, tôi muốn thấy checkbox và trạng thái đã chọn rõ ràng ở cả dạng danh sách và lưới.
16. Là người dùng, tôi muốn thấy thanh hành động dưới cùng với số bài đã chọn.
17. Là người dùng, tôi muốn thêm các bài đã chọn vào một hoặc nhiều album cùng lúc.
18. Là người dùng, tôi muốn tạo album mới ngay trong album picker và album đó được chọn sẵn.
19. Là người dùng, tôi muốn bỏ chọn hoặc thoát chế độ chọn mà không thay đổi gì.
20. Là người dùng, tôi muốn bỏ một bài khỏi album ngay lập tức, không cần xác nhận.
21. Là người dùng, tôi muốn bài bị bỏ khỏi album vẫn còn trong Thư viện.
22. Là người dùng, tôi muốn xóa bài khỏi Thư viện thì bài biến mất khỏi mọi album.
23. Là người dùng, tôi muốn hoàn tác xóa bài thì bài quay lại Thư viện và quay lại album cũ, đúng vị trí cũ.
24. Là người dùng, tôi muốn album vẫn tồn tại dù bài cuối cùng bị bỏ khỏi album.
25. Là người dùng, tôi muốn album vẫn tồn tại dù bài cuối cùng bị xóa khỏi Thư viện.
26. Là người dùng, tôi muốn thấy trạng thái rỗng rõ ràng khi chưa có album.
27. Là người dùng, tôi muốn thấy trạng thái rỗng rõ ràng khi album chưa có bài.
28. Là người dùng, tôi muốn thấy trạng thái rỗng khi album picker chưa có album.
29. Là người dùng, tôi muốn thấy trạng thái “tất cả bài đã có trong album” khi không còn bài để thêm.
30. Là người dùng, tôi muốn điều hướng giữa Thư viện và Album bằng topbar ở mọi kích thước màn hình.
31. Là người dùng, tôi muốn thấy mục đang active trong topbar.
32. Là người dùng, tôi muốn dùng URL riêng cho từng album để back/forward và refresh giữ nguyên ngữ cảnh.
33. Là người dùng, tôi muốn mở link trực tiếp đến album; nếu album không tồn tại thì thấy thông báo và lối về danh sách.
34. Là người dùng, tôi muốn tiêu đề trang đổi theo route hoặc theo tên album.
35. Là người dùng, tôi muốn dùng bàn phím để chọn bài, mở album, và thao tác trong panel.
36. Là người dùng, tôi muốn thấy thông báo lỗi rõ ràng khi tải album thất bại và có nút thử lại.
37. Là người dùng, tôi muốn thấy lỗi inline khi tên album trống hoặc trùng.
38. Là người dùng, tôi muốn thấy trạng thái đang lưu/đang tạo/đang xóa để biết thao tác đang chạy.
39. Là người dùng, tôi muốn không bị mất bài đã chọn khi đổi bộ lọc trong Thư viện.
40. Là người dùng, tôi muốn thoát chế độ chọn khi chuyển sang trang Album.
41. Là người dùng, tôi muốn thấy album mới tạo ở đầu danh sách.
42. Là người dùng, tôi muốn thấy bài mới thêm vào album ở cuối danh sách, theo thứ tự thêm.
43. Là người dùng, tôi muốn preview hoạt động trong album detail như trong Thư viện.
44. Là người dùng, tôi muốn preview dừng khi rời trang hoặc khi bài đang phát bị bỏ khỏi album.
45. Là người dùng, tôi muốn album chỉ là nhóm bài, không biến thành player/queue toàn cục.
46. Là người dùng, tôi muốn giao diện hoạt động trên mobile: panel dạng drawer, thanh hành động không che nội dung.
47. Là người dùng, tôi muốn giao diện desktop: panel dạng dialog, album grid nhiều cột.
48. Là người dùng, tôi muốn không thấy nút thêm bài trùng lặp khi đang ở chế độ chọn.
49. Là người dùng, tôi muốn đóng panel mà không mất lựa chọn bài trong Thư viện để thử lại.
50. Là người dùng, tôi muốn album picker hiển thị album mới nhất trước.
51. Là người dùng, tôi muốn thấy phản hồi sau khi thêm bài vào album, tạo album, đổi tên, hoặc xóa album.
52. Là người dùng, tôi muốn album picker không mở dialog lồng dialog.

## Implementation Decisions

### 1. Domain model

- **Album** là thực thể riêng, gồm: `id`, `name`, `songIds`, `createdAt`, `updatedAt`.
- Quan hệ Album–Song là nhiều-nhiều. Album chỉ lưu `songIds`; `Song` không có field album.
- `name` là metadata duy nhất của album. Không có mô tả, năm, thể loại, ảnh bìa riêng.
- Ảnh bìa album là `coverUrl` của bài hát còn tồn tại đầu tiên theo thứ tự `songIds`.
- Số bài của album là số bài còn tồn tại trong Thư viện, không phải độ dài `songIds`.
- Thứ tự bài trong album là thứ tự thêm vào, cũ → mới. Bài được thêm trong cùng một lần giữ thứ tự người dùng chọn.
- Album rỗng không tự xóa.
- Xóa bài khỏi Thư viện **không** sửa `songIds` của album. UI join với danh sách bài hiện tại và ẩn ID không còn tồn tại. Vì vậy Hoàn tác xóa bài khôi phục bài vào đúng vị trí cũ trong album.
- Tên album được trim khi lưu; so sánh trùng không phân biệt hoa/thường, không bỏ dấu tiếng Việt. Kiểm tra trùng chạy phía client trên danh sách album đang có; không có ràng buộc unique ở Firestore.
- Đổi tên được phép; đổi kiểu hoa/thường của chính album đó được phép. Khi rename, bỏ qua chính album đang sửa khi kiểm tra trùng.
- Không giới hạn độ dài tên album ở v1; UI dùng line-clamp/truncate để giữ layout.

### 2. Persistence

- Đường dẫn Firestore: `users/{uid}/albums/{albumId}`.
- Document gồm: `name: string`, `songIds: string[]`, `createdAt: Timestamp`, `updatedAt: Timestamp`.
- `subscribe` dùng `orderBy('createdAt', 'desc')`; album mới nhất trước. Không cần composite index.
- Firestore security rules thêm match cho subcollection `albums`, cùng điều kiện: người dùng đã đăng nhập và `request.auth.uid == userId`. Không thêm field-level validation, nhất quán với `songs`.
- `create`: trim tên, ghi `name`, `songIds: []`, `createdAt`, `updatedAt` bằng server timestamp; trả về ID mới.
- `rename`: trim tên, cập nhật `name` và `updatedAt`.
- `remove`: xóa document album. Không cập nhật bài hát.
- `addSongs(uid, albumIds, songIds)`: nếu một trong hai mảng rỗng thì no-op. Dùng `writeBatch` để cập nhật nhiều album trong một lần ghi atomic; mỗi album dùng `arrayUnion(...songIds)` và `updatedAt: serverTimestamp()`. `arrayUnion` giữ thứ tự hiện có, nối bài mới vào cuối, và không tạo phần tử trùng.
- `removeSong(uid, albumId, songId)`: dùng `arrayRemove(songId)` và cập nhật `updatedAt`. Không xóa bài khỏi Thư viện.
- Dữ liệu đọc từ Firestore được chuẩn hóa phòng thủ: `name` mặc định `''`, `songIds` chỉ giữ string, bỏ trùng nhưng giữ thứ tự; timestamp fallback giống `songs`.

### 3. API contract

`MusimobApi['albums']` gồm:

| Method | Contract |
| --- | --- |
| `subscribe(uid, callback, onError?)` | Subscription realtime, trả album mới nhất trước; trả hàm unsubscribe. |
| `create(uid, name)` | Tạo album rỗng, trả `Promise<string>` là ID album. |
| `rename(uid, id, name)` | Đổi tên album; `Promise<void>`. |
| `remove(uid, id)` | Xóa album; `Promise<void>`. |
| `addSongs(uid, albumIds, songIds)` | Thêm nhiều bài vào nhiều album atomic; `Promise<void>`. |
| `removeSong(uid, albumId, songId)` | Bỏ một bài khỏi một album; `Promise<void>`. |

- Type `Album` và `NewAlbum` được thêm vào lớp API dùng chung.
- Không thêm method đọc một album riêng; trang chi tiết lấy album từ subscription danh sách.
- Không thêm method xóa bài khỏi mọi album; xóa bài Thư viện không đụng album.

### 4. State and error handling

- Hook `useAlbums(uid)` phản chiếu pattern của `useSongs`: `useState` + Firestore subscription, `reloadKey` để retry.
- `AlbumsStatus` gồm `loading`, `failed { message }`, `ready { warning }`. Nếu đã có album và subscription lỗi, giữ album và trả `ready` kèm warning.
- Operation: `load`, `create`, `rename`, `remove`, `addSongs`, `removeSong`.
- Thông điệp quyền: “Bạn không có quyền xem danh sách album.”, “Bạn không có quyền tạo album.”, “Bạn không có quyền đổi tên album.”, “Bạn không có quyền xóa album.”, “Bạn không có quyền thêm bài vào album.”, “Bạn không có quyền bỏ bài khỏi album.”
- Fallback: “Không tải được danh sách album. Thử lại.”, “Không tạo được album. Thử lại.”, “Không đổi được tên album. Thử lại.”, “Không xóa được album. Thử lại.”, “Không thêm được bài vào album. Thử lại.”, “Không bỏ được bài khỏi album. Thử lại.”
- Lỗi mất mạng: “Mất kết nối. Kiểm tra mạng rồi thử lại.”
- `invalid-argument` khi create/rename: “Tên album không hợp lệ.”
- `not-found` khi rename/remove/addSongs/removeSong: “Album này không còn trong danh sách.”
- Mutation lỗi hiển thị toast hoặc lỗi inline trong form/dialog; không đóng panel/dialog để người dùng thử lại.
- Lỗi tải album hiển thị `ErrorAlert` kèm nút “Thử lại”.

### 5. Routing and composition

- Thêm React Router v7 (`react-router`) làm runtime dependency. Không thêm thư viện router khác.
- Route:
  - `/` — Thư viện.
  - `/albums` — danh sách album.
  - `/albums/:albumId` — chi tiết album.
  - Catch-all redirect về `/`.
- Auth gate giữ nguyên: chưa đăng nhập thì hiện màn hình đăng nhập, không render route nội bộ. Sau khi đăng nhập, router mount tại URL hiện tại.
- Layout route dùng chung: `PageShell`, skip link, `AppHeader`, `<Outlet />`. Skip link đổi target thành ID chung cho mọi trang (ví dụ `#main-content`), không dùng ID riêng của Thư viện.
- `AppHeader` có nav cố định “Thư viện / Album”:
  - Wordmark là link về `/`.
  - Desktop: logo + wordmark + nav bên trái; view toggle (chỉ ở Thư viện) + theme + avatar bên phải.
  - Mobile: wordmark thu gọn còn symbol; nav vẫn hiện đủ hai mục; view toggle chỉ hiện ở Thư viện.
  - Active item dùng `aria-current="page"` và style active riêng (màu foreground + gạch chân coral hoặc pattern tương đương trong design contract).
  - Nav dùng `NavLink`; mục “Thư viện” chỉ active ở `/`; mục “Album” active ở `/albums` và các route con.
- View toggle list/grid chỉ có ý nghĩa ở Thư viện. Trang Album luôn dùng grid cho danh sách album và list cho bài trong album.
- App composition layer sở hữu cả `useSongs` và `useAlbums`, truyền data/callback xuống các trang. Lý do:
  - ESLint cấm feature import feature.
  - Tránh hai subscription bài hát trùng nhau.
  - Selection state và album picker của luồng song-first là cross-feature, nên đặt ở composition layer.
- Album-first picker nằm trong feature album và được trang chi tiết album render; nó nhận `songs` từ composition layer.
- Document title:
  - `/` → “MusiMOB: Thư viện”.
  - `/albums` → “MusiMOB: Album”.
  - `/albums/:albumId` → “MusiMOB: {tên album}” khi tìm thấy; fallback “MusiMOB: Album”.
  - Chưa đăng nhập → “MusiMOB”.
- Khi đổi route, dừng audio preview đang phát. Preview là trạng thái toàn cục nhưng không có player toàn cục; rời trang thì không để audio tiếp tục mà không có control.
- Route change không reset dữ liệu Thư viện; subscription bài hát sống ở layout/composition layer.

### 6. Albums page (`/albums`)

- Toolbar: tiêu đề “Album”, count label “N album”, nút “Tạo album”.
- Nút tạo hiện ở mọi kích thước màn hình (không có FAB riêng cho album). Khi danh sách rỗng, ẩn nút toolbar và dùng CTA trong empty state.
- Danh sách album dạng grid card: 2 cột mobile, 3 cột từ 640px, 4 cột từ 900px; gutter theo grid bài hát hiện có.
- Card gồm: cover vuông lấy từ bài đầu tiên còn tồn tại, tên album (tối đa 2 dòng), count “N bài”. Card là link đến `/albums/:albumId`; toàn bộ card click được, có focus ring và accessible name.
- Card dùng surface/rule/radius theo design contract; không có menu đổi tên/xóa trên card.
- Album mới nhất trước, theo thứ tự subscription.
- Loading: skeleton card.
- Empty: tiêu đề “Chưa có album nào”, mô tả mục đích, CTA “Tạo album đầu tiên”.
- Failed: `ErrorAlert` + “Thử lại”.
- Ready có warning: hiện warning phía trên grid, vẫn cho thao tác.

### 7. Album detail (`/albums/:albumId`)

- Back link “Album” (kèm icon mũi tên) về `/albums`, nằm trong nội dung trang; topbar nav giữ nguyên.
- Header gồm: cover thumbnail, tên album, count “N bài”, action menu “Đổi tên album” / “Xóa album”, nút “Thêm bài”.
- Nút “Thêm bài” mở album-first picker.
- Danh sách bài dùng list row, thứ tự `songIds` đã lọc theo bài còn tồn tại. Mỗi row có cover, tiêu đề, nghệ sĩ, preview, trạng thái “Đang nghe thử”, và nút “Bỏ khỏi album”.
- Không có menu sửa/xóa bài Thư viện trong album detail. Album detail chỉ quản lý tư cách thành viên album.
- “Bỏ khỏi album” chạy ngay, không confirm. Nút có pending state và accessible label; lỗi hiện toast, row vẫn còn. Nếu bài đang preview bị bỏ khỏi album, dừng preview.
- Empty album: tiêu đề “Album chưa có bài nào”, mô tả, CTA “Thêm bài vào album”. Nếu Thư viện rỗng, CTA dẫn về Thư viện để thêm bài trước.
- Album không tồn tại sau khi tải xong: tiêu đề “Không tìm thấy album”, mô tả “Album có thể đã bị xóa.”, CTA “Về danh sách album”.
- Albums đang tải: skeleton header/list. Albums lỗi: ErrorAlert + retry. Songs đang tải: skeleton list. Songs lỗi: ErrorAlert + retry của songs.
- Rename: mở panel “Đổi tên album”, input prefill tên hiện tại, validate trùng (bỏ qua chính nó), submit “Lưu tên” / pending “Đang lưu…”. Thành công: đóng panel, toast “Đã đổi tên album”.
- Delete: mở AlertDialog. Title “Xóa album?”, description nêu rõ album và danh sách bài trong album sẽ bị xóa, bài hát vẫn còn trong Thư viện. Nút an toàn “Giữ lại”, nút phá hủy “Xóa album” / pending “Đang xóa…”. Không undo. Thành công: điều hướng về `/albums`, toast “Đã xóa album”. Lỗi: hiện inline trong dialog, giữ dialog mở.
- Count và cover cập nhật realtime khi bài bị xóa/khôi phục hoặc bị bỏ khỏi album.

### 8. Library selection mode

- Nút “Chọn” nằm ở toolbar Thư viện, hiện ở mọi kích thước màn hình. Khi Thư viện rỗng, không hiện.
- Vào chế độ chọn:
  - Nút “Chọn” đổi thành “Hủy”.
  - Ẩn nút “Thêm bài” trên toolbar và FAB.
  - Mỗi row/tile có checkbox ở đầu; actions menu sửa/xóa bị ẩn.
  - Click row/tile toggle chọn; click checkbox toggle; click preview không toggle (stopPropagation).
  - Row/tile đã chọn có trạng thái thị giác rõ (ring/overlay/background) và checkbox checked.
  - Preview vẫn hoạt động trong chế độ chọn.
- Selection state là `Set<string>` ID bài, giữ thứ tự thêm vào set. Thứ tự này được dùng khi append vào album.
- Selection tồn tại qua thay đổi bộ lọc. Nếu bài đã chọn bị lọc khỏi view, nó vẫn được tính trong thanh hành động; ID không còn trong danh sách bài hiện tại bị loại khỏi selection.
- Thanh hành động dưới cùng:
  - Hiện khi ở chế độ chọn.
  - Hiển thị “Đã chọn N bài” với `aria-live="polite"`.
  - Nút “Bỏ chọn” xóa toàn bộ selection nhưng vẫn ở chế độ chọn.
  - Nút “Thêm vào album” disabled khi N = 0; mở album picker khi N > 0.
  - Không che nội dung: main có padding-bottom tương ứng; toast phải nằm trên thanh hành động, không bị che.
- “Hủy” thoát chế độ chọn và xóa selection. Escape cũng thoát chế độ chọn.
- Chuyển route khỏi Thư viện tự thoát chế độ chọn và xóa selection.
- Thêm vào album thành công: đóng picker, thoát chế độ chọn, xóa selection, toast “Đã thêm N bài vào album” (hoặc “Đã thêm N bài vào M album”).
- Nếu picker bị đóng mà chưa thêm: giữ selection và vẫn ở chế độ chọn để thử lại.
- Nếu selected IDs trở nên rỗng vì bài bị xóa ở tab khác: thoát chế độ chọn.

### 9. Album pickers

Cả hai picker dùng `ResponsivePanel` hiện có: drawer dưới 768px, dialog từ 768px; max 560px; không mở dialog lồng dialog.

**Song-first album picker:**

- Mở từ thanh hành động “Thêm vào album” với danh sách selected song IDs.
- Title “Thêm vào album”; body liệt kê album mới nhất trước, mỗi row có checkbox, cover, tên, count.
- Chọn được nhiều album cùng lúc. Click row toggle; checkbox có accessible label.
- Footer sticky: trạng thái “Đã chọn N album” và nút “Thêm vào album” disabled khi N = 0.
- Có row “Tạo album mới” ở đầu danh sách (hoặc CTA tương đương) để chuyển sang view tạo album trong cùng panel.
- View tạo album: back arrow quay lại picker, title “Tạo album”, form tên, submit “Tạo album” / pending “Đang tạo…”. Tạo thành công: quay lại picker, album mới được chọn sẵn; nếu subscription chưa kịp trả album mới, hiện trạng thái chờ ngắn và tự chọn khi album xuất hiện.
- Empty albums: “Chưa có album nào”, mô tả, CTA “Tạo album”.
- Confirm gọi `addSongs(uid, selectedAlbumIds, selectedSongIds)` một lần. Thành công: đóng panel, clear selection, toast. Lỗi: giữ panel, hiện `ErrorAlert`, giữ selection.
- Đóng panel không làm mất selection bài trong Thư viện.
- Nếu selected song IDs rỗng (bài bị xóa đồng thời): đóng panel và thoát chế độ chọn.

**Album-first picker:**

- Mở từ “Thêm bài” ở album detail.
- Title “Thêm bài vào album”; body chỉ hiện các bài đã lưu **chưa có** trong album.
- Có `SearchField` lọc theo tiêu đề/nghệ sĩ, cùng hành vi với bộ lọc Thư viện.
- Mỗi row có checkbox, cover, tiêu đề, nghệ sĩ, preview; chọn nhiều bài.
- Footer sticky: “Đã chọn N bài” và nút “Thêm vào album” disabled khi N = 0.
- Confirm gọi `addSongs(uid, [albumId], selectedSongIds)`. Thành công: đóng panel, toast. Lỗi: giữ panel, ErrorAlert.
- Empty do Thư viện rỗng: “Thư viện chưa có bài nào”, mô tả, CTA “Về Thư viện”.
- Empty do tất cả bài đã có trong album: “Tất cả bài đã có trong album”, mô tả “Bài mới lưu sẽ xuất hiện ở đây.”, CTA “Đóng”.
- Không có inline create album trong picker này.

### 10. Forms, validation, and copy

- Form tạo/đổi tên album chỉ có field “Tên album”. Label độc lập với placeholder; lỗi inline ngay dưới field.
- Validate:
  - Trim trước khi kiểm tra và lưu.
  - Rỗng → “Nhập tên album.”
  - Trùng (case-insensitive, đã trim, bỏ qua chính album khi rename) → “Tên album đã tồn tại. Chọn tên khác.”
  - Không giới hạn độ dài.
- Submit label: “Tạo album” / “Đang tạo…”; “Lưu tên” / “Đang lưu…”.
- Tạo từ trang Album: thành công → điều hướng đến `/albums/{id}` để thêm bài ngay; toast “Đã tạo album”.
- Tạo từ picker: thành công → quay lại picker, chọn album mới; toast “Đã tạo album”.
- Copy dùng thuật ngữ glossary: “album”, “bài hát”, “Thư viện”; tránh “playlist”, “danh sách phát”, “bộ sưu tập”.
- Các nhãn chính: “Chọn”, “Hủy”, “Bỏ chọn”, “Thêm vào album”, “Bỏ khỏi album”, “Đổi tên album”, “Xóa album”, “Giữ lại”, “Tạo album”, “Tạo album mới”, “Tạo album đầu tiên”, “Thêm bài”, “Thêm bài vào album”.
- Toast thành công dùng động từ + đối tượng; toast lỗi nêu điều gì xảy ra và bước tiếp theo, theo copy contract.
- Destructive dialog dùng title “Xóa album?”, nút an toàn “Giữ lại”, nút phá hủy “Xóa album”; không dùng “Huỷ” cho dialog album mới.

### 11. Accessibility and responsive behavior

- Nav: hai link có accessible name rõ, `aria-current="page"` cho mục active; focus ring hiện rõ; wordmark link có accessible name “MusiMOB – về Thư viện”.
- Album card: toàn card là link; accessible name gồm tên album và count; không có interactive element lồng nhau.
- Selection checkbox có label “Chọn {tên bài}” hoặc tương đương; row/tile click không thay thế checkbox về mặt keyboard.
- Bottom action bar dùng `aria-live="polite"` cho count; các nút có accessible name; không che nội dung.
- Picker rows: checkbox + label; panel title/description đúng; back arrow có accessible label theo ngữ cảnh (không hardcode “Quay lại tìm kiếm” cho flow album).
- Shared panel cần cho phép truyền accessible label cho nút back (mặc định “Quay lại”) để dùng đúng ngữ cảnh album.
- Mobile: panel là drawer; bottom bar nằm trên safe area; toast không che bar; topbar không tràn ở 360px.
- Desktop: panel là dialog; album grid 2/3/4 cột; bottom bar dạng floating pill hoặc full-width theo design contract.
- Loading/empty/error states dùng pattern hiện có: `role="status"`, sr-only loading text, `ErrorAlert` với retry.

### 12. Design and copy contracts

- Cập nhật design contract (`DESIGN.md`) với:
  - Topbar navigation pattern, active state, mobile compact wordmark.
  - Album grid card (cover, title, count, hover/focus, radius, spacing).
  - Album detail header (cover size, title, actions, back link).
  - Selection mode (checkbox placement, selected row/tile state, bottom action bar).
  - Album picker rows, footer, inline create view.
  - Empty states cho album.
  - Toast offset khi bottom action bar hiện.
- Cập nhật copy contract (`COPY.md`) với các nhãn/chuỗi mới và quy tắc “Bỏ khỏi album” khác “Xóa bài”.
- Không cần token màu mới; dùng token hiện có. Nếu phát sinh token mới, cập nhật đồng thời design contract và `src/index.css`.
- Giữ nguyên “The One Add CTA Rule”: mỗi trạng thái chỉ có một đường thêm chính.
  - Thư viện bình thường: “Thêm bài”/FAB.
  - Thư viện đang chọn: “Thêm vào album” ở bottom bar; ẩn add bài.
  - Album rỗng: CTA “Tạo album đầu tiên” hoặc “Thêm bài vào album”.
  - Album detail bình thường: “Thêm bài”.

### 13. Dependencies and non-goals for implementation

- Thêm `react-router` v7; không thêm test runner, state library, hay data-fetching library mới.
- Không thay đổi model `Song`, API `songs`, hay hành vi undo xóa bài hiện có.
- Không thêm album metadata vào catalog search result.
- Không thêm Firestore index/composite query.

## Testing Decisions

- **Không thêm test runner** (quyết định Q11 = B). Không thêm Vitest/Jest/Testing Library/Playwright/Cypress.
- Xác minh tự động bằng pipeline hiện có:
  - `npm run format:check`
  - `npm run lint`
  - `npm run build` (`tsc -b` + Vite build)
- **Seam kiểm chứng:**
  - **Route composition seam** ở app layer, nơi `useSongs` + `useAlbums` gặp nhau và truyền data/callback xuống Library/Albums/Album detail. Đây là seam cao nhất, kiểm tra bằng manual QA qua UI thật.
  - **API seam** `MusimobApi['albums']` — hợp đồng duy nhất với Firestore; kiểm tra bằng typecheck và manual QA.
  - **Pure logic seam** trong feature album: chuẩn hóa/so trùng tên, join `songIds` với danh sách bài hiện tại, chọn cover đầu tiên còn tồn tại, lọc bài khả dụng, giữ thứ tự selection. Các hàm thuần này được tách riêng để sau này thêm Vitest không phải refactor.
- **Manual QA checklist:**
  1. Tạo album từ trang Album; album mới xuất hiện đầu danh sách và mở trang chi tiết.
  2. Tạo album với tên trống/toàn khoảng trắng → lỗi inline.
  3. Tạo album trùng tên khác hoa/thường/khoảng trắng → lỗi inline.
  4. Đổi tên album; đổi hoa/thường chính nó được phép; trùng album khác bị chặn.
  5. Xóa album sau confirm; bài vẫn còn trong Thư viện; không có undo; quay về `/albums`.
  6. Album-first: mở album, thêm nhiều bài; bài đã có không xuất hiện trong picker; thứ tự append đúng; thêm lần nữa không tạo trùng.
  7. Song-first: bật “Chọn”, chọn nhiều bài ở cả list/grid, mở picker, chọn nhiều album, thêm; kiểm tra membership ở tất cả album; thoát chế độ chọn.
  8. Song-first với Thư viện đang lọc: selection giữ qua đổi filter; count đúng; bài bị lọc vẫn được thêm.
  9. Tạo album inline trong picker; quay lại picker; album mới được chọn sẵn.
  10. Đóng picker giữa chừng; selection bài vẫn còn; mở lại và thêm được.
  11. Bỏ bài khỏi album ngay lập tức; không confirm; bài vẫn trong Thư viện; nếu đang preview thì preview dừng.
  12. Xóa bài khỏi Thư viện; bài biến mất khỏi album/card count; Hoàn tác đưa bài về đúng vị trí cũ trong album.
  13. Album rỗng vẫn tồn tại sau khi bỏ/xóa bài cuối.
  14. Empty states: chưa có album, album rỗng, picker không có album, picker không còn bài để thêm, Thư viện rỗng.
  15. Route: mở `/albums/:id` trực tiếp, refresh, back/forward; album không tồn tại; catch-all về `/`.
  16. Topbar nav active đúng; view toggle chỉ ở Thư viện; mobile 360px không tràn.
  17. Preview dừng khi đổi route; không có player/queue toàn cục.
  18. Error states: giả lập mất mạng/permission-denied; ErrorAlert + retry hoạt động; mutation lỗi giữ panel/dialog mở.
  19. Keyboard: tab qua nav/card/checkbox/panel; Escape thoát chế độ chọn; focus ring hiện.
  20. Toast không che bottom action bar; bottom bar không che nội dung cuối trang.

- **Nếu sau này thêm test runner:** test external behavior ở seam cao nhất (route-level với API mock), không test implementation detail; ưu tiên pure logic seam đã tách. Chưa có prior art trong repo vì repo chưa có test.

## Out of Scope

- Ảnh bìa album tùy chỉnh hoặc upload ảnh.
- Mô tả album, năm, thể loại, nghệ sĩ album, hoặc metadata khác.
- Tự động nhóm bài theo album metadata từ catalog.
- Kéo thả sắp xếp bài trong album; đổi thứ tự sau khi thêm.
- Phát toàn bộ album, queue, shuffle, repeat, player toàn cục.
- Chia sẻ album, album công khai, cộng tác nhiều người.
- Undo xóa album.
- Album lồng nhau / folder.
- Tìm kiếm, sắp xếp, lọc danh sách album (chỉ mới nhất trước).
- Chọn tất cả / bỏ chọn tất cả trong Thư viện.
- Xóa nhiều bài khỏi album cùng lúc.
- Pagination hoặc lazy-load album/song; v1 subscribe toàn bộ.
- Đồng bộ unique tên album ở server; chỉ kiểm tra client.
- Dọn dẹp `songIds` trỏ đến bài đã xóa.
- Thêm test runner hoặc automated tests.
- Migration dữ liệu (chưa có album nào tồn tại).
- Thay đổi hành vi undo xóa bài hiện có.
- Sửa/xóa bài Thư viện từ trong album detail.

## Further Notes

- **Stale IDs:** Album giữ ID bài đã xóa để Hoàn tác hoạt động. Đây là trade-off có chủ đích; UI luôn join với danh sách bài hiện tại. Không có job dọn dẹp trong v1.
- **Unique tên album là client-side:** hai tab có thể tạo trùng tên trong cùng thời điểm. Chấp nhận cho ứng dụng một người dùng; không thêm collection name-index hay transaction toàn cục.
- **Catalog không có album metadata:** không có auto-group; mọi membership là thủ công.
- **Không giới hạn độ dài tên album:** layout dùng truncate/line-clamp. Nếu sau này cần giới hạn, thêm validation và copy tương ứng.
- **Album detail dùng list cố định:** view toggle list/grid chỉ dành cho Thư viện; album detail không cần toggle.
- **Preview toàn cục:** audio preview vẫn là single-active-key; album không thêm player. Đổi route dừng preview để tránh audio không có control.
- **Topbar nav là quyết định long-term:** đã chọn nav cố định thay vì link ngữ cảnh để có chỗ mở rộng tính năng sau này.
- **React Router v7:** chọn vì phổ biến, ổn định, đủ cho 3 route; không dùng TanStack Router hay custom router.
- **Firestore rules:** cần deploy rule mới cùng hosting; CI hiện deploy `hosting,firestore:rules`.
- **Không có test runner:** mọi xác minh dựa vào format/lint/build và manual QA checklist ở trên.
