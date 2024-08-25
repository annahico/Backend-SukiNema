import { useState } from 'react'
import OrderSummary from './OrderSummary'
import { ICart, ITicket } from '../../types'
import { buildURL } from '../../utils'

interface Props {
  cart: ICart[],
  clearCart: () => void,
  removeCartItem: (showingId: number, seat: string) => void
}

function Checkout(props: Props) {
  async function handleCheckout(): Promise<void> {
    // get needed data from cart
    const reqBody = {
      user: 1,
      cart: props.cart.map(e => ({ showingId: e.ticket.showingId, seat: e.ticket.seat }))
    }

    // Place order
    const res = await fetch(buildURL('/api/order/new'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    const data = await res.json()

    // Check for duplicate ticket
    if (data.err) {
      alert(`Your ticket "${data.seat}" has been recently reserved by another guest.`)
      props.removeCartItem(data.showingId, data.seat)
      return
    }

    // Order successful, alert user and clear cart
    alert(`Successfully placed order #${data.order}`)
    props.clearCart()
  }

  return (
    <div className="checkout">
      <h2 className="checkout-title">Order Summary:</h2>
      <OrderSummary count={props.cart.length} />

      <div className='checkout-form'>
        <h2 className="checkout-title">Payment Details:</h2>
        <p className='checkout--warning'><span>Note:</span> Payment section is for appearance only, no payment details are collected.</p>
        <label className='checkout--label'>
          Card Number:
          <input type="text" name="cardNumber" value='1234-1234-1234-1234' disabled />
        </label>
        <div className="form-group">
          <label className='checkout--label'>
            Security Code:
            <input type="text" name="secCode" value='***' disabled />
          </label>
          <label className='checkout--label'>
            Expiration Date:
            <input type="text" name="expDate" value='12/22' disabled />
          </label>
        </div>

        <div className="checkout-btn" onClick={handleCheckout}>checkout</div>
      </div>
    </div>
  )
}

export default Checkout