import { useId, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type PasswordFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete: string
  placeholder?: string
}

export function PasswordField({
  label,
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={fieldId} className="text-xs font-medium">
        {label}
      </FieldLabel>
      <div className="relative">
        <Input
          id={fieldId}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-11 bg-surface pr-11 text-base md:text-[15px]"
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          className="absolute top-0 right-0 grid size-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          {isVisible ? (
            <EyeOffIcon aria-hidden="true" className="size-4" />
          ) : (
            <EyeIcon aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
      {error ? (
        <FieldError id={errorId} className="text-xs">
          {error}
        </FieldError>
      ) : null}
    </Field>
  )
}
