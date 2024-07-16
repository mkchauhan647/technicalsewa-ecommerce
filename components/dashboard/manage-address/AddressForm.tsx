"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function AddressForm() {
  const router = useRouter()

  const [data, setData] = useState([
    {
      name: "Ktm",
      phone: "0123456789",
      loc: "Nepal,kathmandu",
    },
  ])
  return (
    <main className=" p-4 sm:p-10 lg:p-20 flex flex-col  w-full gap-4 ">
      <header>
        <h1 className="text-3xl font-medium">Add New Address</h1>
      </header>
      <div className=" bg-white sm:p-10 flex flex-col  justify-center gap-5  rounded-lg w-full">
        <form>
          <div className=" grid sm:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="full-name">Address Name</Label>
              <Input
                id="full-name"
                placeholder="Enter your Address name"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" placeholder="Enter your mobile" type="text" />
            </div>
            <div>
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" placeholder="Enter your Location" type="text" />
            </div>
          </div>
        </form>
        <button
          className="w-40 pt-4 bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg"
          onClick={() => router.push("/manage-address")}
        >
          Save{" "}
        </button>
      </div>
    </main>
  )
}
