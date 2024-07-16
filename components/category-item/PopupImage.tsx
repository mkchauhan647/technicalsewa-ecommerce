import React from "react"
import PopUp from "../PopUp"
interface PopUpImageProps {
  closePopup: () => void
}
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const PopUpImage: React.FC<PopUpImageProps> = ({ closePopup }) => {
  return (
    <PopUp closePopup={closePopup}>
      <Carousel
        opts={{
          align: "start",
        }}
        className="my-4 max-w-[500px] mx-auto "
      >
        <CarouselContent>
          <CarouselItem className="animate-fade">
            <div className=" mx-2  ">
              <div className=" cursor-pointer rounded-md">
                <img
                  src="/demo.png"
                  alt="img"
                  className=" rounded-lg  overflow-hidden"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="animate-fade">
            <div className=" mx-2  ">
              <div className=" cursor-pointer rounded-md">
                <img
                  src="/demo.png"
                  alt="img"
                  className=" rounded-lg  overflow-hidden"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="animate-fade">
            <div className=" mx-2  ">
              <div className=" cursor-pointer rounded-md">
                <img
                  src="/demo.png"
                  alt="img"
                  className=" rounded-lg  overflow-hidden"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="ml-2" />
        <CarouselNext className="mr-2" />
      </Carousel>
    </PopUp>
  )
}

export default PopUpImage
