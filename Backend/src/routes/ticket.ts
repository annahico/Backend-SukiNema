import express, { Request, Response, Router } from 'express';
import Ticket from '../models/Ticket.js';

const router: Router = express.Router();

// Given a showing ID, find any purchased tickets
// Route: /api/ticket/find?showingId=1
router.get('/find', async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse the showing ID from the query parameters
    const showingId = Number(req.query.showingId);

    // Fetch all tickets with the given showing ID
    const tickets = await Ticket.findAll({ where: { showingId } });

    // Send the fetched tickets as a JSON response
    res.json(tickets);
  } catch (err) {
    // Log any errors that occur
    console.error(err);

    // Send an error response
    res.json({ err: 'An error occurred.' });
  }
});

export default router;
