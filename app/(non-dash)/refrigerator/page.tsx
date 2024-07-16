import React from "react"
import { IoFilterSharp } from "react-icons/io5"
import Filter from "@/components/Filter"
import ItemList from "@/components/category-item/ItemList"
const page = () => {
  return (
    <>
      <div className="xl:container mx-auto  flex w-full items-start 2xl:px-28 px-4 my-4 lg:my-10">
        <div className="basis-[25%] hidden lg:block ">
          <div className=" font-medium flex items-center gap-2 py-4 border-b border-black/20 mx-4">
            Add Filter <IoFilterSharp className="text-xl" />
          </div>
          <Filter />
        </div>
        <div className="w-full lg:basis-[75%] ">
          <ItemList />
        </div>
      </div>
    </>
  )
}

export default page
