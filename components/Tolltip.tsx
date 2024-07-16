import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "@/store/userSlice"
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from "@/store/store"


interface CustomerData {
    first_name?: string // Make first_name optional
    last_name?: string // Make last_name optional
    email?: string // Make email optional
    mobile_number?: string // Make mobile_number optional
    password?: string // Make password optional
    photo?: string // Make photo optional
  }

const Tolltip = () => {
    const [data, setData] = useState<CustomerData | null>(null)
    const [id, setId] = useState<string | null>(null)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
 
    useEffect(() => {
      setId(localStorage.getItem("id"))
    })

const route = useRouter()

const handleTooltipToggle = () => {
  setIsTooltipVisible(!isTooltipVisible)
}

const logout = () => {
    localStorage.clear()
    setIsTooltipVisible(!isTooltipVisible)
    route.push("/login")
  }

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
    }
  }, [userProfile])

  return (
    <div className="relative">
          <Avatar onClick={handleTooltipToggle}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isTooltipVisible && (
            <div className="absolute right-0 mt-2 w-40 bg-cyan-100 rounded-lg shadow-lg pb-2 text-black ">
              <div className="flex flex-col items-center">
                {/* <div className='w-full bg-gray-400 mb-2 pb-2 flex flex-col items-center rounded'>
                <Avatar
                  style={{ width: "50px", height: "50px" }}
                  onClick={handleTooltipToggle}
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex gap-1 text-xs text-white">
                  <span>{data?.first_name}</span>
                  <span>{data?.last_name}</span>
                </div>
                </div> */}


                <Link href="/">
                   <button className="w-fit px-2 text-[15px]cursor-pointer">
                        Home
                    </button>
                  </Link>

                {id && <Link href="/userprofile">
                   <button className="w-fit px-2 text-[15px]cursor-pointer">
                        Profile
                    </button>
                  </Link> }

                <Link href="/dashboard">
                   <button className="w-fit px-2 text-[15px] cursor-pointer">
                      Dashboard
                    </button>
                  </Link> 

                {id ? (
                  <button
                    onClick={logout}
                    className="glass rounded-md w-fit px-4 py-1 text-[15px] mt-2  cursor-pointer"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/login">
                    <button className="glass rounded-md w-fit px-4 py-1 text-[15px] mt-2 cursor-pointer">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
  )
}

export default Tolltip