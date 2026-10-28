# Đồng bộ Firestore và đăng nhập

Type: grilling
Status: resolved
Blocked by: 04

## Question

Dữ liệu đồng bộ giữa các thiết bị thế nào, và ai được ghi?

Cần chốt:

- **Đăng nhập**: Google, email + mật khẩu, magic link, hay anonymous?
- **Ai được dùng app**: chỉ một mình bạn, hay mở cho người khác?
- **Schema Firestore**: `users/{uid}/songs/{songId}` hay cách khác?
- **Nguồn sự thật**: Firestore là chính, hay local-first rồi đẩy lên?
- **Offline**: bật offline persistence của Firestore, hay tự quản cache?
- **Zustand**: còn dùng cho UI state không, hay bỏ hẳn?
- **Xung đột**: hai thiết bị sửa cùng một bài thì lấy bản nào?
- **Rules**: chặn đọc/ghi chéo giữa các user.
- **Chi phí**: free tier của Firestore có đủ cho một người dùng không?

Ràng buộc:

- Stack đã chốt: React + TypeScript + Vite, TanStack Query, `vite-plugin-pwa`.
- Đồng bộ là yêu cầu của v1, không cắt được.
- Một người dùng chính, nhưng nhiều thiết bị.

Đích: đủ rõ để viết spec mà không phải đoán chỗ nào giữ dữ liệu.

## Answer

| Mục | Quyết định |
| --- | --- |
| Đăng nhập | Google, qua Firebase Auth |
| Ai được đăng ký | Bất kỳ ai có tài khoản Google |
| Nguồn sự thật | Firestore |
| Đồng bộ | `onSnapshot` + offline persistence |
| Zustand | Bỏ hoàn toàn |
| Xung đột | Last-write-wins |
| Rules | Chủ sở hữu đọc/ghi |

### Schema

```
users/{uid}/songs/{songId}
  title      string
  artist     string
  coverUrl   string
  createdAt  timestamp
  updatedAt  timestamp
```

`uid` lấy từ Firebase Auth. `songId` do Firestore sinh. Mỗi user một cây riêng, không có collection dùng chung.

### Rules

```
match /users/{userId}/songs/{songId} {
  allow read, write: if request.auth != null
                     && request.auth.uid == userId;
}
```

Không có nhánh đọc công khai. Người chưa đăng nhập không đọc được gì.

### Lý do

- **Google**: không form đăng ký, không quên mật khẩu, không gửi mail xác thực. Firebase Auth lo toàn bộ.
- **`onSnapshot` + offline persistence**: SDK tự lưu IndexedDB, tự xếp hàng write khi mất mạng, tự merge khi có mạng. Tự viết lại phần này là tự tạo bug mất dữ liệu.
- **Bỏ Zustand**: danh sách có một nguồn sự thật. Hai nguồn là nguồn gốc của lệch dữ liệu. State UI nhỏ dùng `useState`.
- **Last-write-wins**: một người, nhiều thiết bị. Sửa cùng một bài trong cùng vài giây gần như không xảy ra; xử lý theo field là code phức tạp cho tình huống không có thật.

### Cảnh báo đi kèm quyết định mở đăng ký

Đăng ký mở nghĩa là bất kỳ tài khoản Google nào cũng ghi được vào Firestore. Không có lớp chặn thì một script có thể đốt hết quota miễn phí.

- Bật **Firebase App Check** (reCAPTCHA Enterprise trên web) trước khi deploy công khai.
- Theo dõi hạn mức Spark: 50.000 lượt đọc/ngày, 20.000 lượt ghi/ngày, 1 GiB lưu trữ.
- App Check là việc của ticket [Deploy và hosting](05-deploy-va-hosting.md), không phải v1 feature.
