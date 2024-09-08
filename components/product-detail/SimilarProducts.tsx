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
import { CustomerData,Product,CartItem,ParsedCartItem } from "@/lib/types";

const SimilarProducts = (props:any) => {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState(5)
  const [showPopover, setShowPopover] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  const [data, setData] = useState<CustomerData | null>(null)
  const [quantity, setQuantity] = useState(1)
  const parsedCartItems: ParsedCartItem[] = cartItems.map((item: any) => {
    // const itemsData = JSON.parse(item.items)
    console.log("item", item);
    const itemsData = JSON.parse(item.items)
    console.log("itemsData", itemsData);
    if (typeof itemsData === "string") {
      return { item, itemsData: JSON.parse(itemsData) }
    }
    else {
      
      return { item, itemsData }
    }
    // return { item, itemsData }
  })

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const ifloggedIn = localStorage.getItem("id");

  const addToCart = (product: Product) => {
    if (ifloggedIn === null) {
      // setShowPopover(true)
      const newItem: CartItem = {
        items: [product],
        // subtotal: product.subtotal,
        // tax: product.tax,
        // discount: product.discount,
        // total: product.total,
        // subtotal: 0,
        // tax: 0,
        // discount: 0,
        //  total: data?.type === "Technician" ? product?.tech_rate : product?.customer_rate,
        total: ( (data?.type === "Technician")
        ? product.tech_discount_rate < product.tech_rate && product.tech_discount_rate > 0 ? product?.tech_discount_rate : product?.tech_rate
        : product.customer_discount_rate < product.customer_rate && product.customer_discount_rate > 0 ? product?.customer_discount_rate
        : product?.customer_rate),
        quantity: quantity,
        image_url: product.image_name,
      }

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

    const newItem: CartItem = {
      items: [product],
      // subtotal: product.subtotal,
      // tax: product.tax,
      // discount: product.discount,
      // total: product.total,
      // subtotal: 0,
      // tax: 0,
      // discount: 0,
      
      //  total: data?.type === "Technician" ? product?.tech_rate : product?.customer_rate,
      total: ( (data?.type === "Technician")
        ? product.tech_discount_rate < product.tech_rate && product.tech_discount_rate > 0 ? product?.tech_discount_rate : product?.tech_rate
        : product.customer_discount_rate < product.customer_rate && product.customer_discount_rate > 0 ? product?.customer_discount_rate
        : product?.customer_rate),
      quantity: quantity,
      image_url: product.image_name,
    }



    dispatch(addCartItems(newItem)).then((res) => {
      console.log("res", res);
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

      // const items = JSON.parse(localStorage.getItem("items") ?? "[]");
      // console.log("items useeffect", items);
      // items.forEach((item: CartItem) => {
      //   if (typeof item.items === "string") {
      //     item.items = JSON.parse(item.items) as Array<any>;
      //   }
      //       dispatch(addCartItems(item)).then((res) => {
      //         console.log("res", res);
      //         if (res.meta.requestStatus === "fulfilled") {
      //           toast.success("Item Added To Cart")
      //           dispatch(fetchCartItems())
      //         } else {
      //           toast.error("Error Added local To Cart")
        
      //         }
      //       })
      //     })


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
        const response = await AxiosInstance.post(
            "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
            {
                "tags":props.tags,
            }
        )
        console.log("data",response.data)
        setTrending(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])


    const featuredProducts = trending
        // .filter((product) => product.is_hot)

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
              
              <h2 className="text-2xl font-bold text-[#333] mb-4 mt-4">Similar Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5 ">
          {featuredProducts
            .slice(0, 10)
            .map((product: Product, index: number) => (
              <div
              className="w-[245px] rounded-lg overflow-hidden relative  hover:shadow-lg  shadow-md cursor-pointer"
              key={index}
            >
              <Link
                // href={{
                //   pathname: "/detail-beta",
                //   query: { id: product.blog_id },
                  // }}
                  // href={`/${product.blog_name.split(' ').map((value => value.toLocaleLowerCase())).join('-')}?id=${product.blog_id}`}
                  href={`/${product.page_url.split("/").join(" ").split(' ').map((value => value.toLocaleLowerCase())).join('-')}`}
                  // target="_blank"
                  
              >
                <div className=" transition-all duration-500 hover:scale-110">
                  <LazyLoadImage
                    alt={product.blog_name}
                    src={product.image_name}
                    className="w-full h-36 md:h-52 md:p-6"
                  />
                </div>
                  {/* {Math.round(((product.customer_rate - (  (data?.type === "Technician")
                        ? product?.tech_rate
                        : product?.customer_discount_rate)) / product.customer_rate) * 100) + "%" }  */}
                    {
                      handleDiscount(product, data ?? { name: "", type: "" })
                    }

                <div className="md:px-4 px-1 mt-[10px]">
                  <h3 className="text-xs text-[black] md:pr-[10px] overflow-hidden">
                     {
                        product.page_title
                    
                      }
                      
                  </h3>

                  <div className="flex flex-col  ">
                     
                      {
                        handleLineThrough(product, data ?? { name: "", type: "" },false)
                      }
                      
                      
                      {
                        handleLineThrough(product, data ?? { name: "", type: "" },true)
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

export default SimilarProducts;


export const handleDiscount = (product: Product,data:CustomerData | null) => {
  if (data?.type === "Technician") {
    if (product.tech_discount_rate > 0) {
      return (
        <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
          {Math.round(
            ((product.tech_rate - product.tech_discount_rate) /
              product.tech_rate) *
            100,
          ) + "%"}
        </span>
      )
    }
  } else {
    if (product.customer_discount_rate > 0) {
      return (
        <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">

          {
             Math.round(
              ((product.customer_rate - product.customer_discount_rate) /
                product.customer_rate) *
              100,
                ) + "%"
       }
        </span>
      )
    }
  }
}

export const handleLineThrough = (product: Product, data: CustomerData | null,lineThrough:boolean = true) => {
  
                               
  if (lineThrough) {
    const priceThrough = (data?.type === "Technician") ? (product.tech_discount_rate > 0 ? `Rs.${product?.tech_rate}` : '') : (product.customer_discount_rate > 0 ? `Rs.${product?.customer_rate}` : '')


    return (
      priceThrough && (
        <span className="text-[13px] whitespace-nowrap text-left">
          Market Price: {""}
          <span className="text-[13px] line-through text-[#9e9e9e]">
                        
            {
              priceThrough
            }
          </span>
        </span>
      )
    )
  }

  else {
    const price = (data?.type === "Technician") ? (product.tech_discount_rate > 0 ? `Rs.${product?.tech_discount_rate}` : `Rs.${product?.tech_rate}`) : (product.customer_discount_rate > 0 ? `Rs.${product?.customer_discount_rate}` : `Rs.${product?.customer_rate}`)

    return (
      <span className="text-[13px] mt-2 whitespace-nowrap text-left">
       Our Price: {""}
        <span className="text-[15px] text-[#f85606] ">
          {
            price
          }
        </span>
      </span>
    )
  }
  
}