# AGENTS.md

Các hướng dẫn hành vi nhằm giảm những lỗi lập trình thường gặp của LLM. Kết hợp với các hướng dẫn riêng của dự án khi cần.

**Đánh đổi:** Các hướng dẫn này ưu tiên sự thận trọng hơn tốc độ. Với tác vụ đơn giản, hãy tự cân nhắc.

## 1. Suy nghĩ trước khi lập trình

**Không tự giả định. Không che giấu điểm chưa rõ. Nêu rõ các đánh đổi.**

Trước khi triển khai:

- Nêu rõ các giả định của bạn. Nếu chưa chắc, hãy hỏi.
- Nếu có nhiều cách diễn giải, hãy trình bày chúng — đừng âm thầm chọn một cách.
- Nếu có cách tiếp cận đơn giản hơn, hãy nói rõ. Khi cần, hãy phản biện yêu cầu.
- Nếu có điều gì chưa rõ, hãy dừng lại. Nêu rõ điểm gây nhầm lẫn và đặt câu hỏi.

## 2. Ưu tiên sự đơn giản

**Chỉ viết lượng mã tối thiểu để giải quyết vấn đề. Không làm thêm theo suy đoán.**

- Không thêm tính năng ngoài phạm vi được yêu cầu.
- Không tạo abstraction cho đoạn mã chỉ dùng một lần.
- Không thêm "tính linh hoạt" hoặc "khả năng cấu hình" khi chưa được yêu cầu.
- Không xử lý lỗi cho những tình huống không thể xảy ra.
- Nếu bạn viết 200 dòng trong khi có thể chỉ cần 50 dòng, hãy viết lại.

Hãy tự hỏi: "Một kỹ sư cấp cao có cho rằng cách này quá phức tạp không?" Nếu có, hãy đơn giản hóa.

## 3. Thay đổi có tính phẫu thuật

**Chỉ chạm vào những gì bắt buộc. Chỉ dọn dẹp phần lộn xộn do chính bạn tạo ra.**

Khi chỉnh sửa mã hiện có:

- Đừng "cải thiện" mã, chú thích hoặc định dạng xung quanh.
- Đừng refactor những phần không bị lỗi.
- Tuân theo phong cách hiện có, ngay cả khi bạn sẽ làm khác đi.
- Nếu nhận thấy mã chết không liên quan, hãy đề cập — đừng xóa nó.

Khi thay đổi của bạn tạo ra phần mồ côi:

- Xóa các import/biến/hàm bị bỏ không dùng do chính thay đổi của bạn tạo ra.
- Đừng xóa mã chết có sẵn nếu chưa được yêu cầu.

Tiêu chí kiểm tra: Mọi dòng được thay đổi đều phải truy nguyên trực tiếp về yêu cầu của người dùng.

## 4. Thực hiện theo mục tiêu

**Xác định tiêu chí thành công. Lặp lại cho đến khi kiểm chứng được.**

Chuyển tác vụ thành các mục tiêu có thể kiểm chứng:

- "Thêm validation" → "Viết test cho đầu vào không hợp lệ, sau đó làm cho test đạt"
- "Sửa lỗi" → "Viết test tái hiện lỗi, sau đó làm cho test đạt"
- "Refactor X" → "Đảm bảo test đạt trước và sau khi refactor"

Với tác vụ nhiều bước, hãy nêu kế hoạch ngắn gọn:

```
1. [Bước] → kiểm tra: [nội dung kiểm tra]
2. [Bước] → kiểm tra: [nội dung kiểm tra]
3. [Bước] → kiểm tra: [nội dung kiểm tra]
```

Tiêu chí thành công rõ ràng cho phép bạn tự lặp lại quy trình. Tiêu chí mơ hồ ("làm cho chạy được") sẽ khiến bạn phải liên tục hỏi lại.

---

**Các hướng dẫn này phát huy hiệu quả nếu:** diff có ít thay đổi không cần thiết hơn, ít phải viết lại do quá phức tạp hơn, và các câu hỏi làm rõ được đặt ra trước khi triển khai thay vì sau khi mắc lỗi.

## Kỹ năng của agent

### Trình theo dõi issue

Issue và spec được lưu dưới dạng tệp Markdown trong `.scratch/<feature>/`. Xem `docs/agents/issue-tracker.md`.

### Nhãn phân loại

Năm vai trò phân loại chuẩn sử dụng nguyên trạng chuỗi nhãn mặc định. Xem `docs/agents/triage-labels.md`.

### Tài liệu miền

Mỗi ngữ cảnh chỉ có một `GLOSSARY.md` và một thư mục `docs/adr/` ở thư mục gốc của repo. Xem `docs/agents/domain.md`.

## 5. Tài liệu trong repo

**Đọc spec trước khi sửa UI. Spec là chuẩn; code theo spec.**

- `DESIGN.md` — hợp đồng thị giác: màu, chữ, layout, elevation, shape, component.
- `COPY.md` — hợp đồng copy: giọng, thuật ngữ, mẫu câu, định dạng.
- Code lệch spec → sửa code, không sửa spec.
- Đổi token → cập nhật `DESIGN.md` và `src/index.css` cùng lúc.
- Đổi chữ hiển thị → đối chiếu glossary và pattern trong `COPY.md` trước.
- Component spec trong `DESIGN.md` chỉ giữ slot; câu chữ nằm ở `COPY.md`.
