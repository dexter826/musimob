# COPY.md

Hợp đồng cho chữ hiển thị trong UI. `DESIGN.md` quy định phần hình ảnh; file này quy định
phần lời. Code lệch thì sửa code.

Phạm vi: mọi chuỗi người dùng đọc được — nhãn, nút, tiêu đề, mô tả, lỗi, toast, trạng thái
tải và trạng thái rỗng. Không áp dụng cho comment, log hoặc tài liệu nội bộ.

## 1. Giọng điệu

**Thân thiện, trực tiếp, cụ thể và gọn.** Nói thẳng điều người dùng cần biết; không phô diễn.

- Dùng “bạn” có chọn lọc. Ưu tiên câu không cần chủ ngữ; không lặp “bạn” máy móc.
- Câu chủ động, ngắn. Mỗi câu một ý chính.
- Không emoji, không viết hoa để nhấn mạnh, không đùa, không dấu chấm than.
- Không danh từ hóa khi có thể dùng động từ: “Xóa bài”, không “Thực hiện việc xóa bài”.
- Không chi tiết kỹ thuật trong UI: tránh `fetch`, `server`, `API`, mã HTTP, `null`,
  `undefined`.
- Thành công: ngắn, xác nhận kết quả.
- Lỗi: trung tính, không đổ lỗi, có bước xử lý tiếp theo khi có thể.
- Trạng thái rỗng: giải thích ngắn và mời hành động phù hợp; không xin lỗi nếu không có lỗi.

## 2. Thuật ngữ

Một khái niệm dùng một thuật ngữ. Không đổi sang từ đồng nghĩa chỉ để tránh lặp.

| Dùng                 | Nghĩa                                                    | Tránh dùng                          |
| -------------------- | -------------------------------------------------------- | ----------------------------------- |
| `musimob`            | Tên viết của sản phẩm                                    | `Musimob`, `CineMOB`, tên khác      |
| `musi` + `mob`       | Chỉ chữ trong wordmark                                   | Dùng làm tên viết trong câu         |
| `bài`                | Một mục đã lưu trong thư viện; dùng trong nhãn, nút, đếm | `track` trong UI                    |
| `bài hát`            | Dạng đầy đủ trong câu giải thích                         | Dùng khi nhãn đã đủ ngắn bằng `bài` |
| `nghệ sĩ`            | Người thể hiện bài hát                                   | `ca sĩ` trong UI                    |
| `thư viện`           | Nơi lưu bài hát của người dùng                           | `kho nhạc` nếu không có chủ ý khác  |
| `đã lưu`             | Trạng thái có trong thư viện của chính mình              | `yêu thích` trong UI                |
| `nghe thử`           | Nghe 30 giây bản xem trước từ nguồn                      | `phát`, `player`                    |
| `ảnh bìa`            | Hình đại diện cho bài hát                                | `cover` trong UI                    |
| `nguồn nhạc`         | Hệ thống bên ngoài cung cấp kết quả tìm kiếm             | `iTunes` trong UI                   |
| `tài khoản`          | Danh tính Google đã đăng nhập                            | `account` trong UI                  |
| `giao diện`          | Chế độ sáng/tối                                          | `theme` trong UI                    |
| `hoàn tác`           | Hành động khôi phục bài vừa xóa                          | `undo` trong UI                     |
| `danh sách` / `lưới` | Kiểu xem thư viện                                        | `view` trong UI                     |

- Giữ nguyên tên riêng và dịch vụ: `musimob`, `Google`.
- Không nêu tên nguồn nhạc trong UI. Nói hành động, không nói nơi lấy dữ liệu:
  “Tìm bài có sẵn”, không “Tìm trên iTunes”.
- Không dùng `playlist`, `wishlist`, `album`, `đánh giá`, `đã xem`, `track` cho khái niệm
  của project này.
- UI dùng `bài`; câu giải thích dùng `bài hát`. Không trộn trong cùng một nhãn.

## 3. Chuỗi theo màn hình

### Thư viện

