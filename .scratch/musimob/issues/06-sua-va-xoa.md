# 06 — Sửa và xoá

Status: ready-for-agent
Blocked by: 03

## Mục tiêu

Sửa được lỗi gõ, thay ảnh hỏng, và bỏ bài không còn hát. Xoá phải hỏi lại.

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
