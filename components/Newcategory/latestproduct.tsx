import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"
import Image from "next/image"
import Link from "next/link"

import { RootState, AppDispatch } from "../../store/store"
import {
  addCartItems,
  editCartItems,
  fetchCartItems,
} from "@/store/slice/cart/getcartSlice"
import { useDispatch, useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Product {
  model: string
  blog_name: string
  name: string
  image_name: string
  our_rate: number
  tech_rate: number
  market_rate: number
  blog_id: string
  date: string
  latest: boolean
  featured: boolean
  page_title: string
  is_hot: string
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
interface CustomerData {
  name: string
  type: string
  // Add other properties as needed
}
const Home = () => {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState(6)
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  const [data, setData] = useState<CustomerData | null>(null)

  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    // console.log(itemsData)

    return { item, itemsData }
  })

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const addToCart = (product: Product) => {
    const ifloggedIn = localStorage.getItem("id")

    if (ifloggedIn === null) {
      router.push("/login")
      return
    }

    const itemExists = parsedCartItems.some((parsedItem) =>
      parsedItem.itemsData.some(
        (cartProduct) => cartProduct.blog_name === product.blog_name,
      ),
    )

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

    const newItem: CartItem = {
      items: [product],
      total: data?.type === "Technician" ? product.tech_rate : product.our_rate,
      quantity: 1,
      image_url: product.image_name,
    }

    dispatch(addCartItems(newItem)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchCartItems())
        toast.success("Added to Cart")
      } else {
        toast.error("Error adding to Cart")
      }
    })
  }

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
    }
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
        )

        setTrending(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredProducts = trending.filter((product) => product.latest)

  const view = (text: string) => {
    if (text === "more") {
      setCurrentProduct(featuredProducts.length)
      return
    }
    setCurrentProduct(6)
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-slate-600 animate-bounce">
        Loading...
      </div>
    )
  }
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const id = localStorage.getItem("id") ?? "{}"

  //     const storedData = localStorage.getItem("data") ?? "{}"
  //     if (storedData) {
  //       try {
  //         const parsedData = JSON.parse(storedData)
  //         setData(parsedData)
  //       } catch (error) {
  //         console.error("Failed to parse stored data", error)
  //       }
  //     }
  //   }
  // }, [])

  return (
    <>
      <div className="featured-products py-5">
        <div className="flex justify-between">
          <h1 className="text-[25px] font-bold mb-8">Latest Products</h1>
          {currentProduct === 6 ? (
            <button
              onClick={() => view("more")}
              className={`h-[40px] p-2 bg-[#0891B2] text-white rounded-md active:scale-x-95`}
            >
              View More
            </button>
          ) : (
            <button
              onClick={() => view("less")}
              className={`h-[40px] p-2 bg-[#0891B2] text-white rounded-md active:scale-x-95`}
            >
              View Less
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredProducts
            .slice(0, currentProduct)
            .map((product: Product, index: number) => (
              <div
                className="product rounded-lg overflow-hidden relative  hover:shadow-lg  shadow-md cursor-pointer"
                key={index}
              >
                <Link
                  href={{
                    pathname: "/detail-beta",
                    query: { id: product.blog_id },
                  }}
                >
                  <div className="">
                    <LazyLoadImage
                      alt={product.blog_name}
                      src={product.image_name}
                      className="w-full h-36 md:h-56"
                    />
                    <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
                      -10%
                    </span>
                    <span className="absolute bottom-44 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-tl-md uppercase">
                      {product?.is_hot}
                    </span>
                  </div>

                  <div className="px-4 mt-[18px]">
                    <h3 className="text-[15px] text-[black] h-[48px] pr-[10px] overflow-hidden">
                      {product.blog_name}
                    </h3>

                    <div className="flex flex-col ">
                      <span className="text-[18px] text-[#f85606] block">
                        {data?.type === "Technician"
                          ? `Rs.${product?.tech_rate}`
                          : `Rs.${product?.our_rate}`}
                      </span>
                      <span className="text-[14px] line-through text-[#9e9e9e]">
                        Rs. {product.market_rate}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-[14px]"
                >
                  ADD TO CART
                </button>
              </div>
            ))}
        </div>
        <div className="mt-9 flex justify-center"></div>
      </div>
    </>
  )
}

export default Home
