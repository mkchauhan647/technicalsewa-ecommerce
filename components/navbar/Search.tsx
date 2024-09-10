import React, { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useRouter } from "next/navigation"
import AxiosInstance from "@/axios_config/Axios"

export const Search = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [suggestions, setSuggestions] = useState([{ label: "", id: "" }])
  const router = useRouter()
  const [allData, setAllData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          "https://www.technicalsewa.com/techsewa/publicControl/getPartsPartPurja",
        )

        setAllData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    if (allData === null) {
      fetchData()
    }
  }, [])
  const selectSuggestion = (option: any) => {
    setSearchText(option.label)
    router.push(`/detail-beta?id=${option.id}`)
    setSuggestions([{ label: "", id: "" }])
  }
  useEffect(() => {
    if (searchText.length > 1) {
      const filteredSuggestions = [...allData]
        .filter((item: any) =>
          item?.blog_name.toLowerCase().includes(searchText.toLowerCase()),
        )
        .map((item: any) => ({
          label: item.blog_name,
          id: item.blog_id,
        }))

      setSuggestions(filteredSuggestions)
    }
  }, [searchText])
  return (
    <div className="flex justify-center w-full py-3 xl:hidden ">
      <div className="fixed w-full container z-20 bg-white top-14 py-3">
        <div className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer">
          <FiSearch />
        </div>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full  border border-black/40 rounded-md  text-[8px] sm:text-xs outline-none p-2 placeholder:text-gray-400"
          placeholder="Search"
        />
        {suggestions.length > 1 && searchText.length > 1 && (
          <div className="absolute z-50 bg-gray-200 border border-black/40 rounded-md w-full flex flex-col">
            {suggestions.map((option: any) => (
              <span
                onClick={() => selectSuggestion(option)}
                className="hover:bg-white border-b-2 border-black/40 sm:min-w-[300px] xl:min-w-[400px] text-[8px] sm:text-xs outline-none p-2 placeholder:text-gray-400"
              >
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
