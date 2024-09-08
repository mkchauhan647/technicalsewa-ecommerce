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
import { GrandChild } from "@/lib/types"
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


const fetchGrandChildData = async (cat3: string,cat4:string): Promise<GrandChild[]> => {
  try {
    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `service_details=${cat4}&service=${cat3}`,
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

const Page = ({ params }: { params: {slug:string, slug1:string } }) => {
  
  // console.log("params", params);
  // const model = params.model;
  // const model = params.slug1.split("-").join(" ") as string;
  // console.log("model", model);

  const cat3 = params.slug;
  const cat4 = params.slug1;

  const [grandChildData, setGrandChildData] = useState<GrandChild[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGrandChildData(cat3,cat4)
        setGrandChildData(data)
      } catch (error) {
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    if (cat3 && cat4) {
      fetchData()
    } else {
      setLoading(false)
      setError("No model provided")
    }
  }, [cat3,cat4])

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
