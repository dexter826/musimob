import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { SongCover } from '@/components/song-cover'
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
  focusArtistOnMount?: boolean
  focusSignal?: number
  validate?: (values: SongFormValues) => string | null
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
  focusArtistOnMount = false,
  focusSignal,
  validate,
  onSubmit,
  onSuccess,
}: SongFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [artist, setArtist] = useState(initialValues?.artist ?? '')
  const [coverUrl, setCoverUrl] = useState(initialValues?.coverUrl ?? '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [coverFailed, setCoverFailed] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
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
  const lastFocusSignal = useRef(focusSignal)

  useEffect(() => {
    if (focusSignal === undefined || focusSignal === lastFocusSignal.current) {
      return
    }
    lastFocusSignal.current = focusSignal
    const target = focusArtistOnMount ? artistRef.current : titleRef.current
    target?.focus()
  }, [focusSignal, focusArtistOnMount])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) return

    const trimmedCoverUrl = coverUrl.trim()
    const nextErrors: FormErrors = {}
    if (!title.trim()) nextErrors.title = 'Nhập tên bài.'
    if (!artist.trim()) nextErrors.artist = 'Nhập tên nghệ sĩ.'
    if (trimmedCoverUrl && !isValidCoverUrl(trimmedCoverUrl)) {
      nextErrors.coverUrl = 'URL ảnh bìa không hợp lệ.'
    }

    setErrors(nextErrors)
    setSubmitError(null)
    setFormError(null)

    if (nextErrors.title || nextErrors.artist || nextErrors.coverUrl) return

    const validationError = validate?.({
      title: title.trim(),
      artist: artist.trim(),
      coverUrl: trimmedCoverUrl,
    })
    if (validationError) {
      setFormError(validationError)
      return
    }

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

  const previewUrl = coverUrl.trim()
  const canPreview = previewUrl !== '' && isValidCoverUrl(previewUrl)

  function clearFieldError(field: keyof FormErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitError(null)
    setFormError(null)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-4">
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor={titleId} className="text-xs font-medium">
            Tên bài
          </FieldLabel>
          <Input
            id={titleId}
            ref={titleRef}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              clearFieldError('title')
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
            className="h-11 bg-surface text-base md:text-[15px]"
          />
          {errors.title ? (
            <FieldError id={titleErrorId} className="text-xs">
              {errors.title}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.artist)}>
          <FieldLabel htmlFor={artistId} className="text-xs font-medium">
            Nghệ sĩ
          </FieldLabel>
          <Input
            id={artistId}
            ref={artistRef}
            autoFocus={focusArtistOnMount}
            value={artist}
            onChange={(event) => {
              setArtist(event.target.value)
              clearFieldError('artist')
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
            className="h-11 bg-surface text-base md:text-[15px]"
          />
          {errors.artist ? (
            <FieldError id={artistErrorId} className="text-xs">
              {errors.artist}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.coverUrl)}>
          <FieldLabel htmlFor={coverId} className="text-xs font-medium">
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
              setCoverFailed(false)
              clearFieldError('coverUrl')
            }}
            autoComplete="off"
            enterKeyHint="done"
            aria-invalid={Boolean(errors.coverUrl)}
            aria-describedby={
              errors.coverUrl
                ? `${coverErrorId} ${coverDescriptionId}`
                : coverDescriptionId
            }
            className="h-11 bg-surface text-base md:text-[15px]"
          />
          {errors.coverUrl ? (
            <FieldError id={coverErrorId} className="text-xs">
              {errors.coverUrl}
            </FieldError>
          ) : null}
          <div className="flex items-center gap-2.5">
            {canPreview ? (
              <SongCover
                key={previewUrl}
                src={previewUrl}
                onError={() => setCoverFailed(true)}
                className="size-11"
              />
            ) : null}
            <p
              id={coverDescriptionId}
              className="text-xs leading-[1.4] text-muted-foreground"
            >
              {coverFailed && canPreview
                ? 'Không tải được ảnh bìa.'
                : 'Không bắt buộc.'}
            </p>
          </div>
        </Field>
      </FieldGroup>

      {formError ? (
        <p role="alert" className="mt-3 text-xs leading-[1.4] text-danger">
          {formError}
        </p>
      ) : null}

      {submitError ? (
        <div
          role="alert"
          className="mt-4 border-l-[3px] border-danger bg-surface-2 px-3 py-2.5 text-sm leading-[1.6] text-danger"
        >
          {submitError}
        </div>
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
