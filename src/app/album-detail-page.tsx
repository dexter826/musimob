import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '@/hooks/use-document-title'

const ALBUMS_TITLE = 'MusiMOB: Album'

export function AlbumDetailPage() {
  useDocumentTitle(ALBUMS_TITLE)

  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-10">
      <div className="pt-7 pb-5">
        <Link
          to="/albums"
          className="mb-4 inline-flex h-11 items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors duration-[160ms] hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Album
        </Link>
        <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-foreground max-md:text-[28px]">
          Chi tiết album
        </h1>
        <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
          Thông tin album sẽ có ở đây.
        </p>
      </div>
    </div>
  )
}
