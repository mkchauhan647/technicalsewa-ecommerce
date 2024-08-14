
"use client"
import React, { useCallback, useEffect, useState } from "react"
import Detail from "@/components/product-detail/Detail"
import ReviewSection from "@/components/product-detail/ReviewSection"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { subData } from "@/store/CategoryData.slices"
import { getSingleProduct } from "@/store/action/singleProduct.action"
import { singleItemData } from "@/store/slice/singleProduct.slice"
import AxiosInstance from "@/axios_config/Axios"
import { BiCategory } from "react-icons/bi"
import Brands from "@/components/brands/Brands"
import Categories from "@/components/category/Categories"

export interface FilteredItsmInterface {
  alt: null | string
  btitle: null | string
  cannonical: null | string
  content: string
  description: string
  file_name: null | string
  image_url: null | string
  json_ld: null | string
  meta_desc: null | string
  model: string
  og_desc: null | string
  og_site_name: null | string
  og_title: null | string
  og_type: null | string
  og_url: null | string
  text: string
  title: string
  value: string
}

// interface SearchParams {
//   searchParams: {
//     id: string
//   }
// }
const Page = ({ params }:{params:{slug:string}}) => {
  const [product, setProduct] = useState<FilteredItsmInterface | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const products = useTypedSelector(subData)

  const product_name = params.slug.split('-').join(' ').trim();
  const id = params.slug.split('-').at(-1) as string;
  const filterData = useCallback(() => {
    const filterItems = products.data.filter((product) => product.value == id)
    filterItems.length != 0 && setProduct(filterItems[0])
  }, [])

  const dispatch = useDispatch<AppDispatch>()

  const singleData = useTypedSelector(singleItemData)

  useEffect(() => {
    dispatch(getSingleProduct(product_name))
    console.log('id', id);
    console.log('separ', params);
    console.log('product_name', product_name);
  }, [id])

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await AxiosInstance.post(
          `https://www.technicalsewa.com/techsewa/commerce/PublicProducts/getProductById`,
          { id: id },
        )
        const fetchedProductId = response.data?.product?.id
        setProductId(fetchedProductId)
      } catch (error) {
        console.error("Error fetching product ID:", error)
      }
    }

    fetchProductId()
  }, [id])

  return (
    <>
      <div className="xl:container mx-auto flex  justify-between py-5 2xl:px-28 px-1  ">
      <div className="lg:flex hidden flex-col lg:w-[20%]">
        <div className="border-r lg:block ">
          <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px] text-sm">
            <BiCategory className="text-xl cursor-pointer" /> Categories
          </div>
          <Categories />
        </div>

        <div className="border-r  lg:block  ">
          <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px]">
            <BiCategory className="text-2xl cursor-pointer" /> Brands
          </div>
          <Brands />
        </div>{" "}
        </div>
        {singleData.data ? (
          console.log('singleData', singleData.data),
        <Detail product={singleData.data} id={id} />
      ) : (
        <p>Loading...</p> // You can replace this with a loader component if you have one
      )}
      {productId ? <ReviewSection productId={productId} /> : <></>}
      </div> 

    </>
  )
}

export default Page








// import DynamicProduct from "@/components/dynamic-product/DynamicProduct";
// import { headers } from "next/headers"



// const Page = ({ params }:{params:{slug:string}}) => {


//   const productHeaders = headers();
//   const id = productHeaders.get('x-product-id') as string;


//   return (
//     <DynamicProduct id={id}/>
//   )


// }


// export default Page;


