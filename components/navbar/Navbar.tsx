"use client"
import logo from "@/public/logo.jpg"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { RxHamburgerMenu } from "react-icons/rx"
import { Cart } from "../cart/Cart"
// import addToCart from "../cart/addToCart"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { BiCategory } from "react-icons/bi"
import Categories from "../category/Categories"
import { FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa"
import { Button } from "../ui/button"
import { FaCircleUser } from "react-icons/fa6"
import Tolltip from "../Tolltip"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface NavbarProps {
  cart: CartItem[]
}
const links = [
  { href: "/", name: "Training" },
  { href: "/", name: "Blogs" },
  { href: "/", name: "Services" },
  { href: "/", name: "Professional" },
  { href: "/", name: "Part Purja" },
]

const Navbar: FC<NavbarProps> = ({ cart }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [show, setShow] = useState(false)
  // const id = localStorage.getItem("id") ?? "{}"
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const idFromStorage = localStorage.getItem("id")
    setId(idFromStorage) // Set initial state from localStorage
  }, []) // Run effect once on component mount

  const handleClick = () => {
    router.push("/dashboard") // Redirect if necessary
  }

  return (
    <div className="sticky top-0 border-b-2 z-40 bg-white">
      {/* a................bigger screens.................. */}
      <div className="flex items-center justify-between xl:container mx-auto px-4 2xl:px-28 py-4">
        {/*........ logo......... */}
        <Link href="/">
          <Image src={logo} alt="logo" className="max-w-[144px] py-2" />
        </Link>
        {/* ...........Hamburger Menu.......... */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="text-2xl text-black" onClick={() => setShow(!show)}>
            <BiCategory />
          </div>
          <Cart />

          <div
            className="text-2xl text-black"
            onClick={() => setShowMenu(!showMenu)}
          >
            <RxHamburgerMenu />
          </div>
        </div>
        {/* ........search.......*/}
        <div className="hidden xl:block">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer">
              <FiSearch />
            </div>
            <input
              className="border border-black/40 rounded-md sm:min-w-[300px] xl:min-w-[400px] text-[8px] sm:text-xs outline-none p-2 placeholder:text-gray-400"
              placeholder="Search"
            />
          </div>
        </div>
        {/* ...........nav links.......... */}
        <div className="hidden lg:flex gap-5 text-sm">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        {/* ......Registration and Login... */}
        <div
          className={`hidden lg:flex ${id ? "gap-8" : "gap-x-3"} items-center`}
        >
          <Cart />
          {id ? (
            <Button
              onClick={handleClick}
              className="bg-cyan-500 hover:bg-cyan-600 d-flex flex-col"
            >
              <FaUserCircle className="text-2xl " />
            </Button>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-transparent min-w-[100px] border rounded-md text-xs py-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:duration-300 transition-all">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-cyan-500 text-white rounded-md min-w-[100px] py-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* b............smaller screens............... */}
      <div
        className={`lg:hidden flex flex-col items-center justify-center gap-y-4 bg-white py-4 absolute w-full shadow-md ${
          showMenu ? "scale-y-100" : "scale-y-0"
        }`}
        style={{
          transition: "transform 0.05s ease-out",
          transformOrigin: "top",
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer">
            <FiSearch />
          </div>
          <input
            className="border border-black rounded-md text-xs outline-none p-2 lg:p-3 placeholder:text-gray-400 w-[280px] large_mobile:w-[380px] sm:w-[500px]"
            placeholder="Search"
          />
        </div>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={() => setShowMenu(!showMenu)}
          >
            {link.name}
          </Link>
        ))}
        <Link href={"/login"} onClick={() => setShowMenu(!showMenu)}>
          <button className="bg-transparent min-w-[100px] border rounded-md text-xs py-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:duration-300 transition-all">
            Login
          </button>
        </Link>
        <Link href="/sign-up" onClick={() => setShowMenu(!showMenu)}>
          <button className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white rounded-md min-w-[100px] py-2 text-xs">
            Sign Up
          </button>
        </Link>
      </div>

      <div
        className={`lg:hidden flex flex-col gap-y-4 bg-white py-4 absolute w-full shadow-md ${
          show ? "scale-y-100" : "scale-y-0"
        }`}
        style={{
          transition: "transform 0.05s ease-out",
          transformOrigin: "top",
        }}
      >
        <div className="">
          <div className="">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
