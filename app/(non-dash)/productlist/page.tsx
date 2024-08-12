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
        <div className="w-[90%] mx-auto ">
          <div className=" relative">
            {/* Product List */}
            <Productlist grandChildData={grandChildData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
