"use client"
import { grandChildData } from "@/store/new/grandChild.slice"
import { RootState } from "@/store/store"
import Image from "next/image"
import React from "react"
import { TypedUseSelectorHook, useSelector } from "react-redux"
const Page = () => {
  const TypedHook: TypedUseSelectorHook<RootState> = useSelector
  const childData = TypedHook(grandChildData)
  return (
    <div className="w-full h-auto md:h-screen flex md:justify-center   md:p-10">
      {/* {childData.data?.page_title ? (
        <div className=" w-full duration-300 md:w-4/6   h-auto  border-2 shadow-lg rounded-lg">
          <div className="w-full  md:flex">
            <div className=" overflow-hidden  w-full md:w-1/2 p-14 h-80 flex items-center justify-center">
              <Image
                src={childData.data?.image_name ?? "/p5.jpg"}
                alt={childData?.data?.meta_desc ?? "test"}
                width={300}
                height={300}
              />
            </div>
            <div className="md:w-1/2 w-full h-full">
              <p className="text-3xl font-bold tracking-wide">
                {childData.data?.blog_name ?? " some test Name"}
              </p>
              <p className="text-3xl font-semibold">
                {childData.data?.our_rate ?? " some test Name"}
              </p>
              <p>Desccription</p>
              <div
                className="text-xl font-semibold"
                dangerouslySetInnerHTML={{ __html: childData.data.blog_desc }}
              />
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: childData.data.features }}
              />
              <p>{childData.data.meta_desc}</p>
            </div>
          </div>
          <div className=" border-t-2 flex items-center justify-center flex-col md:flex-row md:justify-evenly py-5">
            <div className="md:w-1/3 w-5/6 border rounded-lg pl-2 py-5 ">
              <p className="text-xl font-bold">Details</p>
              <p>
                {" "}
                <span>Price: </span> {childData.data.our_rate}
              </p>
            </div>
            <div className="md:w-1/3 w-5/6  mt-5 md:mt-0   border rounded-lg pl-2 py-5">
              <p className="text-xl font-bold">Contact</p>
              <p>{childData.data.contact_info}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Not ound</h1>
      )} */}
    </div>
  )
}

export default Page
