import type { Album, Song } from '@/lib/api/types'
import { AlbumCard } from './album-card'

type AlbumGridProps = {
  albums: Album[]
  songsById: Map<string, Song>
}

const SKELETON_CARDS = [0, 1, 2, 3, 4, 5, 6, 7]

const gridClassName =
  'grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 wide:grid-cols-4'

export function AlbumGrid({ albums, songsById }: AlbumGridProps) {
  return (
    <ul className={gridClassName}>
      {albums.map((album) => (
        <li key={album.id} className="min-w-0">
          <AlbumCard album={album} songsById={songsById} />
        </li>
      ))}
    </ul>
  )
}

export function AlbumGridSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Đang tải danh sách album…</span>
      <div aria-hidden="true" className={gridClassName}>
        {SKELETON_CARDS.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-rule bg-surface p-2"
          >
            <div className="aspect-square rounded-sm bg-surface-2" />
            <div className="mt-2 h-3 w-3/4 rounded-sm bg-surface-2" />
            <div className="mt-2 h-2.5 w-1/3 rounded-sm bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
