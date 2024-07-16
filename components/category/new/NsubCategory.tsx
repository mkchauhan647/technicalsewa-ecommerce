import { getFirstChild, secondCatData } from "@/store/new/subCategory1.slice"
import { AppDispatch, RootState } from "@/store/store"
import React, { useEffect, useState } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import SecondCategory from "./SecondCategory"

interface Props {
  value: string
  index: number
}

const NsubCategory: React.FC<Props> = ({ value, index }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [cutt, setCutt] = useState<number | null>(null)
  useEffect(() => {
    const pr = {
      brand_id: "78",
      product_id: value,
    }
    dispatch(getFirstChild(pr))
  }, [value])
  const TypedHook: TypedUseSelectorHook<RootState> = useSelector
  const data = TypedHook(secondCatData)
  return (
    <div
      className="w-full  h-auto  "
      onClick={() => {
        setCutt(index)
      }}
    >
      {data.data?.map((current, indexs) => {
        return (
          <SecondCategory
            key={JSON.stringify(indexs)}
            data={current}
            index={index}
            indexs={cutt}
            id={current.value}
          />
        )
      })}
    </div>
  )
}
export default NsubCategory
