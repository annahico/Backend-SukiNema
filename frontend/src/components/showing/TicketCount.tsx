import { ITicket } from '../../types'

interface Props {
  tickets: ITicket[],
  updateCart: (tickets: ITicket[]) => void
}

function TicketCount(props: Props) {
  const chosenTickets: ITicket[] = props.tickets.filter((ticket: ITicket) => ticket.chosen)
  const ids: (number | undefined)[] = chosenTickets.map((e: ITicket) => e.id)

  return (
    <div className="ticket-count">
      <div className="ticket--text">
        <h3 className='showing--header'>Select Tickets</h3>
        {ids.length === 0 ? <p>No tickets selected.</p> : <p>You have selected {ids.length} tickets</p>}
      </div>
      {ids.length > 0 && <div className="checkout-btn" onClick={() => { props.updateCart(chosenTickets) }}>Add to Cart</div>}
    </div>
  )
}

export default TicketCount