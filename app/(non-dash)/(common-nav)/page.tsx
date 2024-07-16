// "use client"
// import React, { useState, useEffect, useCallback } from "react"
// import { LuUpload } from "react-icons/lu"
// import SingleItem from "@/components/category-item/SingleItem"
// import AxiosInstance from "@/axios_config/Axios"
// import { AppDispatch, RootState, useAppSelector } from "@/store/store"
// import { toast } from "sonner"
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
// import Image from "next/image"
// import { subData } from "@/store/CategoryData.slices"
// import toas, { Toaster } from "react-hot-toast"
// import Link from "next/link"
// import { grandChildData } from "@/store/new/grandChild.slice"
// import { isGrandShow } from "@/store/new/showGr.slice"
// interface Product {
//   model: string
//   blog_name: string
//   name: string
//   image: string
//   our_rate: number
//   market_rate: number
// }
// const Home = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
//   const products = useTypedSelector(subData)
//   const isShown = useTypedSelector(isGrandShow)
//   const childData = useTypedSelector(grandChildData)
//   // get filter data from sub categories
//   const title =
//     useAppSelector((state) => state.products.title) || "Category Product"
//   const [loading, setLoading] = useState(true)
//   const [trending, setTrending] = useState<Product[]>([])
//   const [availableModels, setAvailableModels] = useState<string[]>([
//     "1175",
//     "1176",
//   ])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const promises = availableModels.map(async (model) => {
//           const response = await AxiosInstance.post("/getPartsPartPurja", {
//             model,
//           })
//           return response.data
//         })
//         const dataArray = await Promise.all(promises)
//         const trendingData = dataArray.flat() // Flatten the array of arrays

//         setTrending(trendingData)
//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [availableModels]) // Fetch data whenever available models change
//   const handleAddToCart = () => {
//     toast("Successfully added", {
//       description: "Check your cart for more details",
//       action: {
//         label: "Go to cart",
//         onClick: () => console.log("needs to be implemented"),
//       },
//     })
//   }
//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center text-slate-600 animate-bounce">
//         Loading...
//       </div>
//     )
//   }
//   return (
//     <div className="w-full md:pl-4">
//       {isShown.shown && (
//         <div>
//           {childData?.data ? (
//             <div className="  h-auto w-full  flex flex-wrap">
//               <div className="w-full h-10 flex items-center pl-3 border-b mb-4">
//                 <p className="text-xl font-semibold">{childData.title}</p>
//               </div>
//               {childData?.data?.map((current, index) => {
//                 return (
//                   <Link
//                     key={JSON.stringify(index)}
//                     href={{
//                       pathname: "/detail-beta",
//                       query: {
//                         id: current.blog_id,
//                       },
//                     }}
//                   >
//                     <div className="" key={JSON.stringify(index)}
//                     >
//                       <div className="flex items-center justify-start pl-3 gap-1">
//                         <div className=" cursor-pointer w-80 border-2 overflow-hidden rounded-lg group mb-2">
//                           <div className="w-full h-40  flex items-center justify-center relative">
//                             <Image
//                               src={current.image_name ?? "/p5.jpg"}
//                               alt={current.contact_info}
//                               width={150}
//                               height={150}
//                               className="rounded-lg"
//                             />
//                           </div>
//                           <div className="flex items-center justify-center flex-col">
//                             <h1 className="text-sm border px-2 py-1 rounded-3xl bg-cyan-100 cursor-pointer ">
//                               {current.meta_desc.length > 20 ? current.meta_desc.slice(0, 20) + "..." : current.meta_desc}
//                             </h1>
//                             <div
//                               className="p-3 text-xs "
//                               dangerouslySetInnerHTML={{
//                                 __html: current.blog_desc,
//                               }}
//                             />
//                           </div>
//                           <p className="text-sm font-semibold px-3 mb-1">
//                             Rs. {current.market_rate}
//                           </p>
//                           <p className="text-xs font-semibold line-through text-slate-600 px-3 mb-5">
//                             Rs. {current.our_rate}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           ) : (
//             <div
//               className="bg-white overflow-hidden h-1/4">
//               <div className="h-screen flex flex-col justify-center items-center">
//                 <Image src={"/error_404.jpeg"}
//                   alt="smoething went wrong"
//                   width={300}
//                   height={300}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       {/* {!isShown.shown && (
//         <div className="">
//           {products?.data?.length != 0 && (
//             <div className=" w-full ">
//               <div className="font-medium flex items-center  gap-[10px] py-4   justify-between pr-2">
//                 <div className="flex pl-2">
//                   {products.title} <LuUpload className="text-xl ml-3" />
//                 </div>
//                 <Link
//                   href={{
//                     pathname: "/category",
//                     query: {
//                       category: products.title
//                         .replaceAll(" ", "-")
//                         .toLowerCase(),
//                     },
//                   }}
//                 >
//                   <button className="text-blue-400 select-none">
//                     see more...
//                   </button>
//                 </Link>
//               </div>
//               <div className="w-full h-auto flex justify-start gap-3 pl-4 flex-wrap">
//                 {products.data.map((current, index) => {
//                   return (
//                     <Link
//                       href={{
//                         pathname: "/detail-beta",
//                         query: {
//                           id: current.value,
//                         },
//                       }}
//                       key={JSON.stringify(index)}
//                     >
//                       <div className="w-64 mt-3  rounded-lg overflow-hidden ">
//                         <div className="border relative cursor-pointer rounded-lg transition-all duration-300 animate-fade hover:border-cyan-400">
//                           <div className="p-3">
//                             <div className=" overflow-hidden w-full h-44 px-4 py-1">
//                               <Image
//                                 src={current.image_url || "/p5.jpg"}
//                                 width={300}
//                                 height={300}
//                                 alt={"Placeholder Image"}
//                                 objectFit="contain"
//                                 className="max-w-full rounded-lg h-[120px] mobile:h-[152px] large_mobile:h-[156px] xl:h-[168px]"
//                               />
//                             </div>
//                             <div className="bg-[#e8ebf4] text-[#3293b2] rounded-full text-[10px] mt-4 font-bold text-center py-4">
//                               {current.description.length > 20
//                                 ? current.description.slice(0, 20) + "..."
//                                 : current.description}
//                             </div>
//                             <div className="text-[14px]  font-semibold pb-3 pt-4">
//                               {current.content.length > 50
//                                 ? current.content.slice(0, 50) + "..."
//                                 : current.content}
//                             </div>
//                             <p className="text-sm font-semibold">
//                               Rs. {current.value}
//                             </p>
//                             <div className="flex justify-between items-center min-h-[32px]">
//                               <div className="flex gap-2 items-center">
//                                 <p className="text-xs font-semibold line-through text-slate-600">
//                                   Rs. {current.value}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   )
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       )} */}
//     </div>
//   )
// }

// export default Home

import React from 'react'

const page = () => {
  return (
    <>
    </>
  )
}

export default page
