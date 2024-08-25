import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

interface Movie {
  id: number,
  time: string,
  room: string,
  title: string,
  desc: string,
  trailer: string,
  poster: string,
}

function ShowingInfo(props: Movie) {
  return (
    <div className="showing-info">
      <h2 className='showing--title'>{props.title}</h2>
      <LiteYouTubeEmbed id={props.trailer} title={props.title} />
      <h3 className='showing--header'>Overview</h3>
      <p className='showing--text'>{props.desc}</p>
      <div className="showing-info--line"></div>
      <h3 className='showing--header'>Details</h3>
      <p className='showing--text'><span>Time: </span>{props.time}</p>
      <p className='showing--text'><span>Room: </span>{props.room}</p>
      <div className="showing-info--line"></div>
    </div>
  )
}

export default ShowingInfo