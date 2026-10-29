import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { ErrorAlert } from '@/components/error-alert'
import { Button } from '@/components/ui/button'
import { AddSheet } from '@/features/add-song/components/add-sheet'
import { SignInScreen } from '@/features/auth/components/sign-in-screen'
import { SongSearch } from '@/features/search-song/components/song-search'
import { FilterInput } from '@/features/songs/components/filter-input'
import { SongList } from '@/features/songs/components/song-list'
import { useSongs } from '@/features/songs/hooks/use-songs'
import { useViewMode } from '@/features/songs/hooks/use-view-mode'
import type { NewSong, Song, User } from '@/lib/api/types'
import { useAudioPreview } from '@/lib/audio-preview-context'
import { songPreviewKey } from '@/lib/preview-key'
import { useAuthContext } from './auth-context'
import { AppHeader } from './app-header'
import { AppLoading } from './app-loading'

const APP_TITLE = 'musimob - Lưu và đồng bộ danh sách bài hát trên mọi thiết bị'
const SONGS_TITLE = 'musimob - Danh sách bài hát'

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

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <AppHeader
        status={status}
        songCount={filteredSongs.length}
        displayName={user.displayName}
        photoURL={user.photoURL}
        viewMode={viewMode}
        onToggleView={toggleViewMode}
        onSignOut={onSignOut}
      />
      <main className="flex flex-1 flex-col px-6 pb-24 sm:px-8 lg:px-12 lg:pb-28 xl:px-16">
        <FilterInput value={filterQuery} onChange={setFilterQuery} />
        {authError ? <ErrorAlert message={authError} className="mb-3" /> : null}
        <SongList
          songs={filteredSongs}
          totalSongCount={songs.length}
          viewMode={viewMode}
          status={status}
          flashId={flashId}
          onAdd={() => openAdd()}
          onSearchCatalog={() => openAdd(filterQuery.trim())}
          onRetry={retry}
          onClearFilter={() => setFilterQuery('')}
          onUpdate={updateSong}
          onRemove={handleRemove}
        />
      </main>

      <Button
        type="button"
        aria-label="Thêm bài"
        onClick={() => openAdd()}
        className="fixed right-6 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 size-14 rounded-full p-0 shadow-lg shadow-black/40 sm:right-8 lg:right-12 lg:bottom-8 xl:right-16"
      >
        <Plus aria-hidden="true" className="size-6" />
      </Button>

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
    </div>
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
