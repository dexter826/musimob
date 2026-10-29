# COPY.md

Hợp đồng cho chữ hiển thị trong UI. `DESIGN.md` quy định phần hình ảnh; file này quy định phần lời. Code lệch thì sửa code.

Phạm vi: mọi chuỗi người dùng đọc được - nhãn, nút, tiêu đề, mô tả, lỗi, toast, trạng thái tải và trạng thái rỗng. Không áp dụng cho comment, log hoặc tài liệu nội bộ.

## 1. Giọng điệu

**Thân thiện, trực tiếp, cụ thể và gọn.** Nói thẳng điều người dùng cần biết; không phô diễn.

- Dùng “bạn” có chọn lọc. Ưu tiên câu không cần chủ ngữ; không lặp “bạn” máy móc.
- Dùng câu chủ động, ngắn. Mỗi câu nên truyền tải một ý chính.
- Không emoji, không viết hoa để nhấn mạnh, không đùa và không dùng dấu chấm than.
- Không dùng danh từ hóa khi có thể dùng động từ: “Xóa bài”, không “Thực hiện việc xóa bài”.
- Không đưa chi tiết kỹ thuật vào UI: tránh `fetch`, `server`, `API`, mã HTTP, `null` và `undefined`.
- Thành công: ngắn và xác nhận kết quả.
- Lỗi: trung tính, không đổ lỗi, có bước xử lý tiếp theo khi có thể.
- Trạng thái rỗng: giải thích ngắn gọn và mời hành động phù hợp; không xin lỗi nếu không có lỗi.

## 2. Glossary

Một khái niệm dùng một thuật ngữ thống nhất. Không đổi sang từ đồng nghĩa chỉ để tránh lặp.

| Dùng        | Nghĩa                                               | Tránh dùng                                     |
| ----------- | --------------------------------------------------- | ---------------------------------------------- |
| `musimob`   | Tên sản phẩm                                        | `CineMOB`, tên sản phẩm khác                   |
| `bài hát`   | Một mục nhạc trong thư viện                         | `track` trong câu hiển thị                     |
| `bài`       | Cách gọi ngắn của `bài hát` trong nút hoặc câu ngắn | Dùng khi có thể gây mơ hồ                      |
| `ca sĩ`     | Người thể hiện bài hát                              | `nghệ sĩ` nếu ngữ cảnh đang nói riêng về ca sĩ |
| `thư viện`  | Nơi lưu các bài hát của người dùng                  | `kho nhạc` nếu không có chủ ý khác             |
| `danh sách` | Nhóm bài hát do người dùng quản lý                  | `playlist` trong câu hiển thị                  |
| `ảnh bìa`   | Hình ảnh đại diện cho bài hát                       | `cover` trong câu hiển thị                     |
| `iTunes`    | Dịch vụ tìm kiếm và nguồn dữ liệu bài hát           | Tên dịch vụ khác                               |

- Giữ nguyên tên riêng và tên dịch vụ: `musimob`, `Google`, `iTunes`.
- Giữ nguyên thuật ngữ kỹ thuật khi đó là tên tính năng, tên dịch vụ hoặc nhãn quen thuộc trong sản phẩm; Việt hóa phần diễn giải cho người dùng.
- Không dùng `phim`, `series`, `tập`, `watchlist`, `album`, `đánh giá`, `đã xem` cho các khái niệm của project này.

## 3. Mẫu theo tình huống

### Lỗi

Cấu trúc: **điều gì xảy ra + bước tiếp theo**. Nêu nguyên nhân chỉ khi biết chắc.

- Viết tối đa hai câu ngắn.
- Không đổ lỗi người dùng và không hiển thị mã kỹ thuật trần.
- Khi có thể, luôn đưa ra lối thoát: “Thử lại”, “Kiểm tra kết nối” hoặc một hành động phù hợp hơn.
- Dùng thông báo dễ hiểu thay cho lỗi từ API hoặc mã HTTP.

Đúng: “Không thể tải ảnh bìa. Hãy thử lại.”

Tránh: “iTunes trả lỗi 500.” - lộ mã kỹ thuật và thiếu bước tiếp theo.

### Trạng thái rỗng

Cấu trúc: **trạng thái + giá trị + hành động phù hợp**.

