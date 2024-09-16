"use client"

import React, { useEffect, useState } from "react"
import { CartItem, GrandChild } from "@/lib/types"
import Productlist from "@/components/category/productlist"
import { Search as SearchBar } from "@/components/navbar/Search"

interface SearchParams {
  searchParams: {
   name:string
  }
}

interface NavbarProps {
  cart: CartItem[]
}

const fetchGrandChildData = async (part_desc:string): Promise<GrandChild[]> => {
  try {


    const response = await fetch(
      "https://www.technicalsewa.com/techsewa/publiccontrol/getPartsPartPurja",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `part_desc=${part_desc}`,
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch grandChild data")
    }

    const data: GrandChild[] = await response.json()
    // console.log("data",data);
    return data
  } catch (error) {
    throw new Error("Failed to fetch grandChild data")
  }
}

const Search = ({ params,searchParams }: { params: { slug:string,slug1:string },searchParams:{name:string} }) => {
  

    const part_desc = searchParams.name;

    console.log("part_desc", part_desc);

  const [grandChildData, setGrandChildData] = useState<GrandChild[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGrandChildData(part_desc)
        setGrandChildData(data)
      } catch (error) {
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    if (part_desc) {
      fetchData()
    } else {
      setLoading(false)
      setError("No model provided")
    }
  }, [part_desc])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const cart: CartItem[] = []

  return (
    <>
      <div>
        <div className="xl:container mx-auto px-4 lg:px-0 2xl:px-28">
          <div className="relative">
            {/* Product List */}
            <div className="flex lg:hidden justify-center">
            <SearchBar/>
            </div>
            <Productlist grandChildData={grandChildData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;
