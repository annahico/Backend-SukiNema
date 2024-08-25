import React, { useCallback, useEffect, useState } from "react";
import { IMovie } from "../../types";
import { buildURL } from "../../utils";
import ShowingItem from "./ShowingItem";
import ShowingSelector from "./ShowingSelector";

function Showings() {
  // Usa const para variables que no cambian después de la inicialización
  const todayDate: Date = new Date();
  const todayStr: string = `${todayDate.getFullYear()}-${padDate(
    todayDate.getMonth() + 1
  )}-${padDate(todayDate.getDate())}`;

  const [showings, setShowings] = useState<IMovie[]>([]);
  const [chosenDate, setChosenDate] = useState<string>(todayStr);

  // Usa useCallback para memorizar la función
  const fetchShowings = useCallback(async () => {
    try {
      const res = await fetch(
        buildURL(`/api/movie/showings?date=${chosenDate}`)
      );
      const data = await res.json();
      setShowings(data);
    } catch (error) {
      console.error("Error fetching showings:", error);
    }
  }, [chosenDate]);

  useEffect(() => {
    fetchShowings();
  }, [fetchShowings]);

  function updateDate(date: string): void {
    setChosenDate(date);
  }

  function padDate(date: number): string {
    return ("0" + date).slice(-2);
  }

  return (
    <main className="showings">
      <ShowingSelector date={chosenDate} updateDate={updateDate} />
      {showings.length > 0 &&
        showings.map((item: IMovie) => (
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
        ))}
    </main>
  );
}

export default Showings;
