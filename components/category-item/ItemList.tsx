"use client"
import React from "react"
import CategoryTitle from "../title/CategoryTitle"
import { useState } from "react"
import { IoIosList } from "react-icons/io"
import { IoGridOutline } from "react-icons/io5"
import ListedView from "./ListedView"

const ItemList = () => {
  const [showGrid, setShowGrid] = useState<boolean>(true)

  return (
    <>
      <div className="flex justify-between md:mx-4 items-center">
        <CategoryTitle />
        <div className=" font-medium flex items-center gap-4 py-4  text-sm large_mobile:text-base">
          View
          <IoGridOutline
            className={`text-xl cursor-pointer ${
              showGrid ? "text-cyan-600" : "text-grid-600"
            }`}
            onClick={() => setShowGrid(true)}
          />
          <IoIosList
            className={`text-2xl cursor-pointer ${
              showGrid ? "text-slate-600" : "text-cyan-600"
            }`}
            onClick={() => {
              setShowGrid(false), console.log("clk")
            }}
          />{" "}
        </div>
      </div>
      <ListedView showGrid={showGrid} />
    </>
  )
}

export default ItemList
