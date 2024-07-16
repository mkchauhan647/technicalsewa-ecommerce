"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { TbCalendarSearch } from "react-icons/tb"
import { MdOutlinePhoneIphone } from "react-icons/md"
import { MdOutlineSportsFootball } from "react-icons/md"
import CategoryItem from "./CategoryItem"
import React from "react"

const categoryArray = [
  {
    title: "Jobs",
    id: "1",
    submenu: [
      {
        title: "Remote",
        id: "1",
        id_2: "0",
        submenu2: [{ title_2: "Work from bed", id: "1" }],
      },
      {
        id: "1",
        id_2: "1",

        title: "Hybrid",
        submenu2: [{ title_2: "Work from office chair", id: "1" }],
      },
    ],
    icon: <TbCalendarSearch />,
  },
  {
    title: "Smartphones",
    icon: <MdOutlinePhoneIphone />,
    id: "2",

    // Adding dummy submenu and submenu2
    submenu: [
      {
        title: "Option 1",
        id: "2",
        id_2: "0",
        submenu2: [{ title_2: "Suboption 1", id: "2" }],
      },
      {
        title: "Option 2",
        id: "2",
        id_2: "1",
        submenu2: [{ title_2: "Suboption 2", id: "2" }],
      },
    ],
  },
  {
    title: "Sports & Fitness",
    icon: <MdOutlineSportsFootball />,
    // Adding dummy submenu and submenu2
    submenu: [
      { title: "Sport Option 1", submenu2: [{ title_2: "Sport Suboption 1" }] },
      { title: "Sport Option 2", submenu2: [{ title_2: "Sport Suboption 2" }] },
    ],
  },
  {
    title: "Groceries",
    icon: <MdOutlinePhoneIphone />,
    // Adding dummy submenu and submenu2
    submenu: [
      {
        title: "Grocery Option 1",
        submenu2: [{ title_2: "Grocery Suboption 1" }],
      },
      {
        title: "Grocery Option 2",
        submenu2: [{ title_2: "Grocery Suboption 2" }],
      },
    ],
  },
  {
    title: "Fashion",
    icon: <MdOutlinePhoneIphone />,
    // Adding dummy submenu and submenu2
    submenu: [
      {
        title: "Fashion Option 1",
        submenu2: [{ title_2: "Fashion Suboption 1" }],
      },
      {
        title: "Fashion Option 2",
        submenu2: [{ title_2: "Fashion Suboption 2" }],
      },
    ],
  },
  {
    title: "Books",
    icon: <MdOutlineSportsFootball />,
    // Adding dummy submenu and submenu2
    submenu: [
      { title: "Book Option 1", submenu2: [{ title_2: "Book Suboption 1" }] },
      { title: "Book Option 2", submenu2: [{ title_2: "Book Suboption 2" }] },
    ],
  },
  {
    title: "Mobiles & Tablets",
    icon: <MdOutlinePhoneIphone />,
    // Adding dummy submenu and submenu2
    submenu: [
      {
        title: "Mobile Option 1",
        submenu2: [{ title_2: "Mobile Suboption 1" }],
      },
      {
        title: "Mobile Option 2",
        submenu2: [{ title_2: "Mobile Suboption 2" }],
      },
    ],
  },
  {
    title: "Watch & Jewellery",
    icon: <MdOutlineSportsFootball />,
    // Adding dummy submenu and submenu2
    submenu: [
      { title: "Watch Option 1", submenu2: [{ title_2: "Watch Suboption 1" }] },
      { title: "Watch Option 2", submenu2: [{ title_2: "Watch Suboption 2" }] },
    ],
  },
]

export function SelectCat() {
  //...............handle submenu..........
  const [openSubMenuIndex, setOpenSubMenuIndex] = React.useState<number | null>(
    null,
  )
  const handleSubMenuClick = (index: number) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  //...............handle selected categories to display..........
  const [selectedCategories, setSelectedCategories] = React.useState<any>([])
  const handleCategorySelect = (category: string, id: string, id_2: string) => {
    // Check if selectedCategories is empty or if the id is different from the last selected category
    if (selectedCategories.length === 0 || selectedCategories[0].id !== id) {
      setSelectedCategories([{ title: category, id: id }])
    } else {
      // Check if the title already exists in selectedCategories
      if (
        !selectedCategories.some(
          (selectedCategory: any) => selectedCategory.title === category,
        )
      ) {
        setSelectedCategories((prevCategories: any) => [
          ...prevCategories,
          { title: category, id: id },
        ])
      }

      // Check if selectedCategories has at least 2 items and if the id_2 of the second category in selectedCategories is different from the new id_2
      if (
        selectedCategories.length >= 2 &&
        selectedCategories[1].id_2 !== id_2
      ) {
        setSelectedCategories((prevCategories: any) => [
          prevCategories[0],
          { title: category, id: id },
        ])
      }
    }
  }

  return (
    <Command className="rounded-lg border  h-[320px] mb-6">
      <CommandInput placeholder="Select a category" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Categories" className="">
          {categoryArray.map((item: any, index: any) => (
            <CategoryItem
              key={index}
              item={item}
              setSubMenu={() => handleSubMenuClick(index)}
              submenu={openSubMenuIndex === index}
              onSelect={handleCategorySelect}
            />
          ))}
        </CommandGroup>
      </CommandList>
      <div className="py-4 border-t text-sm pl-4">
        Your selected category :{" "}
        <span className="text-xs">
          {selectedCategories.map((category: any) => category.title).join(", ")}
        </span>
      </div>
    </Command>
  )
}
