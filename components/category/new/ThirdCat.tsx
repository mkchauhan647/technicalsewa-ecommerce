"use client"
import { getGrandChild } from "@/store/new/grandChild.slice"
import { Sub2 } from "@/store/new/subCate2.slice"
import { AppDispatch } from "@/store/store"
import React from "react"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { showGrand } from "@/store/new/showGr.slice"
import Link from "next/link"
interface THirdProps {
    data: Sub2
}
const ThirdCat: React.FC<THirdProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>()
    const DataProps = {
        model: data.value,
        id: data.value,
        title: data.text
    }
    return (
        <Link
      href={{
        pathname: "/productlist",
        query: {
          model: data.text,
        },
      }}
    >
        <span className="text-sm flex items-center justify-start rounded-lg pl-2"
            onClick={() => [dispatch(getGrandChild(DataProps)),
            dispatch(showGrand())]}>
            {data.text}
        </span>
        </Link>
    )
}
export default ThirdCat
