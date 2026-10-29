---
target: src/features/songs
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
p2_count: 4
target_identity: "file:C:\\MyProject\\musimob\\src\\features\\songs"
timestamp: 2026-10-29T03-51-20Z
slug: src-features-songs
---
Method: dual-agent (A: critique-a2 · B: critique-b2)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Manual add có toast + flash; add từ iTunes chỉ đổi badge; edit không có xác nhận; count mất mẫu số khi lọc |
| 2 | Match System / Real World | 3 | Copy tự nhiên; "iTunes" là tên nguồn thay vì "Nguồn nhạc"; dialog xoá nói sai sự thật |
| 3 | User Control and Freedom | 3 | Có undo xoá, clear filter, đóng drawer; không undo sửa; tab Nhập tay reset khi đóng |
| 4 | Consistency and Standards | 2 | Hai đường thêm phản hồi khác nhau; flash list/grid khác nhau; dialog "không thể hoàn tác" mâu thuẫn nút "Hoàn tác" |
| 5 | Error Prevention | 3 | Confirm, validate URL, chặn trùng từ search; nhập tay vẫn tạo được bài trùng |
| 6 | Recognition Rather Than Recall | 3 | Prefill chỉ ở ngõ cụt; Sửa/Xoá sau menu ellipsis; count không cho biết đang lọc |
| 7 | Flexibility and Efficiency | 2 | Không shortcut mở add, không bulk, không arrow-key |
| 8 | Aesthetic and Minimalist Design | 4 | Kệ phẳng, cover dẫn màu, coral hiếm |
| 9 | Error Recovery | 3 | Lỗi nêu việc cần làm, giữ form, có retry; restore fail sau 5 giây chỉ còn toast tạm |
| 10 | Help and Documentation | 1 | Chỉ microcopy inline; không giải thích iTunes vs nhập tay |
| **Total** | | **27/40** | **Acceptable (67.5%), sát ngưỡng Good** |

## Design Specificity Verdict

**LLM assessment:** Vẫn có tác giả rõ - "Night Sleeve" hiện ở sleeve đăng nhập, hàng phẳng 50px, cover dẫn màu, chỉ FAB nổi. Chỗ kém đặc trưng nhất là nội thất add sheet: bottom sheet + segmented tabs + danh sách kết quả có nút "Lưu" là pattern của bất kỳ app lưu nhạc nào. Trong bốn trạng thái mới, prefill là thứ được nghĩ cho sản phẩm nhất; toast và highlight được khoác đúng token; undo là chỗ nguy hiểm nhất vì lời hứa không khớp hành vi.

**Deterministic scan:** 11 findings, một rule `design-system-font-size`, tất cả advisory, exit 0. Toàn bộ là false positive theo nghĩa thị giác: 18px/22px nằm trong Headline 18–34px, 11px trong Label 11–12.5px; detector chỉ so với 5 token frontmatter nên bỏ qua dải trong prose. Tín hiệu thật duy nhất: vài primitive chưa dùng (questionnaire, calendar, button/toggle size sm) có cỡ chữ lệch thang, và wordmark 17–20px chưa có token riêng. Sonner theming mới không được detector nhìn thấy - quét sonner.tsx và index.css đều trả rỗng.

**Visual overlays:** Injection thành công, banner vàng `radial-halo` hiện thật trên tab. Đây là false positive: quầng coral 12% ở .auth-stage là quyết định có chủ đích trong DESIGN.md. Overlay còn trong tab (đã --keep-inject); có thể đóng bằng nút X.

## Overall Impression

Lượt polish trước đã sửa đúng chỗ im lặng, nhưng tạo ra một mâu thuẫn niềm tin: dialog xoá nói "Không thể hoàn tác" trong khi toast mời "Hoàn tác". Điểm tụt từ 30 xuống 27 không phải vì giao diện xấu đi mà vì hệ thống mới chưa nhất quán với chính nó. Việc cần làm không phải thêm tính năng, mà là chọn một câu chuyện xoá duy nhất và làm cho nó đúng ở mọi điểm chạm.

## What's Working

1. Feedback gắn với vật thể: toast nêu đúng tên bài, flash đánh dấu đúng hàng, action "Hoàn tác" thay vì "Thành công" chung chung.
2. Toast được thuần hoá vào hệ: không bóng, bo 12px, action coral 36px, offset mobile 88px né FAB - không lộ Sonner mặc định.
3. Prefill tôn trọng dữ liệu kế tiếp: điền sẵn tên bài và chuyển focus sang "Ca sĩ", đúng field còn thiếu.

## Priority Issues

**[P1] Dialog xoá nói dối về undo**
- Why: delete-confirm.tsx:74 viết "Không thể hoàn tác", trong khi app.tsx:73-82 mời "Hoàn tác" 5 giây. Đây là khoảnh khắc rủi ro cao nhất; người tin dialog sẽ không tìm toast, và học rằng app nói sai.
- Fix: đổi thành "Có thể hoàn tác trong 5 giây." - hoặc bỏ dialog và để undo làm lớp bảo vệ duy nhất. Đừng giữ cả hai với một câu sai.
- Suggested command: $impeccable clarify

