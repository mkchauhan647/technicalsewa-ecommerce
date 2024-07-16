// ListedView.tsx
import React, { useState, useEffect } from "react"
import SingleItem from "./SingleItem"

const ListedView = ({ showGrid }: any) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getServiceList",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        const extractedItems = extractItemsFromResponse(data)
        setItems(extractedItems)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const extractItemsFromResponse = (response: any) => {
    const brands = response.brands
    const items = brands.map((brand: any) => ({
      name: brand.brand_name,
      tag: brand.display_type,
      image: brand.image_url,
    }))
    return items
  }

  return (
    <>
      {showGrid && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-4 xl:gap-6">
          {items.map((item: any, index: any) => (
            <SingleItem key={index} product={item} handleAddToCart={() => {}} />
          ))}
        </div>
      )}

      {!showGrid && (
        <div className="flex flex-col gap-4">
          {items.map((item: any, index: any) => (
            <SingleItem key={index} product={item} handleAddToCart={() => {}} />
          ))}
        </div>
      )}
    </>
  )
}

export default ListedView
