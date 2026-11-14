import { useOutletContext } from 'react-router'
import type { User } from '@/features/auth'
import type { useSongs, ViewMode } from '@/features/songs'
import type { useAlbums } from '@/features/albums'

export type AppOutletContext = {
  user: User
  authError: string | null
  viewMode: ViewMode
  songsState: ReturnType<typeof useSongs>
  albumsState: ReturnType<typeof useAlbums>
}

export function useAppOutletContext() {
  return useOutletContext<AppOutletContext>()
}
