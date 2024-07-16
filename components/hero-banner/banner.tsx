import React from "react"
import Image from "next/image"
import banner from "@/public/banner.png"
export const Banner = () => {
  return (
    <div className="xl:container mx-auto  2xl:px-28 px-4">
      <Image
        src={banner}
        width={100}
        height={120}
        alt={"bammer"}
        className="w-full  h-full"
        unoptimized
      ></Image>
    </div>
  )
}
