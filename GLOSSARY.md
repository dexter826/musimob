# Musimob

Ứng dụng lưu trữ bộ sưu tập bài hát cá nhân: mỗi người dùng tự đánh dấu những bài mình yêu thích, tìm từ một nguồn nhạc bên ngoài và lưu lại. Không phát nhạc, không xếp thứ tự, không chia sẻ.

## Language

**Người dùng (User)**:
Một tài khoản đăng nhập, sở hữu đúng một Thư viện riêng tư.
_Avoid_: Khách, Account

**Thư viện (Library)**:
Toàn bộ các Bài hát đã lưu của một Người dùng. Private tuyệt đối: không Người dùng nào thấy hay đếm được Thư viện của người khác.
_Avoid_: Playlist (gợi ý thứ tự nghe), Bộ sưu tập chung, Wishlist (gợi ý chờ nghe)

**Bài hát đã lưu (Song)**:
Một bản ghi nhạc được Người dùng đánh dấu yêu thích và lưu vào Thư viện của mình. Mang tính "thích", không mang tính "để nghe sau", không có thứ tự.
_Avoid_: Track, Bài hát (khi chưa được lưu), Favorite

**Nguồn nhạc (Catalog source)**:
Hệ thống bên ngoài cung cấp kết quả tìm kiếm. Bài hát chỉ có thể được lưu nguyên văn từ nguồn hoặc nhập tay.
_Avoid_: iTunes (tên riêng của nguồn hiện tại, không phải khái niệm)

**Kết quả tìm kiếm (Search Result)**:
Một bản ghi nhạc lấy từ Nguồn nhạc, chưa được lưu, chưa có danh tính trong hệ thống.
_Avoid_: Bài hát, Track

**Đã lưu (Saved)**:
Trạng thái của một Kết quả tìm kiếm khi trùng với một Bài hát đã lưu trong Thư viện của chính Người dùng đang xem. Không xét Thư viện của người khác.

**Danh tính bài hát (Song identity)**:
Hai bài được coi là cùng một bài khi tên bài và tên nghệ sĩ trùng nhau sau chuẩn hoá (trim, bỏ hoa/thường). Biến thể nghệ sĩ ("A & B" vs "A, B") được tính là hai bài khác nhau — hạn chế đã biết, chưa chốt hướng xử lý.
_Avoid_: coi id nguồn nhạc là danh tính (hiện hệ thống không lưu id nguồn)
