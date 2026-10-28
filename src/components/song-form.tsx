import { useId, useRef, useState, type FormEvent } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export type SongFormValues = {
  title: string
  artist: string
  coverUrl: string
}

type SongFormProps = {
  initialValues?: SongFormValues
  submitLabel: string
  pendingLabel: string
  resetOnSuccess?: boolean
  onSubmit: (values: SongFormValues) => Promise<void>
  onSuccess: () => void
}

type FormErrors = {
  title?: string
  artist?: string
  coverUrl?: string
}

function isValidCoverUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function SongForm({
  initialValues,
  submitLabel,
  pendingLabel,
  resetOnSuccess = true,
  onSubmit,
  onSuccess,
}: SongFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [artist, setArtist] = useState(initialValues?.artist ?? '')
  const [coverUrl, setCoverUrl] = useState(initialValues?.coverUrl ?? '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const artistRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const fieldId = useId()
  const titleId = `${fieldId}-title`
  const artistId = `${fieldId}-artist`
  const coverId = `${fieldId}-cover`
  const titleErrorId = `${fieldId}-title-error`
  const artistErrorId = `${fieldId}-artist-error`
  const coverErrorId = `${fieldId}-cover-error`
  const coverDescriptionId = `${fieldId}-cover-description`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) return

    const trimmedCoverUrl = coverUrl.trim()
    const nextErrors: FormErrors = {}
    if (!title.trim()) nextErrors.title = 'Nhập tên bài.'
    if (!artist.trim()) nextErrors.artist = 'Nhập tên ca sĩ.'
    if (trimmedCoverUrl && !isValidCoverUrl(trimmedCoverUrl)) {
      nextErrors.coverUrl = 'URL ảnh bìa không hợp lệ.'
    }

    setErrors(nextErrors)
    setSubmitError(null)

    if (nextErrors.title || nextErrors.artist || nextErrors.coverUrl) return

    setIsSaving(true)

    try {
      await onSubmit({
        title: title.trim(),
        artist: artist.trim(),
        coverUrl: trimmedCoverUrl,
      })
      if (resetOnSuccess) {
        setTitle(initialValues?.title ?? '')
        setArtist(initialValues?.artist ?? '')
        setCoverUrl(initialValues?.coverUrl ?? '')
      }
      onSuccess()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Không lưu được bài. Thử lại.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-4">
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor={titleId} className="text-[13px]">
            Tên bài
          </FieldLabel>
          <Input
            id={titleId}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setErrors((current) => ({ ...current, title: undefined }))
              setSubmitError(null)
            }}
            required
            autoComplete="off"
            enterKeyHint="next"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                event.preventDefault()
                artistRef.current?.focus()
              }
            }}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? titleErrorId : undefined}
            className="h-11 text-base md:text-sm"
          />
          {errors.title ? (
            <FieldError id={titleErrorId} className="text-[12px]">
              {errors.title}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.artist)}>
          <FieldLabel htmlFor={artistId} className="text-[13px]">
            Ca sĩ
          </FieldLabel>
          <Input
            id={artistId}
            ref={artistRef}
            value={artist}
            onChange={(event) => {
              setArtist(event.target.value)
              setErrors((current) => ({ ...current, artist: undefined }))
              setSubmitError(null)
            }}
            required
            autoComplete="off"
            enterKeyHint="next"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                event.preventDefault()
                coverRef.current?.focus()
              }
            }}
            aria-invalid={Boolean(errors.artist)}
            aria-describedby={errors.artist ? artistErrorId : undefined}
            className="h-11 text-base md:text-sm"
          />
          {errors.artist ? (
            <FieldError id={artistErrorId} className="text-[12px]">
              {errors.artist}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.coverUrl)}>
          <FieldLabel htmlFor={coverId} className="text-[13px]">
            URL ảnh bìa
          </FieldLabel>
          <Input
            id={coverId}
            ref={coverRef}
            type="url"
            inputMode="url"
            value={coverUrl}
            onChange={(event) => {
              setCoverUrl(event.target.value)
              setErrors((current) => ({ ...current, coverUrl: undefined }))
              setSubmitError(null)
            }}
            autoComplete="off"
            enterKeyHint="done"
            aria-invalid={Boolean(errors.coverUrl)}
            aria-describedby={
              errors.coverUrl
                ? `${coverErrorId} ${coverDescriptionId}`
                : coverDescriptionId
            }
            className="h-11 text-base md:text-sm"
          />
          {errors.coverUrl ? (
            <FieldError id={coverErrorId} className="text-[12px]">
              {errors.coverUrl}
            </FieldError>
          ) : null}
          <p
            id={coverDescriptionId}
            className="text-[12px] leading-[1.4] text-muted-foreground"
          >
            Không bắt buộc.
          </p>
        </Field>
      </FieldGroup>

      {submitError ? (
        <Alert
          variant="destructive"
          className="mt-4 border-destructive/30 bg-destructive/10"
        >
          <AlertDescription className="text-[12.5px] leading-[1.5]">
            {submitError}
          </AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="submit"
        disabled={isSaving}
        aria-busy={isSaving}
        className="mt-5 h-11 w-full gap-2 text-[13.5px] font-semibold"
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
