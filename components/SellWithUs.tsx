"use client"
import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"
export const SellWithUs = () => {
  return (
    <div className="border-b bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 flex flex-col items-center justify-center px-4 py-16 mt-8 text-center">
      <h1 className="text-4xl  font-bold mb-4 text-white">
        Need any technical help?
      </h1>
      <p className="text-xl mb-8 text-white">we are here to help you!</p>
      <Link href="/login">
        <Button className="bg-white text-black py-3 px-8 rounded-full shadow-md hover:bg-gray-100 font-light">
          Connect with us
        </Button>
      </Link>
    </div>
  )
}
