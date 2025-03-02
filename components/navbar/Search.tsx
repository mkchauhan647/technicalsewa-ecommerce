import React, { useEffect, useRef, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useRouter } from "next/navigation"
import AxiosInstance from "@/axios_config/Axios"

export const Search = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [suggestions, setSuggestions] = useState([{ label: "", id: "" }])
  const router = useRouter()
  const [allData, setAllData] = useState<any>(null)
  const [showSearchArea, setSearchArea] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


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

  // select suggestion.
  const selectSuggestion = (option: any) => {
    setSearchText(option.label)
    router.push(
      `/${option.page_url
        .split(" ")
        .map((value: string) => value.toLowerCase())
        .join("-")}`,
    )
    setSuggestions([{ label: "", id: "" }])
  }

  // Update suggestions based on user input
  useEffect(() => {
    if (searchText.length > 1) {
      const filteredSuggestions = [...allData]
        .filter((item: any) =>
          item?.blog_name
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()),
        )
        .map((item: any) => ({
          label: item.blog_name,
          id: item.blog_id,
          page_url: item.page_url,
        }))

      setSuggestions(filteredSuggestions)
    }
  }, [searchText])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (searchText.length > 1) {
      router.push(`/search?name=${searchText}`)

      setSearchText("");
    }
  }
  return (
    <div className="flex justify-center w-full py-3 xl:hidden ">

      <form onSubmit={handleSubmit}
         onMouseEnter={()=>setSearchArea(true)}
         onMouseLeave={()=>setSearchArea(false)}
        className="fixed flex w-full container z-20 bg-white top-14 py-3">
       
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full  border border-black/40 rounded-md  text-[8px] sm:text-xs outline-none p-2 placeholder:text-gray-400"
          placeholder="Search"
        />

      {/* <div className="absolut e inset-y-0 right-0 flex items-center  justify-center  px-3 cursor-pointer"> */}

<button type="submit" className="text-white bg-blue-500 flex gap-2 rounded-lg px-3 py-[6px] ml-3  ">
            <span>Search</span>
            <FiSearch size={20} />
          </button>
          {/* </div> */}


        {showSearchArea && suggestions.length > 0 && searchText.length > 1 && (
          <div className="absolute z-50 bg-gray-200 border border-black/40 rounded-md w-full flex flex-col top-14">
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
        </form>
    </div>
  )
}
