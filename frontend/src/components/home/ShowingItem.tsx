import { Link } from "react-router-dom"
import { IShowing } from '../../types'

interface Props {
  id: number
  title: string
  desc: string
  poster: string
  backdrop: string
  date: string
  showings: IShowing[]
}

function ShowingItem(props: Props) {
  return (
    <div className="showing-item">

      <div className="showing-item-poster">
        <img src={props.poster} alt="Moive Poster" />
      </div>

      <div className="showing-item-text">
        <h3 className="showing-item--title">{props.title}</h3>
        <p className="showing-item--desc">{props.desc}</p>
        <h4 className="showing-item--header">Showings ({props.date}):</h4>
        <div className="showing-item-showtimes">
          {props.showings.map(e => {
            return (
              <Link to={`showing/${e.id}`} className="showtime" key={e.id}>{e.time.slice(11)}</Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default ShowingItem