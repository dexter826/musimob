# Musimob v1

Status: ready-for-agent

## Problem Statement

Đi karaoke mà không nhớ mình hát được bài nào. Danh sách trong đầu thưa dần, mỗi lần vào quán lại loay hoay chọn, cuối cùng hát lại hai ba bài quen.

Ghi vào ghi chú điện thoại thì lộn xộn: không ảnh bìa, không tìm lại được, đổi máy là mất, và không ai nhớ bài nào hát tone nào.

## Solution

Musimob là một PWA nhỏ: đăng nhập bằng Google, tìm bài qua iTunes, lưu vào danh sách của riêng mình. Xem dạng danh sách dày hoặc lưới ảnh bìa. Đồng bộ giữa các thiết bị qua Firestore. Vẫn xem được khi mất mạng.

Mục tiêu của v1: mở app, thấy danh sách, thêm được một bài trong dưới ba mươi giây.

## User Stories

1. As a người hát karaoke, I want đăng nhập bằng tài khoản Google, so that tôi không phải nhớ thêm một mật khẩu nữa.
2. As a người hát karaoke, I want đăng xuất khỏi thiết bị dùng chung, so that người khác không xem được danh sách của tôi.
3. As a người dùng mới, I want thấy trạng thái rỗng có hướng dẫn, so that tôi biết phải làm gì tiếp.
4. As a người dùng mới, I want thêm bài đầu tiên ngay từ trạng thái rỗng, so that tôi không phải đi tìm nút.
5. As a người dùng, I want tìm bài trên iTunes bằng tên hoặc ca sĩ, so that tôi không phải gõ tay từng field.
6. As a người dùng, I want thấy ảnh bìa và ca sĩ trong kết quả tìm kiếm, so that tôi chọn đúng bài trong nhiều bản trùng tên.
7. As a người dùng, I want lưu một kết quả chỉ bằng một chạm, so that thêm bài không thành công việc.
8. As a người dùng, I want thấy nhãn "Đã lưu" trên bài tôi đã có, so that tôi không thêm trùng.
9. As a người dùng, I want tự nhập bài khi iTunes không có, so that danh sách không bị chặn bởi catalog.
10. As a người dùng, I want nhập tên, ca sĩ và URL ảnh bìa khi tự nhập, so that bài tự thêm vẫn hiện đẹp như bài từ iTunes.
11. As a người dùng, I want xem danh sách dạng dòng dày, so that tôi quét được nhiều bài trên một màn hình.
12. As a người dùng, I want xem danh sách dạng lưới ảnh bìa, so that tôi nhận ra bài theo hình.
13. As a người dùng, I want đổi kiểu xem bằng một nút, so that tôi chọn kiểu hợp với lúc đang đứng trong quán.
14. As a người dùng, I want kiểu xem được nhớ lại, so that tôi không phải bấm lại mỗi lần mở.
15. As a người dùng, I want lọc danh sách theo tên bài hoặc ca sĩ, so that tìm một bài trong danh sách dài không tốn thời gian.
16. As a người dùng, I want sửa tên, ca sĩ hoặc ảnh bìa của một bài, so that sửa được lỗi gõ hoặc ảnh hỏng.
17. As a người dùng, I want xoá một bài, so that danh sách không giữ bài tôi không còn hát.
18. As a người dùng, I want được hỏi xác nhận trước khi xoá, so that không mất bài vì chạm nhầm.
19. As a người dùng, I want danh sách tự cập nhật khi tôi thêm bài trên máy khác, so that hai thiết bị luôn giống nhau.
20. As a người dùng, I want vẫn xem được danh sách khi mất mạng, so that trong phòng karaoke sóng yếu vẫn dùng được.
21. As a người dùng, I want thêm bài khi mất mạng và thấy nó đồng bộ lại sau, so that không bị chặn giữa lúc đang dùng.
22. As a người dùng, I want cài app lên màn hình chính, so that mở nhanh như app thật.
23. As a người dùng, I want thấy thông báo rõ khi iTunes tạm chặn vì quá nhiều request, so that tôi biết chờ chứ không tưởng app hỏng.
24. As a người dùng, I want thấy thông báo khi tìm không ra kết quả, so that tôi biết chuyển sang nhập tay.
25. As a người dùng, I want giao diện tiếng Việt, so that không phải đọc tiếng Anh trong lúc đang vội.
26. As a người dùng, I want ảnh bìa hỏng được thay bằng ô trống gọn gàng, so that danh sách không bị vỡ bố cục.
27. As a người dùng, I want dùng được cả trên điện thoại lẫn laptop, so that thêm bài ở nhà và tra ở quán đều tiện.
28. As a người dùng, I want dữ liệu của tôi tách khỏi người khác, so that không ai đọc hay sửa được danh sách của tôi.

## Implementation Decisions

### Stack

- PWA chạy trên web. Vite + React + TypeScript.
- Tailwind CSS v4 qua `@tailwindcss/vite`.
- TanStack Query cho lớp gọi iTunes.
- `vite-plugin-pwa` cho manifest và service worker.
- Không Zustand, không Redux. State UI dùng `useState`; danh sách bài đến từ Firestore qua `onSnapshot`.

### Cấu trúc source

Bulletproof React, ghi ở ADR-0001.

