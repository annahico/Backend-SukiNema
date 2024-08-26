// Get database connection
import db from './connectDB.js'
// Helper utilities to call TMDB api and determine available rooms and showtimes
import { getShowings, getFavorites } from './tmdb.js'
import { createTimes } from './showingsAlgorithm.js'
// Get database models
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'
import Ticket from '../models/Ticket.js'
import TicketHistory from '../models/TicketHistory.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
// Get types
import Transaction from 'sequelize/types/transaction.js'
import { ApiResult, ShowingTime } from '../types'

const transaction: Transaction = await db.transaction()
const startTime: Date = new Date()
console.log('Starting database update:')

const dropAll: boolean = process.argv.slice(2)[0] === 'dropall'

try {
  // Drop/Create tables
  if (dropAll) {
    console.log('Re-creating all tables...')
    await db.sync({ force: true })
  } else {
    console.log('Dropping Movies, Showings, and Tickets tables...')
    await Ticket.drop()
    await Showing.drop()
    await Movie.drop()
    console.log('Syncing tables...')
    await Movie.sync()
    await Showing.sync()
    await Ticket.sync()
    await User.sync()
    await Order.sync()
    await TicketHistory.sync()
    console.log('Syncing all table schema...')
    await db.sync()
  }

  // Create test user
  console.log('Creating test user')
  User.create({
    email: 'test@test.com',
    firstname: 'test',
    lastname: 'user',
    password: 'test123'
  })

  // Call TMDB api
  console.log('Getting latest movie data from TMDB API...')
  const showings: ApiResult[] = await getShowings()
  const favorites: ApiResult[] = await getFavorites()

  // Create data in Movies and Showings tables
  console.log('Creating Movies table')
  await createMovies(favorites, true, transaction)
  await createMovies(showings, false, transaction)

  // times is array of 7 days worth of times
  const weekTimes: ShowingTime[][] = createTimes(showings, 7)
  // for every day create showings for that days times
  console.log('Creating Showings table')
  await Promise.all(weekTimes.map(day => createShowings(day)))

  // Commit transaction otherwise cant find associations
  await transaction.commit()

  // Create associations
  console.log('Creating foreign keys for Showings table')
  await createAssociations()

  await db.close()

  const endTime = new Date()
  const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2)
  console.log(`Database update complete! Total run time: ${duration} seconds.`)
} catch (err) {
  console.log(err)
  await transaction.rollback()
  console.log(`Database operation encountered an error. All changes have been rolled back.`)
  await db.close()
}


// Create the database movies table from an array of movie api information
function createMovies(results: ApiResult[], favorite: boolean, transaction: Transaction): Promise<Movie[]> {
  return Promise.all<Promise<Movie>>(results.map((result: ApiResult) => {
    return new Promise<Movie>(async (resolve, reject) => {

      try {
        const movie = await Movie.create({
          favorite,
          apiID: result.id,
          title: result.title,
          overview: result.overview,
          release: result.release_date,
          trailer: result.trailer,
          backdrop: result.backdrop,
          poster: result.poster,
        }, { lock: true, transaction })
        resolve(movie)
      } catch (err) {
        reject(err)
      }

    })
  }))
}


// Create showings based on a list of available room times
function createShowings(times: ShowingTime[]): Promise<Showing[]> {
  return Promise.all<Promise<Showing>>(times.map((result: ShowingTime) => {
    return new Promise<Showing>(async (resolve, reject) => {

      try {
        const showing = await Showing.create({
          date: result.time.slice(0, 10),
          time: result.time,
          room: result.name,
          apiID: result.apiID,
        }, { lock: true, transaction })
        resolve(showing)
      } catch (err) {
        reject(err)
      }

    })
  }))
}


// Add all of the showings to their related movie
async function createAssociations(): Promise<void> {
  const movies: Movie[] = await Movie.findAll()

  for (let movie of movies) {
    const showings: Showing[] = await Showing.findAll({
      where: {
        apiID: movie.apiID
      }
    })

    await movie.addShowings(showings)
  }
}