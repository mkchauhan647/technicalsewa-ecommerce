"use client"
import React, { useState, useEffect } from "react"
import SubCategories from "./SubCategories"
import AxiosInstance from "@/axios_config/Axios"

export interface Category {
  title: string
  subcategories: { text: string; value: string }[]
  value: string
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const product_id = "160"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.post(
          "/GetProductcategiryByProduct",
          `product_id=${product_id}`,
        )
        const processedCategoriesData = data?.map((category: any) => ({
          title: category.text,
          subcategories: category.subcategories || [],
          value: category.value,
        }))

        setCategories(processedCategoriesData)
      } catch (error) {
        console.error("Error fetching category data:", error)
      }
    }

    fetchData()
  }, [product_id])

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <SubCategories
            key={index}
            category={category}
            product_id={product_id}
          />
        </div>
      ))}
    </div>
  )
}

export default Categories
