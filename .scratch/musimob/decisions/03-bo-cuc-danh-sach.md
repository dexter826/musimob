# Bố cục danh sách và luồng thêm bài

Type: prototype
Status: resolved
Blocked by: 01

## Question

Màn hình chính trông thế nào, và thêm một bài diễn ra ra sao?

Cần chốt:

- **Danh sách**: card có ảnh bìa, hay list gọn một dòng? Ảnh bìa to hay nhỏ?
- **Tìm trong danh sách**: đặt ở đâu, luôn hiện hay mở bằng nút?
- **Luồng thêm**: modal, trang riêng, hay thêm inline ngay trên danh sách?
- **Sửa và xoá**: vào bằng cách nào? Swipe, menu, hay mở chi tiết?
- **Trạng thái rỗng**: lần đầu mở app thấy gì?

## Answer

Chốt bố cục **D — trộn A và B**.

Prototype: [03-bo-cuc.html](../prototype/03-bo-cuc.html), mở `?variant=D`. Bốn variant đã dựng: A danh sách dày, B lưới ảnh, C chữ là chính, D bản trộn.

### Header

- Wordmark `musimob`, chữ "mob" màu accent.
- Dòng phụ: `{n} bài`.
- Bên phải: nút đổi kiểu xem, avatar Google.

### Tìm kiếm

- Ô full-width ngay dưới header, luôn hiện.
- Lọc phía client trên danh sách đã tải. Không gọi iTunes. iTunes chỉ dùng trong luồng thêm bài.

### Hai kiểu xem

| Kiểu | Chi tiết |
| --- | --- |
| Danh sách (mặc định) | Row cao 50px ảnh, tên 14.5px đậm, ca sĩ 12.5px màu muted, một dòng mỗi bài |
| Lưới | Hai cột, ảnh vuông 1:1, gradient đen dưới đáy, tên 12.5px chồng trên ảnh |

Nút `▦` / `☰` cạnh avatar. Lựa chọn lưu ở `localStorage` — đây là preference UI, không đưa vào Firestore.

### Thêm bài

- Nút `+` nổi, mở **bottom sheet** trượt từ dưới.
- Hai tab: **iTunes** và **Nhập tay**.
- iTunes: ô tìm, danh sách kết quả, mỗi dòng một nút `Lưu`. Bài đã có hiện `Đã lưu` thay vì `Lưu`.
- Nhập tay: tên bài, ca sĩ, URL ảnh bìa.

### Sửa và xoá

- Nút `⋯` cuối mỗi row. Ở kiểu lưới, `⋯` nằm góc trên phải ảnh.
- Menu gồm `Sửa` và `Xoá`.
- Xoá hỏi xác nhận trước khi ghi.

### Trạng thái rỗng

`Chưa có bài nào`, một câu giải thích, nút `Thêm bài đầu tiên`.

### Đã loại

- **A**: modal giữa màn hình. Che mất danh sách, và trên điện thoại bàn phím đẩy modal lệch.
- **B**: lưới là kiểu duy nhất. Xem được ít bài, quét chậm khi danh sách dài.
- **C**: chữ là chính, thêm inline. Gọn nhưng không nhận ra bài theo ảnh, và luồng thêm nằm sâu trong trang.
