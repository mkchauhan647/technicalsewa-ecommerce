import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteCartItems,
  CartItem,
  fetchCartItems,
  editCartItems,
} from "../../store/slice/cart/getcartSlice"
import { CiCircleRemove } from "react-icons/ci"
import { RootState, AppDispatch } from "../../store/store"
import { toast, ToastContainer } from "react-toastify"
interface CartContentProps {
  cartdata: CartItem[]
}
interface ParsedCartItem {
  item: CartItem
  itemsData: any[]
}
const CartContent: React.FC<CartContentProps> = ({
  cartdata,
}: {
  cartdata: any
}) => {
  const item = cartdata

  const shipping = 20.0
  let subtotalamt = 0
  const itemsArray: ParsedCartItem[] = []

  // Loop through cartItems and accumulate subtotals
  item.forEach((item: any) => {
    const parsedData = JSON.parse(item.items)
    itemsArray.push({ item, itemsData: parsedData })
    // Calculate subtotal for each item and add it to total
    subtotalamt += parseFloat(item.total) * item.quantity
  })
  const subtotal = subtotalamt

  // Now, 'total' holds the sum of all subtotals
  const total = subtotal
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleDeleteCart = (id: string) => {
    dispatch(deleteCartItems({ id })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchCartItems())
      } else {
        // Handle if the delete operation failed
      }
    })
  }
  const handleAddToCart = (id: string, item: ParsedCartItem) => {
    const updatedQuantity = Number(item.item.quantity) // Ensure it's parsed as a number
    const updatedItem = {
      ...item.item,
      quantity: updatedQuantity + 1,
      itemsData: JSON.stringify(item.itemsData), // Ensure itemsData is stringified
    }
    dispatch(editCartItems({ id: id, product: updatedItem })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchCartItems())
      } else {
        // Handle if the edit operation failed
      }
    })
  }
  const handleSubToCart = (id: string, item: ParsedCartItem) => {
    const updatedQuantity = Number(item.item.quantity) // Ensure it's parsed as a number
    if (updatedQuantity > 1) {
      const updatedItem = {
        ...item.item,
        quantity: updatedQuantity - 1,
        itemsData: JSON.stringify(item.itemsData), // Ensure itemsData is stringified
      }
      dispatch(editCartItems({ id: id, product: updatedItem })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchCartItems())
        } else {
          // Handle if the edit operation failed
        }
      })
    } else {
      // Handle if quantity is already 1
      toast.error("Quantity cannot be less than 1")
    }
  }

  return (
    <div>
      <div className="cart-items-container">
        {itemsArray.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center lg:p-4 bg-white rounded-lg lg:shadow my-4 gap-4"
          >
            <img
              alt={item.item.image_url}
              className="h-16 w-16 rounded-md"
              height="64"
              src={item.item.image_url}
              style={{
                aspectRatio: "64/64",
                objectFit: "cover",
              }}
              width="64"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {item.itemsData[0]?.blog_name}
                  </span>
                </div>
                <button
                  className="text-gray-600 text-sm "
                  onClick={() => handleDeleteCart(item.item.id)}
                >
                  <CiCircleRemove className="text-[20px] text-[red]" />
                </button>
              </div>
              <div className="flex justify-between mt-2 gap-4">
                <span className="text-sm font-bold ">Rs {item.item.total}</span>
                <div className="flex items-center ml-auto gap-2">
                  <span>Quantity</span>
                  <div className="flex gap-1">
                    <button
                      className="text-gray-600 text-sm"
                      onClick={() => handleSubToCart(item.item.id, item)}
                    >
                      -
                    </button>
                    <span className=" text-sm ">{item.item.quantity}</span>
                    <button
                      className="text-gray-600 text-sm"
                      onClick={() => handleAddToCart(item.item.id, item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:p-4 bg-white rounded-lg lg:shadow my-4 gap-4">
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Subtotal</p>
          <p className="font-semibold text-sm">Rs {subtotal.toFixed(2)}</p>
        </div>
        {/* <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Shipping</p>
          <p className="font-semibold text-sm">Rs {shipping.toFixed(2)}</p>
        </div> */}
        <hr />
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Total</p>
          <p className="font-semibold text-sm">Rs {total.toFixed(2)}</p>
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#07a2c2", color: "white" }}
      />
    </div>
  )
}

export default CartContent
