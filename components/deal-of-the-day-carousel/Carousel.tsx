"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"
import Image from "next/image"
import { RootState, AppDispatch } from "../../store/store"
import {
  addCartItems,
  editCartItems,
  fetchCartItems,
} from "@/store/slice/cart/getcartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Countdown from "../Countdown"

interface Product {
  model: string
  blog_name: string
  name: string
  image_name: string
  our_rate: number
  market_rate: number
  blog_id: string
  featured: boolean
  page_title: string
  blog_desc: string
}

interface CartItem {
  items: Product[]
  quantity: number
  image_url: string
  total: number
}

interface ParsedCartItem {
  item: CartItem
  itemsData: Product[]
}

export function DealCarousel() {
  const [loading, setLoading] = useState(true)
  const [todayDeals, setTodayDeals] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string[] }>({})
  const [mainImage, setMainImage] = useState<{ [key: string]: string }>({})

  const router = useRouter()

  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    return { item, itemsData }
  })

  const addToCart = (product: Product) => {
    const ifloggedIn = localStorage.getItem("id")
    if (ifloggedIn === null) {
      router.push("/login")
      return
    }

    const itemExists = cartItems.some((item: any) => {
      const parsedItems = JSON.parse(item.items)
      return parsedItems.some(
        (parsedItem: Product) => parsedItem.blog_name === product.blog_name,
      )
    })

    if (itemExists) {
      const prevCartItem: any = parsedCartItems.filter((parsedItem) =>
        parsedItem.itemsData.some(
          (cartProduct) => cartProduct.blog_name === product.blog_name,
        ),
      )

      const updatedQuantity = Number(prevCartItem[0].item.quantity) // Ensure it's parsed as a number
      const updatedItem = {
        ...prevCartItem[0].item,
        quantity: updatedQuantity + 1,
        itemsData: JSON.stringify(prevCartItem[0].itemsData), // Ensure itemsData is stringified
      }
      dispatch(
        editCartItems({ id: prevCartItem[0].item.id, product: updatedItem }),
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchCartItems())
          toast.success("Added to Cart")
        } else {
          toast.error("Error adding to Cart")
        }
      })

      return
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
        )

        setTodayDeals(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (todayDeals.length > 0) {
      const newThumbnails: { [key: string]: string[] } = {}
      const newMainImage: { [key: string]: string } = {}

      todayDeals.forEach((deal) => {
        newThumbnails[deal.image_name] = [
          deal.image_name,
          "/bike.png",
          "/demo.png",
        ]
        newMainImage[deal.image_name] = deal.image_name
      })

      setThumbnails(newThumbnails)
      setMainImage(newMainImage)
    }
  }, [todayDeals])

  const handleThumbnailClick = (imageName: string, thumbnail: string) => {
    setMainImage((prev) => ({ ...prev, [imageName]: thumbnail }))
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-slate-600 animate-bounce">
        Loading...
      </div>
    )
  }

  return (
    <>
      {/* <Carousel
        className="w-full xl:container mx-auto 2xl:px-28 px-4 max-h-96 p-5"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {todayDeals.map((deal, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col sm:flex-row justify-between text-center align-middle">
                  <span className="text-center flex flex-col sm:flex-row min-w-min border">
                    <div>
                      <h1 className="text-lg sm:text-3xl font-bold">
                        Deal of the day
                      </h1>
                      <p>
                        Monsoon offer is live now for limited time. Grab yours
                        before the amazing offers runs out.
                      </p>
                      <Countdown />
                    </div>
                    <img
                      className="rounded-md my-1 mx-5 max-h-40 max-w-xs sm:width-[300px] sm:h-[200px]"
                      alt={deal.blog_name}
                      src={mainImage[deal.image_name] || deal.image_name}
                    />
                  </span>
                  <div className="flex flex-row sm:flex-col my-4">
                    {thumbnails[deal.image_name]?.map((thumbnail, idx) => (
                      <img
                        key={idx}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`rounded-sm mx-1 space-y-1 w-3/12 sm:w-6/12  ${
                          mainImage[deal.image_name] === thumbnail
                            ? "border border-cyan-400"
                            : ""
                        }`}
                        src={thumbnail}
                        style={{
                          aspectRatio: "70/50",
                          objectFit: "cover",
                        }}
                        onClick={() =>
                          handleThumbnailClick(deal.image_name, thumbnail)
                        }
                      />
                    ))}
                  </div>
                  <div className="px-4 bg-white text-[15px] mt-4 text-left">
                    <h1 className="text-[22px] text-[black] pr-[10px] overflow-hidden">
                      {deal.blog_name}
                    </h1>
                    <div className="flex flex-col w-9/12">
                      <span>{deal.blog_desc.split("", 350)}...</span>
                      <span className="text-[18px] text-[#f85606]">
                        Rs.{deal.our_rate}
                      </span>
                      <span className="text-[14px] line-through text-[#9e9e9e]">
                        Rs.{deal.market_rate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 text-[14px]"
                        onClick={() => addToCart(deal)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
    </>
  )
}
