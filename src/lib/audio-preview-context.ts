import { createContext, useContext } from 'react'

export type AudioPreviewState = {
  activeKey: string | null
  isPlaying: boolean
  isBuffering: boolean
  toggle: (key: string, url: string) => void
  stop: () => void
}

export const AudioPreviewContext = createContext<AudioPreviewState | null>(null)

export function useAudioPreview() {
  const context = useContext(AudioPreviewContext)

  if (!context) {
    throw new Error('useAudioPreview phải nằm trong AudioPreviewProvider.')
  }

  return context
}
