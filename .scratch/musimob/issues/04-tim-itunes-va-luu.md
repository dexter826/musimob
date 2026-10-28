# 04 — Tìm iTunes và lưu

Status: ready-for-agent
Blocked by: 03

## Mục tiêu

Gõ tên bài hoặc ca sĩ, thấy kết quả từ iTunes có ảnh bìa, lưu một chạm. Không phải gõ tay từng field.

## Việc

- `MusimobApi.search`: thêm namespace `query(term)`.
- `lib/api/itunes.ts`: gọi `https://itunes.apple.com/search` với `country=vn`, `entity=song`, `limit=25`, `term`.
- `normalizeItunesTrack`: map `trackName` → title, `artistName` → artist, `artworkUrl100` → coverUrl, đổi `100x100bb` thành `600x600bb`. Track thiếu ảnh thì `coverUrl` rỗng.
- Lỗi có kiểu rõ: `RateLimitError` cho HTTP 429, `SearchError` cho lỗi còn lại.
- `features/search-song/hooks/useSongSearch.ts`: TanStack Query, key `['itunes', term]`, `staleTime` 10 phút, `gcTime` 30 phút, `retry: false`. Debounce 400ms, chỉ gọi khi term dài từ 2 ký tự sau khi trim.
- `features/search-song/components/SearchInput.tsx`, `SearchResultRow.tsx`, `AlreadySavedBadge.tsx`.
- `features/add-song/components/AddSheet.tsx`: thêm hai tab `iTunes` (mặc định) và `Nhập tay`. Tab iTunes giữ nguyên form nhập tay ở tab kia.
- Mỗi kết quả một nút `Lưu`. Lưu gọi `songs.add` với title, artist, coverUrl. Lưu xong đổi nút thành `Đã lưu`.
- Bài đã có trong danh sách hiện `Đã lưu` ngay từ đầu. So trùng bằng title + artist, lowercase và trim.
- Trạng thái: đang tìm, không có kết quả, 429, lỗi mạng.
  - Không kết quả: `Không tìm thấy bài nào. Thử từ khoá khác hoặc nhập tay.`
  - 429: thông báo iTunes đang giới hạn request, nút `Thử lại`, không tự retry.
  - Lỗi mạng: thông báo và nút `Thử lại`.

## Xong khi

- Gõ `Sơn Tùng`, sau 400ms thấy kết quả có ảnh bìa và ca sĩ.
- Bấm `Lưu` một bài, bài vào danh sách với ảnh bìa 600×600.
- Mở lại sheet, bài vừa lưu hiện `Đã lưu`.
- Gõ chuỗi 1 ký tự, không có request nào được gọi.
- Gõ chuỗi vô nghĩa, thấy thông báo không có kết quả và đường sang nhập tay.
- Chặn request iTunes trong DevTools, thấy thông báo lỗi và nút thử lại.
- Lưu cùng một bài hai lần không tạo bản ghi thứ hai.

Không viết test.
