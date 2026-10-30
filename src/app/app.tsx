import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from 'cn'
import { ErrorAlert } from '@/components/error-alert'
import { PageShell } from '@/components/page-shell'
import { AddSheet } from '@/features/add-song/components/add-sheet'
import { SignInScreen } from '@/features/auth/components/sign-in-screen'
import { SongSearch } from '@/features/search-song/components/song-search'
import { LibraryToolbar } from '@/features/songs/components/library-toolbar'
import { SongList } from '@/features/songs/components/song-list'
import { useSongs } from '@/features/songs/hooks/use-songs'
import { useViewMode } from '@/features/songs/hooks/use-view-mode'
import { getCountLabel } from '@/features/songs/lib/count-label'
import type { NewSong, Song, User } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'
import { useAuthContext } from './auth-context'
import { AppHeader } from './app-header'
import { AppLoading } from './app-loading'

const APP_TITLE = 'MusiMOB'
const SONGS_TITLE = 'MusiMOB: Thư viện'

type SignedInAppProps = {
  user: User
  authError: string | null
  onSignOut: () => Promise<void>
}

function SignedInApp({ user, authError, onSignOut }: SignedInAppProps) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addSeed, setAddSeed] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [flashId, setFlashId] = useState<string | null>(null)
  const { viewMode, toggleViewMode } = useViewMode()
  const { activeKey, stop } = useAudioPreview()
  const { songs, status, retry, addSong, restoreSong, updateSong, removeSong } =
    useSongs(user.uid)

  useEffect(() => {
    if (!flashId) return

    const timer = window.setTimeout(() => setFlashId(null), 2000)
    return () => window.clearTimeout(timer)
  }, [flashId])

  useEffect(() => () => stop(), [stop])

  function openAdd(term = '') {
    setAddSeed(term)
    setIsAddOpen(true)
  }

  function handleFilterChange(value: string) {
    if (value !== filterQuery) stop()
    setFilterQuery(value)
  }

  async function handleManualAdd(song: NewSong) {
    const id = await addSong(song)
    toast.success('Đã lưu bài', { description: song.title })
    setFlashId(id)
  }

  async function handleSearchAdd(song: NewSong) {
    await addSong(song)
  }

  async function undoDelete(song: Song) {
    const toastId = toast.loading('Đang khôi phục…', {
      description: song.title,
    })

    try {
      await restoreSong(song)
      setFlashId(song.id)
      toast.success('Đã khôi phục bài', {
        id: toastId,
        description: song.title,
      })
    } catch (restoreError) {
      toast.error('Không khôi phục được bài', {
        id: toastId,
        description:
          restoreError instanceof Error
            ? `${song.title} - ${restoreError.message}`
            : song.title,
        duration: 10000,
        action: {
          label: 'Thử lại',
          onClick: () => {
            void undoDelete(song)
          },
        },
      })
    }
  }

  async function handleRemove(song: Song) {
    if (activeKey === songPreviewKey(song.id)) stop()
    await removeSong(song.id)
    toast('Đã xóa bài', {
      description: song.title,
      duration: 10000,
      action: {
        label: 'Hoàn tác',
        onClick: () => {
          void undoDelete(song)
        },
      },
    })
  }

  const filteredSongs = useMemo(() => {
    const query = filterQuery.trim().toLowerCase()
    if (!query) return songs

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query),
    )
  }, [songs, filterQuery])

  const isLibraryEmpty = status.state === 'ready' && songs.length === 0
  const isFiltering = filterQuery.trim().length > 0
  const countLabel = getCountLabel({
    status,
    total: songs.length,
    filtered: filteredSongs.length,
    isFiltering,
  })

  return (
    <>
      <PageShell>
        <a href="#library-main" className="skip-link">
          Chuyển đến nội dung
        </a>
        <AppHeader
          displayName={user.displayName}
          photoURL={user.photoURL}
          viewMode={viewMode}
          onToggleView={toggleViewMode}
          onSignOut={onSignOut}
        />
        <main
          id="library-main"
          tabIndex={-1}
          className={cn(
            'flex flex-1 flex-col',
            isLibraryEmpty ? 'pb-6' : 'pb-24 md:pb-10',
          )}
        >
          <LibraryToolbar
            countLabel={countLabel}
            filterQuery={filterQuery}
            onFilterChange={handleFilterChange}
            onAdd={() => openAdd(filterQuery.trim())}
            isLibraryEmpty={isLibraryEmpty}
          />
          {authError ? (
            <ErrorAlert message={authError} className="mb-3" />
          ) : null}
          <SongList
            songs={filteredSongs}
            allSongs={songs}
            viewMode={viewMode}
            status={status}
            flashId={flashId}
            onAdd={() => openAdd()}
            onSearchCatalog={() => openAdd(filterQuery.trim())}
            onRetry={retry}
            onClearFilter={() => handleFilterChange('')}
            onUpdate={updateSong}
            onRemove={handleRemove}
          />
        </main>
      </PageShell>

      {isLibraryEmpty ? null : (
        <button
          type="button"
          aria-label="Thêm bài"
          onClick={() => openAdd(filterQuery.trim())}
          className="bookmark-fab"
        >
          <Plus aria-hidden="true" className="size-[22px]" />
        </button>
      )}

      <AddSheet
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        initialTerm={addSeed}
        songs={songs}
        onAddManual={handleManualAdd}
        renderSearch={(search) => (
          <SongSearch {...search} songs={songs} onAdd={handleSearchAdd} />
        )}
      />
    </>
  )
}

export function App() {
  const { user, isAuthLoading, isSigningIn, error, signIn, signOut } =
    useAuthContext()

  useEffect(() => {
    document.title = user ? SONGS_TITLE : APP_TITLE
  }, [user])

  if (isAuthLoading) {
    return <AppLoading />
  }

  if (!user) {
    return (
      <SignInScreen isSigningIn={isSigningIn} error={error} onSignIn={signIn} />
    )
  }

  return (
    <SignedInApp
      key={user.uid}
      user={user}
      authError={error}
      onSignOut={signOut}
    />
  )
}
