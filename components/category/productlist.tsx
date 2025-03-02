import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BiCategory } from "react-icons/bi"
import Brands from "../brands/Brands"
import {
  addCartItems,
  editCartItems,
  fetchCartItems,
} from "@/store/slice/cart/getcartSlice"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import Login from "../Login"
import Categories from "./Categories"
import { CartItem, CustomerData, ParsedCartItem, Product } from "@/lib/types"
import { handleDiscount, handleLineThrough } from "../Newcategory/Brands"
import logo from "@/assets/logo-ts.jpg"

export interface GrandChild {
  STATUS: string
  blog_desc: string
  blog_name: string
  contact_info: string
  features: string
  image_name: null | string
  // market_rate: string
  customer_rate: number
  meta_desc: string
  // our_rate: string
  customer_discount_rate: number
  page_title: string
  page_url: string
  blog_id: string
  // svc_rate: string
  tech_rate: number
  tech_discount_rate: number
  id: string
  topTitle: string
}

interface ProductProps {
  grandChildData: Product[]
}

const Productlist: React.FC<ProductProps> = ({ grandChildData }) => {
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [data, setData] = useState<CustomerData | null>(null)
  const [showPopover, setShowPopover] = useState(false)

  const router = useRouter()

  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    return { item, itemsData }
  })

  console.log(parsedCartItems, "PARSED CART ITEM")
  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const ifloggedIn = localStorage.getItem("id")
  const addToCart = (product: Product) => {
    if (ifloggedIn === null) {
      setShowPopover(true)
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

    const newItem: CartItem = {
      items: [product],
      // total: data?.type === "Technician" ? product.tech_rate : product.our_rate,
      total:
        data?.type === "Technician"
          ? product.tech_discount_rate < product.tech_rate &&
            product.tech_discount_rate > 0
            ? product?.tech_discount_rate
            : product?.tech_rate
          : product.customer_discount_rate < product.customer_rate &&
              product.customer_discount_rate > 0
            ? product?.customer_discount_rate
            : product?.customer_rate,
      quantity: 1,
      image_url: product.image_name,
    }

    dispatch(addCartItems(newItem)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchCartItems())
        toast.success("Added to Cart")
      } else {
        toast.error("Error Adding To Cart")
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
  }, [])
  const handleClosePopover = () => setShowPopover(false)

  return (
    <div className=" py-5">
      <div className="flex w-full gap-14 justify-between">
        <div className="lg:flex hidden flex-col lg:w-[10%]">
          <div className="border-r lg:block ">
            <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px] text-sm">
              <BiCategory className="text-xl cursor-pointer" /> Categories
            </div>
            <Categories />
          </div>
          <div className="border-r  lg:block  ">
            <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px]">
              <BiCategory className="text-2xl cursor-pointer" /> Brands
            </div>
            <Brands />
          </div>{" "}
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-5/6">
          {grandChildData.map((product, index) => (
            <div
              className="flex flex-col md:h-[400px] product rounded-lg overflow-hidden relative hover:shadow-lg shadow-md cursor-pointer"
              key={index}
            >
              <Link
                // href={{
                //   pathname: "/detail-beta",
                //   query: { id: product.blog_id },
                // }}
                href={`/${product.page_url
                  .split(" ")
                  .map((value) => value.toLocaleLowerCase())
                  .join("-")}`}
              >
                <div className="transition-all duration-500 hover:scale-110">
                  <Image
                    src={product?.image_name ? product.image_name : logo.src}
                    alt={product.blog_name}
                    width={189}
                    height={189}
                    className="w-full h-48 md:h-56 p-8 lg:object-contain sm:object-cover"
                  />
                </div>
                {/* <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
                    -10%
                </span> */}
                {handleDiscount(product, data)}
                <span className="absolute bottom-44 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-tl-md uppercase">
                  HOT
                </span>
                <div className="px-4 mt-4">
                  <h3 className="text-xs text-[black] md:pr-[10px] overflow-hidden">
                    {product.page_title}
                  </h3>
                  {/* <div className="">
                    <span className="text-[18px] text-[#f85606] block">
                      {data?.type === "Technician"
                        ? `Rs.${product?.tech_rate}`
                        : `Rs.${product.our_rate}`}{" "}
                    </span>
                    <span className="text-[14px] line-through text-[#9e9e9e]">
                      Rs. {product}
                    </span>
                  </div> */}
                  <div className="flex flex-col ">
                    {/* <span className="text-[15px] text-[#f85606] block">
                        
                        {(data?.type === "Technician")
                          ? product.tech_discount_rate < product.tech_rate && product.tech_discount_rate > 0 ? `Rs.${product?.tech_discount_rate}` : `Rs.${product?.tech_rate}`
                          : product.customer_discount_rate < product.customer_rate && product.customer_discount_rate > 0 ? `Rs.${product?.customer_discount_rate} ` : `Rs.${product?.customer_rate}`}
                    </span>
                    <span className="text-[13px] line-through text-[#9e9e9e]">
                        {
                        (data?.type === "Technician") ? (product.tech_discount_rate > 0 ? `Rs.${product?.tech_rate}`: '') : (product.customer_discount_rate > 0 ?  `Rs.${product?.customer_rate}`:'')
                      }
                    </span> */}
                    {handleLineThrough(product, data, false)}
                    {handleLineThrough(product, data)}
                  </div>
                </div>
              </Link>
              {ifloggedIn === null ? (
                <div className="relative">
                  <button
                    onClick={() => setShowPopover(true)}
                    className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-[14px]"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-[14px]"
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
      <ToastContainer />
    </div>
  )
}

export default Productlist
