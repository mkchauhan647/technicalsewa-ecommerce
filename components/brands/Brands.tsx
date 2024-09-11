"use client"
import React, { useState, useEffect } from "react"
// import SubCategories from "./SubCategories"
import AxiosInstance from "@/axios_config/Axios"
import SubCategories from "../category/SubCategories"
import SubBrands from "./SubBrands"

export interface Category {
  title: string
  subcategories: { text: string; value: string }[]
  value: string
}

const Brands: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const product_id = "160"
  const [openBrand, setOpenBrand] = useState<string | null>(null)
  const handleBrandToggle = (brandValue: string) => {
    setOpenBrand(openBrand === brandValue ? null : brandValue)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.post(
          "/GetProductcategiryByProduct",
          `product_id=161`,
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
          <SubBrands
            key={index}
            category={category}
            product_id={product_id}
            isOpen={openBrand === category.value}
            onToggle={() => handleBrandToggle(category.value)}
          />
        </div>
      ))}
    </div>
  )
}

export default Brands
