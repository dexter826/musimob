---
target: src/features/songs
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
p2_count: 3
target_identity: "file:C:\\MyProject\\musimob\\src\\features\\songs"
timestamp: 2026-10-29T03-17-15Z
slug: src-features-songs
closed: true
---
Method: dual-agent (A: critique-a · B: critique-b)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Skeleton, count, pending đều tốt; lưu tay xong không có xác nhận nào |
| 2 | Match System / Real World | 3 | Gọi Thư viện là "danh sách" cả khi ở grid; "URL ảnh bìa" là ngữ kỹ thuật |
| 3 | User Control and Freedom | 3 | Có Huỷ/Esc/clear filter; xoá vĩnh viễn, đóng form bẩn mất chữ không cảnh báo |
| 4 | Consistency and Standards | 4 | Token, radius, copy, pattern list/grid/drawer thống nhất |
| 5 | Error Prevention | 3 | Xác nhận xoá + validate inline; nhập tay trùng bài không bị chặn |
| 6 | Recognition Rather Than Recall | 3 | Sửa/Xoá ẩn sau ellipsis; FAB chỉ icon; toggle hiển thị view đích |
| 7 | Flexibility and Efficiency | 2 | Không shortcut, không bulk; sửa một bài = 4 thao tác |
| 8 | Aesthetic and Minimalist Design | 4 | Night Sleeve rất kỷ luật; chỉ vướng hai CTA coral ở empty state |
| 9 | Error Recovery | 3 | Copy nêu việc cần làm; banner lỗi khi đã có dữ liệu cũ không có retry |
| 10 | Help and Documentation | 2 | Chỉ microcopy inline; đủ cho nhóm nhỏ nhưng không có trợ giúp nào |
| **Total** | | **30/40** | **Good (75%)** |

## Design Specificity Verdict

**LLM assessment:** Có tác giả, không phải đồ category-interchangeable. Chất liệu rất riêng: sleeve đăng nhập với đĩa than cắt góc (sign-in-screen.tsx:44-113), wordmark "mob" coral, bề mặt phẳng không bóng, và đặc biệt là không tồn tại bất kỳ affordance phát nhạc nào - đúng lời hứa "sổ lưu, không phải trình phát". Điểm trừ: IA (header → filter → list/grid → FAB → bottom sheet) là khuôn collection-app quen thuộc; cá tính đến từ vật liệu và ràng buộc sản phẩm, không từ cấu trúc.

**Deterministic scan:** 11 findings, chỉ một rule `design-system-font-size`, tất cả advisory, exit code 0. Detector parse .tsx tốt nhưng rule set rất hẹp. Sau khi đối chiếu: toàn bộ 11 là false positive - 18px (drawer title) và 22px (empty state) nằm trong Headline 18–34px; 11px (artist tile) và 0.8rem nằm trong Label/Body 11–14.5px; 0.625rem thuộc questionnaire.tsx không được import ở đâu. Tín hiệu thật duy nhất: ramp trong frontmatter hẹp hơn prose (wordmark 17–20px không có token riêng), nên detector sẽ tiếp tục cảnh báo dù thiết kế đúng.

