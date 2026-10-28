# 02 — Đăng nhập Google

Status: ready-for-agent
Blocked by: 01

## Mục tiêu

Mở app, đăng nhập bằng tài khoản Google thật, thấy app shell có tên mình. Đăng xuất được. Phiên sống qua reload.

## Việc

- `lib/api/types.ts`: `Song`, `SearchResult`, `User`; interface `MusimobApi` với namespace `auth`. Namespace `songs` thêm ở ticket 03, `search` ở ticket 04. Hình dạng cuối theo [spec](../spec.md).
- `lib/api/firebase.ts`: init Firebase app. Ticket 01 đã dựng file này, giờ thêm `getAuth`.
- `lib/api/auth.ts`: adapter `signInWithGoogle`, `signOut`, `onUserChanged`. Map Firebase user thành `{ uid, displayName }`, `displayName` rỗng thì dùng phần trước `@` của email.
- `features/auth/components/SignInScreen.tsx`: wordmark, một câu giải thích, nút `Tiếp tục với Google`.
- Màn đăng nhập: form căn giữa, tối đa 440px; nền tràn viewport. Không đặt khung max-width kiểu điện thoại cho toàn trang.
- `features/auth/hooks/useAuth.ts`: subscribe `onUserChanged`, trả user và trạng thái đang tải.
- `features/auth/components/AvatarMenu.tsx`: avatar chữ cái đầu của tên, bấm mở menu có `Đăng xuất`.
- `app/provider.tsx`: bọc auth state. `app/app.tsx`: chưa có user thì render `SignInScreen`, có user thì render shell.
- Đăng nhập bằng popup; popup bị chặn thì chuyển sang redirect. Lỗi hiện thông báo tiếng Việt, không nuốt lỗi.
- Header hiện `0 bài`, avatar thay cho chỗ trống.

## Xong khi

- Bấm đăng nhập, chọn tài khoản Google thật, vào được app shell.
- Reload trang vẫn còn phiên.
- Bấm avatar, chọn `Đăng xuất`, quay lại màn đăng nhập.
- Đăng nhập lại bằng tài khoản thứ hai được, không kẹt phiên cũ.
- Popup bị chặn vẫn đăng nhập được bằng redirect.
- Form đăng nhập căn giữa, không tràn ngang ở 375, 768, 1024, 1440 và 1920; nền phủ viewport.

Không viết test.
