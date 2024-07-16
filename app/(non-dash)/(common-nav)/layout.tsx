"use client"
import { SellWithUs } from "@/components/SellWithUs"
import { HeroCarousel } from "@/components/hero-carousel/Carousel"
import MainBody from "@/components/MainBody"
import { Toaster } from 'react-hot-toast';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <HeroCarousel /> */}

      <MainBody>{children} </MainBody>
      <SellWithUs />
      <Toaster />
    </>
  )
}
