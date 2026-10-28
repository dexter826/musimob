# Cách gọi iTunes trong 20 req/phút

Type: grilling
Status: resolved

## Question

Thiết kế lớp gọi iTunes Search API thế nào để không bị chặn?

Cần chốt:

- **Debounce**: ô tìm kiếm chờ bao nhiêu ms trước khi gọi?
- **Cache**: cache kết quả ở đâu (memory, localStorage), TTL bao lâu? Query nào được coi là trùng?
- **Khi gặp 429**: hiện gì cho người dùng? Có tự retry không? Backoff ra sao?
- **`country`**: cố định `vn`, hay cho chọn?
- **Chọn kết quả**: lấy thẳng từ kết quả iTunes, hay lọc trùng theo tên + ca sĩ trước khi hiện?
- **Nhập tay**: khi API không tìm ra bài, luồng nhập tay mở từ đâu?

Ràng buộc: 20 req/phút, tối đa 200 kết quả mỗi query. Một người dùng nên hiếm khi chạm trần, nhưng search-as-you-type thì dễ chạm.

Không phụ thuộc nền tảng hay stack.

## Answer

Chốt:

| Mục | Quyết định |
| --- | --- |
| Debounce | 400ms, chỉ gọi khi query dài ≥ 2 ký tự |
| Cache | `staleTime` 10 phút, `gcTime` 30 phút, cache trong memory của TanStack Query |
| Gặp 429 | Không tự retry. Hiện "Đợi vài giây" kèm nút thử lại |
| `country` | Cố định `vn`. Không cho chọn, không fallback |
| Bài đã lưu | Vẫn hiện trong kết quả, kèm nhãn "Đã lưu", không thêm trùng |
| Bài thiếu | Nhập tay, làm ở ticket bố cục |

Cấu hình TanStack Query tương ứng:

```ts
useQuery({
  queryKey: ['itunes', debouncedQuery],
  queryFn: () => searchItunes(debouncedQuery),
  enabled: debouncedQuery.length >= 2,
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: false,
})
```

Lý do:

- **400ms**: 20 req/phút = 1 req mỗi 3 giây. 400ms chặn phần lớn gõ nhanh. Query 1 ký tự trả rác và tốn quota.
- **Không retry 429**: tự retry vòng lặp chỉ đốt thêm quota. TanStack Query mặc định không retry 4xx — giữ nguyên hành vi đó.
- **`country=vn` cố định**: đã test store VN trả cả catalog quốc tế — Queen `country: VNM`, BTS genre `K-Pop`, IU có kết quả. Bài chặn vùng thì nhập tay, không cần nhánh fallback.
- **Nhãn "Đã lưu"**: ẩn bài đã có khiến người dùng tưởng API thiếu bài. Cho thêm trùng tạo rác.
