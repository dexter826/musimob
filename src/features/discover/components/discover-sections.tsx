import { cn } from 'cn'
import type { CatalogTrack } from '@/features/catalog'
import { getSongKey } from '@/lib/song-key'
import { DiscoverCard } from './discover-card'
import { HorizontalScrollRow } from './horizontal-scroll-row'
import type {
  DISCOVER_GENRES,
  DiscoverGenreId,
} from '../hooks/use-discover-sections'

type DiscoverSectionsProps = {
  trendingTracks: CatalogTrack[]
  forYouTracks: CatalogTrack[]
  hasArtistsInLibrary: boolean
  genreTracks: CatalogTrack[]
  genres: typeof DISCOVER_GENRES
  selectedGenreId: DiscoverGenreId
  onSelectGenre: (genreId: DiscoverGenreId) => void
  isGenreLoading?: boolean
  savedSet: Set<string | number>
  savingTrackId: number | null
  onSaveSong: (song: CatalogTrack) => void
}

function RowSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="flex w-[144px] shrink-0 flex-col sm:w-[160px] md:w-[172px]"
          aria-hidden="true"
        >
          <div className="aspect-square w-full animate-pulse rounded-sm bg-surface-2" />
          <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-surface-2" />
          <div className="mt-1 h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        </li>
      ))}
    </>
  )
}

function isTrackSaved(track: CatalogTrack, set: Set<string | number>): boolean {
  return (
    set.has(track.trackId) ||
    set.has(String(track.trackId)) ||
    set.has(getSongKey(track.title, track.artist))
  )
}

export function DiscoverSections({
  trendingTracks,
  forYouTracks,
  hasArtistsInLibrary,
  genreTracks,
  genres,
  selectedGenreId,
  onSelectGenre,
  isGenreLoading = false,
  savedSet,
  savingTrackId,
  onSaveSong,
}: DiscoverSectionsProps) {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* 1. Bài hát thịnh hành */}
      <HorizontalScrollRow
        title="Bài hát thịnh hành"
        subtitle="Top ca khúc nổi bật nhất hiện nay trên bảng xếp hạng Việt Nam"
      >
        {trendingTracks.length > 0 ? (
          trendingTracks.map((song, index) => (
            <DiscoverCard
              key={song.trackId}
              song={song}
              index={index}
              isSaved={isTrackSaved(song, savedSet)}
              isSaving={savingTrackId === song.trackId}
              onSave={onSaveSong}
              className="w-[144px] shrink-0 sm:w-[160px] md:w-[172px]"
            />
          ))
        ) : (
          <RowSkeleton />
        )}
      </HorizontalScrollRow>

      {/* 2. Dành cho bạn (nếu thư viện có nghệ sĩ) */}
      {hasArtistsInLibrary && forYouTracks.length > 0 ? (
        <HorizontalScrollRow
          title="Dành cho bạn"
          subtitle="Các bài hát khác từ nghệ sĩ có trong Thư viện của bạn"
        >
          {forYouTracks.map((song, index) => (
            <DiscoverCard
              key={song.trackId}
              song={song}
              index={index}
              isSaved={isTrackSaved(song, savedSet)}
              isSaving={savingTrackId === song.trackId}
              onSave={onSaveSong}
              className="w-[144px] shrink-0 sm:w-[160px] md:w-[172px]"
            />
          ))}
        </HorizontalScrollRow>
      ) : null}

      {/* 3. Khám phá theo thể loại */}
      <HorizontalScrollRow
        title="Khám phá theo thể loại"
        subtitle="Các giai điệu được tuyển chọn theo từng dòng nhạc quen thuộc"
        headerExtra={
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {genres.map((genre) => {
              const isSelected = genre.id === selectedGenreId
              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => onSelectGenre(genre.id)}
                  className={cn(
                    'h-11 shrink-0 rounded-md px-4 text-[13px] font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-rule bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground',
                  )}
                >
                  {genre.label}
                </button>
              )
            })}
          </div>
        }
      >
        {isGenreLoading ? (
          <RowSkeleton />
        ) : genreTracks.length > 0 ? (
          genreTracks.map((song, index) => (
            <DiscoverCard
              key={song.trackId}
              song={song}
              index={index}
              isSaved={isTrackSaved(song, savedSet)}
              isSaving={savingTrackId === song.trackId}
              onSave={onSaveSong}
              className="w-[144px] shrink-0 sm:w-[160px] md:w-[172px]"
            />
          ))
        ) : (
          <li className="flex h-36 w-full items-center justify-center text-sm text-muted-foreground">
            Không tìm thấy bài hát nào cho thể loại này.
          </li>
        )}
      </HorizontalScrollRow>
    </div>
  )
}
