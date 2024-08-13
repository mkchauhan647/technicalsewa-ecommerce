"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoIosAddCircle } from "react-icons/io"
import { TiHome } from "react-icons/ti"
import { RiAdvertisementFill } from "react-icons/ri"
import { FaUser, FaLocationDot } from "react-icons/fa6"
import { FaHistory } from "react-icons/fa"
import Image from "next/image"
import icon from "../../assets/logo.jpg"
import { PiBank } from "react-icons/pi";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
const navigationItems = [
  {
    icon: <TiHome className="text-2xl" />,
    label: "Dashboard",
    link: "/dashboard",
  },
  // {
  //   icon: <IoIosAddCircle className="text-2xl" />,
  //   label: "Post new",
  //   link: "/post-ads",
  // },
  // {
  //   icon: <RiAdvertisementFill className="text-2xl" />,
  //   label: "Manage ads",
  //   link: "/my-ads",
  // },
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
  {
    label: "Pay Online",
    link: "/pay-online",
    icon: <PiBank className="text-2xl" />,
  }
]
const SideNav = () => {
  const router: any = usePathname()
  return (
    <aside className="hidden md:flex flex-col bg-white shadow-lg h-screen sticky top-0">
      <Link
        href="/"
        className="flex items-center space-x-4 border-b border-black px-3 h-[72px]"
      >
        {/* <LayoutDashboardIcon className="h-8 w-8" /> */}
        <Image src={icon} alt="icon" width={150} height={140}/>
      </Link>
      <nav className="mt-8 flex flex-col gap-1 ">
        {navigationItems.map((item, index) => (
          <Link key={JSON.stringify(index)} href={item.link}>
            <div
              className={`flex items-center space-x-4 px-3 py-2 ${
                router === item.link ? "text-gray-900" : "text-gray-600"
              } ${
                router === item.link
                  ? "rounded-lg bg-[#e2f3f8]"
                  : "hover:bg-[#e2f3f8] rounded-lg"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default SideNav

function LayoutDashboardIcon(props: any) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}
