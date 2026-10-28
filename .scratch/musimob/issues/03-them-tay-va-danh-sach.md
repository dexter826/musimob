# 03 — Thêm tay và danh sách Firestore

Status: ready-for-agent
Blocked by: 02

## Mục tiêu

Bài đầu tiên được lưu thật vào Firestore, hiện trong danh sách, và đồng bộ sang thiết bị khác. Đây là ticket biến app shell thành app có dữ liệu.

## Việc

- `MusimobApi.songs`: thêm namespace với `subscribe` và `add`. `update` và `remove` để ticket 06.
- Firestore: `users/{uid}/songs/{songId}`. Khởi tạo bằng `initializeFirestore` với `persistentLocalCache`.
- `subscribe`: `onSnapshot` trên collection, `orderBy('createdAt', 'desc')`. Bài mới lên đầu.
- `add`: `addDoc`, `createdAt` và `updatedAt` bằng `serverTimestamp()`.
- Rules: chỉ `request.auth.uid == uid` được đọc và ghi. Không nhánh công khai. Deploy rules trong workflow.
- `features/songs/hooks/useSongs.ts`: nhận uid, subscribe, trả danh sách.
- `features/songs/components/SongRow.tsx`: ảnh 50px, tên 14.5px đậm, ca sĩ 12.5px muted. Ảnh thiếu hoặc lỗi thì hiện ô placeholder, không vỡ layout.
- `features/songs/components/SongList.tsx` và `EmptyState.tsx`: trạng thái rỗng `Chưa có bài nào`, một câu giải thích, nút `Thêm bài đầu tiên`.
- Header: đếm số bài thật.
- `features/add-song/components/AddSheet.tsx`: bottom sheet trượt từ dưới, handle, tiêu đề `Thêm bài`. Ticket này chỉ có form nhập tay, chưa có tab iTunes.
- `features/add-song/components/ManualForm.tsx`: tên bài (bắt buộc), ca sĩ (bắt buộc), URL ảnh bìa (không bắt buộc). Lưu xong đóng sheet và reset form.
- Nút `+` nổi mở sheet.

## Xong khi

- Thêm một bài bằng tay, bài hiện ngay đầu danh sách.
- Reload trang, bài vẫn còn.
- Mở cửa sổ riêng cùng tài khoản Google, thấy cùng bài.
- Đăng nhập tài khoản Google khác, không thấy bài đó.
- Rules Playground trong Firebase Console từ chối đọc `users/{uid khác}/songs`.
- Bài không có ảnh bìa hiện placeholder gọn gàng.

Không viết test.
