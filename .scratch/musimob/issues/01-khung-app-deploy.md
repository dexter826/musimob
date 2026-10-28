# 01 — Khung app deploy được

Status: done
Blocked by: none

## Mục tiêu

Dựng source từ số 0, đưa app shell rỗng lên `musi-mob.web.app`. Cuối ticket có URL thật và CI thật. Chưa có đăng nhập, chưa có dữ liệu.

## Việc

- Vite + React + TypeScript, Tailwind v4 qua `@tailwindcss/vite`.
- Cây thư mục theo [ADR-0001](../../../docs/adr/0001-feature-based-structure.md). Chỉ tạo thư mục khi có file, không tạo thư mục rỗng.
- Alias `@/` → `src/`.
- ESLint `import/no-restricted-paths`: chặn import chéo feature, chặn `features` import `app`, chặn shared (`components`, `hooks`, `lib`, `types`, `utils`) import ngược lên.
- App shell: header wordmark `musimob`, dòng `0 bài`, trạng thái rỗng `Chưa có bài nào`.
- Firebase: `firebase.json`, `.firebaserc` với `projects.default = musi-mob`, hosting trỏ `dist`. Rules placeholder `allow read, write: if false`.
- `.env.example`: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
- GitHub Actions khi push `main`: `npm ci`, `npm run lint`, `npm run build`, xác thực bằng `google-github-actions/auth@v2` với `credentials_json: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_MUSI_MOB }}`, rồi `firebase deploy --project musi-mob --only hosting,firestore:rules`.
- Không thêm `vite-plugin-pwa`, manifest hay service worker. Việc đó ở ticket 07.

## Đã có

- Firebase project id `musi-mob`.
- Google provider đã bật trong Authentication.

## Cần từ người dùng

- Service account JSON, dán vào GitHub Secret `FIREBASE_SERVICE_ACCOUNT_MUSI_MOB`. Không đặt file trong repo.
- Service account cần hai role trên project `musi-mob`: `Firebase Admin` (`roles/firebase.admin`) và `Service Usage Viewer` (`roles/serviceusage.serviceUsageViewer`). Thiếu role thứ hai thì CLI báo 403 ở `serviceusage.googleapis.com`.

## Xong khi

- `npm run dev` render shell, console sạch.
- `npm run lint` và `npm run build` pass.
- Push `main` chạy workflow xanh, deploy thành công.
- `https://musi-mob.web.app` trả app shell.

Không viết test.
