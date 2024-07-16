"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "@/store/userSlice"
import { AppDispatch, RootState } from "@/store/store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CustomerData {
  first_name?: string
  last_name?: string
  email?: string
  mobile_number?: string
  shipping_address1?: string
  shipping_address2?: string
  shipping_address3?: string
}

export default function ManageAddress() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const userProfile = useSelector((state: RootState) => state.user.profile)
  const [data, setData] = useState<CustomerData | null>(null)
  const [initialData, setInitialData] = useState<CustomerData | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (userProfile) {
      const userData: CustomerData = {
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        email: userProfile.email || "",
        mobile_number: userProfile.mobile_number || "",
        shipping_address1: userProfile.shipping_address1 || "",
        shipping_address2: userProfile.shipping_address2 || "",
        shipping_address3: userProfile.shipping_address3 || "",
      }
      setData(userData)
      setInitialData(userData)
      setLoading(false)
    }
  }, [userProfile])

  useEffect(() => {
    if (data) {
      const id = localStorage.getItem("id") || ""
      const form = new FormData()
      form.append("cust_id", id)
      form.append("firstname", data.first_name || "")
      form.append("lastname", data.last_name || "")
      form.append("email", data.email || "")
      form.append("phone", data.mobile_number || "")
      form.append("shipping_address1", data.shipping_address1 || "")
      form.append("shipping_address2", data.shipping_address2 || "")
      form.append("shipping_address3", data.shipping_address3 || "")
      setFormData(form)
    }
  }, [data])

  const hasChanges = () => {
    if (!data || !initialData) return false
    return (
      data.shipping_address1 !== initialData.shipping_address1 ||
      data.shipping_address2 !== initialData.shipping_address2 ||
      data.shipping_address3 !== initialData.shipping_address3
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!hasChanges()) {
      console.log("No changes to save.")
      return
    }

    if (!formData) {
      console.error("Form data is not ready.")
      return
    }

    try {
      const response = await fetch(
        "https://www.technicalsewa.com/techsewa/publiccontrol/updateCustomer",
        {
          method: "POST",
          body: formData,
        },
      )

      if (response.ok) {
        dispatch(fetchUserProfile())
        console.log("Data updated successfully!")
      } else {
        console.error("Failed to update data:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to update data:", error)
    }
  }
  //manage address
  return (
    <main className="p-4 sm:p-10 lg:p-20 flex flex-col w-full gap-4">
      <header>
        <h1 className="text-3xl font-medium">Manage Address</h1>
      </header>
      {data && (
        <form
          onSubmit={handleSubmit}
          className="bg-white sm:p-4 flex flex-col justify-center gap-5 rounded-lg w-full"
        >
          <div className="flex flex-col gap-2 sm:flex-row justify-between w-full rounded-lg p-3">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="shipping_address1">
                    First Shipping Address
                  </Label>
                  <Input
                    id="shipping_address1"
                    placeholder="Enter your first shipping address"
                    type="text"
                    value={data?.shipping_address1 || ""}
                    onChange={(e) =>
                      setData({ ...data, shipping_address1: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shipping_address2">
                    Second Shipping Address
                  </Label>
                  <Input
                    id="shipping_address2"
                    className="w-80"
                    placeholder="Enter your second shipping address"
                    type="text"
                    value={data?.shipping_address2 || ""}
                    onChange={(e) =>
                      setData({ ...data, shipping_address2: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shipping_address3">
                    Third Shipping Address
                  </Label>
                  <Input
                    id="shipping_address3"
                    placeholder="Enter your third shipping address"
                    type="text"
                    value={data?.shipping_address3 || ""}
                    onChange={(e) =>
                      setData({ ...data, shipping_address3: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-40 pt-4 bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg"
          >
            Save
          </button>
        </form>
      )}
    </main>
  )
}
