import { useState } from 'react'
import { Shuffle } from 'lucide-react'
import { toast } from 'sonner'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { ErrorAlert } from '@/components/error-alert'
import { SearchField } from '@/components/search-field'
import { Button } from '@/components/ui/button'
import { useSongSearch } from '@/features/catalog'
import {
  CatalogSearchResults,
  DiscoverGrid,
  DiscoverSkeleton,
  useDiscover,
} from '@/features/discover'
import { ManualAddSheet, type NewSong } from '@/features/songs'
import { useAppOutletContext } from '../app-outlet-context'

const DISCOVER_TITLE = 'MusiMOB: Khám phá'

export function DiscoverRoute() {
  useDocumentTitle(DISCOVER_TITLE)
  const { songsState } = useAppOutletContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [isManualAddOpen, setIsManualAddOpen] = useState(false)

  const search = useSongSearch(searchQuery)

  const {
    songs,
    savingTrackId,
    saveSong,
    shuffle,
    isLoading,
    isError,
    error,
    refetch,
  } = useDiscover({
    librarySongs: songsState.songs,
    onAddSong: songsState.addSong,
  })

  async function handleManualAdd(newSong: NewSong) {
    await songsState.addSong(newSong)
    toast.success('Đã lưu bài', { description: newSong.title })
  }

  const isSearching = searchQuery.trim().length > 0

  return (
    <div className="flex flex-1 flex-col pb-12">
      <div className="flex flex-col gap-4 pt-7 pb-5">
        <div className="flex items-end justify-between gap-6 max-md:flex-col max-md:items-stretch max-md:gap-3">
          <div className="min-w-0">
            <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-balance text-foreground max-md:text-[28px]">
              Khám phá
            </h1>
            <p className="mt-1.5 text-xs font-medium text-muted-foreground">
              Tra cứu kho nhạc trực tuyến và đón nhận giai điệu mới
            </p>
          </div>

          {!isSearching ? (
            <Button
              type="button"
              variant="outline"
              onClick={shuffle}
              disabled={isLoading || songs.length === 0}
              className="h-11 shrink-0 gap-2 px-4 text-[13px] font-semibold max-md:w-full"
            >
              <Shuffle aria-hidden="true" className="size-4" />
              Làm mới
            </Button>
          ) : null}
        </div>

        <div className="w-full max-w-xl">
          <SearchField
            id="catalog-search"
            name="catalog-search"
            placeholder="Tìm bài hát, nghệ sĩ từ kho trực tuyến…"
            value={searchQuery}
            onChange={setSearchQuery}
            showClear
            isBusy={search.isDebouncing || search.isLoading}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {isSearching ? (
          <CatalogSearchResults
            term={search.debouncedTerm || searchQuery}
            results={search.data}
            isLoading={search.isLoading || search.isDebouncing}
            isError={search.isError}
            librarySongs={songsState.songs}
            onAddSong={songsState.addSong}
            onOpenManualAdd={() => setIsManualAddOpen(true)}
          />
        ) : isLoading ? (
          <DiscoverSkeleton />
        ) : isError ? (
          <div className="flex flex-1 items-center justify-center px-6 py-16">
            <ErrorAlert
              message={
                error instanceof Error
                  ? error.message
                  : 'Không tải được danh sách bài hát. Thử lại sau.'
              }
              onRetry={() => refetch()}
              className="w-full max-w-[440px]"
            />
          </div>
        ) : (
          <DiscoverGrid
            songs={songs}
            isSavingId={savingTrackId}
            onSave={saveSong}
          />
        )}
      </div>

      <ManualAddSheet
        open={isManualAddOpen}
        onOpenChange={setIsManualAddOpen}
        songs={songsState.songs}
        onAddManual={handleManualAdd}
      />
    </div>
  )
}
