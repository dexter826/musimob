---
target: src/features/songs
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
p2_count: 2
target_identity: "file:C:\\MyProject\\musimob\\src\\features\\songs"
timestamp: 2026-10-29T05-35-43Z
slug: src-features-songs
---
Method: dual-agent (A: critique-a3 · B: critique-b3)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Count đổi thành số đã lọc, mất tổng; undo 10s không đếm ngược |
| 2 | Match System / Real World | 3 | "URL ảnh bìa" là ngôn ngữ kỹ thuật; "iTunes" là brand, không phải khái niệm nguồn nhạc |
| 3 | User Control and Freedom | 3 | Undo/cancel/clear tốt; đóng drawer Sửa làm mất thay đổi im lặng |
| 4 | Consistency and Standards | 3 | "Lưu" ở search để sheet mở + badge; ở nhập tay đóng sheet + toast - cùng nhãn, khác kết cục |
| 5 | Error Prevention | 2 | Không chặn hai bài nhập tay trùng identity; chỉ chặn trùng khi lưu từ iTunes |
| 6 | Recognition Rather Than Recall | 3 | Menu rõ, badge "Đã lưu" tốt; filter empty không gợi ý đường sang nguồn nhạc |
| 7 | Flexibility and Efficiency | 2 | Không shortcut, không bulk, không autofocus ô tìm |
| 8 | Aesthetic and Minimalist Design | 4 | Hệ hình ảnh nhất quán, đúng "Night Sleeve" |
| 9 | Error Recovery | 3 | Retry khắp nơi; undo lỗi vẫn tự hết hạn 10s; rate-limit không backoff |
| 10 | Help and Documentation | 3 | App tự giải thích; riêng cover URL thiếu ví dụ/định dạng |
| **Total** | | **29/40** | **Good (72.5%)** |

## Design Specificity Verdict

**LLM assessment:** Authored, không category-interchangeable - nhưng bản sắc nằm ở vỏ, không ở luồng. Shell là Musimob không thể nhầm: than ba tầng, đúng một coral, bìa dẫn màu, không affordance phát nhạc nào; sign-in sleeve + đĩa than là signature thật. Nhưng add/edit/delete là CRUD trung tính: bottom sheet hai tab, form ba field, alert dialog - sản phẩm khác dùng nguyên xi được. Riêng field URL ảnh bìa phản lại chính ý "Artwork Leads".

**Deterministic scan:** 11 findings, một rule design-system-font-size, tất cả advisory, exit 0. 10/11 là false positive: 18px/22px thuộc Headline 18–34px, 11px thuộc Label 11–12.5px, 0.8rem = 12.8px thuộc Small-Type, wordmark 17–20px có trong prose; detector chỉ so với token frontmatter. Tín hiệu thật duy nhất: questionnaire.tsx dùng 10px, dưới sàn 11px - nhưng primitive này không được import ở đâu. CSS/sonner theming nằm ngoài phạm vi detector.

**Visual overlays:** Injection thành công nhưng browser surface bị ẩn (visibilityState=hidden); overlay tồn tại trong DOM, không xác nhận được là user-visible. Finding duy nhất radial-halo là false positive theo DESIGN.md (quầng coral 12% ở .auth-stage). B đã reload để dọn overlay.

## Overall Impression

Câu chuyện xoá đã được sửa đúng: dialog không còn nói dối, undo khôi phục đúng id + createdAt, và có trạng thái "Đang khôi phục…". Điểm lên lại 29/40 - Good. Cơ hội lớn nhất giờ không nằm ở xoá mà ở vòng lặp tìm → thêm: ô lọc là thứ người dùng chạm đầu tiên, nhưng khi không khớp nó chỉ mời xoá bộ lọc, không có đường sang nguồn nhạc. Lỗ hổng thứ hai là nhập tay: bìa là màu chủ đạo của sản phẩm mà form chỉ cho dán URL thô, và hai bài "cùng một bài" vẫn được tạo trái GLOSSARY.

## What's Working

1. Skeleton khớp hình học cuối - hàng 50px, không layout shift; count "Đang tải…" rõ.
2. Tìm → nhập tay liền mạch - "Không tìm thấy" điền sẵn từ khoá và focus "Ca sĩ"; đây là chi tiết được thiết kế, không phải mặc định.
3. Copy lỗi cụ thể, tiếng Việt tự nhiên - phân biệt mất mạng, quá tải, quyền; badge "Đã lưu" đúng vai trò nhận diện.

## Priority Issues

**[P1] Filter là dead end**
- Why: người dùng gõ tên bài chưa có vào ô nổi bật nhất, nhận "Không có bài nào khớp" + "Xoá bộ lọc" (song-list.tsx:99-118) - không có đường sang iTunes/nhập tay, dù đó chính là ý định.
- Fix: thêm action phụ "Tìm trên iTunes" trong FilterEmptyState, truyền filterQuery vào AddSheet và mở tab iTunes với term đã seed.
- Suggested command: $impeccable polish

