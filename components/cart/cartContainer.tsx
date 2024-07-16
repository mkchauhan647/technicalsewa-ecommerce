import React from "react"
import CartContent from "./CartContent"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContainerProps {
  // cart: CartItem[];
  // setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cart: any
}

const CartContainer: React.FC<CartContainerProps> = ({ cart }) => {
  return (
    <div className="mx-auto mt-8">
      <h2 className="font-semibold mb-4 text-sm pl-2">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="px-5">Your cart is empty</p>
      ) : (
        <CartContent cartdata={cart} />
      )}
    </div>
  )
}

export default CartContainer
