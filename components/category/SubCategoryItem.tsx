import React from "react"
import Link from "next/link"

interface SubCategoryItemProps {
  subcategory: {
    text: string
    value: string
  }
  product_id: string
  urlType: string
  onClick: () => void
  isSelected: boolean
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({
  subcategory,
  product_id,
  urlType,
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex relative w-full group">
        <div className="cursor-pointer flex justify-between items-center text-xs px-[10px] py-[6px] w-full text-black rounded-md">
          <Link
            // href={{
            //   pathname: "/productlist",
            //   query: {
            //     model: subcategory.value,
            //     id: product_id,
            //     title: subcategory.text,
            //   },
            // }}
            // href = {`/productlist/${subcategory.value}-${subcategory.text.trim().split(" ").join("-").toLowerCase()}`}
            href={`/${urlType}/${subcategory.text.trim().split(" ").join("-").toLowerCase()}`}
          >
            <h2 className="text-xs">{subcategory.text}</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SubCategoryItem
