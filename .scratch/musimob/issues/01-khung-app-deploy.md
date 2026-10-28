# 01 — Khung app deploy được

Status: ready-for-agent
Blocked by: none

## Mục tiêu

Dựng source từ số 0, đưa app shell rỗng lên `musimob.web.app`. Cuối ticket có URL thật và CI thật. Chưa có đăng nhập, chưa có dữ liệu.

## Việc

- Vite + React + TypeScript, Tailwind v4 qua `@tailwindcss/vite`.
- Cây thư mục theo [ADR-0001](../../../docs/adr/0001-feature-based-structure.md). Chỉ tạo thư mục khi có file, không tạo thư mục rỗng.
- Alias `@/` → `src/`.
- ESLint `import/no-restricted-paths`: chặn import chéo feature, chặn `features` import `app`, chặn shared (`components`, `hooks`, `lib`, `types`, `utils`) import ngược lên.
- App shell: header wordmark `musimob`, dòng `0 bài · đồng bộ qua Google`, trạng thái rỗng `Chưa có bài nào` và nút `Thêm bài đầu tiên` (chưa mở gì).
- Firebase: `firebase.json`, `.firebaserc`, hosting trỏ `dist`. Rules placeholder `allow read, write: if false`.
- `.env.example`: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
- GitHub Actions khi push `main`: `npm ci`, `npm run lint`, `npm run build`, deploy Hosting và Firestore rules bằng `firebase-tools`, xác thực bằng service account trong GitHub Secrets.
- Không thêm `vite-plugin-pwa`, manifest hay service worker. Việc đó ở ticket 07.

## Cần từ người dùng

- Firebase project id `musimob`, hoặc id khác nếu đã bị chiếm. Nếu khác thì đổi domain trong ticket này và trong spec.
- Tạo service account, lưu JSON vào GitHub Secret `FIREBASE_SERVICE_ACCOUNT_MUSIMOB`.
- Bật Google provider trong Authentication. Ticket 02 dùng.

## Xong khi

- `npm run dev` render shell, console sạch.
- `npm run lint` và `npm run build` pass.
- Push `main` chạy workflow xanh, deploy thành công.
- `https://musimob.web.app` trả app shell.

Không viết test.
