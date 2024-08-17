"use client"
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";



import { addCartItems, CartItem as CartItems, fetchCartItems } from "@/store/slice/cart/getcartSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { toast, ToastContainer } from "react-toastify"

interface NavbarProps {
  cart: CartItem[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
const cart: CartItem[] = []
export default function DashLayout({
  children,
}: {
  children: React.ReactNode
  })

{

  
const dispatch: AppDispatch = useDispatch();



useEffect(() => {
  if (typeof window !== "undefined") {

    const id = JSON.parse(localStorage.getItem("id") ?? "null");

    // console.log("id", id);

      

      const items = JSON.parse(localStorage.getItem("items") ?? "[]");
      // console.log("items useeffect", items);
      items.forEach((item: CartItems) => {
        if (typeof item.items === "string") {
          item.items = JSON.parse(item.items) as Array<any>;
        }
        dispatch(addCartItems(item)).then((res) => {
          // console.log("res", res);
          if (res.meta.requestStatus === "fulfilled") {
            // toast.success("Item Added To Cart")
            dispatch(fetchCartItems())
          } else {
            // toast.error("Error Addedss local To Cart")
    
          }
        })
      
      })
    if (id != null) {
      localStorage.removeItem("items");
    }
    
  }

},[])



  return (
    <div className="flex flex-col min-h-screen">
 <Navbar cart={cart} />
 <main className="flex-1 md:px-14">{children}</main>
 <Footer />
      <Toaster />
    </div>
  )
}
