import type { SearchResult } from '@/lib/api/types'
import { DiscoverCard } from './discover-card'

type DiscoverGridProps = {
  songs: SearchResult[]
  isSaved?: (song: SearchResult) => boolean
  isSavingId?: number | null
  onSave?: (song: SearchResult) => void
}

export function DiscoverGrid({
  songs,
  isSaved,
  isSavingId,
  onSave,
}: DiscoverGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 wide:grid-cols-4 widest:grid-cols-6">
      {songs.map((song, index) => (
        <DiscoverCard
          key={`${song.trackId}-${index}`}
          song={song}
          index={index}
          isSaved={isSaved ? isSaved(song) : false}
          isSaving={isSavingId === song.trackId}
          onSave={onSave}
        />
      ))}
    </ul>
  )
}
