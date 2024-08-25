import React from "react";
import { ITicket } from "../../types";

interface Props {
  tickets: ITicket[];
  chooseTicket: (ticket: ITicket) => void;
}

function ShowingTickets(props: Props) {
  const ticketElems = props.tickets.map((ticket: ITicket) => {
    let classname = "tickets--ticket";
    if (ticket.reserved) {
      classname += " reserved";
    } else if (ticket.active) {
      classname += " active";
    } else if (ticket.chosen) {
      classname += " chosen";
    }

    return (
      <div
        key={ticket.seat}
        className={classname}
        onClick={() => props.chooseTicket(ticket)}
      >
        {ticket.seat}
      </div>
    );
  });

  return (
    <div className="showing-tickets">
      <div className="showing-screen">Screen</div>
      <div className="tickets-container">{ticketElems}</div>
    </div>
  );
}

export default ShowingTickets;
