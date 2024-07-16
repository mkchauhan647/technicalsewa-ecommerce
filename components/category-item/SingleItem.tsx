"use client"
import React, { useState } from "react"
import { MdShoppingCartCheckout } from "react-icons/md"
import { toast } from "sonner"
import Image from "next/image"

interface Props {
  product: {
    model: string
    blog_name: string
    name: string
    image: string
    our_rate: number
    market_rate: number
  }
  handleAddToCart: () => void
}

const SingleItem: React.FC<Props> = ({ product, handleAddToCart }) => {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    if (handleAddToCart) {
      handleAddToCart()
    } else {
      toast.error("Add to cart functionality is not available.")
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="border relative cursor-pointer rounded-lg transition-all duration-300 animate-fade hover:border-cyan-400">
        <div className="p-3">
          <Image
            src={product.image || "/placeholder-image.png"}
            width={300}
            height={300}
            alt={product.blog_name || "Placeholder Image"}
            objectFit="contain"
            className="max-w-full rounded-lg h-[120px] mobile:h-[152px] large_mobile:h-[156px] xl:h-[168px]"
          />
          <div className="bg-[#e8ebf4] text-[#3293b2] rounded-full text-[10px] mt-4 font-bold text-center py-4">
            {product.blog_name}
          </div>
          <div className="text-[14px]  font-semibold pb-3 pt-4">
            {product.blog_name}
          </div>
          <p className="text-sm font-semibold">Rs. {product.our_rate}</p>
          <div className="flex justify-between items-center min-h-[32px]">
            <div className="flex gap-2 items-center">
              <p className="text-xs font-semibold line-through text-slate-600">
                Rs. {product.market_rate}
              </p>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div
          className={`${
            show ? "animate-flip-up animate-duration-200" : "animate-fade-up"
          } absolute shadow-lg`}
          style={{
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            className="bg-gradient-to-r from-cyan-600/70 via-cyan-500/70 to-cyan-400/70 text-white rounded-lg text-xs px-2 py-1 md:flex items-center z-50"
            onClick={handleClick}
          >
            Add to Cart
            <span className="ml-1 text-xl">
              <MdShoppingCartCheckout />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default SingleItem
