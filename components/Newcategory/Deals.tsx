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
import Timer from "./Timer"
import { Product } from "@/lib/types"
import { handleDiscount, handleLineThrough } from "./Brands"
// interface Product {
//   model: string
//   blog_name: string
//   name: string
//   image_name: string
//   our_rate: number
//   tech_rate: number
//   market_rate: number
//   blog_id: string
//   date: string
//   latest: boolean
//   featured: boolean
//   page_title: string
//   is_hot: string
//   end_dt: string
//   end_tm: string
//   start_dt: string
//   start_tm: string
//   page_url:string
// }

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

const Deals = () => {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState(5)
  const [showPopover, setShowPopover] = useState(false)
  const [timer, setTimer] = useState<string>("")
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  const [data, setData] = useState<CustomerData | null>(null)
  const [quantity, setQuantity] = useState(1);

  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    const itemsData = JSON.parse(item.items)
    return { item, itemsData }
  })

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const ifloggedIn = localStorage.getItem("id")

  const addToCart = (product: Product) => {

    const newItem: CartItem = {
      items: [product],
      // subtotal: product.subtotal,
      // tax: product.tax,
      // discount: product.discount,
      // total: product.total,
      // subtotal: 0,
      // tax: 0,
      // discount: 0,
      //  total: data?.type === "Technician" ? product?.tech_rate : product?.our_rate,
      total: ( (data?.type === "Technician")
      ? product.tech_discount_rate < product.tech_rate && product.tech_discount_rate > 0 ? product?.tech_discount_rate : product?.tech_rate
      : product.customer_discount_rate < product.customer_rate && product.customer_discount_rate > 0 ? product?.customer_discount_rate
      : product?.customer_rate),
      quantity: quantity,
      image_url: product.image_name,
    }


    if (ifloggedIn === null) {
      // setShowPopover(true)
     

      dispatch(addCartItems(newItem)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Item Added To Cart")
          dispatch(fetchCartItems())
        } else {
          toast.error("Error Added To Cart")
  
        }
      })
      if (localStorage.getItem("items") === null) {
        localStorage.setItem("items", JSON.stringify([newItem]));
      }
      else {
        const items:Array<any> = JSON.parse(localStorage.getItem("items") ?? "[]")        
       
        const itemExists = items.some((item: any) => {
          if (typeof item.items === "string") {
            item.items = JSON.parse(item.items) as Array<any>;
          }
         
          return item.items.some((parsedItem: Product) => parsedItem.blog_name === product.blog_name);
        })

        if (itemExists) {
          const updatedItems = items.map((item: any) => {

           
          
            if (item.items[0].blog_name === product.blog_name) {
              item.quantity = item.quantity + 1;
            }
            return item;
          })
          localStorage.setItem("items", JSON.stringify(updatedItems));
          return;
        }

          items.push(newItem)
          localStorage.setItem("items", JSON.stringify(items));
      }
      return
    }

      

    const itemExists = cartItems.some((item: any) => {
      const parsedItems = JSON.parse(item.items)
      return parsedItems.some(
        (parsedItem: Product) => parsedItem.blog_name === product.blog_name,
      )
    })

    if (itemExists) {
      const prevCartItem: any = parsedCartItems.filter((parsedItem) => {
        if(parsedItem.itemsData)
        return parsedItem.itemsData.some(
          (cartProduct) => cartProduct.blog_name === product.blog_name,
        );
      }
      )

      const updatedQuantity = Number(prevCartItem[0].item.quantity) // Ensure it's parsed as a number
      const updatedItem = {
        ...prevCartItem[0].item,
        quantity: updatedQuantity + quantity,
        itemsData: JSON.stringify(prevCartItem[0].itemsData), // Ensure itemsData is stringified
      }
      dispatch(
        editCartItems({ id: prevCartItem[0].item.id, product: updatedItem }),
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Added to Cart")
          dispatch(fetchCartItems())
        } else {
          toast.error("Error adding to Cart")
        }
      })

      return
    }

    dispatch(addCartItems(newItem)).then((res) => {
      // console.log("res", res);
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Item Added To Cart")
        dispatch(fetchCartItems())
      } else {
        toast.error("Error Added To Cart")

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

  //   useEffect(() => {
  //     const updateTimer = () => {
  //       const now = new Date()
  //       const end = new Date()
  //       end.setHours(24, 0, 0, 0) // Set end time to midnight
  //       const timeRemaining = end.getTime() - now.getTime()

  //       const hours = Math.floor(
  //         (timeRemaining % (1000 * 3600 * 24)) / (1000 * 3600),
  //       )
  //       const minutes = Math.floor((timeRemaining % (1000 * 3600)) / (1000 * 60))

  //       setTimer(`${hours}h ${minutes}m`)
  //     }

  //     updateTimer() // Initial call
  //     const intervalId = setInterval(updateTimer, 60000) // Update every minute

  //     return () => clearInterval(intervalId) // Cleanup interval on component unmount
  //   }, [])

  const featuredProducts = trending
    .filter(
      (product) =>
        product.latest && 
        new Date(product.end_dt || '') > new Date() &&
        product.end_tm,
    )
    .map((product) => ({
      ...product,
      endDateTime: new Date(`${product.end_dt}T${product.end_tm}`),
    }))
    .sort((a, b) => a.endDateTime.getTime() - b.endDateTime.getTime())

  const view = (text: string) => {
    if (text === "more") {
      setCurrentProduct(featuredProducts.length)
      return
    }
    setCurrentProduct(5);
    return;
  }

  // console.log("featuredProducts", featuredProducts)

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
      <div className="featured-products py-5">
        <div className="flex flex-col md:flex-row  items-center mb-8 md:gap-10">
          <div className="flex w-1/3 ">
            <span className="text-base font-semibold">Deals of the Day</span>
          </div>
          <div className="flex justify-between items-center w-full md:w-2/3">
            <Timer />
            {currentProduct === 5 ? (
              <button
                onClick={() => view("more")}
                className={`h-[40px] p-2 bg-[#0891B2] text-white rounded-md active:scale-x-95 ml-4 text-sm`}
              >
                View More
              </button>
            ) : (
              <button
                onClick={() => view("less")}
                className={`h-[40px] p-2 bg-[#0891B2] text-white rounded-md active:scale-x-95 ml-4 text-sm`}
              >
                View Less
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {featuredProducts
            .slice(0, currentProduct)
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
                  href={`/${product.page_url.split(' ').map((value => value.toLocaleLowerCase())).join('-')}`}
                  // target="_blank"
              >
                <div className=" transition-all duration-500 hover:scale-110">
                  <LazyLoadImage
                    alt={product.blog_name}
                    src={product.image_name}
                    className="w-full h-36 md:h-52 md:p-6"
                  />
                </div>
                  {/* <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
                  {Math.round(((product.market_rate -(  (data?.type === "Technician")
                        ? product?.tech_rate
                        : product?.our_rate)) / product.market_rate) * 100) + "%" } 
                  </span> */}
                  {
                    handleDiscount(product,data)
                  }

                <div className="md:px-4 px-1 mt-[10px]">
                  <h3 className="text-xs text-[black] md:pr-[10px] overflow-hidden">
                    {product.page_title}
                  </h3>

                  {/* <div className="flex flex-col ">
                    <span className="text-[15px] text-[#f85606] block">
                      { (data?.type === "Technician")
                        ? `Rs.${product?.tech_rate}`
                        : `Rs.${product?.our_rate}`}
                    </span>
                    <span className="text-[13px] line-through text-[#9e9e9e]">
                      Rs. {product.market_rate}
                    </span>
                  </div> */}
                     <div className="flex flex-col ">
                      {/* <span className="text-[15px] text-[#f85606] block">
                        
                        {(data?.type === "Technician")
                          ? product.tech_discount_rate < product.tech_rate && product.tech_discount_rate > 0 ? `Rs.${product?.tech_discount_rate}` : `Rs.${product?.tech_rate}`
                          : product.customer_discount_rate < product.customer_rate && product.customer_discount_rate > 0 ? `Rs.${product?.customer_discount_rate} ` : `Rs.${product?.customer_rate}`}
                    </span> */}
                      {
                        handleLineThrough(product,data,false)
                      }
                    {/* <span className="text-[13px] line-through text-[#9e9e9e]">
                        {
                        (data?.type === "Technician") ? (product.tech_discount_rate > 0 ? `Rs.${product?.tech_rate}`: '') : (product.customer_discount_rate > 0 ?  `Rs.${product?.customer_rate}`:'')
                      }
                    </span> */}
                      {
                        handleLineThrough(product,data)
                      }
                  </div>
                </div>
              </Link>
              {/* {ifloggedIn === null ? (
                <div className="relative">
                  <button
                    onClick={() => setShowPopover(true)}
                    className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : ( */}
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#0891B2] text-white rounded-md hover:bg-blue-700 w-[110px] py-2 m-4 text-xs"
                >
                  Add to Cart
                </button>
              {/* )} */}
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

export default Deals
