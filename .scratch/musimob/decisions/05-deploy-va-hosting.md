# Deploy và hosting

Type: grilling
Status: resolved
Blocked by: 04, 06

## Question

Đưa app lên đâu, và tốn gì?

Cần chốt:

- **Nơi deploy**: Firebase Hosting, Vercel, Netlify, GitHub Pages, hay chạy local?
- **Chi phí**: chỉ dùng gói free, hay chấp nhận trả tiền?
- **Tên miền**: dùng domain mặc định của nền tảng, hay mua riêng?
- **Cài đặt PWA**: có cần manifest + service worker ngay từ v1 không?
- **Dữ liệu**: nếu lưu trữ cần backend thì deploy phải đi kèm backend đó.

Ràng buộc: một người dùng. Hosting tĩnh là đủ cho mọi lựa chọn ở ticket lưu trữ trừ Firestore.

Chờ ticket 01 và 04 xong vì nơi deploy phụ thuộc nền tảng và cách lưu dữ liệu.

## Answer

| Mục | Quyết định |
| --- | --- |
| Nơi deploy | Firebase Hosting |
| Tên miền | `musimob.web.app` |
| App Check | Bật từ lần deploy đầu, reCAPTCHA Enterprise |
| Cách deploy | GitHub Actions, tự chạy khi push `main` |
| Preview channel | Không dùng ở v1 |
| Chi phí | Gói Spark (miễn phí) |

### Vì sao Firebase Hosting

Auth, Firestore, rules và App Check đều ở Firebase. Một console, một chỗ xem log, một lệnh deploy. Vercel và Netlify chạy được nhưng phải nhảy giữa hai dashboard, và rules vẫn phải deploy qua Firebase CLI.

### PWA

`vite-plugin-pwa` với:

- `manifest.name`: `Musimob`
- `manifest.short_name`: `Musimob`
- Icon 192×192 và 512×512
- `theme_color`
- `display: 'standalone'`
- `registerType: 'autoUpdate'`

Thiếu mấy mục này thì không cài lên màn hình chính được, và mất mạng là trắng trang.

### GitHub Actions

Workflow chạy khi push `main`:

1. `npm ci`
2. `npm run build`
3. `FirebaseExtended/action-hosting-deploy` với `FIREBASE_SERVICE_ACCOUNT_<PROJECT_ID>` lưu trong GitHub Secrets
4. `firebase deploy --only firestore:rules` cùng lượt, để rules không lệch với code

### App Check

- Provider: reCAPTCHA Enterprise, 10.000 lượt/tháng miễn phí.
- Localhost dùng debug token qua biến môi trường, không chặn dev.
- Bật ngay từ deploy đầu vì dễ quên về sau, và vì mở đăng ký nghĩa là ai cũng tạo được dữ liệu.

### Chưa làm ở v1

- Preview channel cho bản thử. Thêm sau bằng một job phụ, không đụng cấu trúc.
- Tên miền riêng. Đổi sau chỉ là bản ghi DNS.
