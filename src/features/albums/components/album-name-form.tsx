import { useId, useRef, useState, type FormEvent } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import type { Album } from '@/lib/api/types'
import { getAlbumNameError, normalizeAlbumName } from '../lib/album-name'

type AlbumNameFormProps = {
  albums: Album[]
  initialName?: string
  ignoreAlbumId?: string
  submitLabel: string
  pendingLabel: string
  fallbackErrorMessage: string
  autoFocus?: boolean
  onSubmit: (name: string) => Promise<void>
}

export function AlbumNameForm({
  albums,
  initialName = '',
  ignoreAlbumId,
  submitLabel,
  pendingLabel,
  fallbackErrorMessage,
  autoFocus = false,
  onSubmit,
}: AlbumNameFormProps) {
  const [name, setName] = useState(initialName)
  const [nameError, setNameError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const fieldId = useId()
  const inputId = `${fieldId}-name`
  const errorId = `${fieldId}-name-error`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) return

    const nextError = getAlbumNameError(name, albums, ignoreAlbumId)
    setNameError(nextError)
    setSubmitError(null)

    if (nextError) {
      inputRef.current?.focus()
      return
    }

    setIsSaving(true)

    try {
      await onSubmit(normalizeAlbumName(name))
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : fallbackErrorMessage,
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-4">
        <Field data-invalid={Boolean(nameError)}>
          <FieldLabel htmlFor={inputId} className="text-xs font-medium">
            Tên album
          </FieldLabel>
          <Input
            id={inputId}
            ref={inputRef}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setNameError(null)
              setSubmitError(null)
            }}
            autoFocus={autoFocus}
            required
            autoComplete="off"
            enterKeyHint="done"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? errorId : undefined}
            className="h-11 bg-surface text-base md:text-[15px]"
          />
          {nameError ? (
            <FieldError id={errorId} className="text-xs">
              {nameError}
            </FieldError>
          ) : null}
        </Field>
      </FieldGroup>

      {submitError ? (
        <ErrorAlert message={submitError} className="mt-4" />
      ) : null}

      <Button
        type="submit"
        disabled={isSaving}
        aria-busy={isSaving}
        className="mt-5 h-11 w-full gap-2 text-[13px] font-semibold"
      >
        {isSaving ? (
          <>
            <Spinner aria-hidden="true" className="size-4" />
            {pendingLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  )
}
