// Algorithm used to schedule showing times given list of available theaters, times, and movies
import { regRooms } from '../config/theaters'
import { ApiResult, ShowingTime } from '../types'

interface Room {
  name: string
  times: string[]
}

// Creates times for favorite and showing movies for a given number of days
export function createTimes(showings: ApiResult[], days: number): ShowingTime[][] {
  const output: ShowingTime[][] = []

  for (let day = 0; day < days; day++) {
    let times: ShowingTime[] = []

    while (times.length < countAvailable(regRooms)) {
      times = createRooms(showings, regRooms, day)
    }

    output.push(times)
  }

  return output
}

// Count all available times for a list of rooms
function countAvailable(rooms: Room[]): number {
  return rooms.reduce((count, room) => count + room.times.length, 0)
}

// Create showing times for movies based on available rooms and the current day
function createRooms(movies: ApiResult[], rooms: Room[], day: number): ShowingTime[] {
  return rooms.flatMap((room, index) => 
    room.times.map(timeSlot => ({
      name: room.name,
      time: `${getDate(day)} ${timeSlot}`,
      apiID: movies[index]?.id,
    }))
  )
}

function getDate(day: number): string {
  const date = new Date()
  date.setDate(date.getDate() + day)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}
