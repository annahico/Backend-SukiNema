import express, { Router, Request, Response } from 'express'
import Ticket from '../models/Ticket.js'
const router: Router = express.Router()

// Given a showing ID, find any purchased tickets
// Route: /api/ticket/find?showingId=1
router.get('/find', async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        showingId: Number(req.query.showingId)
      }
    })
    res.json(tickets)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
})

export default router
