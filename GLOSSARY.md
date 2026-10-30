# MusiMOB

Ứng dụng lưu trữ bộ sưu tập bài hát cá nhân: mỗi người dùng đánh dấu những bài mình yêu
thích, tìm từ một nguồn nhạc bên ngoài hoặc nhập tay, và lưu vào thư viện riêng. Không phát
toàn bài, không xếp thứ tự, không chia sẻ.

## Language

**Người dùng (User)**:
Một người dùng MusiMOB, đăng nhập bằng Google và sở hữu đúng một Thư viện riêng tư.
UI gọi danh tính đăng nhập là “tài khoản”, không dùng “người dùng” trong nhãn.
_Avoid_: Khách, Account trong UI

**Tài khoản (Account)**:
Danh tính Google đã đăng nhập, ánh xạ một-một với Người dùng và Thư viện. Mọi thao tác đọc/
ghi chỉ áp dụng cho thư viện của tài khoản hiện tại.
_Avoid_: Profile, User trong UI

**Thư viện (Library)**:
Toàn bộ các Bài hát đã lưu của một Người dùng. Private tuyệt đối: không Người dùng nào thấy
hay đếm được Thư viện của người khác.
_Avoid_: Playlist (gợi ý thứ tự nghe), Bộ sưu tập chung, Wishlist (gợi ý chờ nghe)

**Bài hát đã lưu (Song)**:
Một bản ghi nhạc được Người dùng đánh dấu yêu thích và lưu vào Thư viện của mình. Mang tính
“thích”, không mang tính “để nghe sau”, không có thứ tự. UI dùng dạng ngắn “bài” trong nhãn,
nút và đếm; dùng “bài hát” trong câu giải thích.
_Avoid_: Track, Favorite, Bài hát (khi chưa được lưu)

**Nguồn nhạc (Catalog source)**:
Hệ thống bên ngoài cung cấp kết quả tìm kiếm. Bài hát chỉ có thể được lưu nguyên văn từ
nguồn hoặc nhập tay.
_Avoid_: iTunes (tên riêng của nguồn hiện tại, không phải khái niệm), API trong UI

**Kết quả tìm kiếm (Search Result)**:
Một bản ghi nhạc lấy từ Nguồn nhạc, chưa được lưu vào Thư viện.
_Avoid_: Bài hát, Track

**Đã lưu (Saved)**:
Trạng thái của một Kết quả tìm kiếm khi trùng với một Bài hát đã lưu trong Thư viện của
chính Người dùng đang xem. Không xét Thư viện của người khác.
_Avoid_: Yêu thích, Favorite trong UI

**Nghệ sĩ (Artist)**:
Người hoặc nhóm được nguồn ghi công cho bài hát; với bài nhập tay, do Người dùng nhập.
UI dùng “nghệ sĩ”, không dùng “ca sĩ”.
_Avoid_: Ca sĩ trong UI, Performer

**Ảnh bìa (Cover art)**:
Hình ảnh đại diện cho bài hát, lấy từ nguồn hoặc do Người dùng nhập URL. Ảnh bìa là vật thể
trang trí trong hàng/lưới; tên bài và nghệ sĩ mới là nội dung đọc.
_Avoid_: Cover trong UI, Album art

**Nghe thử (Preview)**:
Đoạn 30 giây lấy từ nguồn nhạc, phát một bài tại một thời điểm. Không có phát toàn bài,
không progress, không seek, không volume. Bài không có bản nghe thử vẫn hiện nút với lý do.
_Avoid_: Phát, Player, Streaming

**Hoàn tác (Undo)**:
Khôi phục một Bài hát vừa xóa bằng bản ghi trong bộ nhớ, giữ nguyên id và thời điểm tạo;
không dùng soft delete. Cửa sổ hoàn tác hiện tại là 10 giây.
_Avoid_: Thùng rác, Soft delete, Khôi phục từ server

**Danh tính bài hát (Song identity)**:
Bài lưu từ Nguồn nhạc được nhận diện bằng id của nguồn — cách viết tên hay tên nghệ sĩ có
đổi vẫn là một bài. Bài nhập tay nhận diện bằng tên bài và tên nghệ sĩ sau chuẩn hóa
(trim, bỏ hoa/thường).
_Avoid_: So khớp theo tiêu đề trần, Dedupe theo URL ảnh bìa

## Invariants

- Một Tài khoản ↔ một Thư viện; không chia sẻ, không xem thư viện người khác.
- Sản phẩm không có playlist, thứ tự, phát toàn bài, chia sẻ hay social.
- Nghe thử chỉ 30 giây từ Nguồn nhạc; một bài tại một thời điểm.
- Xóa có Hoàn tác trong 10 giây; không xóa ngầm, không soft delete.
- Tên viết của sản phẩm là `MusiMOB`; wordmark dùng chữ `Musi` + `MOB`. `musimob` lowercase
  chỉ dùng cho ID kỹ thuật, package, repo và URL.
