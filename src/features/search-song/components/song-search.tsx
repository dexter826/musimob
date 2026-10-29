import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useAudioPreview } from '@/lib/audio-preview-context'
import type { NewSong, SearchResult, Song } from '@/lib/api/types'
import { RateLimitError, SearchTimeoutError } from '@/lib/api/catalog'
import { getSongKey } from '@/lib/song-key'
import { useSongSearch } from '../hooks/use-song-search'
import { SearchInput } from './search-input'
import { SearchResultRow } from './search-result-row'

type SongSearchProps = {
  term: string
  onTermChange: (term: string) => void
  songs: Song[]
  onAdd: (song: NewSong) => Promise<void>
  onSwitchToManual: (term: string) => void
  autoFocus?: boolean
  focusToken?: number
}

function SearchHint() {
  return (
    <p className="py-10 text-center text-[13px] leading-[1.5] text-muted-foreground">
      Nhập tên bài hoặc ca sĩ để tìm.
    </p>
  )
}

function SearchLoading() {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 py-10 text-[13px] text-muted-foreground"
    >
      <Spinner aria-hidden="true" className="size-4" />
      Đang tìm…
    </div>
  )
}

function SearchErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <Card className="flex flex-col items-center gap-0 px-4 py-8 text-center">
      <ErrorAlert message={message} className="max-w-[320px] text-left" />
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-4 h-9 px-3 text-[12.5px] font-semibold"
      >
        Thử lại
      </Button>
    </Card>
  )
}

function NoResults({ onSwitchToManual }: { onSwitchToManual: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <p className="max-w-[300px] text-[13px] leading-[1.55] text-muted-foreground">
        Không tìm thấy bài nào. Thử từ khoá khác hoặc nhập tay.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={onSwitchToManual}
        className="h-9 px-3 text-[12.5px] font-semibold"
      >
        Nhập tay
      </Button>
    </div>
  )
}

export function SongSearch({
  term,
  onTermChange,
  songs,
  onAdd,
  onSwitchToManual,
  autoFocus = false,
  focusToken,
}: SongSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocusToken = useRef(focusToken)
  const { stop } = useAudioPreview()
  const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set())
  const [savingIds, setSavingIds] = useState<Set<number>>(() => new Set())
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!autoFocus) return

    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [autoFocus])

  useEffect(() => {
    if (focusToken === undefined || focusToken === lastFocusToken.current) {
      return
    }
    lastFocusToken.current = focusToken
    inputRef.current?.focus()
  }, [focusToken])

  const {
    data,
    error,
    isPending,
    isFetching,
    isDebouncing,
    debouncedTerm,
    refetch,
  } = useSongSearch(term)

  const existingIds = useMemo(
    () =>
      new Set(
        songs.flatMap((song) =>
          song.sourceId === undefined ? [] : [song.sourceId],
        ),
      ),
    [songs],
  )

  const existingKeys = useMemo(
    () =>
      new Set(
        songs
          .filter((song) => song.sourceId === undefined)
          .map((song) => getSongKey(song.title, song.artist)),
      ),
    [songs],
  )

  const trimmedTerm = term.trim()
  const hasQuery = debouncedTerm.length >= 2
  const isSearching = trimmedTerm.length >= 2 && (isFetching || isDebouncing)
  const isResultSaved = (result: SearchResult) =>
    existingIds.has(result.trackId) ||
    savedIds.has(result.trackId) ||
    existingKeys.has(getSongKey(result.title, result.artist))

  function handleTermChange(value: string) {
    if (value !== term) stop()
    onTermChange(value)
    setSaveError(null)
  }

  async function handleSave(result: SearchResult) {
    const { trackId } = result
    if (isResultSaved(result) || savingIds.has(trackId)) {
      return
    }

    setSavingIds((current) => new Set(current).add(trackId))
    setSaveError(null)

    try {
      await onAdd({
        title: result.title,
        artist: result.artist,
        coverUrl: result.coverUrl,
        previewUrl: result.previewUrl,
        sourceId: trackId,
      })
      setSavedIds((current) => new Set(current).add(trackId))
    } catch (saveFailure) {
      setSaveError(
        saveFailure instanceof Error
          ? saveFailure.message
          : 'Không lưu được bài. Thử lại.',
      )
    } finally {
      setSavingIds((current) => {
        const next = new Set(current)
        next.delete(trackId)
        return next
      })
    }
  }

  let errorMessage = 'Không tìm được. Kiểm tra mạng rồi thử lại.'
  if (error instanceof RateLimitError) {
    errorMessage = 'Tìm kiếm đang bị giới hạn. Đợi vài giây rồi thử lại.'
  } else if (error instanceof SearchTimeoutError) {
    errorMessage = error.message
  }

  let resultsBody: ReactNode
  if (trimmedTerm.length < 2) {
    resultsBody = <SearchHint />
  } else if (error && hasQuery && !isDebouncing && !isFetching) {
    resultsBody = (
      <SearchErrorState message={errorMessage} onRetry={() => void refetch()} />
    )
  } else if (!hasQuery || isPending || !data) {
    resultsBody = <SearchLoading />
  } else if (data.length === 0) {
    resultsBody = (
      <NoResults onSwitchToManual={() => onSwitchToManual(trimmedTerm)} />
    )
  } else {
    resultsBody = (
      <ul className="flex flex-col">
        {data.map((result) => (
          <SearchResultRow
            key={result.trackId}
            result={result}
            isSaved={isResultSaved(result)}
            isSaving={savingIds.has(result.trackId)}
            onSave={() => void handleSave(result)}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <SearchInput
        inputRef={inputRef}
        value={term}
        onChange={handleTermChange}
        isSearching={isSearching}
      />

      {saveError ? <ErrorAlert message={saveError} /> : null}

      <div className="min-h-0 flex-1 overflow-y-auto">{resultsBody}</div>
    </div>
  )
}
