import React from "react";
import HeaderSlide from "./HeaderSlide";

// Swiper Components and Styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Actualizado
import { Swiper, SwiperSlide } from "swiper/react";

import { IMovie } from "../../types";

interface Props {
  movies: IMovie[];
}

function Header(props: Props) {
  // Only render five movies in header
  const limit = 5;
  const slideElems = props.movies.slice(0, limit).map((movie) => (
    <SwiperSlide key={movie.id}>
      <HeaderSlide
        id={movie.id}
        title={movie.title}
        desc={movie.overview}
        backdrop={movie.backdrop}
        showingID={movie.Showings.at(0)?.id ?? -1}
      />
    </SwiperSlide>
  ));

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
    </header>
  );
}

export default Header;
