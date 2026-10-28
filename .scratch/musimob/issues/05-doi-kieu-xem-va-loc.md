# 05 — Đổi kiểu xem và lọc

Status: done
Blocked by: 03

## Mục tiêu

Hai cách nhìn cùng một danh sách: dòng dày để quét nhanh, lưới ảnh để nhận ra bài. Lọc ngay trên máy, không gọi mạng.

## Việc

- `features/songs/components/ViewToggle.tsx`: nút `▦` / `☰` cạnh avatar. `▦` hiện khi đang ở danh sách, `☰` hiện khi đang ở lưới.
- `features/songs/hooks/useViewMode.ts`: `list` mặc định, `grid` là kiểu phụ. Lưu ở `localStorage` key `musimob:view-mode`, đọc lúc khởi tạo, không đưa vào Firestore.
- `features/songs/components/SongGrid.tsx`: hai cột, ảnh vuông 1:1, gradient đen dưới đáy, tên 12.5px và ca sĩ 11px chồng trên ảnh. Ảnh thiếu dùng placeholder.
- `features/songs/components/FilterInput.tsx`: ô full-width dưới header, lọc client trên danh sách đã tải, so khớp title hoặc artist, lowercase, trim.
- Bộ lọc áp cho cả hai kiểu xem. Số bài trên header phản ánh danh sách sau lọc.
- Xoá hết query thì trả lại đủ danh sách.
- Không đổi dữ liệu Firestore khi đổi kiểu xem hoặc lọc.

## Xong khi

- Bấm nút đổi kiểu, danh sách chuyển giữa row và lưới ảnh.
- Reload trang, kiểu xem vừa chọn vẫn giữ.
- Gõ tên bài, chỉ còn bài khớp; gõ tên ca sĩ, chỉ còn bài của ca sĩ đó.
- Số bài trên header khớp số bài đang hiện.
- Xoá query, đủ bài trở lại.
- Đổi kiểu xem khi đang lọc, bộ lọc vẫn giữ nguyên.

Không viết test.

## Comments

- 2026-10-29: Đã implement `useViewMode` (localStorage `musimob:view-mode`, mặc định `list`), `ViewToggle` cạnh avatar, `SongGrid` responsive (2 cột mobile, 3/4/5 cột desktop), `FilterInput` lọc client theo title hoặc artist, số bài trên header theo danh sách đã lọc, trạng thái không khớp kèm nút `Xoá bộ lọc`, skeleton đổi theo kiểu xem. Không ghi Firestore. `tsc`, `lint`, `build`, `sloplint` sạch; Impeccable detector quét file không báo lỗi (rule cần DOM chỉ chạy được trên trang đã đăng nhập). Chờ test tay trước khi commit/deploy.
- 2026-10-29: Test tay pass, chuyển `done`.
