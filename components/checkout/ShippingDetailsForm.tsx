import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import PopupMessage from "./PopupMessage"

const ShippingDetailsForm = ({ setFormData }: any) => {
  const [error, setError] = useState(true)
  const [add, setAdd] = useState("")

  // Function to update specific fields in the state
  const updateField = (field: string, value: any) => {
    setFormData((prevState: object) => ({
      ...prevState,
      [field]: value.value,
    }))
    if (field === "phone") {
      setError(value.validity.valid)
    }
  }
  useEffect(() => {
    const storedAddress = localStorage.getItem("address")
    if (storedAddress) {
      setAdd(storedAddress)
      setFormData((prevState: object) => ({
        ...prevState,
        address: storedAddress,
      }))
    }
  }, [setFormData])
  return (
    <div className="w-full flex flex-col gap-4 whitespace-nowrap">
      <PopupMessage />
      <h1 className="font-semibold">Shipping Details</h1>
      <span className="text-red-500">Required field *</span>
      <div className="flex md:flex-row flex-col w-full gap-5 ">
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Full Name: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input type="text" onChange={(e) => updateField("name", e.target)} />
        </div>
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Phone: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input
            className={`${!error && "bg-red-400"}`}
            type="text"
            minLength={10}
            onChange={(e) => updateField("phone", e.target)}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-5 ">
        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Email: <span className="text-red-500 text-xl">*</span>{" "}
          </label>
          <Input
            type="email"
            onChange={(e) => updateField("email", e.target)}
          />
        </div>

        <div className="flex flex-1 items-center">
          <label className="mr-2 text-sm text-gray-400">
            Delivery Area: <span className="text-red-500 text-xl">*</span>
          </label>
          <Input
            type="text"
            value={add}
            onChange={(e) => {
              const value = e.target.value
              setAdd(value)
              updateField("address", value)
            }}
          />
        </div>
      </div>

      <hr />

      <div className="text-lg text-gray-600 border-b-2 w-fit">
        Payment Method:{" "}
      </div>

      <button className="h-20 w-fit flex items-center bg-cyan-500 rounded px-2 text-white">
        <FaMoneyBillTransfer size={40} />
        Cash on Delivery
      </button>
    </div>
  )
}

export default ShippingDetailsForm
