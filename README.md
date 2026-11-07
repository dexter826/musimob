<div align="center">
  <img src="public/icon.svg" width="96" height="96" alt="Logo MusiMOB" />

# MusiMOB

_Sổ lưu bài hát cá nhân, phục vụ tra cứu và nghe thử nhanh._

[![Deploy](https://github.com/dexter826/musimob/actions/workflows/deploy.yml/badge.svg)](https://github.com/dexter826/musimob/actions/workflows/deploy.yml)
[![Trang chủ](https://img.shields.io/badge/Trang_chủ-musi--mob.web.app-ff6a4d?style=flat-square)](https://musi-mob.web.app/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v13-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)

[Tổng quan](#tổng-quan) • [Tính năng chính](#tính-năng-chính) • [Công nghệ sử dụng](#công-nghệ-sử-dụng) • [Bắt đầu nhanh](#bắt-đầu-nhanh) • [Cấu hình](#cấu-hình) • [Lệnh phát triển](#lệnh-phát-triển) • [Cấu trúc dự án](#cấu-trúc-dự-án) • [Triển khai & Bảo mật](#triển-khai--bảo-mật)

</div>

---

## Tổng quan

**MusiMOB** là ứng dụng web đóng vai trò như một **sổ lưu trữ và đánh dấu bài hát riêng tư** cho từng người dùng cá nhân. Không hướng tới việc trở thành một mạng xã hội âm nhạc hay trình phát nhạc trực tuyến cồng kềnh, MusiMOB tập trung giải quyết nhu cầu cốt lõi: lưu lại những giai điệu bạn yêu thích hoặc bắt gặp, tra cứu nhanh thông tin và nghe thử đoạn âm thanh 30 giây mọi lúc, mọi nơi.

### Triết lý thiết kế

- **Cảm hứng biên tập & trang sách**: Ngôn ngữ hình ảnh mang hơi hướng ấn phẩm in ấn với chất giấy (`paper`), mực đậm (`ink`) và điểm nhấn dấu sách màu san hô (`coral`).
- **Gọn gàng & Không xao nhãng**: Không thuật toán gợi ý, không danh sách phát phức tạp, không quảng cáo. Dữ liệu hoàn toàn thuộc quyền sở hữu riêng của bạn.
- **Tốc độ & Thời gian thực**: Đồng bộ tức thì đa thiết bị qua Cloud Firestore, giao diện phản hồi nhanh (optimistic updates).

---

## Tính năng chính

- **Thư viện bài hát cá nhân (Library)**:
  - Lưu trữ bản ghi thông tin bài hát bao gồm tiêu đề, nghệ sĩ, ảnh bìa và liên kết nghe thử.
  - Hỗ trợ hai chế độ hiển thị linh hoạt: **Lưới (Grid)** và **Danh sách (Row)**.
  - Lọc và tìm kiếm tức thì theo tiêu đề bài hát hoặc tên nghệ sĩ ngay trong Thư viện.
- **Đang nghe thử (Active Preview)**:
  - Tích hợp trình phát đoạn nghe thử mẫu ngắn (~30 giây) đi kèm theo từng bài hát.
  - Toàn ứng dụng duy trì duy nhất một luồng âm thanh nghe thử tại một thời điểm: kích hoạt nghe thử bài mới sẽ tự động dừng bài cũ và giải phóng tài nguyên.
- **Tra cứu bản nhạc kho ngoài (Catalog Search)**:
  - Tìm kiếm bài hát trực tiếp qua iTunes Search API (tối ưu thị trường Việt Nam, tự động lấy ảnh bìa độ phân giải cao `600×600`).
  - Đánh dấu huy hiệu bài hát đã có trong Thư viện để tránh lưu trùng lặp.
  - Cho phép nhập bài hát thủ công khi cần.
- **Phân loại theo Album**:
  - Tự do tạo album để gom nhóm bài hát và tra cứu nhanh. Một bài hát có thể thuộc về nhiều album.
  - Thanh chọn hàng loạt (**Batch Selection Bar**) hỗ trợ chọn nhiều bài hát cùng lúc để thêm vào album hoặc xóa khỏi Thư viện.
- **Khôi phục bài đã xóa an toàn (Restore Song)**:
  - Thao tác xóa bài hát hỗ trợ thông báo xác nhận kèm khả năng hoàn tác (Undo) ngay lập tức, phục hồi đầy đủ dữ liệu ban đầu.
- **Xác thực bảo mật**:
  - Đăng nhập bảo mật thông qua tài khoản Google với Firebase Authentication.
  - Phân quyền dữ liệu độc lập theo từng `userId` thông qua Firestore Security Rules.
- **Thiết kế thích ứng & Đa nền tảng**:
  - Chuyển đổi giao diện Sáng / Tối (Light / Dark) thích ứng theo cài đặt hệ điều hành hoặc tùy chọn người dùng.
  - Tối ưu hóa trải nghiệm di động với thanh điều hướng và bảng trượt ngăn kéo (drawer) mượt mà.

---

## Công nghệ sử dụng

| Lớp thành phần              | Ngăn xếp công nghệ                                                                                                             | Mô tả vai trò                                                                      |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Nền tảng & Ngôn ngữ**     | [React 19](https://react.dev/), [TypeScript 5.9](https://www.typescriptlang.org/)                                              | Xây dựng giao diện hướng component kiểu mới với tính an toàn kiểu dữ liệu cao      |
| **Đóng gói & Công cụ**      | [Vite 8](https://vite.dev/), [ESLint 9](https://eslint.org/), [Prettier 3](https://prettier.io/)                               | Máy chủ phát triển HMR cực nhanh, kiểm tra cú pháp và định dạng mã nguồn nhất quán |
| **Giao diện & Kiểu dáng**   | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/vite`                                                               | Hệ thống thiết kế utility-first hiện đại sử dụng CSS variables                     |
| **Thành phần UI cơ sở**     | [Base UI](https://base-ui.com/), [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/)                          | Cung cấp các primitives hỗ trợ tiếp cận (a11y), biểu tượng và tương tác chuẩn mực  |
| **Ngăn kéo & Thông báo**    | [Vaul](https://vaul.emilkowal.ski/), [Sonner](https://sonner.emilkowal.ski/)                                                   | Dialog/Drawer ngăn kéo vuốt cảm ứng trên mobile và toast thông báo nhẹ nhàng       |
| **Điều hướng & Trạng thái** | [React Router v7](https://reactrouter.com/), [TanStack Query v5](https://tanstack.com/query)                                   | Quản lý định tuyến phía client và cache/đồng bộ dữ liệu bất đồng bộ                |
| **Hạ tầng Đám mây (BaaS)**  | [Firebase v13](https://firebase.google.com/) (Auth, Firestore, Hosting)                                                        | Xác thực danh tính, lưu trữ cơ sở dữ liệu NoSQL thời gian thực và lưu trữ web tĩnh |
| **Nguồn dữ liệu tham khảo** | [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) | API công cộng tìm kiếm thông tin bài hát và đoạn nghe thử âm thanh                 |

---

## Bắt đầu nhanh

### Yêu cầu tiên quyết

- **Node.js**: Phiên bản `>= 20.0.0` (khuyến nghị phiên bản LTS v22).
- **Trình quản lý gói**: `npm` phiên bản `>= 10.0.0`.
- **Dự án Firebase**: Đã khởi tạo dự án trên Firebase Console với:
  - Dịch vụ **Firebase Authentication** (bật nhà cung cấp Google Sign-In).
  - Dịch vụ **Cloud Firestore**.

### 1. Tải mã nguồn

```bash
git clone https://github.com/dexter826/musimob.git
cd musimob
```

### 2. Cài đặt các gói phụ thuộc

```bash
npm install
```

### 3. Thiết lập biến môi trường

Tạo tệp `.env.local` từ mẫu `.env.example`:

```bash
cp .env.example .env.local
```

Điền các thông số tương ứng từ phần Cài đặt dự án trên Firebase Console:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=musi-mob.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=musi-mob
VITE_FIREBASE_APP_ID=1:1234567890:web:...
```

### 4. Khởi chạy máy chủ phát triển

```bash
npm run dev
```

Mở trình duyệt tại địa chỉ [http://localhost:5173](http://localhost:5173).

---

## Cấu hình

MusiMOB sử dụng các biến môi trường prefix `VITE_` được nạp tự động bởi Vite:

| Tên biến môi trường         | Bắt buộc | Mục đích sử dụng                                          |
| :-------------------------- | :------: | :-------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`     |    Có    | Khóa định danh API Web cho ứng dụng Firebase              |
| `VITE_FIREBASE_AUTH_DOMAIN` |    Có    | Tên miền xử lý luồng xác thực đăng nhập Google            |
| `VITE_FIREBASE_PROJECT_ID`  |    Có    | Mã dự án Google Cloud / Firebase (mặc định: `musi-mob`)   |
| `VITE_FIREBASE_APP_ID`      |    Có    | Mã định danh ứng dụng Web được cấp trong Firebase Console |

---

## Lệnh phát triển

| Lệnh thực thi          | Mục đích                                                                               |
| :--------------------- | :------------------------------------------------------------------------------------- |
| `npm run dev`          | Khởi chạy máy chủ phát triển Vite với tính năng cập nhật mô-đun nóng (HMR)             |
| `npm run build`        | Kiểm tra kiểu TypeScript (`tsc -b`) và đóng gói mã nguồn phân phối vào thư mục `dist/` |
| `npm run preview`      | Khởi chạy máy chủ nội bộ để xem trước bản đóng gói `dist/` trước khi phát hành         |
| `npm run lint`         | Quét và kiểm tra chất lượng mã nguồn bằng ESLint                                       |
| `npm run format`       | Tự động định dạng toàn bộ mã nguồn dự án bằng Prettier                                 |
| `npm run format:check` | Kiểm tra tính tuân thủ định dạng mã nguồn (dùng trong CI pipeline)                     |

---

## Cấu trúc dự án

Dự án tổ chức mã nguồn theo hướng tính năng (feature-driven) với các ranh giới rõ ràng:

```text
musimob/
├── .github/workflows/       # Kịch bản CI/CD triển khai tự động (GitHub Actions)
├── assets/                  # Ảnh minh họa và tài liệu nhận diện
├── docs/                    # Tài liệu kiến trúc miền, issue tracker và hướng dẫn
├── public/                  # Tài nguyên tĩnh (favicon, manifest, biểu tượng, opengraph)
├── src/
│   ├── app/                 # Khung ứng dụng: Layout, điều hướng trang, Providers
│   ├── components/          # Thành phần giao diện dùng chung (SongRow, PreviewButton, ...)
│   │   └── ui/              # Bộ thành phần giao diện nền tảng (Radix/Base-UI wrappers)
│   ├── features/            # Các mô-đun nghiệp vụ chính
│   │   ├── add-song/        # Bảng điều khiển thêm bài hát (kho iTunes / thủ công)
│   │   ├── albums/          # Nghiệp vụ tạo, đổi tên, quản lý và duyệt album
│   │   ├── auth/            # Màn hình đăng nhập, context người dùng và menu avatar
│   │   ├── search-song/     # Tìm kiếm bản nhạc kho ngoài và huy hiệu kiểm tra trùng
│   │   └── songs/           # Nghiệp vụ hiển thị thư viện, toolbar, lọc và chỉnh sửa bài
│   ├── hooks/               # Các React hook tái sử dụng (responsive, scroll, title)
│   ├── lib/                 # Tiện ích bổ trợ, xử lý khóa và lớp giao tiếp API
│   │   └── api/             # SDK kết nối Firebase (Auth, Firestore) và iTunes API
│   ├── index.css            # Thiết lập biến màu sắc giao diện và tokens Tailwind CSS v4
│   └── main.tsx             # Điểm khởi tạo ứng dụng React
├── firestore.rules          # Quy tắc bảo mật dữ liệu Cloud Firestore
├── firebase.json            # Cấu hình dịch vụ lưu trữ Firebase Hosting
└── vite.config.ts           # Cấu hình đóng gói Vite
```

---

## Triển khai & Bảo mật

### Quy tắc bảo mật Cloud Firestore

Toàn bộ dữ liệu bài hát và album được cô lập theo mã định danh người dùng (`userId`). Chỉ người dùng đã đăng nhập và sở hữu đúng mã định danh mới có quyền đọc và ghi dữ liệu của chính mình:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/songs/{songId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    match /users/{userId}/albums/{albumId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

### Tự động hóa CI/CD

Mỗi lần có bản commit mới được đẩy lên nhánh `main`, luồng làm việc tại `.github/workflows/deploy.yml` sẽ tự động:

1. Chạy kiểm tra định dạng (`npm run format:check`).
2. Rà soát chất lượng mã nguồn (`npm run lint`).
3. Đóng gói bản phân phối (`npm run build`).
4. Xác thực qua Google Cloud Workload Identity / Service Account và triển khai lên **Firebase Hosting** cùng bộ quy tắc **Firestore Rules**.

### Triển khai thủ công qua CLI

```bash
# Đóng gói sản phẩm
npm run build

# Triển khai Hosting và Firestore Rules
npx firebase deploy --project musi-mob --only hosting,firestore:rules
```

---

## Giấy phép

Dự án này là sản phẩm nội bộ cá nhân. Toàn bộ bản quyền thuộc về tác giả [@dexter826](https://github.com/dexter826).
