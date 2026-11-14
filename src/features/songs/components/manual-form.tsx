import { useMemo } from 'react'
import { getSongKey } from '@/lib/song-key'
import type { NewSong, Song } from '../types'
import { SongForm } from './song-form'

type ManualFormProps = {
  initialTitle: string
  focusSignal: number
  songs: Song[]
  onAdd: (song: NewSong) => Promise<void>
  onDone: () => void
}

export function ManualForm({
  initialTitle,
  focusSignal,
  songs,
  onAdd,
  onDone,
}: ManualFormProps) {
  const existingKeys = useMemo(
    () => new Set(songs.map((song) => getSongKey(song.title, song.artist))),
    [songs],
  )

  return (
    <SongForm
      initialValues={{ title: initialTitle, artist: '', coverUrl: '' }}
      focusArtistOnMount={initialTitle.length > 0}
      focusSignal={focusSignal}
      validate={(values) =>
        existingKeys.has(getSongKey(values.title, values.artist))
          ? 'Bài này đã có trong thư viện.'
          : null
      }
      submitLabel="Lưu bài"
      pendingLabel="Đang lưu…"
      onSubmit={(values) => onAdd({ ...values, previewUrl: '' })}
      onSuccess={onDone}
    />
  )
}
