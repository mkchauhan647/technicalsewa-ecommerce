import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"
import Image from "next/image"
import { LazyLoadImage } from "react-lazy-load-image-component"

export interface Brand {
  image_url: string
  alt: string
}

const BrandSliders: React.FC = () => {
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
        console.log(brand76Data)
        const processedBrandsData = brand76Data.map((brand: any) => ({
          image_url: brand.image_url,
          alt: brand.alt2,
        }))
        setBrands(processedBrandsData)
      } catch (error) {
        console.error("Error fetching brand data:", error)
      }
    }
    fetchData()
  }, [])
  console.log(brands)

  return (
    <div className="featured-products py-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col gap-4 items-center">
            {/* <Image
              src={brand.image_url || ""}
              alt={brand.alt}
              width={150}
              height={150}
            /> */}
            <LazyLoadImage
              alt={brand.alt}
              src={brand.image_url || ""}
              width={150}
              height={150}
              className="h-20 object-cover"
            />
            <span className="font-semibold text-center">{brand?.alt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default BrandSliders
