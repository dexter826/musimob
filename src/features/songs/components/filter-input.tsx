import { useRef } from 'react'
import { Search, X } from 'lucide-react'

type FilterInputProps = {
  value: string
  onChange: (value: string) => void
}

export function FilterInput({ value, onChange }: FilterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <label htmlFor="library-filter" className="sr-only">
        Tìm bài hoặc nghệ sĩ
      </label>
      <input
        ref={inputRef}
        id="library-filter"
        name="filter"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm bài hoặc nghệ sĩ…"
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
        className="h-11 w-full rounded-lg border border-control-border bg-surface pr-10 pl-9 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:text-[15px] [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value ? (
        <button
          type="button"
          aria-label="Xóa bộ lọc"
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors duration-[160ms] after:absolute after:-inset-1 after:content-[''] hover:bg-secondary hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
