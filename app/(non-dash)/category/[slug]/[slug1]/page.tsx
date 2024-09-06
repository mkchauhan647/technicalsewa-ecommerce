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

const fetchGrandChildData = async (cat3: string,cat4:string): Promise<GrandChild[]> => {
  try {

    // const params = cat3 ? { service_details: model, service: cat3 } : { service_details: model };

    console.log("cat3", cat3);
    console.log("cat4", cat4);

    const formData = new FormData();
    // formData.append("service_details", cat4.trim());
    // formData.append("service", cat3.trim());


    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publiccontrol/getPartsPartPurja",
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
    console.log("data",data);
    return data
  } catch (error) {
    throw new Error("Failed to fetch grandChild data")
  }
}

const Page = ({ params }: { params: { slug:string,slug1:string } }) => {
  
  console.log("params", params);
  // const model = params.slug.trim();
  const cat3 = params.slug;
  const cat4 = params.slug1;
  // console.log("model", model);
  

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
