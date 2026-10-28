import { useRef, useState, type FormEvent } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import type { NewSong } from '@/lib/api/types'

type ManualFormProps = {
  onAdd: (song: NewSong) => Promise<void>
  onDone: () => void
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

export function ManualForm({ onAdd, onDone }: ManualFormProps) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const artistRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

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
      await onAdd({
        title: title.trim(),
        artist: artist.trim(),
        coverUrl: trimmedCoverUrl,
      })
      setTitle('')
      setArtist('')
      setCoverUrl('')
      onDone()
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
          <FieldLabel htmlFor="song-title" className="text-[13px]">
            Tên bài
          </FieldLabel>
          <Input
            id="song-title"
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
            aria-describedby={errors.title ? 'song-title-error' : undefined}
            className="h-11 text-base md:text-sm"
          />
          {errors.title ? (
            <FieldError id="song-title-error" className="text-[12px]">
              {errors.title}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.artist)}>
          <FieldLabel htmlFor="song-artist" className="text-[13px]">
            Ca sĩ
          </FieldLabel>
          <Input
            id="song-artist"
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
            aria-describedby={errors.artist ? 'song-artist-error' : undefined}
            className="h-11 text-base md:text-sm"
          />
          {errors.artist ? (
            <FieldError id="song-artist-error" className="text-[12px]">
              {errors.artist}
            </FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(errors.coverUrl)}>
          <FieldLabel htmlFor="song-cover" className="text-[13px]">
            URL ảnh bìa
          </FieldLabel>
          <Input
            id="song-cover"
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
                ? 'song-cover-error song-cover-description'
                : 'song-cover-description'
            }
            className="h-11 text-base md:text-sm"
          />
          {errors.coverUrl ? (
            <FieldError id="song-cover-error" className="text-[12px]">
              {errors.coverUrl}
            </FieldError>
          ) : null}
          <p
            id="song-cover-description"
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
            Đang lưu…
          </>
        ) : (
          'Lưu bài'
        )}
      </Button>
    </form>
  )
}
