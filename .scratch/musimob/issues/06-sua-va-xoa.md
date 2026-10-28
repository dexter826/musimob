# 06 — Sửa và xoá

Status: done
Blocked by: 03

## Mục tiêu

Sửa được lỗi gõ, thay ảnh hỏng, và bỏ bài không còn dùng. Xoá phải hỏi lại.

## Việc

- `MusimobApi.songs`: thêm `update` và `remove`. `update` nhận patch gồm title, artist, coverUrl, ghi `updatedAt` bằng `serverTimestamp()`.
- `features/songs/components/SongActionsMenu.tsx`: nút `⋯`. Ở kiểu danh sách nằm cuối row; ở kiểu lưới nằm góc trên phải ảnh. Menu gồm `Sửa` và `Xoá`.
- `features/songs/components/EditSheet.tsx`: bottom sheet, form điền sẵn title, artist, coverUrl. Lưu xong đóng sheet, danh sách cập nhật ngay.
- `features/songs/components/DeleteConfirm.tsx`: hộp thoại xác nhận, nêu tên bài, hai nút `Huỷ` và `Xoá`. Chỉ gọi `remove` khi bấm `Xoá`.
- `⋯` và menu phải dùng được bằng bàn phím, có nhãn cho screen reader.
- Xoá hoặc sửa xong đóng menu. Không đóng sheet khi lưu lỗi, phải hiện thông báo.

## Xong khi

- Bấm `⋯` trên một row, menu hiện đúng vị trí, không che nút khác.
- Ở kiểu lưới, `⋯` nằm trên ảnh và bấm được.
- Sửa tên bài, danh sách đổi ngay; reload vẫn đúng.
- Sửa ảnh bìa, ảnh mới hiện trong cả row và lưới.
- Bấm `Xoá`, hộp thoại hiện; bấm `Huỷ` thì bài còn; bấm `Xoá` thì bài mất.
- Reload sau khi xoá, bài vẫn mất.
- Xoá bài cuối cùng thì trạng thái rỗng hiện lại.

Không viết test.

## Comments

- 2026-10-29: Đã implement `songsApi.update`/`remove` (patch trim, `updatedAt` bằng `serverTimestamp()`), type `SongPatch`, hook `updateSong`/`removeSong` với thông báo lỗi tiếng Việt. Tách form dùng chung `src/components/song-form.tsx`; `ManualForm` giờ chỉ còn wrapper nên luồng nhập tay không đổi. Thêm `SongActionsMenu` (cuối row / góc trên phải ảnh lưới), `EditSheet` điền sẵn dữ liệu, `DeleteConfirm` nêu tên bài và chặn đóng khi đang xoá; lỗi lưu hiện trong sheet, lỗi xoá hiện trong hộp thoại. Menu dùng Radix nên hỗ trợ bàn phím; nút `⋯` có `aria-label` theo tên bài. `tsc`, `lint`, `build`, `sloplint` sạch; Impeccable detector quét file không báo lỗi (rule cần DOM chỉ chạy được trên trang đã đăng nhập). Chờ test tay trước khi commit/deploy.
- 2026-10-29: Test tay pass, chuyển `done`.
