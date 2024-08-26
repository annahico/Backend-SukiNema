import { Request, Response } from 'express'
import Ticket from '../models/Ticket.js'
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'
import TicketHistory from '../models/TicketHistory.js'
import Order from '../models/Order.js'

type MovieInfo = {
  showing: Showing,
  movie: Movie
}

// Given a user and list of showing IDs and seats, create an Order with relevant Ticket and TicketHistory item
export async function placeOrder(req: Request, res: Response): Promise<Response> {
  const userId: number = req.body.user
  const cart: Ticket[] = req.body.cart

  // Ensure that chosen tickets don't already exist
  for (let ticket of cart) {
    const existingTicket: Ticket | null = await Ticket.findOne({
      where: {
        showingId: ticket.showingId,
        seat: ticket.seat
      }
    })
    if (existingTicket) return res.status(400).send({
      err: 'Ticket already exists',
      showingId: ticket.showingId,
      seat: ticket.seat
    })
  }

  // Create order
  const order: Order = await Order.create({ date: Date.now().toString(), userId })
  // Create tickets and associate them with order
  for (let ticket of cart) {
    await buyTicket(order.id, ticket.showingId, ticket.seat)
  }

  return res.send({ order: order.id })
}



// Given an order, showing, and seat create the Ticket and TicketHistory items for that order
async function buyTicket(orderId: number, showingId: number, seat: string): Promise<TicketHistory> {
  // Create ticket
  Ticket.create({ showingId, seat })

  // Save copy of ticket in TicketHistory
  const info: any = await getFullMovieInfo(showingId)
  const archivedTicket: TicketHistory = await TicketHistory.create({
    name: info.movie.title,
    poster: info.movie.poster,
    time: info.showing.time,
    room: info.showing.room,
    seat,
    orderId
  })
  return archivedTicket
}


// Gets full showing and movie info given a showing ID
async function getFullMovieInfo(showingId: number): Promise<MovieInfo> {
  // Get all info from Showings table
  const showing: Showing | null = await Showing.findOne({
    where: { id: showingId }
  })
  if (!showing) throw new Error('Showing does not exist!')

  // Get all info from Movies table
  const movie: Movie | null = await Movie.findOne({
    where: { id: showing.movieId }
  })
  if (!movie) throw new Error('Movie does not exist!')

  return { showing, movie }
}