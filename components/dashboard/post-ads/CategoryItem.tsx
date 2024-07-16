import React, { useState, useEffect } from "react"
import { CommandItem } from "@/components/ui/command"
import SelectSubCat from "./SelectSubCat"
import axios from "axios"

const CategoryItem = ({ setSubMenu, submenu, onSelect }: any) => {
  const [categories, setCategories] = useState<any[]>([])
  const [openSubSubMenuIndex, setOpenSubSubMenuIndex] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getServiceList",
        )
        if (response.data && response.data.brands) {
          setCategories(response.data.brands)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleSubSubMenuClick = (index: number) => {
    setOpenSubSubMenuIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <>
      {categories.map((category: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            setSubMenu()
            setOpenSubSubMenuIndex(null)
            onSelect(category.brand_name, category.brand_id)
          }}
        >
          <CommandItem>
            <div className="flex">
              <div className="text-xl text-gray-600 mr-4">
                {/* Assuming 'item.icon' is not provided by the API */}
              </div>
              <div className="text-sm">{category.brand_name}</div>
            </div>
          </CommandItem>
        </div>
      ))}
      {submenu && (
        <div className="ml-9">
          {categories.map((category: any, index: number) => (
            <div key={index}>
              {category.submenu?.map((item_2: any, subIndex: number) => (
                <SelectSubCat
                  key={subIndex}
                  item_2={item_2}
                  index={subIndex}
                  handleSubSubMenuClick={() => handleSubSubMenuClick(subIndex)}
                  openSubSubMenuIndex={openSubSubMenuIndex}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CategoryItem
