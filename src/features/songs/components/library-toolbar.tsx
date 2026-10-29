import { Plus } from 'lucide-react'
import { SearchField } from '@/components/search-field'
import { Button } from '@/components/ui/button'

type LibraryToolbarProps = {
  countLabel: string
  filterQuery: string
  onFilterChange: (value: string) => void
  onAdd: () => void
  isLibraryEmpty: boolean
}

export function LibraryToolbar({
  countLabel,
  filterQuery,
  onFilterChange,
  onAdd,
  isLibraryEmpty,
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
        <div className="w-[280px] max-md:w-full">
          <SearchField
            id="library-filter"
            name="filter"
            value={filterQuery}
            onChange={onFilterChange}
            showClear
          />
        </div>
        {isLibraryEmpty ? null : (
          <Button
            type="button"
            onClick={onAdd}
            className="hidden h-11 gap-1.5 px-3.5 text-[13px] font-semibold md:inline-flex"
          >
            <Plus aria-hidden="true" className="size-4" />
            Thêm bài
          </Button>
        )}
      </div>
    </div>
  )
}
