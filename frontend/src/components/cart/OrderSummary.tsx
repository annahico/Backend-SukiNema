interface Props {
  count: number
}

function OrderSummary(props: Props) {
  let cost: number = 12.99
  const subtotal: number = Number((props.count * cost).toFixed(2))
  const tax: number = Number((subtotal * 0.07).toFixed(2))
  const total: string = (subtotal + tax).toFixed(2)

  return (
    <div className="checkout-order-summary">
      <p className="checkout-order--detail"><span>Ticket ({props.count}):</span> ${subtotal}</p>
      <p className="checkout-order--detail"><span>Tax:</span> ${tax}</p>
      <p className="checkout-order--detail"><span>Total:</span> ${total}</p>
    </div>
  )
}

export default OrderSummary