import { Request, Response } from 'express';
import Movie from '../models/Movie.js';
import Showing from '../models/Showing.js';

// Finds movie information based on movie id
// Example: /api/searchMovie?id=1
export async function searchMovie(req: Request, res: Response): Promise<Response> {
  const id: number = Number(req.query.id);

  try {
    const movies = await Movie.findAll({
      where: { id },
      include: Showing,
    });
    if (movies.length === 0) {
      return res.status(404).json({ message: 'Film not found.' });
    }
    return res.json(movies);
  } catch (err) {
    console.warn('Error fetching movie:', err);
    return res.status(500).json({ error: 'An error occurred while fetching the film.' });
  }
}

// Finds movie information based on showing id
// Example: /api/searchShowing?id=1
export async function searchShowing(req: Request, res: Response): Promise<Response> {
  const id: number = Number(req.query.id);

  try {
    const showings = await Showing.findAll({
      where: { id },
      include: Movie,
    });
    if (showings.length === 0) {
      return res.status(404).json({ message: 'Showing not found.' });
    }
    return res.json(showings);
  } catch (err) {
    console.warn('Error fetching showing:', err);
    return res.status(500).json({ error: 'An error occurred while fetching the showing.' });
  }
}

// Example: /api/movie/all
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const movies = await Movie.findAll({ include: Showing });
    return res.json(movies);
  } catch (err) {
    console.warn('Error fetching all films:', err);
    return res.status(500).json({ error: 'An error occurred while fetching all films.' });
  }
}

// Example: /api/movie/favorites?date=2022-09-06
export async function findFavorites(req: Request, res: Response): Promise<Response> {
  const date: string = req.query.date as string;

  try {
    const movies = await Movie.findAll({
      where: { favorite: true },
      include: {
        model: Showing,
        where: { date },
      },
    });
    return res.json(movies);
  } catch (err) {
    console.warn('Error fetching favourite films:', err);
    return res.status(500).json({ error: 'An error occurred while fetching favourite films.' });
  }
}

// Example: /api/movie/showings?date=2022-09-06
export async function findShowings(req: Request, res: Response): Promise<Response> {
  const date: string = req.query.date as string;

  try {
    const movies = await Movie.findAll({
      where: { favorite: false },
      include: {
        model: Showing,
        where: { date },
      },
    });
    return res.json(movies);
  } catch (err) {
    console.warn('Error fetching showings:', err);
    return res.status(500).json({ error: 'An error occurred while fetching showings.' });
  }
}
