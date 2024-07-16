// import React, { useState, useEffect } from "react"
// import SubCategories from "./SubCategories"
// import AxiosInstance from "@/axios_config/Axios"

// export interface Category {
//   title: string
//   subcategories: { text: string; value: string }[]
//   value: string
// }

// const Ncategories: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([])
//   const brandId = "78"
//   ///-- category
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await AxiosInstance.post(
//           "/getProductByServiceCategory",
//           `brand_id=${brandId}`,
//         )
//         const processedCategoriesData = data?.map((category: any) => ({
//           title: category.text,
//           subcategories: category.subcategories || [],
//           value: category.value,
//         }))

//         setCategories(processedCategoriesData)
//       } catch (error) {
//         console.error("Error fetching category data:", error)
//       }
//     }
//     fetchData()
//   }, [brandId])

//   return (
//     <div>
//       {categories.length > 0 &&
//         categories.map((category, index) => (
//           <div key={JSON.stringify(index)}>
//             <SubCategories
//               key={JSON.stringify(index)}
//               Cindex={index}
//               category={category}
//               brandId={brandId}
//               id={category.value}
//             />
//           </div>
//         ))}
//     </div>
//   )
// }

// export default Ncategories



import React from 'react'

const Ncategory = () => {
  return (
    <div>
      
    </div>
  )
}

export default Ncategory
