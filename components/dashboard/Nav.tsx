"use client"
import AxiosInstance from "@/axios_config/Axios"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LayoutDashboardIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaDoorOpen, FaHistory, FaHome } from "react-icons/fa"
import { FaLocationDot, FaUser } from "react-icons/fa6"
import { IoIosArrowDown } from "react-icons/io"
import { MdMenu, MdNotificationsActive } from "react-icons/md"
import { TiHome } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "@/store/userSlice"
import { AppDispatch, RootState } from "@/store/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface CustomerData {
  first_name?: string
  last_name?: string
  email?: string
  mobile_number?: string
  password?: string
  photo?: string
}

interface NavigationItem {
  icon: JSX.Element
  label: string
  link: string
}

export const Nav: React.FC = () => {
  const router = usePathname()
  const route = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [data, setData] = useState<CustomerData | null>(null)
  const [initialData, setInitialData] = useState<CustomerData | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const userProfile = useSelector((state: RootState) => state.user.profile)
 console.log(userProfile)
  useEffect(() => {
    setId(localStorage.getItem("id"))
  }, [])

  const navigationItems: NavigationItem[] = [
    {
      icon: <TiHome className="text-2xl" />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <FaHistory className="text-2xl" />,
      label: "Order History",
      link: "/order-history",
    },
    {
      icon: <FaUser className="text-2xl" />,
      label: "My Profile",
      link: "/userprofile",
    },
    {
      icon: <FaLocationDot className="text-2xl" />,
      label: "Manage Address",
      link: "/manage-address",
    },
  ]

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
        photo: userProfile.photo || "",
      }
      setData(userData)
      setInitialData(userData)
    }
  }, [userProfile])

  const logout = () => {
    localStorage.clear()
    route.push("/login")
  }

  return (
    <div className="fixed top-0 w-full md:w-4/5 xl:w-5/6 p-4 bg-[#2591B1] text-white flex justify-between md:justify-end items-center shadow-2xl">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MdMenu />
          </SheetTrigger>
          <SheetContent side="left" className="w-60">
            <SheetHeader>
              <div className="pl-2 flex items-center space-x-4 mt-4">
                <LayoutDashboardIcon className="h-8 w-8" />
                <span className="font-bold text-lg">Reeclick</span>
              </div>
              <hr />
              <nav className="mt-8 pl-2 flex flex-col gap-3">
                {navigationItems.map((item, index) => (
                  <Link key={index} href={item.link}>
                    <SheetTrigger
                      className={`flex items-center space-x-4 p-2 ${
                        router === item.link ? "text-gray-900" : "text-gray-600"
                      } ${
                        router === item.link
                          ? "rounded-lg bg-gray-200"
                          : "hover:bg-gray-200 rounded-lg"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SheetTrigger>
                  </Link>
                ))}
              </nav>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-2 text-xl text-white rounded-full glass">
          <MdNotificationsActive />
        </div>
        <div className="flex space-x-3 items-center glass rounded-3xl pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    src={`${data?.photo !== ""? data?.photo : "https://github.com/shadcn.png"}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback className="text-black flex justify-center items-center">
                    IMG
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-1 text-xs text-white ml-2">
                  <span>{data?.first_name || "FirstName"}</span>
                  <span>{data?.last_name || "Last"}</span>
                </div>
                <IoIosArrowDown className="text-white ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {id ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => route.push("/")}
                      className="bg-cyan-500 text-white rounded-md py-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300"
                    >
                      <FaHome className="text-xl" />
                      Home
                    </Button>
                    <Button
                      onClick={logout}
                      className="bg-cyan-500 text-white rounded-md py-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300"
                    >
                      <FaDoorOpen className="text-xl" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="bg-cyan-500 text-white rounded-md min-w-[100px] py-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300">
                      Login
                    </Button>
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
