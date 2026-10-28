export function getSongKey(title: string, artist: string): string {
  return `${title.trim().toLowerCase()}\u0000${artist.trim().toLowerCase()}`
}
