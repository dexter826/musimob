import type { Ref } from 'react'
import { Search } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
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
    <InputGroup className="h-11 rounded-full bg-secondary/60">
      <InputGroupAddon>
        <Search aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm bài hát hoặc ca sĩ"
        aria-label="Tìm bài hát hoặc ca sĩ"
        aria-busy={isSearching}
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 text-base md:text-sm"
      />
      {isSearching ? (
        <InputGroupAddon align="inline-end">
          <Spinner aria-hidden="true" className="size-4" />
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}
