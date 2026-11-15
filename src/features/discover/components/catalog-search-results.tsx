import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ErrorAlert } from '@/components/error-alert'
import { SearchResultRow, type CatalogTrack } from '@/features/catalog'
import type { NewSong, Song } from '@/features/songs'
import { getSongKey } from '@/lib/song-key'

type CatalogSearchResultsProps = {
  term: string
  results: CatalogTrack[] | undefined
  isLoading: boolean
  isError: boolean
  librarySongs: Song[]
  onAddSong: (song: NewSong) => Promise<string | void>
  onOpenManualAdd: () => void
}

export function CatalogSearchResults({
  term,
  results,
  isLoading,
  isError,
  librarySongs,
  onAddSong,
  onOpenManualAdd,
}: CatalogSearchResultsProps) {
  const [savingId, setSavingId] = useState<number | null>(null)

  const savedSet = new Set(
    librarySongs.map((s) => s.sourceId ?? getSongKey(s.title, s.artist)),
  )

  async function handleSave(track: CatalogTrack) {
    setSavingId(track.trackId)
    try {
      await onAddSong({
        title: track.title,
        artist: track.artist,
        coverUrl: track.coverUrl,
        previewUrl: track.previewUrl,
        sourceId: track.trackId,
      })
      toast.success('Đã lưu vào Thư viện', {
        description: `${track.title} · ${track.artist}`,
      })
    } catch {
      toast.error('Không lưu được bài hát. Thử lại sau.')
    } finally {
      setSavingId(null)
    }
  }

  if (term.trim().length < 2) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Nhập ít nhất 2 ký tự để tìm kiếm bài hát từ kho trực tuyến.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Spinner aria-hidden="true" className="size-4" />
        Đang tìm kiếm bài hát…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-8">
        <ErrorAlert message="Không tìm được bài hát do lỗi kết nối. Kiểm tra đường truyền rồi thử lại." />
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <p className="max-w-[340px] text-sm leading-[1.6] text-muted-foreground">
          Không tìm thấy bài hát nào cho từ khóa &ldquo;{term}&rdquo;.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={onOpenManualAdd}
          className="h-11 gap-2 px-4 text-[13px] font-semibold"
        >
          <Plus aria-hidden="true" className="size-4" />
          Nhập bài thủ công
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-2">
      <p className="mb-3 text-xs font-medium text-muted-foreground tabular-nums">
        {results.length} kết quả từ kho trực tuyến
      </p>
      <ul className="divide-y divide-border" role="list">
        {results.map((track) => {
          const isSaved =
            savedSet.has(track.trackId) ||
            savedSet.has(getSongKey(track.title, track.artist))

          return (
            <SearchResultRow
              key={track.trackId}
              result={track}
              isSaved={isSaved}
              isSaving={savingId === track.trackId}
              onSave={() => handleSave(track)}
            />
          )
        })}
      </ul>
    </div>
  )
}
