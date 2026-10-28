import { useRef } from 'react'
import { Search, X } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

type FilterInputProps = {
  value: string
  onChange: (value: string) => void
}

export function FilterInput({ value, onChange }: FilterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputGroup className="mb-4 h-11 bg-secondary/60">
      <InputGroupAddon>
        <Search aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm trong danh sách"
        aria-label="Lọc danh sách theo tên bài hoặc ca sĩ"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 text-base md:text-sm"
      />
      {value ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Xoá bộ lọc"
            onClick={() => {
              onChange('')
              inputRef.current?.focus()
            }}
          >
            <X aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}
