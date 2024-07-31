"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "../../../assets/login.jpg"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form validation
    const { name, email, mobile, address, password } = formData

    if (!formData.name.trim()) {
      toast.error("Please enter your name.")
      return
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email.")
      return
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (!formData.mobile.trim()) {
      toast.error("Please enter your phone number.")
      return
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit phone number.")
      return
    }

    if (!formData.address.trim()) {
      toast.error("Please enter your address.")
      return
    }

    if (!formData.password.trim()) {
      toast.error("Please enter your password.")
      return
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    // Additional validation (e.g., email format, phone format, password length)
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit phone number.")
      return
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    try {
      const response = await axios.post(
        "https://www.technicalsewa.com/techsewa/masterConfig/publicLogin/TechSignUp",
        {
          name,
          email,
          mobile,
          address,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (response.data.message === "Success") {
        toast.success("Registration successful!")
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          password: "",
        })
        router.push("/login")
      } else {
        if (response.data.message) {
          toast.error(response.data.message)
        } else {
          toast.error("Registration failed. Please try again.")
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Registration failed. Please try again.")
    }
  }

  return (
    <div className="xl:container mx-auto sm:px-4 2xl:px-28 w-full">
      <div className="flex w-full sm:p-4">
        <div className="basis-full sm:basis-1/2 flex flex-col items-center justify-center px-2 sm:px-6">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h2 className="text-3xl mb-10 text-center text-black">Sign-up</h2>

            <div className="mb-4">
              <Input
                className="text-black"
                id="name"
                placeholder="Type your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                className="text-black"
                id="email"
                placeholder="Type your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Input
                className="text-black"
                id="mobile"
                placeholder="Type your phone number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Input
                className="text-black"
                id="address"
                placeholder="Type your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="relative mb-4">
              <Input
                className="text-black pr-10"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="mb-8">
              <Button
                type="submit"
                className="w-full border py-2 px-4 rounded-md bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700"
              >
                Sign Up
              </Button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mb-4">
            Already have an account?{" "}
          </p>
          <Link href="/login">
            <Button className="w-full border   py-2 px-4 rounded-md  bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700">
              Login
            </Button>
          </Link>
        </div>
        <div className="basis-1/2 sm:flex items-center justify-center hidden">
          {/* Ensure the 'logo' variable holds the correct image path */}
          <Image
            src={logo}
            alt="job logo"
            width={544}
            height={300}
            className="w-[544px] py-2 "
          />
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#07a2c2", color: "white" }}
      />
    </div>
  )
}
