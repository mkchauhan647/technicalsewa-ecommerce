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
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const handleCategoryToggle = (categoryValue: string) => {
    setOpenCategory(openCategory === categoryValue ? null : categoryValue)
  }
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
      {categories.map((category) => (
        <SubCategories
          key={category.value}
          category={category}
          product_id="some-product-id"
          isOpen={openCategory === category.value}
          onToggle={() => handleCategoryToggle(category.value)}
        />
      ))}
    </div>
  )
}

export default Categories
