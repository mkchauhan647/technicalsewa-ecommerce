import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"
import Image from "next/image"
import { LazyLoadImage } from "react-lazy-load-image-component"
import logo from "@/assets/icon.png"

export interface Brand {
  image_url: string
  alt: string
}

const Ncategories: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(
          "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getSliderListpop1",
        )
        // Filter brands for brand_id 76
        const brand76Data = data?.brands.filter(
          (brand: any) => brand.brand_id === "76",
        )
        // console.log(brand76Data)
        const processedBrandsData = brand76Data.map((brand: any) => ({
          image_url: brand.image_url,
          alt: brand.alt,
        }))
        setBrands(processedBrandsData)
      } catch (error) {
        console.error("Error fetching brand data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="featured-products py-5">
      <div className="flex justify-between">
        <span className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold ">
          Feature Brands
        </span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 ">
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center justify-center">
            {/* <Image
              src={brand.image_url || ""}
              alt={brand.alt}
              width={150}
              height={150}
            /> */}
            <LazyLoadImage
              alt={brand.alt}
              src={brand?.image_url ? brand.image_url : logo.src}
              width={150}
              height={150}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Ncategories
