// Helper functions to call The Movie Database API
// https://developers.themoviedb.org/3

import { ApiResult } from '../types'
import fetch, { Response } from 'node-fetch'
import 'dotenv/config'

interface MoviesApiData {
  page: number,
  results: ApiResult[]
}

interface TrailersApiData {
  id: number
  results: {
    type: string
    key: string
  }[]
}



// Finds the movies that are currently playing in theaters
export async function getShowings(): Promise<ApiResult[]> {
  const beginDate: Date = new Date(new Date().setDate(new Date().getDate() - 14))
  const beginString: string = beginDate.toISOString().split('T')[0]
  const endDate: Date = new Date(new Date().setDate(new Date().getDate() + 7))
  const endString: string = endDate.toISOString().split('T')[0]

  // Find only movies currently in US theaters
  const options: string = [
    `api_key=${process.env.TMDB_API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    `primary_release_date.lte=${endString}`,
    'sort_by=popularity.desc',
  ].join('&')

  const response: Response = await fetch('https://api.themoviedb.org/3/discover/movie?' + options)
  const data: MoviesApiData = await response.json() as MoviesApiData

  const limit: number = 7
  const limitedResults: ApiResult[] = data.results.slice(0, limit)

  for (let video of limitedResults) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/original' + video.poster_path
  }

  return limitedResults
}



// Gets the most popular movies that are staying theaters
export async function getFavorites(): Promise<ApiResult[]> {
  const beginDate: Date = new Date(new Date().setDate(new Date().getDate() - 30))
  const beginString: string = beginDate.toISOString().split('T')[0]

  const options: string = [
    `api_key=${process.env.TMDB_API_KEY}`,
    'with_release_type=3|2',
    'region=US',
    'language=en-US',
    `primary_release_date.gte=${beginString}`,
    'sort_by=popularity.desc',
    'vote_count.gte=1000',
  ].join('&')

  const response: Response = await fetch('https://api.themoviedb.org/3/movie/popular?' + options)
  const data: MoviesApiData = await response.json() as MoviesApiData

  for (let video of data.results) {
    video.trailer = await getTrailer(video.id)
    video.backdrop = 'https://image.tmdb.org/t/p/original' + video.backdrop_path
    video.poster = 'https://image.tmdb.org/t/p/w500' + video.poster_path
  }

  return data.results
}


// Returns key for youtube string: https://www.youtube.com/watch?v={key}
export async function getTrailer(id: number): Promise<string | undefined> {
  const response: Response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?&api_key=${process.env.TMDB_API_KEY}`)
  const data: TrailersApiData = await response.json() as TrailersApiData

  // Reverse array so first trailer is used
  const trailers = data.results.filter((video: any) => video.type = 'Trailer').reverse()

  if (trailers[0]) return trailers[0].key
  else return undefined
}