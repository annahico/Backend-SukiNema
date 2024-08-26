import { Request, Response } from 'express'
import Movie from '../models/Movie.js'
import Showing from '../models/Showing.js'

// Finds movie information based on movie id
// Example: /api/searchMovie?id=1
export async function searchMovie(req: Request, res: Response): Promise<Response> {
  const id: number = Number(req.query.id)

  try {
    const movies: Movie[] = await Movie.findAll({
      where: { id },
      include: Showing
    })
    return res.json(movies)
  } catch (err) {
    console.warn(err)
    return res.json({ err: 'An error occured.' })
  }
}

// Finds movie information based on showing id
// Example: /api/searchShowing?id=1
export async function searchShowing(req: Request, res: Response): Promise<Response> {
  const id: number = Number(req.query.id)

  try {
    const showings: Showing[] = await Showing.findAll({
      where: { id },
      include: Movie
    })
    return res.json(showings)
  } catch (err) {
    console.warn(err)
    return res.json({ err: 'An error occured.' })
  }
}

// Example: /api/movie/all
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const movies: Movie[] = await Movie.findAll({ include: Showing })
    return res.json(movies)
  } catch (err) {
    console.warn(err)
    return res.json({ err: 'An error occured.' })
  }
}

// Example: /api/movie/favorites?date=2022-09-06
export async function findFavorites(req: Request, res: Response): Promise<Response> {
  const date: string = req.query.date as string

  try {
    const movies: Movie[] = await Movie.findAll({
      where: {
        favorite: true
      },
      include: {
        model: Showing,
        where: { date }
      }
    })
    return res.json(movies)
  } catch (err) {
    console.warn(err)
    return res.json({ err: 'An error occured.' })
  }
}

// Example: /api/movie/showings?date=2022-09-06
export async function findShowings(req: Request, res: Response): Promise<Response> {
  const date: string = req.query.date as string

  try {
    const movies: Movie[] = await Movie.findAll({
      where: {
        favorite: false
      },
      include: {
        model: Showing,
        where: { date }
      }
    })
    return res.json(movies)
  } catch (err) {
    console.log(err)
    return res.json({ err: 'An error occured.' })
  }
}