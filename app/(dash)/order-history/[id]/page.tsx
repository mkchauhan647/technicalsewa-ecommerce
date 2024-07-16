"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { CgDanger } from "react-icons/cg"
import img from "../../../../public/dummy-user.png"
import { AxiosCorsInstance } from "@/axios_config/Axios"
import { toast } from "react-toastify"

interface Review {
  avatarSrc?: string
  username: string
  timestamp: string
  text: string
}

interface Data {
  sales_details_id?: string
  date?: string
  part_quantity?: number
  img?: string
  part_number?: string
  price?: number
}

export default function Component(props: { params: { id: string } }) {
  const sales_id = props.params.id
  const [data, setdata] = useState<Data[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [comment, setComment] = useState<string>("")

  const localStorageData = localStorage.getItem("data")

  const parsedLocalStorageData = localStorageData
    ? JSON.parse(localStorageData)
    : null
  console.log(localStorageData)
  const reviewerId = parsedLocalStorageData?.id
  const type = parsedLocalStorageData?.type

  const productName = data[0]?.part_number
  const formatDate = (date: any) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const date = new Date()
  const formattedDate = formatDate(date)
  console.log(type, reviewerId, formattedDate, productName, sales_id)
  const formData = new FormData()
  formData.append("done_by", reviewerId)
  formData.append("type", type)
  formData.append("review", comment)
  formData.append("reviewed_date", formattedDate)
  formData.append("star", "5")
  formData.append("product_name", productName || "")
  formData.append("sales_id", sales_id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosCorsInstance.post(
          "/publiccontrol/publicsales/getsalesparts",
          {
            sales_id: sales_id,
          },
        )
        const alldata = response.data
        setdata(alldata)
        toast.success("Data fetched successfully")
      } catch (error) {
        setdata([])
        toast.error("Error fetching data")
      }
    }

    const fetchReviews = async () => {
      try {
        const response = await AxiosCorsInstance.post(
          "publiccontrol/publicreview/getPreviewByCustomer",
          {
            type: "Cust",
            done_by: "1005",
          },
        )
        setReviews(response.data)
      } catch (error) {
        setReviews([])
        console.log("Error fetching reviews:", error)
      }
    }

    fetchData()
    fetchReviews()
  }, [sales_id])

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty")
      return
    }

    try {
      const response = await AxiosCorsInstance.post(
        "publiccontrol/publicreview/CreateproductReview",
        {
          sales_id,
          comment,
        },
      )
      if (response.data) {
        toast.success("Review added successfully")
        setComment("")
      } else {
        toast.error("Failed to add review")
      }
    } catch (error) {
      console.error("Error posting comment:", error)
      toast.error("Error posting comment")
    }
  }

  // Calculate total price and total quantity
  const total = data?.reduce(
    (acc: any, item: any) => {
      acc.totalPrice += Number(item.price * item?.part_quantity)
      acc.totalQuantity += parseInt(item.part_quantity)
      return acc
    },
    { totalPrice: 0, totalQuantity: 0 },
  )

  return (
    <main className="pt-10 px-40 flex flex-col w-full gap-4">
      <header>
        <h1 className="text-3xl font-medium">Order Details</h1>
        <h1
          className={`text-red-500 text-lg ${data.length > 0 ? "hidden" : ""}`}
        >
          Sorry No Data Found for sales_id: {sales_id}
        </h1>
      </header>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg p-3">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold">
                Sales ID: <span className="text-blue-600">{sales_id}</span>
              </span>
            </div>
          </div>
          <div className="bg-red-200 text-white font-medium flex p-2 rounded-lg">
            Pending
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col w-3/5 gap-2 border-[1px] border-gray-200 rounded-lg p-8">
            <span className="font-bold">Order Details</span>
            <div className="flex flex-col gap-2">
              {data?.map((item: any, index) => (
                <div className="flex items-center gap-4 py-2" key={index}>
                  <Image
                    src={item.img && item.img.length > 15 ? item.img : img}
                    width={60}
                    height={60}
                    alt="image"
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <span>{item.part_number}</span>
                    <div className="flex justify-between">
                      <span>Qty: {item.part_quantity}</span>
                      <span>Total: {item?.price * item?.part_quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-2/5 gap-5">
            <div className="flex flex-col w-full gap-2 border-[1px] border-gray-200 rounded-lg p-8">
              <span>Order Summary</span>

              <div className="flex justify-between">
                <span>Products</span>
                <span>{total?.totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs.{total?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Discount</span>
                <span>Rs. 0</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span>Rs.0</span>
              </div>
              <hr className="bg-black h-1" />
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>Rs.{total?.totalPrice}</span>
              </div>

              <div className="flex flex-col bg-gray-100 p-2 gap-1 rounded-lg">
                <span>PAYMENT METHOD</span>
                <div className="flex justify-between">
                  <span className="font-medium text-lg">Cash payment</span>
                  <span className="flex gap-1 items-center bg-red-200 text-red-600 p-2 rounded-full">
                    <CgDanger />
                    Pending
                  </span>
                </div>
              </div>
            </div>
            <div className="text-red-400 text-center underline">
              Cancel Order
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-medium">Customer Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review: any, index) => (
              <div key={index} className="border-b border-gray-300 py-4">
                <div className="flex gap-4">
                  <Image
                    src={img}
                    alt={review.username}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {review?.product_name}
                      </span>
                      <span className="text-gray-600">{}</span>
                    </div>
                    <p className="mt-2">{review?.review}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-4">No reviews yet.</p>
          )}
          {/* <div className="mt-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              placeholder="Add a comment..."
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={handleCommentSubmit}
            >
              Send
            </button>
          </div> */}
        </div>
      </div>
    </main>
  )
}
