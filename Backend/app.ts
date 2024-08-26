import cors from 'cors'
import express, { Application } from 'express'

// Import route middleware
import authRoutes from './routes/auth.js'
import movieRoutes from './routes/movie.js'
import orderRoutes from './routes/order.js'
import ticketRoutes from './routes/ticket.js'

const app: Application = express()
app.use(cors())
app.use(express.json())

app.use('/api/movie', movieRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)

const PORT: number = Number(process.env.PORT) || 4000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
