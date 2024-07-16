import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  const recent = [
    {
      name: "Iphone 12 pro ",
      desc: "🏘️घर, आफिस, फल्याट कोठा सारिरहेका छौ तथा अन्य सामान ढुबानि को लागी सम्झनुहोस् /9862665786",
      image: "/demo.png",
      condition: "Brand New",
      price: "1,09,000",
      seller_name: "Abish Magar",
      address: "Kathmandu, Nepal, province 3",
    },
    {
      name: "Micropack 2.1 Speaker",
      desc: "The NT2-A is a highly versatile large-diaphragm studio condenser microphone designed to offer pristine audio quality and flexibility ",
      image: "/mic.png",
      condition: "Brand New",
      price: "20,000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Bullet Classic 350",
      desc: "थप जानकारीको लागि, सम्पर्क नम्बर: 9820114990/9820114991/9820114992/9820114993 Nayabuspar",
      image: "/bike.png",
      condition: "Brand New",
      price: "3,00,000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",
      image: "/demo.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",
      image: "/mic.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",
      image: "/bike.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",
      image: "/bike.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",
      image: "/demo.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
    {
      name: "Iphone 12 pro max, quality, trusted ",
      desc: "Get Netflix one month with prime free Note : This is shared account Genuine Servcie For purchase WhatsApp/call 9762819949",

      image: "/bike.png",
      condition: "Brand New",
      price: "109000",
      seller_name: "Abish Magar",
      address: "Kathmandu,Nepal, province ",
    },
  ]
  return (
    <div className="w-full">
      <div className="font-medium flex items-center gap-10 py-4 md:pl-4">
        {/* Trending <FaChartLine className="text-xl" /> */}
        <Skeleton className="w-[120px] h-[28px]  rounded-full" />
      </div>
      <div className="flex">
        <div className="w-full lg:basis-1/2">
          <div className="font-medium flex items-center gap-10 py-6 md:pl-4">
            {
              /* Latest Uploads <LuUpload className="text-xl" /> */
              <Skeleton className="w-[160px] h-[28px]  rounded-full" />
            }
          </div>
          <div className=" flex flex-col">
            {recent.map((rec, index) => (
              <div
                key={index}
                className="py-6 sm:mx-4 flex gap-4 items-start  "
              >
                {/* Replace the Image component with Tailwind CSS classes for loading effect */}
                <Skeleton className=" h-[92px]  sm:h-[120px] w-[240px] rounded-lg" />

                <div className="flex flex-col gap-2 text-xs w-full xl:2xl:mr-8">
                  {/* Replace content with Tailwind CSS classes for loading effect */}
                  <Skeleton className="w-full h-[12px] rounded-full mb-2" />
                  <Skeleton className="w-full h-[12px] rounded-full " />
                  <Skeleton className="w-[50%] h-[12px] rounded-full mb-2" />
                  <Skeleton className="w-[140px] h-[12px] rounded-full mb-2" />{" "}
                  <Skeleton className="w-full h-[12px] rounded-full mb-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-1/2 hidden lg:block">
          <div className="font-medium flex items-center gap-10 py-6 md:pl-4">
            {/* Most Viewed <FiStar className="text-xl" /> */}
            <Skeleton className="w-[140px] h-[28px]  rounded-full" />
          </div>
          <div className="flex flex-col">
            {recent.map((rec, index) => (
              <div key={index} className="py-6 mx-4 flex gap-4  ">
                {/* Replace the Image component with Tailwind CSS classes for loading effect */}
                <Skeleton className=" h-[120px] w-[240px] rounded-lg" />

                <div className="flex flex-col gap-2 text-xs w-full 2xl:mr-8">
                  {/* Replace content with Tailwind CSS classes for loading effect */}
                  <Skeleton className="w-full h-[12px] rounded-full mb-2" />
                  <Skeleton className="w-full h-[12px] rounded-full " />
                  <Skeleton className="w-[50%] h-[12px] rounded-full mb-2" />
                  <Skeleton className="w-[140px] h-[12px] rounded-full mb-2" />{" "}
                  <Skeleton className="w-full h-[12px] rounded-full mb-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
