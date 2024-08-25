import { Request, Response } from 'express';
import Movie from '../models/Movie.js';
import Order from '../models/Order.js';
import Showing from '../models/Showing.js';
import Ticket from '../models/Ticket.js';
import TicketHistory from '../models/TicketHistory.js';

type MovieInfo = {
  showing: Showing;
  movie: Movie;
};

// Given a user and list of showing IDs and seats, create an Order with relevant Ticket and TicketHistory item
export async function placeOrder(req: Request, res: Response): Promise<Response> {
  const userId: number = req.body.user;
  const cart: { showingId: number; seat: string }[] = req.body.cart;

  // Validate chosen tickets
  for (const { showingId, seat } of cart) {
    const existingTicket = await Ticket.findOne({
      where: {
        showingId,
        seat
      }
    });
    if (existingTicket) {
      return res.status(400).json({
        error: 'Ticket already exists',
        showingId,
        seat
      });
    }
  }

  try {
    // Create the order
    const order = await Order.create({
      date: new Date().toISOString(),
      userId
    });

    // Create tickets and associate them with the order
    for (const { showingId, seat } of cart) {
      await buyTicket(order.id, showingId, seat);
    }

    return res.status(201).json({ orderId: order.id });
  } catch (err) {
    console.error('Error placing order:', err);
    return res.status(500).json({ error: 'An error occurred while placing the order.' });
  }
}

// Given an order, showing, and seat create the Ticket and TicketHistory items for that order
async function buyTicket(orderId: number, showingId: number, seat: string): Promise<void> {
  try {
    // Create ticket
    await Ticket.create({ showingId, seat });

    // Save copy of ticket in TicketHistory
    const info = await getFullMovieInfo(showingId);
    await TicketHistory.create({
      name: info.movie.title,
      poster: info.movie.poster ?? 'default-poster-url', // Provide a default value if null
      time: info.showing.time,
      room: info.showing.room,
      seat,
      orderId
    });
  } catch (err) {
    console.error('Error buying ticket:', err);
    throw new Error('An error occurred while processing the ticket.');
  }
}

// Gets full showing and movie info given a showing ID
async function getFullMovieInfo(showingId: number): Promise<MovieInfo> {
  try {
    // Get showing info
    const showing = await Showing.findOne({
      where: { id: showingId }
    });
    if (!showing) {
      throw new Error('Showing does not exist!');
    }

    // Get movie info
    const movie = await Movie.findOne({
      where: { id: showing.movieId }
    });
    if (!movie) {
      throw new Error('Film does not exist!');
    }

    return { showing, movie };
  } catch (err) {
    console.error('Error retrieving film info:', err);
    throw new Error('An error occurred while retrieving film information.');
  }
}
