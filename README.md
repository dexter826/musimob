<div align="center">
  <img src="public/icon.svg" width="96" height="96" alt="Logo MusiMOB" />

# MusiMOB

_Sổ tay âm nhạc cá nhân: tra cứu, lưu trữ và nghe thử bài hát trên web_

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v13-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## Tổng quan

**MusiMOB** là ứng dụng sổ tay âm nhạc cá nhân chạy trên trình duyệt web, giúp người dùng tra cứu thông tin bài hát, lưu trữ vào Thư viện riêng tư, gom nhóm theo Album và nghe thử đoạn trích âm thanh 30 giây. Dữ liệu được quản lý và đồng bộ theo từng tài khoản người dùng, đồng thời hỗ trợ sử dụng ngay cả khi gián đoạn kết nối mạng.

## Mục lục

- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Bắt đầu nhanh](#bắt-đầu-nhanh)
- [Cấu hình môi trường](#cấu-hình-môi-trường)
- [Lệnh khả dụng](#lệnh-khả-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Giấy phép](#giấy-phép)

## Tính năng chính

- **Thư viện bài hát**: Sổ tay lưu trữ, lọc và sắp xếp các bài hát cá nhân.
- **Khám phá âm nhạc**: Tra cứu bài hát trực tuyến và khám phá giai điệu mới theo chủ đề.
- **Quản lý Album**: Gom nhóm và phân loại bài hát theo từng tuyển tập.
- **Nhập bài thủ công**: Tự do ghi chép thông tin bài hát bằng tay theo ý thích riêng.

## Công nghệ sử dụng

- **Frontend core**: React 19, TypeScript 5.9, Vite 8, Tailwind CSS v4.
- **Định tuyến & Dữ liệu**: React Router v7, TanStack Query v5 (quản lý bộ nhớ đệm và đồng bộ trạng thái bất đồng bộ).
- **Thành phần giao diện**: Radix UI, Base UI, Lucide React, Sonner (thông báo toast phẳng 0px shadow), Vaul (ngăn kéo bottom sheet).
- **Backend & Lưu trữ**: Firebase Authentication (Google Auth, Email/Password), Cloud Firestore (cấu hình bộ nhớ đệm đa tab `persistentLocalCache` và `persistentMultipleTabManager`), Firebase Hosting.
- **Nguồn dữ liệu kho ngoài**: iTunes Search API và iTunes RSS Feeds.

## Bắt đầu nhanh

### Yêu cầu môi trường

- Node.js >= 20.x (khuyến nghị Node.js 22.x theo môi trường CI)
- npm >= 10.x

### Cài đặt và khởi chạy

```bash
# 1. Sao chép kho mã nguồn
git clone https://github.com/dexter826/musimob.git
cd musimob

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Tạo tệp cấu hình môi trường cục bộ
cp .env.example .env.local

# 4. Khởi chạy máy chủ phát triển
npm run dev
```

Mở trình duyệt và truy cập tại [http://localhost:5173](http://localhost:5173).

## Cấu hình môi trường

Khai báo các thông số kết nối Firebase trong tệp `.env.local` (tham chiếu theo `.env.example`):

| Biến môi trường             | Bắt buộc | Mặc định / Giá trị mẫu | Mục đích                           |
| :-------------------------- | :------: | :--------------------: | :--------------------------------- |
| `VITE_FIREBASE_API_KEY`     |    Có    |           -            | Khóa Web API của Firebase          |
| `VITE_FIREBASE_AUTH_DOMAIN` |    Có    |           -            | Tên miền xác thực Firebase         |
| `VITE_FIREBASE_PROJECT_ID`  |    Có    |       `musi-mob`       | Mã định danh dự án Firebase        |
| `VITE_FIREBASE_APP_ID`      |    Có    |           -            | Mã định danh ứng dụng web Firebase |

## Lệnh khả dụng

| Lệnh                   | Mục đích                                                             |
| :--------------------- | :------------------------------------------------------------------- |
| `npm run dev`          | Khởi chạy máy chủ phát triển cục bộ với Vite HMR                     |
| `npm run build`        | Kiểm tra kiểu TypeScript (`tsc -b`) và đóng gói mã nguồn vào `dist/` |
| `npm run preview`      | Khởi chạy máy chủ xem trước bản đóng gói từ `dist/`                  |
| `npm run lint`         | Kiểm tra lỗi cú pháp và quy chuẩn mã nguồn với ESLint                |
| `npm run format`       | Tự động định dạng mã nguồn theo quy chuẩn Prettier                   |
| `npm run format:check` | Kiểm tra sự tuân thủ định dạng mã nguồn của Prettier                 |

## Cấu trúc thư mục

```text
src/
├── app/              # Cấu hình router, AppHeader sticky, AppLayout và các trang ứng dụng
├── components/       # Thành phần giao diện dùng chung và UI primitives
│   └── ui/           # Thành phần UI nguyên tử (Radix UI, Base UI, Sonner, Button)
├── features/         # Các module nghiệp vụ theo tính năng
│   ├── albums/       # Quản lý album, bộ chọn album và gom nhóm bài hát
│   ├── audio-preview/# Nghe thử âm thanh 30s và điều phối trạng thái phát toàn cục
│   ├── auth/         # Đăng nhập, đăng xuất và quản lý phiên người dùng
│   ├── catalog/      # Kết nối iTunes Search API, chuẩn hóa dữ liệu bài hát
│   ├── discover/     # Khám phá bài hát, tìm kiếm trực tuyến và hàng cuộn ngang
│   └── songs/        # Quản lý thư viện, sắp xếp, lọc, nhập bài thủ công và lưu trữ
├── hooks/            # Custom React hooks (tiêu đề trang, responsive, chủ đề giao diện)
└── lib/              # Khởi tạo Firebase SDK, xử lý lỗi và chuẩn hóa khóa bài hát
```

## Giấy phép

Dự án được phân phối theo giấy phép [MIT](LICENSE). Bản quyền © 2026 dexter826.
