"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "../assets/login.jpg"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form validation
    const { username, password } = formData

    if (!formData.username.trim()) {
      toast.error("Please enter your name.")
      return
    }

    if (!formData.password.trim()) {
      toast.error("Please enter your password.")
      return
    }

    try {
      const response = await axios.post(
        "https://www.technicalsewa.com/techsewa/masterconfig/publiclogin/signinlate",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (response.data.id) {
        toast.success("login successful!")
        window.location.href = "/"
        const array = response.data
        let value = JSON.stringify(array)
        localStorage.setItem("data", value)
        localStorage.setItem("id", array?.id)
        setFormData({
          username: "",
          password: "",
        })
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.error(error)
      toast.error("Login failed. Please try again.")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="xl:container mx-auto sm:px-4 2xl:px-28 w-full">
      <div className="flex w-full sm:p-4">
        <div className="basis-full sm:basis-1/2 flex flex-col items-center justify-center px-2 sm:px-6">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h2 className="text-3xl mb-10 text-center text-black">Login</h2>
            <div className="mb-4">
              <Input
                className="text-black"
                id="username"
                placeholder="Type your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-8 relative">
              <div className="relative">
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
              <Link
                className="inline-block align-baseline text-xs  text-black mt-4"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mb-8">
              <Button className="w-full border py-2 px-4 rounded-md bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700">
                Login
              </Button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs mb-4">
            Or Sign Up Using
          </p>
          <div className="flex items-center justify-center mb-4 text-cyan-500 text-xl gap-4">
            <FaGoogle />
            <FaLinkedin />
          </div>
          <div className="text-center">
            <Link href="/sign-up">
              <Button className="py-2 px-8 border rounded-md bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="basis-1/2 sm:flex items-center justify-center hidden">
          <Image src={logo} alt="job logo" className="w-[544px] py-2 " />
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#07a2c2", color: "white" }}
      />
    </div>
  )
}
