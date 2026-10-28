# Nền tảng và stack

Type: grilling
Status: resolved

## Question

Musimob chạy ở đâu và viết bằng gì?

Cần chốt trong một phiên:

- **Nền tảng**: web PWA cài lên màn hình chính, web responsive thường, hay native?
- **Framework**: React + TypeScript + Vite, Svelte, hay vanilla TS?
- **Quản lý state**: state của framework, hay store riêng?
- **Build tool**: Vite mặc định hay khác?

Ràng buộc đã biết:

- Một người dùng, một mình làm, không deadline.
- Phải gọi được iTunes Search API từ browser. CORS mở nên không cần proxy.
- `.gitignore` gợi ý Vite + React + TS + Firebase, nhưng đó là gợi ý, không phải quyết định.

Đích: chốt được stack đủ để ticket lưu trữ và deploy không phải đoán.

## Answer

Stack chốt:

| Lớp | Chọn | Lý do |
| --- | --- | --- |
| Nền tảng | Web PWA | Một codebase, cài lên màn hình chính, offline được, không cần store hay Apple Developer |
| Build | Vite | Chuẩn cho React + TS. Next.js kéo SSR và routing không cần cho app một màn hình |
| Framework | React + TypeScript | Quen thuộc. Type bắt lỗi tên field của JSON iTunes |
| Styling | Tailwind CSS v4, qua `@tailwindcss/vite` | UI card lặp lại nhiều, chỉnh nhanh, một dependency |
| State client | Zustand + middleware `persist` | Danh sách bài tự ghi `localStorage`, tự rehydrate. Không cần hook tự viết |
| State server | TanStack Query | Cache, dedupe, retry backoff, `staleTime` cho iTunes. Xử lý 429 sẵn |
| PWA | `vite-plugin-pwa` | Manifest + service worker. `.gitignore` đã có `dev-dist/` |

Đã loại:

- **Next.js** — SSR, routing, server không cần cho v1.
- **Redux Toolkit** — boilerplate lớn hơn cả app.
- **Native** — cần store, cần Apple Developer 99 USD/năm, chậm vòng lặp.

Hệ quả cho ticket khác:

- Lưu trữ mặc định là `localStorage` qua `persist`. Firestore chỉ còn đáng bàn nếu đồng bộ nhiều thiết bị thành mục tiêu.
- Deploy chỉ cần hosting tĩnh.

## Amendment

Ticket [Lưu trữ dữ liệu](04-luu-tru-du-lieu.md) chốt đồng bộ nhiều thiết bị qua Firestore. Phần "Zustand + persist giữ danh sách bài" và "deploy chỉ cần hosting tĩnh" ở trên không còn đúng.

- Danh sách bài thuộc Firestore, không thuộc `persist`.
- **Zustand bị bỏ hoàn toàn.** Danh sách do Firestore + `onSnapshot` giữ; state UI dùng `useState`.
- Deploy phải tính Firebase.

Phần còn hiệu lực: Web PWA, Vite, React + TypeScript, Tailwind v4, TanStack Query cho iTunes, `vite-plugin-pwa`.
