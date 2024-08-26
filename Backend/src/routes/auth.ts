import express, { Router, Request, Response } from 'express'
const router: Router = express.Router()

router.get('/register', (req: Request, res: Response) => {
  res.send('register')
})

export default router