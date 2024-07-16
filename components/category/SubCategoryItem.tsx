import React from "react"
import Link from "next/link"

interface SubCategoryItemProps {
  subcategory: {
    text: string
    value: string
  }
  product_id: string
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({
  subcategory,
  product_id,
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex relative w-full group">
        <div className="cursor-pointer flex justify-between items-center text-[13px] px-[10px] py-[8px]  mt-2 w-full text-black rounded-md">
          <Link
            href={{
              pathname: "/productlist",
              query: {
                model: subcategory.value,
                id: product_id,
                title: subcategory.text,
              },
            }}
          >
            <h2>{subcategory.text}</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SubCategoryItem