| Chuỗi                        | Dùng ở                             |
| ---------------------------- | ---------------------------------- |
| `Thư viện`                   | h1 desktop/mobile                  |
| `{n} bài`                    | Đếm mặc định                       |
| `{x} / {y} bài`              | Đếm khi có filter                  |
| `Tìm bài hoặc nghệ sĩ…`      | Placeholder + label search         |
| `Xóa bộ lọc`                 | Nút clear của filter               |
| `Thêm bài`                   | Nút primary desktop                |
| `Chuyển sang dạng lưới`      | aria của view toggle khi đang list |
| `Chuyển sang dạng danh sách` | aria của view toggle khi đang grid |
| `Mở tài khoản của {name}`    | aria của avatar                    |
| `Đang tải…`                  | Count khi đang tải                 |
| `Không tải được`             | Count khi lỗi                      |
| `Đang tải danh sách…`        | sr-only trạng thái skeleton        |

### Hàng và lưới

| Chuỗi                                             | Dùng ở                          |
| ------------------------------------------------- | ------------------------------- |
| `Nghe thử {title}, {artist}`                      | aria preview                    |
| `Dừng nghe thử {title}`                           | aria preview khi đang phát      |
| `Đang nghe thử`                                   | Meta hàng active                |
| `Tuỳ chọn cho {title}`                            | aria nút ⋯                      |
| `Sửa`                                             | Menu hàng                       |
| `Xóa`                                             | Menu hàng                       |
| `Bài này không có bản nghe thử`                   | Toast/tooltip khi thiếu preview |
| `Không nghe thử được. Kiểm tra mạng rồi thử lại.` | Toast lỗi preview               |

### Trạng thái rỗng và filter

| Chuỗi                                  | Dùng ở                        |
| -------------------------------------- | ----------------------------- |
| `Chưa có bài nào`                      | Empty title                   |
| `Bài hát bạn thêm sẽ xuất hiện ở đây.` | Empty body                    |
| `Thêm bài đầu tiên`                    | Empty CTA (duy nhất)          |
| `Không có bài nào khớp.`               | Filter-empty title            |
| `Xóa bộ lọc`                           | Filter-empty action           |
| `Tìm bài này`                          | Filter-empty action, seed add |

### Tải và lỗi

| Chuỗi                                                 | Dùng ở               |
| ----------------------------------------------------- | -------------------- |
| `Đang tải…`                                           | App loading          |
| `Ứng dụng gặp sự cố`                                  | Error boundary title |
| `Có lỗi khi hiển thị trang này. Tải lại để tiếp tục.` | Error boundary body  |
| `Tải lại trang`                                       | Error boundary CTA   |
| `Mất kết nối. Kiểm tra mạng rồi thử lại.`             | Lỗi mạng chung       |
| `Thử lại`                                             | Retry                |

### Thêm bài — tìm kiếm

| Chuỗi                                                     | Dùng ở                     |
| --------------------------------------------------------- | -------------------------- |
| `Thêm bài`                                                | Panel title                |
| `Tìm bài có sẵn hoặc nhập tay.`                           | Panel description          |
| `Nhập tay`                                                | Header action              |
| `Tìm bài hoặc nghệ sĩ…`                                   | Placeholder + label search |
| `Nhập tên bài hoặc nghệ sĩ để tìm.`                       | Gợi ý khi <2 ký tự         |
| `Đang tìm…`                                               | Loading                    |
| `Không tìm thấy bài nào. Thử từ khoá khác hoặc nhập tay.` | Empty                      |
| `Không tìm được. Kiểm tra mạng rồi thử lại.`              | Lỗi mặc định               |
| `Tìm kiếm đang bị giới hạn. Đợi vài giây rồi thử lại.`    | Rate limit                 |
| `Nguồn nhạc phản hồi chậm. Kiểm tra mạng rồi thử lại.`    | Timeout                    |
| `Lưu`                                                     | Nút lưu kết quả            |
| `Đang lưu…`                                               | Nút lưu khi pending        |
| `Lưu {title}, {artist}`                                   | aria nút lưu               |
| `Đang lưu {title}`                                        | aria khi pending           |
| `Đã lưu`                                                  | Badge kết quả đã có        |
| `Không lưu được bài. Thử lại.`                            | Lỗi lưu                    |

