import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'
import { AudioPreviewContext } from '@/lib/audio-preview-context'

const PREVIEW_ERROR_MESSAGE = 'Không nghe thử được. Kiểm tra mạng rồi thử lại.'

export function AudioPreviewProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playTokenRef = useRef(0)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'

    const handleEnded = () => {
      audio.currentTime = 0
      setIsPlaying(false)
      setIsBuffering(false)
    }
    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => setIsBuffering(false)
    const handleError = () => {
      setActiveKey(null)
      setIsPlaying(false)
      setIsBuffering(false)
      toast.error(PREVIEW_ERROR_MESSAGE, { id: 'preview-error' })
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('error', handleError)
    audioRef.current = audio

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [])

  const requestPlay = useCallback((audio: HTMLAudioElement) => {
    const token = ++playTokenRef.current
    void audio.play().catch((error: unknown) => {
      if (playTokenRef.current !== token) return
      setIsPlaying(false)
      setIsBuffering(false)
      if (error instanceof DOMException && error.name === 'AbortError') return

      console.error('Không phát được bản nghe thử.', error)
      toast.error(PREVIEW_ERROR_MESSAGE, { id: 'preview-error' })
    })
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    playTokenRef.current += 1
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setActiveKey(null)
    setIsPlaying(false)
    setIsBuffering(false)
  }, [])

  const toggle = useCallback(
    (key: string, url: string) => {
      const audio = audioRef.current
      if (!audio) return

      if (activeKey === key) {
        if (isPlaying) {
          audio.pause()
          setIsPlaying(false)
          setIsBuffering(false)
        } else {
          setIsPlaying(true)
          setIsBuffering(true)
          requestPlay(audio)
        }
        return
      }

      audio.pause()
      audio.src = url
      setActiveKey(key)
      setIsPlaying(true)
      setIsBuffering(true)
      requestPlay(audio)
    },
    [activeKey, isPlaying, requestPlay],
  )

  const value = useMemo(
    () => ({ activeKey, isPlaying, isBuffering, toggle, stop }),
    [activeKey, isPlaying, isBuffering, toggle, stop],
  )

  return (
    <AudioPreviewContext.Provider value={value}>
      {children}
    </AudioPreviewContext.Provider>
  )
}
