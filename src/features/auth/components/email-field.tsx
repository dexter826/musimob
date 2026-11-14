import { useId } from 'react'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type EmailFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function EmailField({ value, onChange, error }: EmailFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={fieldId} className="text-xs font-medium">
        Email
      </FieldLabel>
      <Input
        id={fieldId}
        type="email"
        inputMode="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="email"
        placeholder="nguyenvana@domain.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-11 bg-surface text-base md:text-[15px]"
      />
      {error ? (
        <FieldError id={errorId} className="text-xs">
          {error}
        </FieldError>
      ) : null}
    </Field>
  )
}
