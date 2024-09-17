"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { usePathname } from "next/navigation"
import { getSingleProduct } from "@/store/action/singleProduct.action"
import { AppDispatch, RootState } from "@/store/store"
import { singleItemData } from "@/store/slice/singleProduct.slice"
import { AxiosCorsInstance } from "@/axios_config/Axios"
import PaymentPage from "@/app/(dash)/pay-online/page"
import axios from "axios"
interface CustomerData {
  name: string
  type: string
  // Add other properties as needed
}
interface Data {
  sales_details_id?: string
  date?: string
  part_quantity?: number
  img?: string
  part_number?: string
  price?: number
}
const page = () => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

  const pathname = usePathname()
  const route = pathname.split("=")
  const [data, setData] = useState<CustomerData | null>(null)
  const [add, setAdd] = useState("")
  const [value, setValue] = useState<Data[]>([])

  const id = route[1]
  const dispatch = useDispatch<AppDispatch>()
  const singleData = useTypedSelector(singleItemData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await AxiosCorsInstance.post(
        //   "/publiccontrol/publicsales/getsalesparts",
        const response = await axios.post(
          "/spareparts/apiHelper/cors-helper",
          {
            sales_id: id,
          },
        )
        const alldata = response.data
        setValue(alldata)
      } catch (error) {
        setValue([])
      }
    }

    fetchData()
  }, [id])
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id") ?? "{}"

      const storedData = localStorage.getItem("data") ?? "{}"
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData)
          setData(parsedData)
        } catch (error) {
          console.error("Failed to parse stored data", error)
        }
      }
      const storedAddress = localStorage.getItem("address")
      if (storedAddress) {
        setAdd(storedAddress)
      }
    }
  }, [])
  return (
    <div className="w-full flex flex-col md:flex-row my-20 justify-center items-center rounded relative">
      <div className="p-10  h-full flex flex-col gap-4 justify-center items-center ">
        <div className="flex gap-1 items-center">
          <FaCheckCircle
            className=" text-green-800 cursor-pointer text-center"
            size={30}
          />
          <h2 className="text-center font-semibold text-3xl text-green-800">
            Thank you for Ordering!
          </h2>
        </div>
        <h2 className="flex flex-col text-center items-center">
          <span className="font-semibold text-xl">Shipping To</span>
          <span className="capitalize font-semibold text-xl ">
            {data?.name}
          </span>
          <span className="text-lg">{add}</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-2">
          <button
            onClick={() => router.push("/order-history")}
            className="border-2 border-orange-200 rounded text-black/50 font-extrabold px-8 py-2 text-sm"
          >
            VIEW ORDER
          </button>

          {/* <button
            onClick={() => router.push("/pay-online")}
            className="bg-gradient-to-tr from-orange-200 to-orange-600 rounded text-white py-2 text-sm font-extrabold px-8 whitespace-nowrap flex-1"
          >
            Pay Online
          </button> */}
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-tr from-orange-200 to-orange-600 rounded text-white py-2 text-sm font-extrabold px-8 whitespace-nowrap flex-1"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
      {value.map((item: any, index: number) => (
        <img
          src={item?.img}
          className="w-40 h-40 object-cover border border-black rounded-lg p-2"
        />
      ))}

      <PaymentPage/>
    </div>
  )
}

export default page
