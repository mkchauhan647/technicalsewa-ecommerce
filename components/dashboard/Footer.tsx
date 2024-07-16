import React from "react"

export const Footer = () => {
  return (
    <div className="bg-[#2591B1]">
      <div className="border-t-[1px] border-white ">
        <div className="xl:container mx-auto px-4  2xl:px-28 flex xl:flex-row flex-col items-center justify-between py-6 gap-2 md:gap-4">
          <p className="text-white  ">
            @ <span>Copyright 2024 Technical Sewa All Rights Reserved</span>{" "}
          </p>
          <div>
            <div className="flex items-center md:gap-[30px] justify-center md:justify-start gap-3 sm:gap-[24px] whitespace-nowrap  text-white">
              <p className="">Privacy & Data</p>
              <p className="">Cookies</p>
              <p className="">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
