"use client"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Product = dynamic(() => import("./product"), { ssr: false })

const Page = () => {
  const [brandId, setBrandId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("next/router")
        .then((router) => {
          const { query } = router.default

          if (query && typeof query.brandId === "string") {
            setBrandId(query.brandId)
          }
        })
        .catch((error) => {
          console.error("Error importing router:", error)
        })
    }
  }, [])

  return (
    <div>{brandId ? <Product brandId={brandId} /> : <div>Loading...</div>}</div>
  )
}

export default Page
