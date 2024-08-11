"use client";
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
import { Footer } from "../dashboard/Footer"
import Login from "../Login"

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

const BrandsSliders = () => {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState(5)
  const [showPopover, setShowPopover] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  const [data, setData] = useState<CustomerData | null>(null)

  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    return { item, itemsData }
  })

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const ifloggedIn = localStorage.getItem("id")

  const addToCart = (product: Product) => {
    if (ifloggedIn === null) {
      setShowPopover(true)
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

      const updatedQuantity = Number(prevCartItem[0].item.quantity)
      const updatedItem = {
        ...prevCartItem[0].item,
        quantity: updatedQuantity + 1,
        itemsData: JSON.stringify(prevCartItem[0].itemsData),
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
      total: !(data?.type === "Customer") ? product.tech_rate : product.our_rate,
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
        console.log(response.data)
        setTrending(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredProducts = trending.filter((product) => product.is_hot)

  const view = (text: string) => {
    if (text === "more") {
      setCurrentProduct(featuredProducts.length)
      return
    }
    setCurrentProduct(5)
  }

  const handleClosePopover = () => setShowPopover(false)

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-slate-600 animate-bounce">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className="featured-products">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {featuredProducts
            .slice(0, 10)
            .map((product: Product, index: number) => (
              <div
              className="product rounded-lg overflow-hidden relative  hover:shadow-lg  shadow-md cursor-pointer"
              key={index}
            >
              <Link
                // href={{
                //   pathname: "/detail-beta",
                //   query: { id: product.blog_id },
                  // }}
                  // href={`/${product.blog_name.split(' ').map((value => value.toLocaleLowerCase())).join('-')}?id=${product.blog_id}`}
                  href={`/${product.blog_name.split(' ').map((value => value.toLocaleLowerCase())).join('-')}-${product.blog_id}`}
                  target="_blank"
              >
                <div className="">
                  <LazyLoadImage
                    alt={product.blog_name}
                    src={product.image_name}
                    className="w-full h-36 md:h-52 md:p-6"
                  />
                  <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
                  {Math.round(((product.market_rate -( !(data?.type === "Customer")
                        ? product?.tech_rate
                        : product?.our_rate)) / product.market_rate) * 100) + "%" } 
                  </span>
                </div>

                <div className="md:px-4 px-1 mt-[10px]">
                  <h3 className="text-xs text-[black] md:pr-[10px] overflow-hidden">
                    {product.blog_name}
                  </h3>

                  <div className="flex flex-col ">
                    <span className="text-[15px] text-[#f85606] block">
                      {!(data?.type === "Customer")
                        ? `Rs.${product?.tech_rate}`
                        : `Rs.${product?.our_rate}`}
                    </span>
                    <span className="text-[13px] line-through text-[#9e9e9e]">
                      Rs. {product.market_rate}
                    </span>
                  </div>
                </div>
              </Link>
              {ifloggedIn === null ? (
                <div className="relative">
                  <button
                    onClick={() => setShowPopover(true)}
                    className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-xs"
                >
                  Add to Cart
                </button>
              )}
            </div>
            ))}
        </div>
      </div>
      {showPopover && (
        <div className="fixed h-screen w-screen top-0 left-0 flex items-center justify-center mt-2 bg-black/80 p-4 rounded-lg shadow-lg z-50">
          <div className="relative h-[500px] w-[800px] rounded-lg flex items-center justify-center bg-white">
            <Login />
            <button
              onClick={handleClosePopover}
              className="absolute top-0 right-2 p-2 text-black"
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default BrandsSliders
