import { useState, useEffect } from 'react'
import ShowingItem from './ShowingItem'
import ShowingSelector from './ShowingSelector'
import { IMovie } from '../../types'
import { buildURL } from '../../utils'

function Showings() {
  let todayDate: Date = new Date()
  const todayStr: string = `${todayDate.getFullYear()}-${padDate(todayDate.getMonth() + 1)}-${padDate(todayDate.getDate())}`

  const [showings, setShowings] = useState<IMovie[]>([])
  const [chosenDate, setChosenDate] = useState<string>(todayStr)

  useEffect(() => {
    fetchShowings()
  }, [chosenDate])

  async function fetchShowings(): Promise<void> {
    const res = await fetch(buildURL(`/api/movie/showings?date=${chosenDate}`))
    const data = await res.json()
    setShowings(data)
  }

  function updateDate(date: string): void {
    setChosenDate(date)
  }

  // Add leading 0 to date if needed
  function padDate(date: number): string {
    return ('0' + date).slice(-2)
  }


  return (
    <main className='showings'>
      <ShowingSelector date={chosenDate} updateDate={updateDate} />
      {showings.length > 0 && showings.map((item: IMovie) => {
        return (
          <ShowingItem
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.overview}
            poster={item.poster}
            backdrop={item.backdrop}
            showings={item.Showings}
            date={chosenDate}
          />
        )
      })}
    </main>
  )
}

export default Showings