import HeaderSlide from "./HeaderSlide"

// Swiper Components and Styles
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { IMovie } from '../../types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface Props {
  movies: IMovie[]
}

function Header(props: Props) {
  // Only render five movies in header
  const limit = 5
  let slideElems: JSX.Element[] = []
  for (let i = 0; i < limit; i++) {
    slideElems.push(
      <SwiperSlide key={props.movies[i].id}>
        <HeaderSlide
          key={props.movies[i].id}
          id={props.movies[i].id}
          title={props.movies[i].title}
          desc={props.movies[i].overview}
          backdrop={props.movies[i].backdrop}
          showingID={props.movies[i].Showings.at(0)?.id ?? -1}
        />
      </SwiperSlide>
    )
  }

  return (
    <header>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 6000 }}
        pagination={{ clickable: true }}
      >
        {slideElems}
      </Swiper>
    </header >
  )
}

export default Header