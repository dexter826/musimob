# Lưu trữ dữ liệu

Type: grilling
Status: resolved
Blocked by: 01

## Question

Dữ liệu bài hát nằm ở đâu, và sống sót qua những gì?

Cần chốt:

- **Cơ chế**: `localStorage`, IndexedDB, hay Firestore?
- **Mất dữ liệu**: chấp nhận mất khi xoá cache trình duyệt, hay cần backup?
- **Xuất/nhập**: có cần file JSON để sao lưu và chuyển máy không?
- **Đồng bộ nhiều thiết bị**: có nằm trong v1 không, hay để sau?
- **Giới hạn dung lượng**: ảnh bìa lưu URL hay lưu blob? Nếu URL thì không tốn dung lượng.

Ràng buộc: v1 cần chốt giữa lưu cục bộ và đồng bộ nhiều thiết bị. Firestore kéo theo Firebase, cần mạng, cần cấu hình — chỉ đáng nếu đồng bộ là mục tiêu thật.

## Answer

| Mục | Quyết định |
| --- | --- |
| Nguồn sự thật | **Firestore** |
| Đồng bộ nhiều thiết bị | **Có, trong v1** |
| Xuất/nhập JSON | Không làm |
| Ảnh bìa | Lưu URL, Workbox cache `is1-ssl.mzstatic.com` ở runtime |

Lý do:

- **Đồng bộ là yêu cầu, không phải tính năng phụ.** Một danh sách chỉ sống trong cache trình duyệt là danh sách sẽ mất. Danh sách phải giống nhau trên điện thoại và laptop.
- **Không làm JSON backup.** Firestore đã là bản lưu nằm ngoài máy. Thêm xuất/nhập chỉ là đường thứ hai để làm cùng một việc.
- **Ảnh lưu URL.** Blob trong `localStorage` đốt 5MB rất nhanh. Workbox cache ảnh ở runtime, vẫn xem được offline.

Hệ quả — cần ticket riêng:

- Phải có đăng nhập. Firestore không cho ghi nếu không xác thực.
- Phải có Firestore rules để mỗi người chỉ đọc/ghi dữ liệu của mình.
- `persist` của Zustand không còn giữ danh sách bài. Vai trò mới của nó phải chốt lại.
- Deploy phải tính tới Firebase, không còn là hosting tĩnh thuần.

Ticket [Đồng bộ Firestore và đăng nhập](06-dong-bo-firestore-va-dang-nhap.md) giải phần này.
