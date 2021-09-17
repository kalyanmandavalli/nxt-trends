// Write your code here
import CartContent from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContent.Consumer>
    {value => {
      const {cartList} = value
      const getPrice = cartList.map(
        eachItem => eachItem.quantity * eachItem.price,
      )
      const totalPrice = getPrice.reduce(
        (firstValue, secondValue) => firstValue + secondValue,
      )
      return (
        <li className="checkout-container">
          <h1 className="checkout-title">
            Order Total:
            <span className="checkout-span"> Rs {totalPrice}/-</span>
          </h1>
          <p className="checkout-para">{cartList.length} items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </li>
      )
    }}
  </CartContent.Consumer>
)

export default CartSummary
