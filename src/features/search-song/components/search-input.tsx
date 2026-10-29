import type { Ref } from 'react'
import { Search } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  isSearching: boolean
  inputRef?: Ref<HTMLInputElement>
}

export function SearchInput({
  value,
  onChange,
  isSearching,
  inputRef,
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <label htmlFor="song-search" className="sr-only">
        Tìm bài hoặc nghệ sĩ
      </label>
      <input
        ref={inputRef}
        id="song-search"
        name="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm bài hoặc nghệ sĩ…"
        aria-busy={isSearching}
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
        className="h-11 w-full rounded-lg border border-control-border bg-surface pr-10 pl-9 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:text-[15px] [&::-webkit-search-cancel-button]:appearance-none"
      />
      {isSearching ? (
        <Spinner
          aria-hidden="true"
          className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      ) : null}
    </div>
  )
}
