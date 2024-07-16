"use client"

import React from "react"
import { IoFilterSharp } from "react-icons/io5"
import MobileFilter from "../MobileFilter"
const CategoryTitle = () => {
  const [filter, setFilter] = React.useState(false)
  return (
    <>
      <div className=" font-medium flex items-center gap-2 py-4  text-sm large_mobile:text-base">
        Category : <span className="font-extralight">Refrigerator</span>
      </div>
      <div
        className=" font-medium flex lg:hidden items-center gap-2 py-4 cursor-pointer text-sm large_mobile:text-base"
        onClick={() => setFilter(true)}
      >
        Filter <IoFilterSharp className="text-xl" />
      </div>
      {filter && <MobileFilter closePopup={() => setFilter(false)} />}
    </>
  )
}

export default CategoryTitle
