"use client"
import { Badge } from "@/components/ui/badge"
import { ResponsiveLine } from "@nivo/line"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosArrowDown } from "react-icons/io"
import { MdNotificationsActive } from "react-icons/md"
import { useEffect, useState } from "react"

export default function Component() {

  const [userType, setUserType] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id") ?? "{}"

      const storedData = localStorage.getItem("data");
      if (storedData) {
        console.log("Stored data", storedData);
        try {
          const parsedData = JSON.parse(storedData)
          // setData(parsedData)
          console.log("Parsed data", parsedData.type);
          setUserType(parsedData.type);
        } catch (error) {
          console.error("Failed to parse stored data", error)
        }
      }
      else {
        // alert("Please login to continue");
        // router.push("/login");
      }
    }
  }, [])
  return (
    <main className=" overflow-y-scroll w-full">
      <section className="h-[248px] bg-[#7ab2c3]">
        <div className="flex justify-between p-12 items-center">
          <header>
            <h1 className="text-3xl font-medium text-white ">
             My Dashboard
              <div className="w-[70px] border-[2px] border-t border-white mt-1"></div>
            </h1>
             <h2>{userType}</h2>
          </header>
          {/* <div className="flex items-center gap-4">
            <div className=" p-2 text-xl text-white rounded-full glass">
              <MdNotificationsActive />
            </div>
            <div className="flex  space-x-3 items-center glass rounded-3xl pr-2 ">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-xs text-white">Geeks for Geeks</div>
              <IoIosArrowDown className="text-white" />
            </div>
          </div> */}
        </div>
      </section>

      <div className="p-4 sm:p-8 md:p-12">
        <section className="mt-6 ">
          <h1 className="text-2xl font-medium text-white pb-6 -mt-44">
            Overview
          </h1>
         
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Badge variant="secondary">78%</Badge>
              <h2 className="mt-2 text-lg font-semibold">Total Products</h2>
              <p>400</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Badge variant="secondary">78%</Badge>
              <h2 className="mt-2 text-lg font-semibold">Total Orders</h2>
              <p>100</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Badge variant="secondary">67%</Badge>
              <h2 className="mt-2 text-lg font-semibold">Total Sales</h2>
              <p>300</p>
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-gray-800">Daily Usage</h2>

          <CurvedlineChart className="w-full h-[400px]" />
        </section>
      </div>
    </main>
  )
}

// .....................icons.....................

function CurvedlineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "B",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
              { x: "2018-01-08", y: 13 },
            ],
          },
          {
            id: "A",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
              { x: "2018-01-08", y: 12 },
            ],
          },
        ]}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "X",
          legendOffset: 45,
          legendPosition: "middle",
          format: "%b %d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        colors={{ scheme: "paired" }}
        pointSize={5}
        pointColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