**[P2] Undo không phải undo thật**
- Why: restore gọi lại addSong, mà addSong ghi createdAt: serverTimestamp() (songs.ts:60-61), nên bài quay về với id mới và nhảy lên đầu danh sách; vị trí cũ mất. Nếu restore fail sau 5 giây, lỗi chỉ là toast tạm - bài đã mất thật.
- Fix: giữ bài ở trạng thái "đang xoá" và chỉ gọi remove khi toast hết hạn; hoặc lưu/khôi phục createdAt. Lỗi restore phải là banner tại chỗ, không phải toast 4 giây.
- Suggested command: $impeccable harden

**[P2] Đường thêm mặc định im lặng**
- Why: chỉ handleManualAdd có toast + flash; SongSearch nhận addSong trần (app.tsx:152-159). iTunes là tab mặc định nên đường chính chỉ nhận badge, đường dự phòng lại được ăn mừng. Flash cũng lệch: list viền quanh cover, grid outline cả tile.
- Fix: một handler chung cho cả hai đường; cho list flash cả hàng; nếu search là batch thì thay bằng toast tổng kết khi đóng drawer ("Đã thêm 3 bài").
- Suggested command: $impeccable polish

**[P2] Undo và new-row cue không accessible**
- Why: undo là timed action 5 giây không gia hạn; flash chỉ là màu, không có live-region; lưu từ search thay nút "Lưu" đang focus bằng badge, focus rơi về body (search-result-row.tsx:32-51). Người dùng keyboard/screen reader có thể mất cơ hội hoàn tác và không tìm thấy bài mới.
- Fix: 8–10 giây hoặc chỉ đóng khi dismiss; giữ một control focusable ở trạng thái "Đã lưu" hoặc chuyển focus sang kết quả kế; thêm aria-live "Đã thêm [tên] vào thư viện".
- Suggested command: $impeccable harden

**[P2] Prefill chỉ với tới được từ ngõ cụt**
- Why: chỉ NoResults truyền term (song-search.tsx:207); bấm thẳng tab "Nhập tay" thì từ khoá bị bỏ. Nếu search trả kết quả dở và người dùng quyết định tự nhập, họ vẫn phải gõ lại.
- Fix: truyền term hiện tại khi chọn tab Nhập tay, hoặc thêm "Nhập tay với từ khoá này" ngay trên danh sách kết quả.
- Suggested command: $impeccable polish

## Persona Red Flags

**Jordan (first-timer, người quen mở hàng tháng):** sign-in chỉ có wordmark + "Đăng nhập", không nói đây là sổ lưu riêng tư; "iTunes" và "Nhập tay" không được giải thích; dialog xoá doạ không thể hoàn tác rồi lại mời hoàn tác nên không tin cả hai; lưu từ search chỉ đổi badge, không chắc bài đã vào thư viện hay chỉ vào hàng đợi. Không có help.

**Alex (power user, chủ thư viện):** không shortcut mở add, không bulk, không arrow-key; sửa bài phải qua ellipsis rồi "Sửa"; thêm tay đóng drawer còn thêm từ search thì không - hai muscle memory. Xoá 4 bài nhanh vượt giới hạn 3 toast của Sonner, undo cũ nhất biến mất im lặng.

**Sam (keyboard/screen reader):** thư viện không có h1 (chỉ empty state có); flash không được announce; focus rơi về body khi nút "Lưu" biến mất; undo 5 giây không đủ để điều hướng tới. Toast action có contrast tốt, nhưng cửa sổ thời gian mới là rào cản.

## Minor Observations

- Title tab luôn là "Musimob: danh sách bài hát" kể cả ở sign-in.
- Empty state có hai CTA coral cho cùng một việc: "Thêm bài đầu tiên" và FAB.
- Add sheet reset về tab iTunes mỗi lần đóng; view mode thì được nhớ.
- sonner.tsx dùng useTheme của next-themes nhưng không có ThemeProvider; chỉ chạy được vì theme="dark" được truyền đè.
- Manual add không chặn trùng; undo có thể tạo bản trùng nếu bài được thêm lại trong 5 giây.
- Ring "bài mới" trùng ngôn ngữ với :focus-visible coral, dễ bị đọc là focus/selection.
- Timer flash bắt đầu trước khi snapshot trả hàng; mạng chậm có thể làm highlight hết hạn trước khi hàng xuất hiện.
- Sign-in dồn ba điểm coral (đĩa, CTA, "mob") - ngoại lệ có chủ đích nhưng tổng diện tích coral đã vượt tinh thần ≤10%.

## Questions to Consider

1. Nếu xoá hoàn tác được, tại sao giao diện lại nói không? Câu nào là sự thật của sản phẩm?
2. Nếu "Hoàn tác" là một dải ở kệ - "Đã xoá 1 bài · Hoàn tác" - tồn tại đến hành động tiếp theo thay vì toast 5 giây, cảm giác mất mát có còn không?
3. Tại sao đường thêm mặc định (iTunes) im lặng còn đường dự phòng (nhập tay) lại được ăn mừng?
4. Với thư viện 300 bài, một viền coral 2 giây quanh cover 50px có đủ trả lời "bài vừa rồi đi đâu" không?
