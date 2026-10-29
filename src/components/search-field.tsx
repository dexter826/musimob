import { useRef, type Ref } from 'react'
import { Search, X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

type SearchFieldProps = {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  inputRef?: Ref<HTMLInputElement>
  isBusy?: boolean
  showClear?: boolean
}

export function SearchField({
  id,
  name,
  value,
  onChange,
  inputRef,
  isBusy = false,
  showClear = false,
}: SearchFieldProps) {
  const internalRef = useRef<HTMLInputElement>(null)

  function setInputRef(node: HTMLInputElement | null) {
    internalRef.current = node
    if (typeof inputRef === 'function') inputRef(node)
    else if (inputRef) inputRef.current = node
  }

  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <label htmlFor={id} className="sr-only">
        Tìm bài hoặc nghệ sĩ
      </label>
      <input
        ref={setInputRef}
        id={id}
        name={name}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm bài hoặc nghệ sĩ…"
        aria-busy={isBusy || undefined}
        autoComplete="off"
        enterKeyHint="search"
        spellCheck={false}
        className="h-11 w-full rounded-lg border border-control-border bg-surface pr-10 pl-9 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none md:text-[15px] [&::-webkit-search-cancel-button]:appearance-none"
      />
      {isBusy ? (
        <Spinner
          aria-hidden="true"
          className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      ) : null}
      {showClear && value ? (
        <button
          type="button"
          aria-label="Xóa bộ lọc"
          onClick={() => {
            onChange('')
            internalRef.current?.focus()
          }}
          className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors duration-[160ms] after:absolute after:-inset-1 after:content-[''] hover:bg-secondary hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
