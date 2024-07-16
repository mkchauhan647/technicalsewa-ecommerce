import { Footer } from "@/components/dashboard/Footer"
import { Nav } from "@/components/dashboard/Nav"
import SideNav from "@/components/dashboard/SideNav"
export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-gray-50">
      <div className="hidden md:block md:w-1/5 xl:w-1/6">
        <SideNav />
      </div>
      <div className="w-full md:w-4/5 xl:w-5/6 flex flex-col justify-between relative ">
        <Nav />
        <div className="mt-16">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
