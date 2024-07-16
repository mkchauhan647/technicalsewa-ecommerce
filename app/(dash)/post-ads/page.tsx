"use client"
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import React from "react"
import { RxCrossCircled } from "react-icons/rx"

import { SelectCat } from "@/components/dashboard/post-ads/SelectCat"

const page = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<(string | null)[]>(
    [],
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setSelectedFiles((prevFiles) => [...prevFiles, reader.result as string])
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index))
  }
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <SelectCat />
        <div className="flex items-start flex-col large_mobile:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className=" md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-40 flex items-center justify-center bg-grey-lighter">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-white">
                  <UploadCloudIcon className="w-8 h-8" />
                  <span className="mt-2 text-base leading-normal">
                    Select a file
                  </span>
                  <input
                    className="hidden"
                    type="file"
                    onChange={handleFileUpload}
                    disabled={selectedFiles.length >= 4}
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {selectedFiles.map(
                  (file, index) =>
                    file && (
                      <div
                        key={index}
                        className="w-[88px] flex items-start bg-grey-lighter"
                      >
                        <img src={file} alt={`Preview ${index}`} />
                        <button onClick={() => handleRemove(index)}>
                          <RxCrossCircled className="text-2xl" />
                        </button>
                      </div>
                    ),
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    placeholder="Enter the item name"
                    type="text"
                  />
                </div>
                <div>
                  <Label htmlFor="item-description">Description</Label>
                  <Textarea
                    id="item-description"
                    placeholder="Describe the item"
                  />
                </div>
                <div>
                  <Label htmlFor="item-price">Price</Label>
                  <Input
                    id="item-price"
                    placeholder="Enter the item price"
                    type="number"
                  />
                </div>
                <div>
                  <Label>Condition</Label>
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <input
                        className="mr-2"
                        id="new"
                        name="condition"
                        type="radio"
                        value="new"
                      />
                      <label htmlFor="new">New</label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        id="new"
                        name="condition"
                        type="radio"
                        value="new"
                      />
                      <label htmlFor="new">Like New</label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        id="used"
                        name="condition"
                        type="radio"
                        value="used"
                      />
                      <label htmlFor="used">Used</label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="basis-[50%] ">
                    <Label>Location</Label>
                    <div className="flex items-center space-x-2 py-2">
                      <Input placeholder="Entire Nepal" />
                      <MicroscopeIcon className="text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <div className="text-sm font-medium">
                          Location Radius
                        </div>
                        <div className="text-xs text-gray-500">
                          Hide my precise location
                        </div>
                      </div>
                      <Switch id="location-radius" />
                    </div>
                  </div>
                  <div className="basis-[50%] ">
                    <Label>Field</Label>
                    <div className="flex items-center space-x-2 py-2">
                      <Input placeholder="Entire Nepal" />
                      <MicroscopeIcon className="text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <div className="text-sm font-medium">Free Delivery</div>
                        <div className="text-xs text-gray-500">
                          Toggle for free delivery
                        </div>
                      </div>
                      <Switch id="location-radius" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full md:w-auto">Post Ad</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}

export default page

function UploadCloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}

function MicroscopeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}
