"use client"
import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"

export interface Category {
  title: string
  value: string
}

const Ncategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const brandId = "76"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.post(
          "/getProductByServiceCategory",
          `brand_id=${brandId}`,
        )
        const processedCategoriesData = data?.map((category: any) => ({
          title: category.text,
          value: category.value,
        }))

        setCategories(processedCategoriesData)
      } catch (error) {
        console.error("Error fetching category data:", error)
      }
    }
    fetchData()
  }, [brandId])

  return (
    <div className="mt-2">
      <h2 className="text-base font-bold text-gray-800">Top Brands</h2>
      {categories.length > 0 ? (
        <ul className="mt-2 ">
          {categories.map((category, index) => (
            <li className="flex items-center" key={index}>
              <input
                type="checkbox"
                id={`brand-${index}`}
                className=""
                // Assuming you want to handle checkbox selection in state
                // onChange={(e) => handleCheckboxChange(e, index)}
              />
              <label
                htmlFor={`brand-${index}`}
                className="text-sm md:text-base text-gray-600 hover:text-gray-800 px-3 py-1"
              >
                {category.title}
              </label>
            </li>
          ))}
          <li className="text-gray-600 hover:text-gray-800">
            <button className="text-sm md:text-base px-3 py-1 rounded-md text-red-500 hover:bg-gray-500 focus:outline-none">
              View More
            </button>
          </li>
        </ul>
      ) : (
        <h2>No brands found</h2>
      )}
    </div>
  )
}

export default Ncategories