**[P1] Nhập tay không có đường lành mạnh để có bìa**
- Why: chỉ có URL thô, không preview, ảnh hỏng fallback im lặng (song-form.tsx:180-216). Bìa là màu chủ đạo của sản phẩm; field này biến việc "thêm bài" thành việc của dev.
- Fix: preview vuông 56px cạnh field, helper "Dán liên kết ảnh bắt đầu bằng https://", báo lỗi tải ảnh ngay trong form.
- Suggested command: $impeccable harden

**[P1] Hai bài "cùng một bài" vẫn được tạo**
- Why: getSongKey chỉ dùng khi lưu từ iTunes (song-search.tsx:116-134); handleManualAdd ghi thẳng, không so key - trái định nghĩa identity ở GLOSSARY.
- Fix: trước khi lưu, so key với songs; hiện inline "Bài này đã có trong thư viện" kèm "Vẫn thêm".
- Suggested command: $impeccable harden

**[P2] Lời hứa undo lớn hơn thực tế**
- Why: dialog nói "hoàn tác ngay sau đó" nhưng cửa sổ chỉ 10 giây; nếu khôi phục lỗi, toast retry cũng hết hạn sau 10 giây và bài mất vĩnh viễn, không có thùng rác (app.tsx:65-95).
- Fix: 30 giây kèm countdown trong toast; toast lỗi giữ tới khi đóng và nêu rõ bài đã bị xoá hẳn.
- Suggested command: $impeccable clarify

**[P2] Accessibility của các hành động nhỏ**
- Why: nút Lưu 32px, tab 32px, nút xoá filter 24px dưới chuẩn 36px của DESIGN; sau khi lưu, nút biến mất nhường badge, focus rơi khỏi DOM và không có live announcement (search-result-row.tsx:32-52); flash xác nhận chỉ bằng màu; artist text-white/60 trên bìa tuỳ ý có thể dưới 4.5:1.
- Fix: nâng target 36–44px, wrap trạng thái lưu trong aria-live, thêm chữ vào xác nhận flash.
- Suggested command: $impeccable harden

## Persona Red Flags

**Jordan (first-timer):** "URL ảnh bìa" không được giải thích, không preview nên chỉ biết đúng/sai sau khi lưu; "iTunes" vs "Nhập tay" đòi kiến thức về nguồn nhạc; view toggle chỉ có icon.

**Alex (power user):** mở app không có shortcut/`/` để focus tìm; filter không khởi được tìm catalog; không bulk delete; xoá một bài phải qua dialog rồi canh toast 10 giây - hai lớp an toàn cho hành động đã hoàn tác được.

**Sam (accessibility):** target 32px và 24px; xác nhận bằng màu; undo giới hạn thời gian không gia hạn (WCAG 2.2.1); lưu từ search mất focus và không được thông báo; artist trắng 60% trên bìa sáng có thể không đủ tương phản.

## Minor Observations

- Count khi lọc hiển thị "N bài" như thể là tổng; nên "3/57 bài".
- Filter vẫn hiện khi thư viện rỗng; gõ vào không có kết quả và không phản hồi.
- Hai CTA thêm bài trên màn rỗng (card + FAB) làm nhạt hierarchy.
- Lưu từ iTunes không có toast/undo; lưu nhập tay có cả hai - cùng hành động, khác phần thưởng.
- Banner lỗi lưu search nằm trên cùng vùng cuộn; hàng vừa bấm có thể đã ra khỏi màn hình.
- Flash 2 giây có thể lỡ nếu snapshot Firestore về chậm hơn.
- "Hoàn tác" và "khôi phục" dùng cho cùng một hành động.
- Ở 534×554, sign-in tạo document cao 568px (tràn 14px).
- "iTunes" xuất hiện trong UI dù glossary khuyên tránh tên riêng làm khái niệm - đánh đổi lấy độ rõ, chấp nhận được.

## Questions to Consider

1. Nếu đây là "sổ lưu", tại sao không có dấu vết thời gian hay nguồn gốc của từng bài, dù createdAt và sourceId đã có?
2. Xoá đang được bảo vệ hai lần. Nếu undo mới là lưới an toàn thật, tại sao nó hết hạn trước khi người dùng đọc xong dialog?
3. Filter và ô tìm iTunes đều bắt đầu bằng một truy vấn chữ. Có nên gộp thành một ô "tìm hoặc thêm" thay vì hai chế độ?
4. Field cover URL được thiết kế cho ai - người dùng thật hay workflow của chính bạn?
