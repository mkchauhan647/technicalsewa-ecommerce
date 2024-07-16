import { Top } from "@/store/new/category.slice"
import { ChevronRight } from "lucide-react"
import React from "react"
import NsubCategory from "./new/NsubCategory"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { getDataBySubCategory } from "@/store/CategoryData.slices"
import { hideGrand } from "@/store/new/showGr.slice"
import { InitialSubCategory1Interface } from "@/store/new/subCategory1.slice"

interface ParentsProps {
    setIsOpen: (isOpen: boolean) => void
    show: boolean
    data: Top
    current: number | null
    index: number
    setCurrent: (i: number) => void
    sub:InitialSubCategory1Interface
}
const ParentCategory: React.FC<ParentsProps> = ({
    setIsOpen,
    show,
    data,
    index,
    current,
    setCurrent,
    sub
}) => {
    const dispatch = useDispatch<AppDispatch>()
    const d = {
        brandId: "178",
        value: data.value,
        id: data.value,
        category: data.text,
    }
    // console.log()
    return (
        // call api for first sub category
        <div className="w-auto h-auto mt-1  cursor-pointer  rounded-lg  overflow-hidden ">
            {/* <div className=" w-full flex items-center justify-between h-9 px-2 ">
                <p
                    onClick={() => [
                        // setIsOpen(!show),
                        setCurrent(index),
                        dispatch(getDataBySubCategory(d)),
                        dispatch(hideGrand()),
                    ]}
                >
                    {data.text}
                </p>
                <ChevronRight
                    className={`${show && index == current ? "rotate-90" : "rotate-0"} duration-300`}
                />
            </div> */}
            <NsubCategory index={index} value={data.value} />
            {/* {show && index == current && (
            )} */}
        </div>
    )
}
export default ParentCategory
