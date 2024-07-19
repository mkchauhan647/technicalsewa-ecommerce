"use client"
import React, { useEffect, useMemo, useState } from "react"
import { CustomTable } from "./CustomTable"
import { AxiosCorsInstance } from "@/axios_config/Axios"

export const OrderHistoryPage = () => {
  const [data, setdata] = useState<any>([])
  const [filterData, setFilterData] = useState<any>([])
  const [currentState, setCurrentState] = useState("Pending")
  const [localData, setLocalData] = useState<any>()

  useEffect(() => {
    const local = localStorage.getItem("data")
    if (local) {
      setLocalData(JSON.parse(local))
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosCorsInstance.post(
          "publiccontrol/publicsales/getsalesbyCustomer",
          {
            cust_id: localStorage?.getItem("id"),
            cust_type: localData?.type,
          },
        )
        const alldata = response.data.list?.map((item: any) => ({
          date: item.sales_date,
          amt: item.sales_calc_price,
          salesId: item.sales_id,
          salesNum: item.sales_number,
          salesStatus: item.sales_status,
        }))
        setdata(alldata)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleTableTabClick = (state: any, statenum: any = 0) => {
    setCurrentState(state)
    if (statenum == 0) {
      setFilterData(data)
      return
    }

    const filterdata = data.filter((item: any) => item.salesStatus == statenum)
    setFilterData(filterdata)
  }

  useEffect(() => {
    const filterdata = data.filter((item: any) => item.salesStatus == 1)
    setFilterData(filterdata)
  }, [data])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center w-[100%] overflow-auto">
        <button
          className={`w-24 h-12 p-2 ${currentState === "Pending" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("Pending", 1)}
        >
          Pending
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "Confirm" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("Confirm", 2)}
        >
          Confirm
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "Processing" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("Processing", 3)}
        >
          Processing
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "OntheWay" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("OntheWay", 4)}
        >
          OntheWay
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "Delivered" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("Delivered", 5)}
        >
          Delivered
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "Cancelled" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("Cancelled", 6)}
        >
          Cancelled
        </button>
        <button
          className={`w-24 h-12 p-2 ${currentState === "All" ? "border-[1px] rounded-lg bg-[#2591B1] text-white font-medium " : ""}`}
          onClick={() => handleTableTabClick("All")}
        >
          All
        </button>
      </div>
      <hr className="h-1 bg-black" />

      <CustomTable data={filterData} status={currentState} />
    </div>
  )
}
