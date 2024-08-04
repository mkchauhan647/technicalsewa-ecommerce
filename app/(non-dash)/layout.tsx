"use client"
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
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
}) {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar cart={cart} />
 <main className="flex-1 px-14">{children}</main>
 <Footer />
      <Toaster />
    </div>
  )
}
