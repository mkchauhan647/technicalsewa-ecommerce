"use client"
import AxiosInstance from "@/axios_config/Axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useEffect, useState } from "react"
import user from "../../public/dummy-user.png"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "@/store/userSlice"
import { AppDispatch, RootState } from "@/store/store"

interface CustomerData {
  first_name?: string
  last_name?: string
  email?: string
  mobile_number?: string
  password?: string
  photo?: string
}

export default function UserProfile() {
  const [data, setData] = useState<CustomerData | null>(null)
  const [initialData, setInitialData] = useState<CustomerData | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<AppDispatch>()
  const userProfile = useSelector((state: RootState) => state.user.profile)

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
      form.append("shipping_address1", "aa")
      form.append("shipping_address2", "aa")
      form.append("shipping_address3", "aa")
      setFormData(form)
    }
  }, [data])

  const hasChanges = () => {
    if (!data || !initialData) return false
    return (
      data.first_name !== initialData.first_name ||
      data.last_name !== initialData.last_name ||
      data.email !== initialData.email ||
      data.mobile_number !== initialData.mobile_number
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
      // console.log(response)

      if (response.ok) {
        dispatch(fetchUserProfile())

        console.log("Data updated successfully!")
        // Handle success scenario
      } else {
        console.error("Failed to update data:", response.statusText)
        // Handle failure scenario
      }
    } catch (error) {
      console.error("Failed to update data:", error)
      // Handle network error
    }
  }

  return (
    <main className="md:p-3 flex flex-col items-center w-full gap-4">
      <header>
        <h1 className="text-3xl font-medium">My Profile</h1>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-full md:w-auto md:bg-white shadow-md p-5 md:p-10 flex flex-col md:flex-row items-center justify-center gap-5 rounded-lg">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={user}
                alt="dummy user"
                className="h-40 w-40 rounded-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid w-full md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter your full name"
                    type="text"
                    value={data?.first_name || ""}
                    onChange={(e) =>
                      setData({ ...data, first_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter your full name"
                    type="text"
                    value={data?.last_name || ""}
                    onChange={(e) =>
                      setData({ ...data, last_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email address"
                    type="text"
                    value={data?.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter your mobile"
                    type="text"
                    value={data?.mobile_number || ""}
                    onChange={(e) =>
                      setData({ ...data, mobile_number: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 px-10 pt-4">
                <button
                  className="bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg"
                  type="submit"
                >
                  Edit Profile
                </button>
                <Link href="/changepassword">
                  <button className="bg-[#2591B1] text-white font-semibold px-5 py-3 rounded-lg">
                    Update Password
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </main>
  )
}