- Tiêu đề nêu rõ trạng thái: “Chưa có bài hát nào”.
- Mô tả ngắn gọn lý do hoặc lợi ích, không dùng “Không có dữ liệu” nếu có thể nói cụ thể hơn.
- Có một CTA chính và tối đa một hành động phụ khi người dùng có hai hướng xử lý hợp lệ.
- Không thêm CTA nếu người dùng không thể tự tạo hoặc xử lý dữ liệu trong trạng thái đó.
- Phân biệt ít nhất ba trường hợp: chưa có dữ liệu, không có kết quả phù hợp và không tải được dữ liệu.

Đúng: “Chưa có bài hát nào” / “Thêm bài hát để bắt đầu xây dựng thư viện.” / “Thêm bài”

Tránh: “Không có dữ liệu.” - quá chung chung và không hướng dẫn bước tiếp theo.

### Xác nhận

Cấu trúc: **câu hỏi + hậu quả + nút mô tả hành động**.

- Chỉ dùng xác nhận cho hành động không thể hoàn tác hoặc có hậu quả đáng kể.
- Hành động có thể hoàn tác thì dùng toast kèm “Hoàn tác”, không yêu cầu xác nhận trước.
- Tiêu đề là câu hỏi ngắn, nêu rõ đối tượng: “Xóa bài hát này?”
- Nội dung nêu hậu quả cụ thể, không dùng lời cảnh báo chung chung.
- Nút phải mô tả hành động: “Xóa bài”, không dùng “Đồng ý”, “Xác nhận” hoặc “Hủy” khi có thể dùng tên hành động cụ thể.

### Toast

Cấu trúc: **kết quả + hành động nếu có thể hoàn tác**.

- Xác nhận kết quả bằng động từ ở thì quá khứ: “Đã thêm bài hát”.
- Nêu đối tượng cụ thể khi có thể: “Đã xóa bài hát”.
- Không dùng dấu chấm cuối.
- CTA là động từ: “Hoàn tác”, “Xem” hoặc hành động cụ thể tương ứng.

### Nút

- Bắt đầu bằng động từ, tối đa ba từ khi có thể; tên dịch vụ hoặc CTA đặc thù có thể dài hơn: “Thêm bài”, “Lưu bài”, “Sửa bài”, “Thử lại”.
- Mô tả kết quả hoặc hành động, không mô tả cơ chế kỹ thuật.
- Tránh “OK”, “Đồng ý”, “Gửi” và “Xác nhận” khi có thể nói rõ hành động hơn.
- Dùng “Đăng nhập”, “Tiếp tục với Google” và “Đăng xuất” theo đúng hành động.

## 4. Định dạng

- Dùng sentence case cho heading, nút, nhãn và tiêu đề; không dùng Title Case.
- Chỉ dùng chữ in hoa toàn bộ khi `DESIGN.md` quy định cho loại thành phần đó.
- Không đặt dấu chấm cuối nhãn, nút và tiêu đề ngắn. Câu đầy đủ trong mô tả thì dùng dấu chấm khi phù hợp.
- Dùng dấu ba chấm Unicode `…`, không dùng `...`.
- Dùng ngoặc kép cong: “Nội dung”.
- Ngày, giờ và số hiển thị theo locale `vi-VN` bằng `Intl.DateTimeFormat` và `Intl.NumberFormat`. Ví dụ: `31/12/2026`, `1.234`, `8,5`.
- Không nối chuỗi ngày thủ công trong code.
- `★` chỉ dùng trong nhãn rating khi cần biểu thị số sao. Ngoài ngữ cảnh đó, dùng icon hoặc chữ “sao”.
- Chữ in hoa vẫn phải giữ đầy đủ dấu tiếng Việt.
- Dùng chính tả `xóa`, không dùng `xoá`.

## 5. Checklist review

1. Thuật ngữ nhất quán với glossary âm nhạc của project.
2. Nút bắt đầu bằng động từ và mô tả đúng hành động.
3. Thông báo lỗi không lộ chi tiết kỹ thuật, không có mã lỗi trần và có bước tiếp theo khi khả thi.
4. Trạng thái rỗng nói rõ nguyên nhân hoặc giá trị; có một CTA chính và tối đa một hành động phụ khi cần.
5. Chỉ dùng xác nhận cho hành động không thể hoàn tác hoặc có hậu quả đáng kể.
6. Không có emoji, dấu chấm thừa ở nhãn/nút, `...` hoặc Title Case.
7. Ngày, giờ và số dùng định dạng `vi-VN` qua `Intl`.
