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
import { CartItem , GrandChild } from "@/lib/types"
interface SearchParams {
  searchParams: {
    category: string
    model: string
  }
}

interface NavbarProps {
  cart: CartItem[]
}



// interface GrandChild {
//   model: string
//   blog_name: string
//   name: string
//   image_name: string
//   // our_rate: number
//   customer_discount_rate: number
//   // market_rate: number
//   customer_rate: number
//   blog_id: string
//   featured: boolean
//   page_title: string
//   tech_rate: number
//   tech_discount_rate: number
//   page_url: string
//   date: string 
//   is_hot: string 
//   latest : boolean
// }

const fetchGrandChildData = async (model: string): Promise<GrandChild[]> => {
  try {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `service_details=${model}`,
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

const Page = ({ params }: { params: { slug:string } }) => {
  
  // console.log("params", params);
  // const model = params.model;
  const model = params.slug.split("-").join(" ") as string;
  console.log("model", model);

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
        <div className="xl:container mx-auto px-4 lg:px-0 2xl:px-28">
          <div className="relative">
            {/* Product List */}
            <Productlist grandChildData={grandChildData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
