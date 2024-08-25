import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

interface Props {
  id: number,
  title: string,
  desc: string,
  backdrop: string,
  showingID: number,
}

function HeaderSlide(props: Props) {
  const [offset, setOffset] = useState(window.scrollY)

  function updateOffset() {
    setOffset(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateOffset)
    return (() => {
      window.removeEventListener('scroll', updateOffset)
    })
  }, [])

  function truncateDesc(desc: string, length: number): string {
    const truncated = desc.substring(0, length).trim() + '...'
    return desc.length > length ? truncated : desc
  }

  return (
    <div className='header-slide' style={{ backgroundImage: `url(${props.backdrop})`, backgroundPositionY: `${offset * 0.7}px` }}>
      <div className="header-overlay"></div>
      <div className="header-text">
        <p className="header--subtitle">now showing</p>
        <p className="header--title">{props.title}</p>
        <p className="header--desc">{truncateDesc(props.desc, 200)}</p>
        <Link to={`showing/${props.showingID}`} className='header--ticketBtn'>Get Tickets</Link>
      </div>
    </div>
  )
}

export default HeaderSlide