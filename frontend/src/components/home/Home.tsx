import React, { useEffect, useState } from "react";
import { IMovie } from "../../types";
import { buildURL } from "../../utils";
import Header from "./Header";
import "./HomeStyles.css";
import Showings from "./Showings";

function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const res = await fetch(buildURL("/api/movie/all"));
    const data: IMovie[] = await res.json();
    setMovies(data);
  }

  return (
    <div className="Home">
      {movies.length > 0 && (
        <>
          <Header movies={movies} />
          <Showings />
        </>
      )}
    </div>
  );
}

export default Home;
