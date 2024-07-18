import React from "react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"

export const CustomTable = ({
  data,
  status,
}: {
  data: any
  status: string
}) => {
  const reversedData = [...data].reverse()
  console.log(reversedData)

  return (
    <div className="bg-white">
      <Table className="bg-white">
        <TableBody>
          {reversedData?.map((value: any, index: number) => (
            <TableRow
              key={index}
              className="flex justify-between items-center xl:px-10"
            >
              <TableCell className="text-base">
                <div className="flex flex-col gap-1">
                  <Link href={`/order-history/${value.salesId}`}>
                    Order ID:{" "}
                    <span className="text-blue-600">{value.salesNum}</span>
                  </Link>
                  <div>
                    Placed on <span className="font-medium">{value.date}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div>
                  Amount: <span className="font-medium">{value.amt}</span>
                </div>
              </TableCell>
              <TableCell className={`text-center hidden md:flex`}>
                <span
                  className={`p-2 rounded-lg ${
                    status === "Confirm"
                      ? "bg-blue-300 text-white"
                      : status === "Pending"
                        ? "bg-yellow-600 text-white"
                        : status === "Processing"
                          ? "bg-orange-500 text-white"
                          : status === "OntheWay"
                            ? "bg-purple-800 text-white"
                            : status === "Delivered"
                              ? "bg-green-500 text-white"
                              : status === "Cancelled"
                                ? "bg-red-600 text-white"
                                : "bg-black text-white"
                  }`}
                >
                  {status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/order-history/${value.salesId}`}>
                  View Details
                </Link>
                {status === "Delivered" && (
                  <div>
                    <Link
                      href={`/order-history/${value.salesId}`}
                      className="text-blue-600"
                    >
                      Add Review
                    </Link>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
