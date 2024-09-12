"use client"
import { AxiosCorsInstance } from "@/axios_config/Axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  CartItem,
  deleteAllCartItems,
  fetchCartItems,
} from "../../store/slice/cart/getcartSlice"
import { AppDispatch, RootState } from "../../store/store"
import ShippingDetailsForm from "./ShippingDetailsForm"
import CheckoutApiResponseModal from "./CheckoutApiResponseModal"
import toast, { Toaster } from "react-hot-toast"
import { redirect, useRouter } from "next/navigation"
import Login from "@/components/Login"
import { handleLineThrough } from "../Newcategory/Brands"
import logo from "@/assets/logo-ts.jpg"

interface CustomerData {
  name: string
  type: string
  // Add other properties as needed
}
interface CartContentProps {
  cartdata: CartItem[]
}
interface ParsedCartItem {
  item: CartItem
  itemsData: any[]
}
export const CheckoutPage = () => {
  const [data, setData] = useState<CustomerData | null>(null)
  const [type, setType] = useState("Normal")
  const [showPopover, setShowPopover] = useState(false)

  const handleClosePopover = () => {
    setShowPopover(false)
  }

  const itemsArray: ParsedCartItem[] = []

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id") ?? "{}"

      const storedData = localStorage.getItem("data")
      if (storedData) {
        // console.log("Stored data", storedData)
        try {
          const parsedData = JSON.parse(storedData)
          setData(parsedData)
        } catch (error) {
          console.error("Failed to parse stored data", error)
        }
      } else {
        // alert("Please login to continue");
        // router.push("/login");
      }
    }
  }, [])
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const shipping = 20.0
  const router = useRouter()

  let subtotalamt = 0
  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const [formData, setFormData] = useState({
    name: data?.name,
    phone: "",
    email: "",
    state: "",
    address: "",
    // city: "",
    vat: "",
    remark: "",
  })

  function formatDate(date: any) {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  const today = new Date()
  const formattedToday = formatDate(today)

  cartItems.forEach((item: any) => {
    const parsedData = JSON.parse(item.items)
    itemsArray.push({ item, itemsData: parsedData })
    // Calculate subtotal for each item and add it to total
    subtotalamt += parseFloat(item.total) * item.quantity
  })
  if (type === "Urgent") {
    subtotalamt += 50
  }
  const pdesc = itemsArray.map((item) => item.itemsData[0].blog_desc)
  const pnum = itemsArray.map((item) => item.itemsData[0].blog_name)
  const prate = itemsArray.map((item) => item.itemsData[0].our_rate)
  const pqty = itemsArray.map((item) => item.item.quantity)
  const img = itemsArray.map((item) => item.item.image_url)
  const sales_details_id = itemsArray.map((item) => "")
  // const sales_details_id = Array(itemsArray.length).fill([""])
  function extractOrderId(message: any) {
    const match = message.match(/order id is (\d+)/i)
    return match ? match[1] : null
  }

  const handleOrder = async () => {
    if (
      formData.email === "" ||
      formData.name === "" ||
      formData.phone === "" ||
      formData.address === ""
      // formData.city === ""
    ) {
      toast.error("Please fill the shipping Details")
      return
    }
    const id = localStorage.getItem("id") ?? "{}"

    try {
      const response = await AxiosCorsInstance.post(
        "/publiccontrol/publicsales/CreatePublicSales",
        {
          customer_name: formData?.name,
          customer_address: formData.address,
          cust_vat: formData.vat,
          sales_remarks: formData.remark,
          sales_date: formattedToday,
          shipping_address: formData.address,
          pnum,
          pqty,
          prate,
          total_price: subtotalamt,
          grand_total: subtotalamt,
          cust_id: id,
          cust_type: data?.type,
          img,
          sales_details_id: sales_details_id,
        },
      )
      const rid = extractOrderId(response.data)

      if (response.data) {
        await dispatch(deleteAllCartItems({ id }))
        router.push(`/checkout/success/id=${rid}`)
      } else {
        toast.error("Order failed. Please try again.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Order failed. Please try again.")
    }
  }

  return (
    <>
      <div className="bg-gray-50">
        <div className="container flex md:flex-row flex-col gap-5 py-8 ">
          <div className="bg-white flex flex-col md:w-2/3 md:h-fit overflow-hidden shadow-lg rounded-lg md:p-5 p-2 gap-2 justify-between">
            <div className="flex flex-col gap-3">
              <hr />
              <div className="flex justify-start">
                <ShippingDetailsForm setFormData={setFormData} />
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col md:w-1/3 shadow-lg rounded-lg p-5 gap-2">
            <span className="md:max-h-[320px] md:overflow-auto">
              {itemsArray.map((item: any, index: number) => (
                <span key={index}>
                  <div className="flex md:flex-row flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Image
                          src={item?.itemsData[0]?.image_name ?? logo.src}
                          alt="img"
                          width={150}
                          height={150}
                          // layout="responsive"
                          className="hidden md:flex"
                        />

                        <Image
                          src={item?.itemsData[0]?.image_name ?? logo.src}
                          alt="img"
                          width={80}
                          className="md:hidden flex object-cover"
                          height={80}
                          // layout="responsive"
                        />

                        <div className="md:hidden flex flex-col flex-3 gap-1 justify-center">
                          <span className="font-semibold">
                            {item.itemsData[0]?.page_title}
                          </span>
                          <span className="font-normal text-sm">
                            {/* {item?.itemsData[0]?.meta_desc} */}
                          </span>
                        </div>
                      </div>

                      <div className="md:hidden flex flex-col">
                        <div className="w-1/4  text-green-700">
                          Qty:{item?.item?.quantity}
                        </div>
                        <div className="w-3/4  gap-3 flex flex-col">
                          <span className="line-through text-red-500">
                            {/* Rs.{item?.itemsData[0]?.market_rate} */}
                            {handleLineThrough(item.itemsData[0], data)}
                          </span>
                          <span className="">
                            {/* {data?.type === "Technician"
                            ? `Rs.${item?.itemsData[0]?.tech_rate}`
                            : `Rs.${item?.itemsData[0]?.our_rate}`} */}
                            {data?.type === "Technician"
                              ? item?.itemsData[0]?.tech_discount_rate <
                                  item?.itemsData[0]?.tech_rate &&
                                item?.itemsData[0]?.tech_discount_rate > 0
                                ? `Rs.${item?.itemsData[0]?.tech_discount_rate}`
                                : `Rs.${item?.itemsData[0]?.tech_rate}`
                              : item?.itemsData[0]?.customer_discount_rate <
                                    item?.itemsData[0]?.customer_rate &&
                                  item?.itemsData[0]?.customer_discount_rate > 0
                                ? `Rs.${item?.itemsData[0]?.customer_discount_rate} `
                                : `Rs.${item?.itemsData[0]?.customer_rate}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex">
                      <div className="hidden flex-1 md:flex justify-center items-center">
                        Qty:{item?.item?.quantity}
                      </div>
                      <div className="hidden flex-1 md:flex flex-col justify-center items-end gap-3">
                        {/* <span className="line-through text-red-500"> */}
                        {/* Rs.{item?.itemsData[0]?.market_rate} */}
                        {handleLineThrough(item.itemsData[0], data)}

                        {/* </span> */}
                        <span>
                          {/* {" "}
                        {data?.type === "Technician"
                          ? `Rs.${item?.itemsData[0]?.tech_rate}`
                          : `Rs.${item?.itemsData[0]?.our_rate}`} */}
                          {data?.type === "Technician"
                            ? item?.itemsData[0]?.tech_discount_rate <
                                item?.itemsData[0]?.tech_rate &&
                              item?.itemsData[0]?.tech_discount_rate > 0
                              ? `Rs.${item?.itemsData[0]?.tech_discount_rate}`
                              : `Rs.${item?.itemsData[0]?.tech_rate}`
                            : item?.itemsData[0]?.customer_discount_rate <
                                  item?.itemsData[0]?.customer_rate &&
                                item?.itemsData[0]?.customer_discount_rate > 0
                              ? `Rs.${item?.itemsData[0]?.customer_discount_rate} `
                              : `Rs.${item?.itemsData[0]?.customer_rate}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col w-full gap-1 justify-center">
                    <span className="font-semibold">
                      {item.itemsData[0]?.page_title}
                    </span>
                    <span className="font-normal text-sm">
                      {/* {item?.itemsData[0]?.meta_desc} */}
                    </span>
                  </div>
                  <hr />
                </span>
              ))}

              <hr />
            </span>
            <div className="font-semibold">Order Summary</div>
            <div className="flex flex-col justify-between gap-1">
              <div className="flex justify-between ">
                SubTotal
                <span className="text-gray-600">Rs.{subtotalamt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping type</span>
                <span className="text-white">
                  <select
                    className="border  bg-cyan-400 font-semibold rounded px-2 py-1"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Normal">Free Delivery</option>
                    <option value="Urgent">Fastest Delivery</option>
                  </select>
                </span>
              </div>
              <div className="flex justify-between ">
                Delivery Fee{" "}
                <span className="text-gray-600">
                  {" "}
                  {type === "Urgent" ? `Rs.50` : `Rs.0`}
                </span>
              </div>
              <div className="flex justify-between ">
                Discount <span className="text-gray-600">Rs.0</span>
              </div>
              <div className="flex justify-between ">
                Total Payment{" "}
                <span className="text-gray-600">Rs.{subtotalamt}</span>
              </div>
            </div>{" "}
            <hr />
            <button
              className="bg-cyan-500 text-white min-w-[100px] border rounded-md text-xs py-2 "
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}
