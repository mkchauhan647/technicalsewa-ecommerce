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
import { useRouter } from "next/navigation"
import { SingleProduct } from "@/store/slice/singleProduct.slice"
interface CustomerData {
  name: string
  type: string
  // Add other properties as needed
}
interface CartContentProps {
  cartdata: CartItem[]
}

interface DetailsProps {
  product: SingleProduct | null | any
  qty?: any
  routeid?: string
}
const BuyNowPage: React.FC<DetailsProps> = ({ product, qty, routeid }) => {
  const [data, setData] = useState<CustomerData | null>(null)
  const [type, setType] = useState("Normal")
  const itemsArray = product

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("data") ?? "{}"
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData)
          setData(parsedData)
        } catch (error) {
          console.error("Failed to parse stored data", error)
        }
      }
    }
  }, [])
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: data?.name,
    phone: "",
    email: "",
    // state: "",
    address: "",
    // city: "",
    vat: "",
    remark: "",
  })

  function formatDateTime(date: Date) {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }
  const today = new Date()
  const formattedToday = formatDateTime(today)

  // Calculate subtotal for each item and add it to total
  const quantity = qty ? qty : "1"
  const pqty = [qty ? qty : "1"]
  let subtotalamt =
    data?.type === "Technician"
      ? itemsArray?.tech_rate * quantity
      : itemsArray?.our_rate * quantity
  if (type === "Urgent") {
    subtotalamt += 50
  }
  const pnum = [itemsArray?.blog_name]
  const prate = [itemsArray?.our_rate]
  const img = [itemsArray?.image_name]
  const sales_details_id: string[] = [""]
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
            <span>
              <div className="flex md:flex-row flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Image
                      src={product?.image_name ?? ""}
                      alt="img"
                      width={150}
                      height={150}
                      // layout="responsive"
                      className="hidden md:flex"
                    />

                    <Image
                      src={product?.image_name ?? ""}
                      alt="img"
                      width={80}
                      className="md:hidden flex object-cover"
                      height={80}
                      // layout="responsive"
                    />

                    <div className="md:hidden flex flex-col flex-3 gap-1 justify-center">
                      <span className="font-semibold">
                        {product?.blog_name}
                      </span>
                      <span className="font-normal text-sm">
                        {product?.meta_desc}
                      </span>
                    </div>
                  </div>

                  <div className="md:hidden flex">
                    <div className="w-1/4 flex justify-center items-center text-green-700">
                      Qty:{pqty}
                    </div>
                    <div className="w-3/4 flex justify-end items-center gap-3">
                      <span className="line-through text-red-500">
                        Rs.{product?.market_rate * quantity}
                      </span>
                      <span>
                        {" "}
                        {data?.type === "Technician"
                          ? `Rs.${product?.tech_rate * quantity}`
                          : `Rs.${product?.our_rate * quantity}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex">
                  <div className="hidden flex-1 md:flex justify-center items-center">
                    Qty:{pqty}
                  </div>
                  <div className="hidden flex-1 md:flex flex-col justify-center items-end gap-3">
                    <span className="line-through text-red-500">
                      Rs.{product?.market_rate * quantity}
                    </span>
                    <span>
                      {data?.type === "Technician"
                        ? `Rs.${product?.tech_rate * quantity}`
                        : `Rs.${product?.our_rate * quantity}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col w-full gap-1 justify-center">
                <span className="font-semibold">{product?.blog_name}</span>
                <span className="font-normal text-sm">
                  {product?.meta_desc}
                </span>
              </div>
              <hr />
            </span>

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
              <span className="">
                <select
                  className="border bg-white font-semibold rounded px-2 py-1"
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
  )
}

export default BuyNowPage
