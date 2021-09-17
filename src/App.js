import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachIncItem => {
        if (eachIncItem.id === id) {
          return {...eachIncItem, quantity: eachIncItem.quantity + 1}
        }
        return eachIncItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachDecItem => {
        if (eachDecItem.id === id) {
          if (eachDecItem.quantity > 1) {
            return {...eachDecItem, quantity: eachDecItem.quantity - 1}
          }
          this.removeCartItem(eachDecItem.id)
        }
        return eachDecItem
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(eachRemItem => eachRemItem.id !== id)
    this.setState({cartList: filteredCart})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const onCartFind = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (onCartFind) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachAddCartItem => {
          if (eachAddCartItem.id === product.id) {
            const updatedQuantity = eachAddCartItem.quantity + product.quantity
            return {
              ...eachAddCartItem,
              quantity: updatedQuantity,
            }
          }
          return eachAddCartItem
        }),
      }))
    } else {
      const addCartItems = [...cartList, product]
      this.setState({cartList: addCartItems})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
