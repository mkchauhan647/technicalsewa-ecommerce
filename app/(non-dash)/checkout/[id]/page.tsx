"use client"
import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { usePathname } from "next/navigation"
import { getSingleProduct } from "@/store/action/singleProduct.action"
import { AppDispatch, RootState } from "@/store/store"
import { singleItemData } from "@/store/slice/singleProduct.slice"
import BuyNowPage from "@/components/checkout/BuyNowPage"

export default function Page() {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

  const pathname = usePathname()
  const route = pathname.split("=")

  const id = route[1]
  const dispatch = useDispatch<AppDispatch>()
  const singleData = useTypedSelector(singleItemData)

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [id])

  return <BuyNowPage product={singleData.data} routeid={id} />
}
