import { subCategoty2, thirdCat } from "@/store/new/subCate2.slice"
import { FirstChild } from "@/store/new/subCategory1.slice"
import { AppDispatch, RootState } from "@/store/store"
import React, { useState } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import ThirdCat from "./ThirdCat"
import { ChevronRight } from "lucide-react"
interface Props {
  data: FirstChild
  index: number
  indexs: number | null
  id: string
}
const SecondCategory: React.FC<Props> = ({ data, index, indexs, id }) => {
  // console.log(data.value)
  // 449
  //  448 brand_id and universal also brand_id
  //  447
  const dispatch = useDispatch<AppDispatch>()
  const TypedHook: TypedUseSelectorHook<RootState> = useSelector
  const datas = TypedHook(thirdCat)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const args = {
    brand_id: "78",
    brand_id2: data.value,
  }
  return (
    <div className="w-full ml-3 h-auto items-center justify-normal  mt-2 relative ">
      <p
        onClick={(e) => [
          dispatch(subCategoty2(args)),
          e.preventDefault(),
          setIsOpen(!isOpen),
        ]}
        className="  rounded-lg "
      >
        {data.text}
        
      </p>
      {index == indexs && (
        <ul className="list-disc  pr-5">
          {datas.data?.map((current, index) => {
            return (
              <li className={` ${current.id!==id && "list-none"} list-none bg-gray-200 mt-2  rounded-md   `} key={JSON.stringify(index)}>
                {current.id == id && <ThirdCat data={current}/>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default SecondCategory
