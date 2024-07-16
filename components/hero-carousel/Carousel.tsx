"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
export function HeroCarousel() {
  return (
    <Carousel
      className="w-full xl:container mx-auto  2xl:px-28 px-4"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Card>
            <CardContent className="flex">
              <img src="/banner.webp" className="  w-full" />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="flex">
              <img src="/banner.webp" className="  w-full" />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious className="absolute top-1/2 left-[124px] transform -translate-y-1/2" />
      <CarouselNext className="absolute top-1/2 right-[124px] transform -translate-y-1/2" /> */}
    </Carousel>
  )
}