### Nhập tay và sửa

| Chuỗi                                    | Dùng ở                   |
| ---------------------------------------- | ------------------------ |
| `Nhập tay`                               | Panel title khi nhập tay |
| `Nhập tên bài, nghệ sĩ và URL ảnh bìa.`  | Panel description        |
| `Quay lại tìm kiếm`                      | aria back                |
| `Tên bài`                                | Field label              |
| `Nghệ sĩ`                                | Field label              |
| `URL ảnh bìa`                            | Field label              |
| `Nhập tên bài.`                          | Lỗi field                |
| `Nhập tên nghệ sĩ.`                      | Lỗi field                |
| `URL ảnh bìa không hợp lệ.`              | Lỗi field                |
| `Bài này đã có trong thư viện.`          | Lỗi trùng                |
| `Không bắt buộc.`                        | Cover hint               |
| `Không tải được ảnh bìa.`                | Cover hint lỗi           |
| `Lưu bài`                                | Submit                   |
| `Đang lưu…`                              | Submit pending           |
| `Sửa bài`                                | Edit title               |
| `Sửa tên bài, nghệ sĩ hoặc URL ảnh bìa.` | Edit description         |
| `Lưu thay đổi`                           | Edit submit              |

### Xóa

| Chuỗi                                                                 | Dùng ở          |
| --------------------------------------------------------------------- | --------------- |
| `Xóa bài này?`                                                        | Confirm title   |
| `“{title}” sẽ bị xóa khỏi thư viện. Bạn có thể hoàn tác ngay sau đó.` | Confirm body    |
| `Huỷ`                                                                 | Confirm cancel  |
| `Xóa`                                                                 | Confirm action  |
| `Đang xóa…`                                                           | Confirm pending |
| `Không xóa được bài. Thử lại.`                                        | Confirm error   |

### Tài khoản và giao diện

| Chuỗi                                                           | Dùng ở             |
| --------------------------------------------------------------- | ------------------ |
| `Mở tài khoản của {name}`                                       | aria trigger       |
| `Giao diện`                                                     | Account menu label |
| `Theo hệ thống`                                                 | Theme option       |
| `Sáng`                                                          | Theme option       |
| `Tối`                                                           | Theme option       |
| `Đăng xuất`                                                     | Account menu item  |
| `Đang đăng xuất…`                                               | Sign-out pending   |
| `Đăng xuất?`                                                    | Confirm title      |
| `Bạn sẽ rời khỏi tài khoản này. Thư viện bài hát vẫn được giữ.` | Confirm body       |
| `Huỷ`                                                           | Confirm cancel     |
| `Không đăng xuất được. Thử lại.`                                | Sign-out error     |

### Toast

| Chuỗi                                             | Dùng ở          |
| ------------------------------------------------- | --------------- |
| `Đã lưu bài`                                      | Lưu thành công  |
| `Đã xóa bài`                                      | Xóa thành công  |
| `Hoàn tác`                                        | Toast action    |
| `Đang khôi phục…`                                 | Undo pending    |
| `Đã khôi phục bài`                                | Undo thành công |
| `Không khôi phục được bài`                        | Undo lỗi        |
| `Thử lại`                                         | Toast retry     |
| `Bài này không có bản nghe thử`                   | Preview thiếu   |
| `Không nghe thử được. Kiểm tra mạng rồi thử lại.` | Preview lỗi     |

### Đăng nhập

| Chuỗi                                                 | Dùng ở        |
| ----------------------------------------------------- | ------------- |
| `Thư viện riêng của bạn`                              | h1            |
| `Lưu và đồng bộ danh sách bài hát trên mọi thiết bị.` | Lede          |
| `Đăng nhập bằng Google`                               | Nút sign-in   |
| `Đang đăng nhập…`                                     | Nút pending   |
| `Chỉ bạn thấy thư viện của mình.`                     | Fine print    |
| `Bạn đã đóng cửa sổ đăng nhập.`                       | Auth error    |
| `Mất kết nối. Kiểm tra mạng rồi thử lại.`             | Auth error    |
| `Quá nhiều lần thử. Đợi một lát rồi thử lại.`         | Auth error    |
| `Tên miền này chưa được phép đăng nhập.`              | Auth error    |
| `Đăng nhập Google chưa được bật cho ứng dụng này.`    | Auth error    |
| `Tài khoản này đã bị khoá.`                           | Auth error    |
| `Email này đã dùng một cách đăng nhập khác.`          | Auth error    |
| `Không đăng nhập được. Thử lại.`                      | Auth fallback |

