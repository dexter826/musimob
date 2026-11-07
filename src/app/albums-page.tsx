import { useDocumentTitle } from '@/hooks/use-document-title'

const ALBUMS_TITLE = 'MusiMOB: Album'

export function AlbumsPage() {
  useDocumentTitle(ALBUMS_TITLE)

  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-10">
      <div className="pt-7 pb-5">
        <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.015em] text-foreground max-md:text-[28px]">
          Album
        </h1>
        <p className="mt-1.5 text-xs font-medium text-muted-foreground tabular-nums">
          Danh sách album sẽ có ở đây.
        </p>
      </div>
    </div>
  )
}
