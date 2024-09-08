"use client"
import { Button } from "@/components/ui/button"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { MdShoppingCartCheckout } from "react-icons/md"
import CartContainer from "./cartContainer"
import { ToastContainer, toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartItems, CartItem } from "../../store/slice/cart/getcartSlice"
import { RootState, AppDispatch } from "../../store/store"

export function Cart({
  setShowPopover,
}: {
  setShowPopover: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [isOpen, setIsOpen] = useState(false)

  console.log(cartItems, "CART ITEMS")

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleContinueShopping = () => {
    setIsOpen(false)
  }

  const handleCheckout = () => {
    let id = localStorage.getItem("id")

    console.log("id cart", id)

    setIsOpen(false)
    if (id) {
      console.log(" I am in ")
      window.location.href = "/spareparts/checkout"
      return
    } else {
      setShowPopover(true)
    }
  }

  const cart = cartItems

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="p-2 relative"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center justify-center absolute w-4 h-4 top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[8px] rounded-full">
            {cart?.length}
          </div>
          <MdShoppingCartCheckout className="text-xl text-slate-600" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-fit overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="p-2 text-sm border-b">My Cart</SheetTitle>
        </SheetHeader>
        <CartContainer cart={cartItems} />
        <SheetFooter>
          <SheetClose asChild>
            <>
              {cartItems.length > 0 ? (
                // <Link href="/checkout" onClick={()=>handleCheckout()}>
                <Button
                  type="submit"
                  className="p-2 w-full my-4 flex"
                  onClick={() => handleCheckout()}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                // </Link>
                <Button
                  type="button"
                  className="p-2 w-full my-4 flex"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
              )}
            </>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
