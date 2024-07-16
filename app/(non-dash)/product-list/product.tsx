"use client"
import React, { useState, useEffect } from "react"
import { MdShoppingCartCheckout } from "react-icons/md"
import { toast } from "sonner"
import Image from "next/image"

interface ProductProps {
  brandId: string
}

interface ProductData {
  value: string
  text: string
  cost: string
}

const Product: React.FC<ProductProps> = ({ brandId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [productData, setProductData] = useState<ProductData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://www.technicalsewa.com/techsewa/publicControl/getServicesByProductCategory?brand_id=${brandId}`,
        )
        if (response.ok) {
          const data: ProductData[] = await response.json()
          setProductData(data)
        } else {
          throw new Error("Failed to fetch product data")
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [brandId])

  const handleAddToCart = () => {
    // Add to cart functionality
    toast.success("Product added to cart")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Product Component</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productData.map((item, index) => (
          <SingleItem
            key={index}
            product={{
              model: item.text,
              blog_name: item.text,
              name: item.text,
              image: "placeholder-image.png", // Replace with actual image URL
              our_rate: parseFloat(item.cost),
              market_rate: parseFloat(item.cost) * 1.2, // Just an example, replace with actual calculation
            }}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

interface SingleItemProps {
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

const SingleItem: React.FC<SingleItemProps> = ({
  product,
  handleAddToCart,
}) => {
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
            src={product.image}
            width={300}
            height={300}
            alt={product.blog_name}
            objectFit="contain"
            className="max-w-full rounded-lg h-[120px] mobile:h-[152px] large_mobile:h-[156px] xl:h-[168px]"
          />
          <div className="bg-[#e8ebf4] text-[#3293b2] rounded-full text-[10px] mt-4 font-bold text-center py-4">
            {product.blog_name}
          </div>
          <div className="text-[14px] font-semibold pb-3 pt-4">
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

export default Product
