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
- **Cài đặt PWA**: có cần manifest + service worker ngay từ đầu không?
- **Dữ liệu**: nếu lưu trữ cần backend thì deploy phải đi kèm backend đó.

Ràng buộc: chỉ dùng hosting tĩnh nếu không cần Firestore.

## Answer

| Mục | Quyết định |
| --- | --- |
| Nơi deploy | Firebase Hosting |
| Tên miền | `musi-mob.web.app` |
| Cách deploy | GitHub Actions, tự chạy khi push `main` |
| Preview channel | Không dùng |
| Chi phí | Gói Spark (miễn phí) |

### Vì sao Firebase Hosting

Auth, Firestore và rules đều ở Firebase. Một console, một chỗ xem log, một lệnh deploy. Vercel và Netlify chạy được nhưng phải nhảy giữa hai dashboard, và rules vẫn phải deploy qua Firebase CLI.

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
3. `google-github-actions/auth@v2` với `credentials_json` lấy từ GitHub Secret `FIREBASE_SERVICE_ACCOUNT_MUSI_MOB`
4. `firebase deploy --project musi-mob --only hosting,firestore:rules`, để rules không lệch với code

### App Check

Đã cân nhắc bật reCAPTCHA Enterprise từ deploy đầu, sau đó bỏ. Rules chỉ chủ sở hữu vẫn giữ nguyên; rủi ro script đốt quota được chấp nhận, theo dõi qua hạn mức Spark.

### Chưa làm

- Preview channel cho bản thử. Thêm sau bằng một job phụ, không đụng cấu trúc.
- Tên miền riêng. Đổi sau chỉ là bản ghi DNS.
