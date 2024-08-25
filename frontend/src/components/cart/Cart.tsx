import Checkout from './Checkout'
import { ReactComponent as Trash } from '../../assets/delete.svg'
import { ICart, ITicket } from '../../types'

interface Props {
  cart: ICart[],
  updateCart: (tickets: ITicket[]) => void,
  removeCartItem: (showingId: number, seat: string) => void,
  clearCart: () => void
}

function Cart(props: Props) {
  let cartElems: JSX.Element[] = []
  if (props.cart.length > 0) {
    cartElems = props.cart.map((e: ICart) => {
      return (
        <div className="cart-item" key={e.ticket.showingId + e.ticket.seat}>
          <div className="cart-item-poster">
            <img src={e.showing.Movie.poster} alt={e.showing.Movie.title + ' poster'} />
          </div>
          <div className="cart-item-details">
            <h2 className="cart-item--title">{e.showing.Movie.title}</h2>
            <p className="cart-item--text"><span>Time:</span> {e.showing.time}</p>
            <p className="cart-item--text"><span>Room:</span> {e.showing.room}</p>
            <p className="cart-item--text"><span>Seat:</span> {e.ticket.seat}</p>
          </div>
          <div className="cart-remove" onClick={() => props.removeCartItem(e.ticket.showingId, e.ticket.seat)}>
            <p>Delete</p>
            <Trash />
          </div>
        </div>
      )
    })
  }

  return (
    <div className="cart">

      <h1 className="cart-title">Cart:</h1>
      <div className="cart-items">
        {props.cart.length == 0 && <p>You have no items in your cart!</p>}
        {props.cart.length > 0 && cartElems}
      </div>

      {props.cart.length > 0 && <Checkout cart={props.cart} clearCart={props.clearCart} removeCartItem={props.removeCartItem} />}

    </div >
  )
}

export default Cart