- `src/app/` — composition và provider.
- `src/features/` — `auth`, `songs`, `add-song`, `search-song`. Mỗi feature tự chứa `api/`, `components/`, `hooks/`, `types/` khi cần.
- `src/components/`, `src/hooks/`, `src/types/`, `src/utils/` — dùng chung.
- `src/lib/api/` — `MusimobApi`, adapter Firebase, adapter iTunes.
- Không barrel `index.ts`. Import thẳng file.
- Không router, không store toàn cục. Compose ở `app/app.tsx`.
- ESLint `import/no-restricted-paths`: cấm import chéo feature, cấm phụ thuộc ngược từ shared lên feature hoặc app.

### Seam

Một interface duy nhất giữa UI và thế giới ngoài:

```ts
type Song = {
  id: string
  title: string
  artist: string
  coverUrl: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

type SearchResult = {
  title: string
  artist: string
  coverUrl: string
}

interface MusimobApi {
  auth: {
    signInWithGoogle(): Promise<void>
    signOut(): Promise<void>
    onUserChanged(cb: (user: { uid: string; displayName: string } | null) => void): () => void
  }
  songs: {
    subscribe(uid: string, cb: (songs: Song[]) => void): () => void
    add(uid: string, song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>): Promise<void>
    update(uid: string, id: string, patch: Partial<Pick<Song, 'title' | 'artist' | 'coverUrl'>>): Promise<void>
    remove(uid: string, id: string): Promise<void>
  }
  search: {
    query(term: string): Promise<SearchResult[]>
  }
}
```

Hai adapter: Firebase thật, và adapter iTunes đứng sau `search`.

### Đăng nhập và dữ liệu

- Firebase Auth, provider Google. Đăng ký mở: bất kỳ tài khoản Google nào cũng vào được.
- Firestore: `users/{uid}/songs/{songId}`.
- Mỗi bài có `title`, `artist`, `coverUrl`, `createdAt`, `updatedAt`.
- Rules: chỉ chủ sở hữu đọc và ghi. Không có nhánh đọc công khai.
- Offline persistence của Firestore bật. `onSnapshot` giữ danh sách đồng bộ realtime.
- Xung đột: last-write-wins, mặc định của Firestore.
- Kiểu xem (danh sách hay lưới) lưu ở `localStorage`, không đưa vào Firestore.

### iTunes

- `itunes.apple.com/search`, `country=vn`, `entity=song`, `limit=25`.
- Debounce 400ms, chỉ gọi khi query dài từ 2 ký tự.
- TanStack Query: `staleTime` 10 phút, `gcTime` 30 phút, `retry: false`.
- Gặp 429: hiện thông báo chờ và nút thử lại. Không tự retry.
- `normalizeItunesTrack` biến một track thành `SearchResult` và nâng ảnh `100x100bb` lên `600x600bb`.

### Bố cục

Chốt từ prototype, variant D.

- Header: wordmark `musimob`, dòng `{n} bài · đồng bộ qua Google`, nút đổi kiểu xem, avatar.
- Ô tìm kiếm full-width dưới header, lọc phía client trên danh sách đã tải.
- Kiểu danh sách: row cao 50px ảnh, tên đậm 14.5px, ca sĩ 12.5px màu muted.
- Kiểu lưới: hai cột, ảnh vuông, gradient đen dưới đáy, tên chồng trên ảnh.
- Thêm bài: nút `+` nổi mở bottom sheet, hai tab iTunes và Nhập tay.
- Sửa và xoá: nút `⋯` cuối mỗi row, góc trên phải ảnh ở kiểu lưới. Menu gồm Sửa và Xoá. Xoá hỏi xác nhận.
- Trạng thái rỗng: `Chưa có bài nào`, một câu giải thích, nút `Thêm bài đầu tiên`.

### PWA và deploy

- Manifest: tên `Musimob`, icon 192 và 512, `theme_color`, `display: standalone`.
- `registerType: 'autoUpdate'`.
- Deploy lên Firebase Hosting tại `musimob.web.app`.
- GitHub Actions chạy khi push `main`: cài, build, deploy Hosting, deploy Firestore rules.

## Out of Scope

- Nút "hát gì giờ" bốc ngẫu nhiên.
- Chia sẻ danh sách cho người khác.
- Lời bài hát.
- Tag và lọc theo tag.
- Nhập hàng loạt từ danh sách có sẵn.
- Phát nhạc, preview, hay bất kỳ audio nào.
- Soạn nhạc, sheet music.
- Chấm điểm, luyện giọng.
- Mạng xã hội, bình luận, feed.
- Preview channel khi deploy.
- Tên miền riêng.

## Further Notes

- Prototype là nguồn chính cho bố cục: `.scratch/musimob/prototype/03-bo-cuc.html`, mở `?variant=D`.
- iTunes Search API không cần key và trả `Access-Control-Allow-Origin: *`, nên gọi trực tiếp từ browser được. Đây là lý do loại Deezer: Deezer thiếu header đó.
- Điều khoản iTunes giới hạn nội dung cho mục đích quảng bá store. App cá nhân, không thương mại, rủi ro thấp nhưng phải biết.
- Trần thật của iTunes là khoảng 20 request/phút và tối đa 200 kết quả mỗi query. Debounce và cache là để không chạm trần, không phải để tối ưu.
- Firestore Spark: 50.000 lượt đọc/ngày, 20.000 lượt ghi/ngày, 1 GiB. Đủ cho quy mô này, nhưng đăng ký mở nên theo dõi.
- Giao diện tiếng Việt. Không có i18n, không có bộ chuyển ngôn ngữ.
