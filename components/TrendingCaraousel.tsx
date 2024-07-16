// TrendingCarousel.tsx
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SingleItem from "./category-item/SingleItem"

interface Product {
  model: string // Add the model field
  blog_name: string
  name: string
  image: string
  our_rate: number
  market_rate: number
}

interface TrendingCarouselProps {
  productData: Product[]
}

export function TrendingCarousel({ productData }: TrendingCarouselProps) {
  return (
    <Carousel opts={{ align: "start" }} className="my-4 max-w-full mx-auto">
      <CarouselContent>
        {productData.map((product: Product, index: number) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/4 animate-fade"
          >
            <SingleItem product={product} handleAddToCart={() => {}} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 ml-14">
        {/* Previous button */}
      </CarouselPrevious>
      <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 mr-14">
        {/* Next button */}
      </CarouselNext>
    </Carousel>
  )
}
