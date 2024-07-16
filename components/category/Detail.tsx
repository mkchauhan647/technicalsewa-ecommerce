import React, { useState, useEffect } from "react"

interface Product {
  page_title: string
  blog_name: string
  market_rate: string
  our_rate: string
  features: string
  image_name: string
}

interface DetailProps {
  modelId: string
}

const Detail: React.FC<DetailProps> = ({ modelId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.technicalsewa.com/techsewa/publiccontrol/getPartsPartPurja",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `model=${modelId}`,
          },
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        // Ensure that the data received is in the expected format
        if (Array.isArray(data)) {
          setProducts(data)
        } else if (typeof data === "object") {
          // If the response contains a single product, wrap it in an array
          setProducts([data])
        } else {
          throw new Error("Data is not in the expected format")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to fetch data. Please try again later.")
      }
    }

    fetchData()
  }, [modelId])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="">
      <div className="">
        {products.map((product, index) => (
          <div key={JSON.stringify(index)} className="">
            <div className="grid sm:flex items-start ">
              <div className="p-4 border  w-full rounded-lg">
                <h2 className="font-semibold mb-2">Details</h2>
                <div className="flex px-4 justify-between  ">
                  <div>
                    <ul className="list-disc">
                      <li className="text-sm">{product.page_title}</li>
                      <li className="text-sm">{product.blog_name}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Detail
