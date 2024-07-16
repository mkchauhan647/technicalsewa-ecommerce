// import { Dispatch, SetStateAction } from "react"
// import AxiosInstance from "@/axios_config/Axios"
// import { toast } from "react-toastify"
// import { RootState, AppDispatch } from "../../store/store"
// import { useDispatch, useSelector } from "react-redux"
// import { addCartItems, fetchCartItems } from "@/store/slice/cart/getcartSlice"

// interface Product {
//   blog_id: string
//   blog_name: string
//   our_rate: number
//   image_name?: string
// }

// interface CartItem {
//   id: string
//   name: string
//   price: number
//   quantity: number
//   image: string
// }

// const addToCart = async (
//   product: Product,
//   setCart: Dispatch<SetStateAction<CartItem[]>>,
// ) => {
//   console.log(product)
//   const dispatch: AppDispatch = useDispatch()

//   const addCart = () => {
//     dispatch(addCartItems({}))
//     dispatch(fetchCartItems())
//   }
//   try {
//     const response = await AxiosInstance.post(
//       "https://www.technicalsewa.com/techsewa/commerce/PublicCart/createCart",
//       {
//         // cart_id: '1',
//         customer_id: localStorage.getItem("id"),
//         items: product.blog_name,
//         subtotal: product.our_rate,
//         tax: "0",
//         discount: "0",
//         total: product.our_rate,
//       },
//     )

//     if (response.status === 200) {
//       const newCartItem = {
//         id: product.blog_id,
//         name: product.blog_name,
//         price: Number(product.our_rate),
//         quantity: 1,
//         image: product.image_name ?? "/p5.jpg",
//       }

//       toast.success("Successfully added to cart", {
//         position: "top-right",
//         className: "bg-red-500 text-white",
//         bodyClassName: "bg-red-500 text-white",
//         progressClassName: "bg-red-700",
//       })
//     }
//   } catch (error) {
//     console.error("Error adding to cart:", error)
//     toast.error("Error adding to cart", {
//       position: "top-right",
//       className: "bg-red-500 text-white",
//       bodyClassName: "bg-red-500 text-white",
//       progressClassName: "bg-red-700",
//     })
//   }
// }

// export default addToCart
