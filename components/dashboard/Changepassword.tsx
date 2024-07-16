"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ChangePasswordForm() {
  const { push } = useRouter()
  const [input, setInput] = useState({
    old_password: "",
    new_password: "",
    retype_new_password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword)
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidForm) {
      toast("Please fill all the fields")
      return
    }
    const data = new FormData()
    const id = localStorage.getItem("id") || ""

    // params: old_password , new_password,type,id
    data.append("id", `${id}`)
    // data.append("type")
    data.append("old_password", input.old_password)
    data.append("new_password", input.new_password)
    try {
      const response = await axios.post(
        `https://www.technicalsewa.com/techsewa/publiccontrol/changePassword`,
        data,
      )
      console.log(response)

      if (response.data.status === "Success") {
        toast.success("Password Changed Successfully!")
        localStorage.clear();
        push("/login")
        console.log("Data updated successfully!")
        // Handle success scenario
      } else {
        toast.error("Password Match not Found.")

        console.error("Failed to update data:", response.statusText)
        // Handle failure scenario
      }
    } catch (error) {
      console.error("Failed to update data:", error)
      // Handle network error
    }
  }

  const isValidForm = input.old_password && input.new_password && input.new_password == input.retype_new_password

  return (
    <div className="bg-white  pt-10 pb-[79px]">
      <div className="flex flex-col justify-center pt-[50px] w-[80%] lg:w-[33.33%]  mx-auto px-4 md:p-0">
        <div className="flex flex-col">
          <div className="py-2">
            <h2 className="text-xl leading-[19.5px] font-semibold mt-[12px] border-b-4 border-cyan-500 w-fit">
              Change password
            </h2>
          </div>
        </div>

        <form onSubmit={handleChangePassword}>
            <div className="flex flex-col justify-center relative gap-2">
              <label className="whitespace-nowrap font-normal">
                Old Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="old_password"
                required
                onChange={handleChange}
                placeholder="Old Password"
                className="border w-full border-[#D9D9D9] py-2 pl-[20px] placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
                minLength={6}
              />

              <div
                className="absolute inset-y-0 top-1/2 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
    
          {input.old_password && input.old_password?.length < 6 && (
            <div
              className="px-4 py-1 my-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>Password must be at least 6 characters</p>
            </div>
          )}

          <div className="relative flex flex-col justify-center gap-2 my-2">
            <label className="whitespace-nowrap ">New Password</label>
            <input
              type={showCPassword ? "text" : "password"}
              name="new_password"
              required
              onChange={handleChange}
              placeholder="New Password"
              className="border w-full border-[#D9D9D9] py-2 pl-[20px]  placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
              minLength={6}
            />
            <div
              className="absolute inset-y-0 top-1/2 right-0 flex items-center pr-3 cursor-pointer"
              onClick={toggleCPasswordVisibility}
            >
              {showCPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {input.new_password && input.new_password?.length < 6 && (
            <div
              className="px-4 py-1 my-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>New Password must be at least 6 characters</p>
            </div>
          )}

<div className="relative flex  flex-col justify-center gap-2 my-2">
            <label className="whitespace-nowrap ">Retype New Password</label>
            <input
              type={showCPassword ? "text" : "password"}
              name="retype_new_password"
              required
              onChange={handleChange}
              placeholder="Retype New Password"
              className="border w-full border-[#D9D9D9] py-2 pl-[20px]  placeholder:text-[#666666]/[0.4] placeholder:italic placeholder:font-normal rounded-[2px] outline-none"
              minLength={6}
            />
            <div
              className="absolute inset-y-0 top-1/2 right-0 flex items-center pr-3 cursor-pointer"
              onClick={toggleCPasswordVisibility}
            >
              {showCPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {input.retype_new_password && input.new_password !== input.retype_new_password && (
            <div
              className="px-4 py-1 my-1 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
              role="alert"
            >
              <p>New Password and Retype New Password must be same</p>
            </div>
          )}


          <button
            type="submit"
            disabled={!isValidForm}
            className="text-white text-[15px] font-semibold leading-[18px] bg-cyan-500  rounded-[2px] w-full py-[15px]
        mt-[44px] disabled:bg-opacity-60 disabled:cursor-not-allowed"
          >
            Change Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
