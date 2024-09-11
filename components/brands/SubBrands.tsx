import React, { useState, useEffect } from "react"
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import SubCategoryItem from "../category/SubCategoryItem"

interface SubCategory {
  text: string
  value: string
}

interface SubCategoriesProps {
  category: {
    title: string
    subcategories: SubCategory[]
    value: string
  }
  product_id: string
  isOpen: boolean
  onToggle: () => void
}

const SubBrands: React.FC<SubCategoriesProps> = ({
  category,
  product_id,
  isOpen,
  onToggle,
}) => {
  const [showSubCategories, setShowSubCategories] = useState(false)
  const [subcategories, setSubcategories] = useState<SubCategory[]>([])

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        "https://www.technicalsewa.com/techsewa/publicControl/getServicesByProductCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `brand_id=${category.value}`,
        },
      )
      const data = await response.json()
      if (Array.isArray(data)) {
        setSubcategories(data)
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error)
    }
  }

  useEffect(() => {
    fetchSubcategories()
  }, [category.value, product_id])

  return (
    <div className="pt-1 flex flex-col gap-2 justify-center items-center">
      <div className="flex relative w-full group ">
        <div
          className="lg:hidden cursor-pointer flex flex-col  px-4 py-[8px] bg-white w-full text-black rounded-md"
          onClick={onToggle}
        >
          <div className="flex justify-between">
            <h2 className="text-xs">{category.title}</h2>
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}

            {/* <IoIosArrowForward className="hidden group-hover:block" /> */}
          </div>
          {/* 
          {subcategories.map((subcategory, index) => (
            <SubCategoryItem
              key={index}
              subcategory={subcategory}
              product_id={product_id}
              urlType={`category/${category.title.trim().split(" ").join("-").toLowerCase()}`}
            />
          ))} */}

          {isOpen && (
            <ul className="w-52">
              {subcategories.map((subcategory, index) => (
                <SubCategoryItem
                  key={index}
                  subcategory={subcategory}
                  product_id={product_id}
                  urlType={
                    "brands/" +
                    category.title.toLowerCase().split(" ").join("-")
                  }
                />
              ))}
            </ul>
          )}
        </div>
        <div
          className="hidden lg:block cursor-pointer  flex-col  px-4 py-1 bg-white w-full text-black rounded-md"
          onClick={onToggle}
        >
          <div className="flex justify-between">
            <h2 className="text-xs">{category.title}</h2>

            <IoIosArrowForward className="hidden group-hover:block" />
          </div>
        </div>
        <div
          className={`hidden lg:group-hover:block absolute top-[15%] md:left-full z-50 bg-white p-2 rounded-lg shadow-lg${isOpen ? "block" : "hidden"}`}
        >
          <ul className="w-52">
            {subcategories.map((subcategory, index) => (
              <SubCategoryItem
                key={index}
                subcategory={subcategory}
                product_id={product_id}
                urlType={
                  "brands/" + category.title.toLowerCase().split(" ").join("-")
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SubBrands