### Điều hướng phụ

| Chuỗi                 | Dùng ở             |
| --------------------- | ------------------ |
| `Chuyển đến nội dung` | Skip link          |
| `musimob`             | alt logo, tên viết |

## 4. Mẫu theo tình huống

### Lỗi

Cấu trúc: **điều gì xảy ra + bước tiếp theo**. Nêu nguyên nhân chỉ khi biết chắc. Tối đa
hai câu ngắn. Không đổ lỗi người dùng, không mã kỹ thuật trần. Luôn có lối thoát khi có thể.

Đúng: “Mất kết nối. Kiểm tra mạng rồi thử lại.”

Tránh: “iTunes trả lỗi 500.”

### Trạng thái rỗng

Cấu trúc: **trạng thái + giá trị + hành động**. Phân biệt chưa có dữ liệu, không có kết quả
khớp và không tải được. Một CTA chính; tối đa một hành động phụ khi có hai hướng hợp lệ.

Đúng: “Chưa có bài nào” / “Bài hát bạn thêm sẽ xuất hiện ở đây.” / “Thêm bài đầu tiên”

Tránh: “Không có dữ liệu.”

### Xác nhận

Cấu trúc: **câu hỏi + hậu quả + nút mô tả hành động**. Chỉ dùng cho hành động không thể hoàn
tác hoặc có hậu quả đáng kể. Hành động có undo thì dùng toast, không hỏi trước.

Đúng: “Xóa bài này?” / “Bạn có thể hoàn tác ngay sau đó.” / “Xóa”

### Toast

Cấu trúc: **kết quả + hành động nếu hoàn tác được**. Động từ quá khứ; nêu đối tượng khi có
thể; không dấu chấm cuối. CTA là động từ: “Hoàn tác”, “Thử lại”.

Đúng: “Đã xóa bài” + “Hoàn tác”

### Nút

Bắt đầu bằng động từ, tối đa ba từ khi có thể; mô tả kết quả, không mô tả cơ chế. Tránh
“OK”, “Đồng ý”, “Gửi”, “Xác nhận”. Dùng “Đăng nhập bằng Google” và “Đăng xuất” đúng hành động.

## 5. Định dạng

- Sentence case cho heading, nút, nhãn, tiêu đề; không Title Case.
- Không đặt dấu chấm cuối nhãn, nút, tiêu đề ngắn. Câu đầy đủ trong mô tả dùng dấu chấm.
- Dùng `…` Unicode, không `...`; ngoặc kép cong “Nội dung”.
- Ngày, giờ, số dùng locale `vi-VN` qua `Intl.DateTimeFormat` / `Intl.NumberFormat`.
  Không nối chuỗi ngày thủ công.
- `★` chỉ dùng cho rating nếu có; ngoài ra dùng icon hoặc chữ “sao”.
- Chữ in hoa giữ đủ dấu tiếng Việt.
- Dùng chính tả `xóa`, không dùng `xoá`.
- Loading luôn kết thúc bằng `…`; placeholder kết thúc bằng `…`.
- Không middle dot, không numbered marker, không emoji.

## 6. Checklist review

1. Thuật ngữ khớp bảng ở §2 và `GLOSSARY.md`.
2. Nút bắt đầu bằng động từ, mô tả đúng hành động.
3. Lỗi không lộ chi tiết kỹ thuật; có bước tiếp theo khi khả thi.
4. Trạng thái rỗng nói rõ trạng thái/giá trị; một CTA chính.
5. Chỉ xác nhận hành động không hoàn tác được; có undo thì dùng toast.
6. Không emoji, không `...`, không Title Case, không dấu chấm thừa ở nhãn.
7. Số/ngày dùng `vi-VN` qua `Intl`; `xóa` đúng chính tả.
