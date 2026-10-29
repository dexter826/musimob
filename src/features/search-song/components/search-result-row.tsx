import { PreviewButton } from '@/components/preview-button'
import { SongCover } from '@/components/song-cover'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { SearchResult } from '@/lib/api/types'
import { catalogPreviewKey } from '@/lib/preview-key'
import { AlreadySavedBadge } from './already-saved-badge'

type SearchResultRowProps = {
  result: SearchResult
  isSaved: boolean
  isSaving: boolean
  onSave: () => void
}

export function SearchResultRow({
  result,
  isSaved,
  isSaving,
  onSave,
}: SearchResultRowProps) {
  return (
    <li className="flex items-center gap-3 py-2">
      <div className="relative size-12 shrink-0">
        <SongCover src={result.coverUrl} className="size-12" />
        <PreviewButton
          previewUrl={result.previewUrl}
          playKey={catalogPreviewKey(result.trackId)}
          title={result.title}
          artist={result.artist}
          className="absolute right-1 bottom-1"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] leading-[1.35] font-semibold">
          {result.title}
        </p>
        <p className="truncate text-[12.5px] leading-[1.4] text-muted-foreground">
          {result.artist}
        </p>
      </div>

      {isSaved ? (
        <AlreadySavedBadge />
      ) : (
        <Button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          aria-busy={isSaving}
          aria-label={
            isSaving
              ? `Đang lưu ${result.title}`
              : `Lưu ${result.title}, ${result.artist}`
          }
          className="h-11 min-w-[72px] gap-1.5 px-3 text-[13px] font-semibold"
        >
          {isSaving ? (
            <Spinner aria-hidden="true" className="size-3.5" />
          ) : null}
          {isSaving ? 'Đang lưu…' : 'Lưu'}
        </Button>
      )}
    </li>
  )
}
