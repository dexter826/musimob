import type { Ref } from 'react'
import { ArrowUpDown, Plus } from 'lucide-react'
import { SearchField } from '@/components/search-field'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { LibrarySortOption } from '../lib/library-sort'

type LibraryToolbarProps = {
  countLabel: string
  filterQuery: string
  onFilterChange: (value: string) => void
  sortOption: LibrarySortOption
  onSortChange: (option: LibrarySortOption) => void
  onManualAdd: () => void
  isLibraryEmpty: boolean
  isSelecting: boolean
  onToggleSelection: () => void
  selectionToggleRef: Ref<HTMLButtonElement>
}

export function LibraryToolbar({
  countLabel,
  filterQuery,
  onFilterChange,
  sortOption,
  onSortChange,
  onManualAdd,
  isLibraryEmpty,
  isSelecting,
  onToggleSelection,
  selectionToggleRef,
}: LibraryToolbarProps) {
  return (
    <div className="flex items-end justify-between gap-6 pt-7 pb-5 max-md:flex-col max-md:items-stretch max-md:gap-3">
      <div className="min-w-0">
        <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-foreground max-md:text-[28px]">
          Thư viện
        </h1>
        <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
          {countLabel}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 max-md:w-full">
        <div className="w-[240px] min-w-0 max-md:flex-1">
          <SearchField
            id="library-filter"
            name="filter"
            placeholder="Lọc bài hát…"
            value={filterQuery}
            onChange={onFilterChange}
            showClear
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Sắp xếp danh sách bài hát"
              title="Sắp xếp danh sách bài hát"
              className="h-11 w-11 shrink-0"
            >
              <ArrowUpDown aria-hidden="true" className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuRadioGroup
              value={sortOption}
              onValueChange={(val) => onSortChange(val as LibrarySortOption)}
            >
              <DropdownMenuRadioItem value="newest">
                Mới lưu gần nhất
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title-asc">
                Tên bài hát (A → Z)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="artist-asc">
                Tên nghệ sĩ (A → Z)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {isLibraryEmpty ? null : (
          <Button
            type="button"
            variant="ghost"
            ref={selectionToggleRef}
            onClick={onToggleSelection}
            aria-pressed={isSelecting}
            className="h-11 px-3 text-[13px] font-semibold"
          >
            {isSelecting ? 'Hủy' : 'Chọn'}
          </Button>
        )}
        {isSelecting ? null : (
          <Button
            type="button"
            onClick={onManualAdd}
            className="hidden h-11 gap-1.5 px-3.5 text-[13px] font-semibold md:inline-flex"
          >
            <Plus aria-hidden="true" className="size-4" />
            Nhập bài
          </Button>
        )}
      </div>
    </div>
  )
}
