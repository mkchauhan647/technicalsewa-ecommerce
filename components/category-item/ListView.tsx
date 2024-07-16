"use client"
import { toast } from "sonner"
import { Button } from "../ui/button"
import React from "react"
import { MdShoppingCartCheckout } from "react-icons/md"

import Image from "next/image"
import Link from "next/link"
const ListView = ({ rec, index }: any) => {
  const [show, setShow] = React.useState<boolean>(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link href={`/detail-beta`}>
        <div
          key={index}
          className=" border relative cursor-pointer rounded-lg transition-all duration-300 animate-fade hover:border-cyan-400 "
        >
          <div className=" flex p-3 gap-6">
            <div className="relative basis-[30%]">
              <Image
                src={rec.image}
                width={300}
                height={300}
                alt="phone"
                objectFit="contain"
                className="max-w-full  rounded-lg  h-[120px] mobile:h-[152px] large_mobile:h-[156px] xl:h-[244px] "
              />
              <div className="absolute top-0  p-1 sm:p-2">
                <span className="bg-gradient-to-r from-cyan-600/70 via-cyan-500/70 to-cyan-400/70  text-white rounded-lg text-[8px] sm:text-xs px-5 py-1">
                  {rec.tag}
                </span>
              </div>
            </div>

            <div className="basis-[70%] flex flex-col gap-2">
              <div className="">{rec.name}</div>

              <p className=" text-sm font-semibold ">Rs. {rec.price}</p>
              <p className=" text-sm  ">
                Text messaging, or texting, is the act of composing and sending
                electronic messages, typically consisting of alphabetic and
                numeric characters, between two or more users of mobile devices,
                desktops/laptops, or another type of compatible computer. Text
                messages may be sent over a cellular network or may also be sent
                via satellite or Internet connecting.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2  items-center">
                  <p className=" text-xs font-semibold line-through text-slate-600">
                    Rs. {rec.price}
                  </p>
                  <p className=" text-xs ">-15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* {show && (
        <div
          className={` ${
            show ? "animate-flip-up animate-duration-200" : "animate-fade-up"
          } absolute shadow-lg`}
          style={{
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            className="   hidden  bg-gradient-to-r  from-cyan-600/70 via-cyan-500/70 to-cyan-400/70  text-white rounded-lg text-xs px-2 py-1  md:flex items-center z-50"
            onClick={() =>
              toast("Successfully added", {
                description: "Check your cart for more details",
                action: {
                  label: "Go to cart",
                  onClick: () => console.log("needs to be implemented"),
                },
              })
            }
          >
            Add to Cart
            <span className="ml-1 text-xl">
              <MdShoppingCartCheckout />
            </span>
          </button>
        </div>
      )} */}
    </div>
  )
}

export default ListView
