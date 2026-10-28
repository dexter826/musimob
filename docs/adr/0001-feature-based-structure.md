# 0001 — Cấu trúc source theo Bulletproof React

- Status: accepted
- Ngày: 2026-10-28

## Bối cảnh

Repo chưa có source. Ticket 01 dựng khung, mọi ticket sau đổ vào đó. Không chốt cây thư mục trước thì mỗi ticket tự chọn chỗ đặt file, cấu trúc trôi dần.

App một trang, bốn vùng UI (đăng nhập, danh sách, thêm bài, tìm kiếm), một seam `MusimobApi`. Không router, không store toàn cục.

## Quyết định

Theo Bulletproof React, bản hiện hành của `alan2207/bulletproof-react`.

```
src/
├── app/          app.tsx, provider.tsx
├── components/   UI dùng chung
├── config/
├── features/
│   ├── auth/
│   ├── songs/
│   ├── add-song/
│   └── search-song/
├── hooks/
├── lib/
│   └── api/      MusimobApi + adapter Firebase + adapter iTunes
├── types/
└── utils/
```

- Feature chỉ tạo segment khi cần: `api/`, `components/`, `hooks/`, `types/`, `utils/`.
- Không barrel `index.ts`. Repo gốc bỏ barrel vì Vite tree-shake kém. Import thẳng đường dẫn file.
- Seam đặt ở `lib/api/` vì ba feature cùng dùng, không thuộc riêng feature nào.
- Không tạo `stores/`: state UI là `useState`, danh sách đến từ `onSnapshot`.
- Không tạo `router.tsx`: một trang.
- `lib/` không import React. `components/` không import Firebase.
- Compose feature ở `app/app.tsx`, không import chéo giữa feature.

## Hệ quả

- Cưỡng chế bằng ESLint `import/no-restricted-paths`: chặn import chéo feature, chặn `features` import `app`, chặn shared import ngược lên.
- Thêm feature mới là thêm thư mục, không sửa cấu trúc cũ.
- Không có cửa công khai `index.ts`, nên đổi tên file trong feature là đổi import. Chấp nhận: app nhỏ, IDE rename được.
- Không có test tự động. Kiểm tra bằng tay theo tiêu chí của từng ticket.
