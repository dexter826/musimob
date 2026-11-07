type SelectionCheckboxProps = {
  label: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export function SelectionCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
}: SelectionCheckboxProps) {
  return (
    <label
      onClick={(event) => event.stopPropagation()}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg"
    >
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="size-4 accent-primary"
      />
    </label>
  )
}
