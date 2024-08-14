"use client"

import { grandChildData } from "@/store/new/grandChild.slice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import Branddata from "@/components/brandproduct"
import Category from "@/components/category/Categories"
import { BiCategory } from "react-icons/bi"
import Productlist from "@/components/category/productlist"

interface SearchParams {
  searchParams: {
    category: string
    model: string
  }
}

interface NavbarProps {
  cart: CartItem[]
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface GrandChild {
  model: string
  blog_name: string
  name: string
  image_name: string
  our_rate: number
  market_rate: number
  blog_id: string
  featured: boolean
  page_title: string
  tech_rate: number
  page_url: string
}

const fetchGrandChildData = async (model: string): Promise<GrandChild[]> => {
  try {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `model=${model}`,
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch grandChild data")
    }

    const data: GrandChild[] = await response.json()
    return data
  } catch (error) {
    throw new Error("Failed to fetch grandChild data")
  }
}

const Page: React.FC<SearchParams> = ({ searchParams }) => {
  const { model } = searchParams

  const [grandChildData, setGrandChildData] = useState<GrandChild[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGrandChildData(model)
        setGrandChildData(data)
      } catch (error) {
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    if (model) {
      fetchData()
    } else {
      setLoading(false)
      setError("No model provided")
    }
  }, [model])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const cart: CartItem[] = []

  return (
    <>
      <div>
        <Navbar cart={cart} />
        <div className="container ">
          {/* <div className="w-60 text-sm md:text-base pt-0 category-item">
            <Branddata />
            <h2 className="text-xl font-bold text-gray-800 pb-2 pt-4">
              Prices
            </h2>
            <ul className="text-xs">
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="samsung"
                  name="brands"
                  value="samsung"
                  className="w-3 h-3 mr-1"
                />
                <label htmlFor="samsung" className="text-xs">
                  Rs(1,000-5,000)
                </label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="sony"
                  name="brands"
                  value="sony"
                  className="w-3 h-3 mr-1"
                />
                <label htmlFor="samsung" className="text-xs">
                  Rs(1,000-5,000)
                </label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="sony"
                  name="brands"
                  value="sony"
                  className="w-3 h-3 mr-1"
                />
                <label htmlFor="samsung" className="text-xs">
                  Rs(1,000-5,000)
                </label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="sony"
                  name="brands"
                  value="sony"
                  className="w-3 h-3 mr-1"
                />
                <label htmlFor="samsung" className="text-xs">
                  Rs(1,000-5,000)
                </label>
              </li>
            </ul>
          </div> */}
          <div className=" relative">
            {/* Product List */}
            <Productlist grandChildData={grandChildData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
