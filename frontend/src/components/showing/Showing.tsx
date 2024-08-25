import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ICart, IShowing, ITicket } from "../../types";
import { buildURL } from "../../utils";
import ShowingInfo from "./ShowingInfo";
import "./ShowingStyles.css";
import ShowingTickets from "./ShowingTickets";
import TicketCount from "./TicketCount";

interface Props {
  cart: ICart[];
  updateCart: (tickets: ITicket[]) => void;
}

function Showing(props: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const showingId: number = Number(params.id);

  const [tickets, setTickets] = useState<ITicket[]>(createEmptyTickets());
  const [showing, setShowing] = useState<IShowing | object>({});

  const callAPI = useCallback(async () => {
    try {
      const ticketRes = await fetch(
        buildURL(`/api/ticket/find?showingId=${showingId}`)
      );
      const ticketData: ITicket[] = await ticketRes.json();

      setTickets((prevTickets) => {
        const newTickets: ITicket[] = [...prevTickets];
        for (const ticket of ticketData) {
          const existing: number = newTickets.findIndex(
            (e) => e.seat === ticket.seat
          );
          if (existing !== -1) {
            newTickets[existing].id = ticket.id;
            newTickets[existing].reserved = true;
          }
        }
        return newTickets;
      });

      const movieRes = await fetch(
        buildURL(`/api/movie/searchShowing?id=${showingId}`)
      );
      const movieData = await movieRes.json();
      setShowing(movieData.at(0) ?? {});
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [showingId]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  useEffect(() => {
    for (const { ticket } of props.cart) {
      if (ticket.showingId !== showingId) return;

      setTickets((prevTickets) => {
        const newTickets: ITicket[] = [...prevTickets];
        const existing: number = newTickets.findIndex(
          (e) => e.seat === ticket.seat
        );
        if (existing !== -1) {
          newTickets[existing].id = ticket.id;
          newTickets[existing].active = true;
        }
        return newTickets;
      });
    }
  }, [props.cart, showingId]);

  function chooseTicket(ticket: ITicket): void {
    setTickets((prevTickets) =>
      prevTickets.map((prevTicket) => {
        if (ticket.reserved || ticket.active) return { ...prevTicket };
        if (prevTicket.seat === ticket.seat) {
          return { ...prevTicket, chosen: !prevTicket.chosen };
        }
        return { ...prevTicket };
      })
    );
  }

  function createEmptyTickets(): ITicket[] {
    const rows: number = 10;
    const cols: number = 16;
    const seats: ITicket[] = [];

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const letter = String.fromCharCode(row + 64);
        const seat = letter + col;
        seats.push({
          showingId,
          seat,
          reserved: false,
          active: false,
          chosen: false,
        });
      }
    }

    return seats;
  }

  function instanceOfShowing(obj: IShowing | object): obj is IShowing {
    return "Movie" in obj;
  }

  return (
    <div className="showing-container">
      <div className="back-btn" onClick={() => navigate(-1)}>
        <Back />
        Volver
      </div>
      {instanceOfShowing(showing) && (
        <ShowingInfo
          id={showing.id}
          time={showing.time}
          room={showing.room}
          title={showing.Movie.title}
          desc={showing.Movie.overview}
          trailer={showing.Movie.trailer}
          poster={showing.Movie.poster}
        />
      )}
      {tickets && (
        <TicketCount tickets={tickets} updateCart={props.updateCart} />
      )}
      {tickets && (
        <ShowingTickets tickets={tickets} chooseTicket={chooseTicket} />
      )}
    </div>
  );
}

export default Showing;