**Visual overlays:** Injection thành công; detect.js chạy trong trang và bật 1 banner thật: `radial-halo` trên `body` (quầng #ff6a4d). Đây là false positive theo DESIGN.md - quầng 12% ở .auth-stage là ngọn đèn coral có chủ đích (index.css:129-135). Overlay đã được gỡ khi reload lúc kết thúc; hiện không còn trên tab.

## Overall Impression

Hệ thị giác đã có tác giả rõ và kỷ luật hiếm thấy ở app cá nhân. Lỗ hổng không nằm ở thẩm mỹ mà ở vòng phản hồi sau hành động và khả năng định hướng cho screen reader. Cơ hội lớn nhất: biến mỗi lần lưu thành một nhịp kết - bìa "rơi" vào kệ và tự xác nhận - thay vì sheet biến mất trong im lặng.

## What's Working

1. State coverage hiếm thấy: skeleton khớp đúng list/grid (song-list.tsx:29-67), filter-empty có lối thoát, error card có retry, xoá có pending + lỗi tại chỗ.
2. Domain logic thấm vào UI: "Đã lưu" so cả sourceId lẫn key chuẩn hoá title+artist (song-search.tsx:106-134) - đúng GLOSSARY, không so chuỗi ngây thơ.
3. Copy tiếng Việt viết cho người Việt, lỗi map theo mã Firebase và giữ nguyên dữ liệu form khi submit thất bại.

## Priority Issues

**[P1] Lưu tay xong không có phản hồi - cả thị giác lẫn screen reader**
- Why: form đóng, bài mới nằm trên cùng nhưng có thể ngoài tầm nhìn; không toast, không highlight, không announce. Đây là đường duy nhất khi tìm kiếm trượt, mà nhập tay lại không dedupe → dễ lưu trùng.
- Fix: mount Toaster (sonner đã có trong dependency) trong provider.tsx; toast "Đã lưu bài"; cuộn lên đầu + highlight nhẹ bài mới 1,2s; thêm live-region cho lưu/xoá thành công.
- Suggested command: $impeccable polish

**[P1] Cấu trúc heading và vùng chạm chưa đạt cho bàn phím/screen reader**
- Why: khi thư viện có bài, h1 biến mất (chỉ empty state có h1); nút xoá bộ lọc 24px (filter-input.tsx:36) và item menu ~28px dưới mức 36px đã ghi trong DESIGN.md; toggle xem đọc view đích chứ không đọc trạng thái hiện tại.
- Fix: thêm h1 "Thư viện" (có thể sr-only); nâng hit area lên 36px mà giữ kích thước thị giác; toggle dùng aria-pressed + nhãn trạng thái.
- Suggested command: $impeccable harden

**[P2] Nhãn đếm bài đổi nghĩa khi lọc**
- Why: songCount là số kết quả lọc (app.tsx:41-42); gõ lọc là con số dưới wordmark tụt xuống như thể bài bị mất - tín hiệu duy nhất về quy mô thư viện bị nhiễu.
- Fix: khi có lọc hiển thị "12/87 bài" (hoặc "87 bài · 12 khớp"), thêm aria-live="polite".
- Suggested command: $impeccable clarify

**[P2] Xoá là vĩnh viễn, không Hoàn tác**
- Why: hộp thoại xác nhận tốt nhưng thư viện là tài sản tuyển chọn; một cú bấm sai là mất bài không cứu được.
- Fix: giữ snapshot bài vừa xoá + toast "Đã xoá · Hoàn tác" 5 giây, thêm lại kèm sourceId; nếu cần đồng bộ nhiều tab thì cân nhắc soft delete.
- Suggested command: $impeccable harden

**[P2] "Nhập tay" làm mất từ khoá tìm kiếm**
- Why: khi iTunes không có kết quả, người dùng bấm "Nhập tay" và nhận form trắng - phải nhớ và gõ lại đúng thứ vừa gõ, đúng lúc đang thất vọng nhất.
- Fix: truyền term hiện tại vào ManualForm, prefill "Tên bài", focus "Ca sĩ"; thêm preview ảnh bìa trước khi lưu.
- Suggested command: $impeccable polish

## Persona Red Flags

**Alex (Power User):** không shortcut focus filter hay mở "Thêm bài"; sửa một bài mất 4 thao tác (ellipsis → Sửa → sửa → Lưu), không inline rename, không bulk; trên desktop vẫn là bottom sheet 85dvh - cảm giác mobile bê lên máy tính. Sẽ sửa ba bài rồi bỏ.

**Jordan (First-Timer):** sau bài đầu tiên, affordance thêm duy nhất là nút "+" chỉ có icon (aria-label có, nhãn thấy được không); icon toggle cho biết view sẽ chuyển tới nên phải bấm mới hiểu; tab "iTunes" giả định kiến thức về catalog; "URL ảnh bìa" là thuật ngữ lạ; không có trợ giúp nào.

**Sam (Accessibility):** màn thư viện có bài không có h1; lưu/xoá thành công không được announce; nút xoá bộ lọc 24px; item Sửa/Xoá ~28px. Bù lại: focus ring toàn cục tốt (index.css:119-122) và hầu hết control có aria-label.

## Minor Observations

- document.title vẫn là "Musimob: danh sách bài hát" ở màn đăng nhập.
- Lỗi sync khi đã có bài: banner không có "Thử lại"; header đổi "Không tải được" dù dữ liệu cache vẫn hiện - hai tín hiệu mâu thuẫn.
- Empty state có hai CTA coral cùng chức năng (nút "Thêm bài đầu tiên" + FAB).
- One Ember Rule bị căng trên sign-in: đĩa + CTA + "mob" cùng coral - có chủ đích nhưng đang ở sát giới hạn.
- Sign-in xin tài khoản Google mà không có dòng trấn an "Chỉ bạn thấy thư viện này."
- Cover URL không có preview; ảnh hỏng chỉ lộ sau khi lưu (fallback im lặng).
- "Xoá khỏi danh sách" lệch thuật ngữ chuẩn "Thư viện" trong GLOSSARY.
- Wordmark 17–20px có trong prose nhưng không có token trong frontmatter - thêm token wordmark sẽ dập cảnh báo advisory lặp lại.

## Questions to Consider

- Nếu mỗi lần lưu là một bìa rơi vào kệ, tại sao phản hồi lại im lặng?
- Số bài là nhãn của kệ hay của bộ lọc?
- Xoá một bài yêu thích có nên là hành động một chiều?
- Nhập tay có nhất thiết phải bắt đầu từ trang trắng?
