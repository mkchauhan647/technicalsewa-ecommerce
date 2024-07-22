"use client"

import { BiCategory } from "react-icons/bi"
import Image from "next/image"
import Categories from "./category/Categories"
import Newproduct from "./Newcategory/newproduct"
import Latestproduct from "./Newcategory/latestproduct"
import latestimage from "@/public/Group 2073.png"
import trandingimage from "@/public/Group 2096.png"
import offer from "@/public/Group 2079.png"
import FeaturedBrands from "./Newcategory/FeaturedBrands"
import React, { useState, useEffect } from "react"
import AxiosInstance from "@/axios_config/Axios"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { DealCarousel } from "./deal-of-the-day-carousel/Carousel"
import Brands from "./brands/Brands"
import { MdOutlineCategory } from "react-icons/md"
import BrandSliders from "./Newcategory/Brands"
import { Search } from "./navbar/Search"
import Deals from "./Newcategory/Deals"

interface Product {
  id: string
  image_type: string
  image_url: string
  alt: string
}

const MainBody = ({ children }: any) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.post(
          "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getConfigList",
        )
        setTrending(response.data.brands)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const bannerImages = trending.filter(
    (product) => product.image_type === "Ecom Slider",
  )

  const bannerfooter = trending
    .filter((product) => product.image_type === "home Footer")
    .slice(0, 1)

  const middlebanner = trending
    .filter((product) => product.image_type === "Home Mid")
    .slice(0, 1)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <>
      <Search />
      <div className="xl:container mx-auto lg:flex md:my-4 items-start 2xl:px-28 px-4">
        {/* small screen */}
        {/* <div className="sticky block lg:hidden md:pl-4 top-[83px] bg-white z-[30]">
    <div className="py-4 border-b flex gap-2">
      <BiCategory className="text-2xl" onClick={() => setShow(!show)} />{" "}
      Categories
    </div>
    {show && <Categories />}
  </div> */}

        {/* larger screen */}
        <div className="border-r hidden lg:block lg:w-[25%]">
          <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px]">
            <BiCategory className="text-2xl cursor-pointer" /> Categories
          </div>
          <Categories />
        </div>

        <div className="lg:w-[75%]  ml-[10px] mr-[10px] lg:mx-[30px] h-full">
          <Slider {...settings}>
            {bannerImages.map((product) => (
              <div key={product.id} className="w-full">
                <Image
                  src={product.image_url}
                  alt={product.alt}
                  width={1000}
                  height={1000}
                  // layout="responsive"
                  className="w-full h-[200px] sm:h-[400px] object-cover object-center"
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="xl:container mx-auto lg:flex md:my-8 items-start 2xl:px-28 px-4">
        {/* larger screen */}
        <div className="border-r hidden lg:block lg:w-[10%]  ">
          <div className="font-medium flex items-center gap-2 py-4 border-b pl-[12px]">
            <MdOutlineCategory className="text-2xl cursor-pointer" /> Brands
          </div>
          <Brands />
        </div>

        <div className="lg:w-[90%]  ml-[10px] mr-[10px] lg:mx-[30px] h-full">
          {/* <Slider {...settings}>
            {bannerImages.map((product) => (
              <div key={product.id} className="w-full sm:h-[380px]">
                <Image
                  src={product.image_url}
                  alt={product.alt}
                  width={1000}
                  height={1000}
                  // layout="responsive"
                  className="w-full h-[200px] sm:h-[400px] object-cover object-center"
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider> */}
          <BrandSliders />
        </div>
      </div>
      <div className=" xl:container mx-auto  2xl:px-28 px-4">
        <Deals />
      </div>
      <div className=" xl:container mx-auto  2xl:px-28 px-4">
        <Newproduct />
      </div>

      <div className="xl:container mx-auto  2xl:px-28 px-4">
        {/* <Image
          src={offer}
          alt="ads"
          className="w-full py-8 pr-4"
          quality={100}
          priority
        /> */}
        <DealCarousel />
      </div>

      <div className="xl:container mx-auto  2xl:px-28 px-4">
        <Latestproduct />
      </div>

      <div className="xl:container mx-auto  2xl:px-28 px-4">
        {middlebanner.map((product) => (
          <div key={product.id} className="w-full h-auto">
            {/* <Image
              src={product.image_url}
              alt={product.alt}
              width={189}
              height={189}
              layout="responsive"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            /> */}
            <LazyLoadImage
              alt={product.alt}
              src={product.image_url}
              width="100%"
              height={189}
            />
          </div>
        ))}
      </div>
      <div className="xl:container mx-auto  2xl:px-28 px-4">
        <FeaturedBrands />
      </div>

      <div className="xl:container mx-auto  2xl:px-28 px-4">
        {bannerfooter.map((product) => (
          <div key={product.id} className="w-full h-auto">
            {/* <Image
              src={product.image_url}
              alt={product.alt}
              width={189}
              height={189}
              layout="responsive"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            /> */}
            <LazyLoadImage
              alt={product.alt}
              src={product.image_url}
              width="100%"
              height={189}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default MainBody
