import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BiCategory } from "react-icons/bi"
import Brands from "../brands/Brands"

export interface GrandChild {
  STATUS: string
  blog_desc: string
  blog_name: string
  contact_info: string
  features: string
  image_name: null | string
  market_rate: string
  meta_desc: string
  our_rate: string
  page_title: string
  page_url: string
  blog_id: string
  svc_rate: string
  tech_rate: string
  id: string
  topTitle: string
}

interface ProductProps {
  grandChildData: GrandChild[]
}

const Productlist: React.FC<ProductProps> = ({ grandChildData }) => {
  return (
    <div className=" py-5">
      <div className="flex w-full gap-14">
        <div className="border-r hidden lg:block lg:w-[13%]  ">
          <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px]">
            <BiCategory className="text-2xl cursor-pointer" /> Brands
          </div>
          <Brands />
        </div>{" "}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-5/6">
          {grandChildData.map((item, index) => (
            <Link
              href={{
                pathname: "/detail-beta",
                query: { id: item.blog_id },
              }}
              className="product rounded-lg overflow-hidden relative  hover:shadow-lg shadow-md"
            >
              <div className="">
                <Image
                  src={item.image_name ?? "/p5.jpg"}
                  alt={item.blog_name}
                  width={189}
                  height={189}
                  className="w-full h-36 md:h-56 object-cover"
                />
                <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-tr-md uppercase">
                  -10%
                </span>
                <span className="absolute bottom-36 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-tl-md uppercase">
                  HOT
                </span>
              </div>
              <div className="p-4 mt-[18px]">
                <h3 className="text-[15px] text-[black] h-[48px] pr-[10px] overflow-hidden">
                  {item.blog_name}
                </h3>

                <div className="">
                  <span className="text-[18px] text-[#f85606] block">
                    Rs.{item.our_rate}
                  </span>
                  <span className="text-[14px] line-through text-[#9e9e9e]">
                    Rs. {item.market_rate}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Productlist
