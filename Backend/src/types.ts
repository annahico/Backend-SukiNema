export interface ApiResult {
  id: number
  backdrop_path: string
  poster_path: string
  title: string
  overview: string
  release_date: string
  trailer?: string
  backdrop?: string
  poster?: string
}

export interface ShowingTime {
  name: string
  time: string
  apiID: number
}