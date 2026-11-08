<div align="center">
  <img src="public/icon.svg" width="96" height="96" alt="Logo MusiMOB" />

# MusiMOB

_Sổ tay âm nhạc cá nhân: khám phá, lưu trữ và nghe thử bài hát trực tiếp trên web_

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v13-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## Tổng quan

**MusiMOB** là ứng dụng web quản lý và lưu trữ thông tin âm nhạc cá nhân. Ứng dụng tích hợp nguồn dữ liệu iTunes để tìm kiếm bài hát, hỗ trợ nghe thử trực tiếp trên trình duyệt, tổ chức danh sách theo album và đồng bộ dữ liệu thời gian thực qua Cloud Firestore.

## Tính năng chính

- **Thư viện bài hát cá nhân**: Quản lý danh sách bài hát với đa dạng chế độ hiển thị cùng bộ lọc tìm kiếm tức thì.
- **Trình phát nghe thử tích hợp**: Hỗ trợ nghe thử âm thanh trực tiếp trên web, tự động chuyển tiếp mượt mà khi đổi bài.
- **Tra cứu dữ liệu**: Tự động truy xuất thông tin từ kho iTunes hoặc thêm bài hát thủ công, tự động kiểm tra trùng lặp.
- **Quản lý album**: Gom nhóm bài hát theo chủ đề, hỗ trợ thao tác hàng loạt.
- **Xóa và khôi phục**: Xóa bài hát kèm thông báo hoàn tác (Undo) tức thì.
- **Đăng nhập Google**: Xác thực qua Firebase Authentication, dữ liệu phân lập riêng theo từng người dùng.
- **Giao diện sáng/tối**: Tự động chuyển đổi theo hệ điều hành hoặc tùy chỉnh thủ công.

## Công nghệ sử dụng

- **Frontend**: React 19, TypeScript 5.9, Vite 8, Tailwind CSS v4.
- **Thư viện UI**: Base UI, Radix UI, Lucide Icons, Sonner, Vaul.
- **Định tuyến & Dữ liệu**: React Router v7, TanStack React Query v5.
- **Backend / Lưu trữ**: Firebase Authentication, Cloud Firestore, Firebase Hosting.
- **Nguồn tra cứu**: iTunes Search API.

## Bắt đầu nhanh

### Yêu cầu

- Node.js >= 20
- npm >= 10

### Cài đặt và khởi chạy

```bash
# 1. Clone mã nguồn
git clone https://github.com/dexter826/musimob.git
cd musimob

# 2. Cài đặt phụ thuộc
npm install

# 3. Tạo tệp môi trường
cp .env.example .env.local

# 4. Chạy môi trường phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:5173](http://localhost:5173).

## Cấu hình

Khai báo thông số Firebase trong `.env.local`:

| Biến môi trường             | Mục đích                           |
| :-------------------------- | :--------------------------------- |
| `VITE_FIREBASE_API_KEY`     | Khóa Web API Firebase              |
| `VITE_FIREBASE_AUTH_DOMAIN` | Tên miền xác thực Firebase         |
| `VITE_FIREBASE_PROJECT_ID`  | Mã dự án Firebase (`musi-mob`)     |
| `VITE_FIREBASE_APP_ID`      | Mã định danh ứng dụng web Firebase |

## Lệnh thông dụng

| Lệnh                   | Tác vụ                                              |
| :--------------------- | :-------------------------------------------------- |
| `npm run dev`          | Khởi chạy máy chủ phát triển (HMR)                  |
| `npm run build`        | Kiểm tra kiểu và đóng gói bản phát hành vào `dist/` |
| `npm run preview`      | Xem trước bản build cục bộ                          |
| `npm run lint`         | Kiểm tra lỗi cú pháp và quy chuẩn code              |
| `npm run format`       | Tự động định dạng mã nguồn với Prettier             |
| `npm run format:check` | Kiểm tra định dạng mã nguồn                         |

## Cấu trúc thư mục

```text
src/
├── app/         # Layout, router và các trang chính
├── components/  # Thành phần giao diện tái sử dụng
│   └── ui/      # UI primitives (Radix, Base UI)
├── features/    # Module nghiệp vụ: add-song, albums, auth, search-song, songs
├── hooks/       # Custom React hooks
└── lib/         # Firebase SDK, API iTunes và tiện ích dùng chung
```

## Giấy phép

Dự án được phân phối theo giấy phép [MIT](LICENSE).
