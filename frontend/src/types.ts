// Reserved tickets are tickets that are stored in the database
// Active tickets are currently in the cart
// Chosen tickets are selected but not added to cart
export interface ITicket {
  showingId: number
  seat: string
  reserved: boolean
  active: boolean
  chosen: boolean
  id?: number
}

export interface IShowing {
  id: number
  MovieId: number
  apiID: number
  date: string
  room: string
  time: string
  Movie: IMovie
}

export interface IMovie {
  id: number
  apiID: number
  favorite: boolean
  release: string
  title: string
  overview: string
  trailer: string
  backdrop: string
  poster: string
  Showings: IShowing[]
}

export interface ICart {
  ticket: ITicket
  showing: IShowing
}