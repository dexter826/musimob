<div align="center">
  <img src="public/icon.svg" width="96" height="96" alt="Logo MusiMOB" />

# MusiMOB

_Sổ lưu bài hát cá nhân, phục vụ tra cứu và nghe thử nhanh._

[![Deploy](https://github.com/dexter826/musimob/actions/workflows/deploy.yml/badge.svg)](https://github.com/dexter826/musimob/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v13-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)

[Tổng quan](#tổng-quan) • [Tính năng chính](#tính-năng-chính) • [Công nghệ sử dụng](#công-nghệ-sử-dụng) • [Bắt đầu nhanh](#bắt-đầu-nhanh) • [Cấu hình](#cấu-hình) • [Lệnh phát triển](#lệnh-phát-triển) • [Cấu trúc thư mục](#cấu-trúc-thư-mục) • [Triển khai](#triển-khai)

</div>

---

## Tổng quan

**MusiMOB** là sổ lưu trữ và đánh dấu thông tin bài hát cá nhân trên nền web. Ứng dụng tập trung vào trải nghiệm tinh giản: một cuốn sổ tay riêng tư để lưu trữ, phân loại và nghe thử nhanh những bài hát bạn quan tâm mà không bị phân tâm bởi các thuật toán gợi ý hay quảng cáo.

Giao diện ứng dụng được xây dựng theo phong cách trang báo với bảng màu giấy sáng, mực đậm và điểm nhấn màu san hô (coral). Dữ liệu được đồng bộ theo thời gian thực qua Cloud Firestore, hỗ trợ đoạn nghe thử 30 giây độc lập và tìm kiếm bài hát từ kho dữ liệu iTunes.

---

## Tính năng chính

- **Thư viện bài hát cá nhân**: Lưu và quản lý bài hát kèm tiêu đề, nghệ sĩ, ảnh bìa và liên kết nghe thử. Hỗ trợ chuyển đổi linh hoạt giữa giao diện Lưới (Grid) và Hàng (Row), tích hợp bộ lọc tìm kiếm tức thì.
- **Nghe thử nhanh 30 giây (Active Preview)**: Toàn ứng dụng duy trì duy nhất một luồng âm thanh nghe thử tại một thời điểm. Khi bật nghe thử một bài mới, bài đang phát sẽ tự động dừng và giải phóng tài nguyên.
- **Tra cứu bản nhạc kho ngoài**: Tìm kiếm bài hát trực tiếp qua iTunes Search API (ưu tiên nguồn nhạc Việt Nam với ảnh bìa độ phân giải cao 600×600) hoặc tự nhập thông tin thủ công.
- **Quản lý theo album**: Tạo album để gom nhóm bài hát và tra cứu nhanh. Hỗ trợ thao tác chọn nhiều bài cùng lúc để thêm vào album hoặc gỡ khỏi album mà không làm mất bài hát trong Thư viện.
- **Khôi phục bài đã xóa an toàn**: Giao diện cập nhật tức thì (optimistic UI), kèm thông báo cho phép hoàn tác khôi phục lại bài hát vừa xóa với đầy đủ dữ liệu gốc.
- **Xác thực Google**: Đăng nhập nhanh bằng tài khoản Google qua Firebase Authentication, bảo đảm phân lập dữ liệu riêng tư theo từng người dùng.
- **Giao diện biên tập và chế độ tối**: Hệ thống kiểu chữ phối hợp giữa Lora (tiêu đề trang trọng) và Be Vietnam Pro (giao diện), tự động thích ứng chế độ sáng/tối theo hệ thống và tích hợp bảng điều khiển dạng ngăn kéo mượt mà trên thiết bị di động.

---

## Công nghệ sử dụng

| Lớp thành phần                   | Công nghệ                                                                                                                                                                                     |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Giao diện và nền tảng**        | [React 19](https://react.dev/), [TypeScript 5.9](https://www.typescriptlang.org/)                                                                                                             |
| **Công cụ đóng gói và kiểm tra** | [Vite 8](https://vite.dev/), [ESLint 9](https://eslint.org/), [Prettier](https://prettier.io/)                                                                                                |
| **Định dạng và thiết kế**        | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/vite`, CSS Variables                                                                                                               |
| **Thành phần giao diện cơ sở**   | [Base UI](https://base-ui.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Vaul](https://vaul.emilkowal.ski/), [Sonner](https://sonner.emilkowal.ski/)     |
| **Điều hướng và trạng thái**     | [React Router v7](https://reactrouter.com/), [TanStack Query v5](https://tanstack.com/query)                                                                                                  |
| **Hạ tầng đám mây**              | [Firebase Authentication](https://firebase.google.com/docs/auth), [Cloud Firestore](https://firebase.google.com/docs/firestore), [Firebase Hosting](https://firebase.google.com/docs/hosting) |
| **Nguồn dữ liệu tra cứu**        | [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)                                                                |

---

## Bắt đầu nhanh

### Yêu cầu môi trường

- [Node.js](https://nodejs.org/) phiên bản `>= 20.0.0` (khuyến nghị v22 LTS)
- `npm` phiên bản `>= 10.0.0`
- Dự án Firebase đã kích hoạt dịch vụ Cloud Firestore và Firebase Authentication

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

Sao chép tệp cấu hình mẫu và điền thông tin xác thực từ Firebase:

```bash
cp .env.example .env.local
```

### 4. Khởi chạy máy chủ phát triển

```bash
npm run dev
```

Mở trình duyệt và truy cập [http://localhost:5173](http://localhost:5173).

---

## Cấu hình

MusiMOB kết nối tới Firebase thông qua các biến môi trường Vite được khai báo trong `.env.local`:

| Biến môi trường             | Mô tả                                           | Giá trị mẫu                |
| :-------------------------- | :---------------------------------------------- | :------------------------- |
| `VITE_FIREBASE_API_KEY`     | Khóa API Web của dự án Firebase                 | `AIzaSy...`                |
| `VITE_FIREBASE_AUTH_DOMAIN` | Tên miền xác thực Firebase                      | `musi-mob.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID`  | Mã định danh dự án trên Google Cloud / Firebase | `musi-mob`                 |
| `VITE_FIREBASE_APP_ID`      | Mã định danh ứng dụng web trên Firebase         | `1:1234567890:web:...`     |

---

## Lệnh phát triển

Trong thư mục dự án, bạn có thể thực thi các lệnh sau:

| Lệnh                   | Tác vụ                                                                  |
| :--------------------- | :---------------------------------------------------------------------- |
| `npm run dev`          | Khởi chạy máy chủ phát triển Vite với tính năng thay đổi nóng (HMR)     |
| `npm run build`        | Kiểm tra kiểu dữ liệu (`tsc -b`) và đóng gói mã nguồn sản phẩm với Vite |
| `npm run preview`      | Khởi chạy máy chủ cục bộ để xem trước bản đóng gói từ thư mục `dist/`   |
| `npm run lint`         | Rà soát lỗi mã nguồn bằng ESLint theo bộ quy tắc của dự án              |
| `npm run format`       | Tự động định dạng toàn bộ mã nguồn bằng Prettier                        |
| `npm run format:check` | Kiểm tra quy chuẩn định dạng mã nguồn mà không sửa đổi tệp              |

---

## Cấu trúc thư mục

```text
musimob/
├── assets/          # Tệp đồ họa và nhận diện thương hiệu
├── public/          # Tài nguyên tĩnh, favicon và web manifest
├── src/
│   ├── app/         # Khung ứng dụng, điều hướng và các trang chính
│   ├── components/  # Thành phần giao diện tái sử dụng
│   ├── features/    # Các phân hệ nghiệp vụ (bài hát, album, tìm kiếm, xác thực)
│   └── lib/         # Cấu hình API, Firebase SDK và tiện ích dùng chung
├── firestore.rules  # Quy tắc bảo mật Cloud Firestore
├── firebase.json    # Cấu hình Firebase Hosting
└── vite.config.ts   # Cấu hình trình đóng gói Vite
```

---

## Triển khai

Ứng dụng được triển khai trên **Firebase Hosting** và tự động phát hành qua GitHub Actions mỗi khi có thay đổi mới được đẩy lên nhánh `main`.

### Triển khai thủ công

Thực thi các lệnh sau để đóng gói và triển khai qua Firebase CLI:

```bash
# 1. Đóng gói mã nguồn sản phẩm
npm run build

# 2. Triển khai tài nguyên hosting và quy tắc bảo mật lên Firebase
npx firebase deploy --only hosting,firestore:rules
```
