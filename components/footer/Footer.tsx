import Link from "next/link"
import React from "react"
import { TitleBorder } from "../TitleBorder"
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"
import { FaGlobe } from "react-icons/fa"

const categories = [
  {
    title: "Quick Links",
    links: [
      { text: "About Us", href: "/" },
      { text: "News & Blog", href: "/" },
      { text: "Featured Products", href: "/" },
      { text: "New Arrivals", href: "/" },
      { text: "FAQs", href: "/" },
      { text: "Services", href: "/" },
      { text: "Inquiry Now", href: "/" },
    ],
  },

  {
    title: "Popular Categories",
    links: [
      { text: "Electronic Components", href: "/" },
      { text: "Display Modules", href: "/" },
      { text: "Wire & Cables", href: "/" },
      { text: "Electronic Parts", href: "/" },
      { text: "Gaming Accessories", href: "/" },
      { text: "Mechanical Tools", href: "/" },
      { text: "Smart Products", href: "/" },
    ],
  },

  {
    title: "Contact us",
    links: [
      {
        text: "Kumaripati, Lalitpur, Nepal, Near Bluebird College",
        href: "/",
        icon: <MdLocationOn />,
      },
      {
        text: "9802074555, 9851201580, 977-01-5970066",
        href: "/companyprofile",
        icon: <MdPhone />,
      },
      {
        text: " technicalsewa.np@gmail.com",
        href: "/companyprofile",
        icon: <MdEmail />,
      },
      { text: "technicalsewa.com", href: "/companyprofile", icon: <FaGlobe /> },
    ],
  },
]
const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700">
      <div className="  xl:container mx-auto px-4  2xl:px-28 py-6 md:py-14">
        <div className="flex  flex-col md:flex-row large_mobile:grid grid-cols-3 md:flex justify-between gap-8 lg:gap-0">
          <div className=" col-span-2 flex flex-col basis-[30%] ">
            <img src="/icon_footer.png" className="w-[80px] " alt="logo" />
            <p className="text-white text-[12px] text-justify mt-4">
              Technical Sewa is committed to delivering top-notch nationwide
              after-sales support for appliances, including Washing Machines,
              Refrigerators, Air Conditioners, and more. With a team of highly
              experienced technicians boasting over 10 years of expertise, we
              prioritize reliable service.
            </p>

            <div className=" flex items-center gap-4 mt-4">
              <svg
                className="cursor-pointer"
                width="9"
                height="17"
                viewBox="0 0 9 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.66667 9.775H7.69048L8.5 6.375H5.66667V4.675C5.66667 3.7995 5.66667 2.975 7.28571 2.975H8.5V0.119C8.2361 0.0824501 7.23957 0 6.18719 0C3.98933 0 2.42857 1.40845 2.42857 3.995V6.375H0V9.775H2.42857V17H5.66667V9.775Z"
                  fill="white"
                />
              </svg>
              <svg
                className="cursor-pointer"
                width="22"
                height="17"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1418 2.31556C20.3687 2.64603 19.5488 2.86308 18.7093 2.9595C19.5942 2.4481 20.2564 1.64325 20.5727 0.694933C19.7423 1.17251 18.8319 1.5072 17.883 1.68825C17.2456 1.02921 16.4008 0.59214 15.4798 0.444974C14.5588 0.297809 13.6134 0.448797 12.7904 0.874467C11.9674 1.30014 11.313 1.97664 10.9289 2.7988C10.5448 3.62096 10.4526 4.54272 10.6665 5.42077C8.98248 5.3392 7.33504 4.9163 5.83114 4.17953C4.32723 3.44275 3.00048 2.40857 1.93702 1.14413C1.56059 1.76894 1.36277 2.47921 1.36383 3.2022C1.36383 4.62122 2.1112 5.87486 3.24745 6.60883C2.57503 6.58838 1.91741 6.41289 1.3294 6.09701V6.1479C1.3296 7.09297 1.66802 8.00889 2.28726 8.74036C2.9065 9.47184 3.76847 9.97385 4.72701 10.1613C4.10279 10.3248 3.44828 10.3488 2.813 10.2317C3.08326 11.0452 3.61001 11.7567 4.31949 12.2664C5.02897 12.7762 5.88566 13.0588 6.76962 13.0747C5.89108 13.7415 4.88517 14.2344 3.80938 14.5252C2.73359 14.816 1.60903 14.8991 0.5 14.7697C2.43597 15.9729 4.68963 16.6116 6.9914 16.6095C14.7821 16.6095 19.0425 10.3727 19.0425 4.96375C19.0425 4.78759 19.0375 4.60948 19.0294 4.43528C19.8586 3.85609 20.5743 3.13861 21.1429 2.31653L21.1418 2.31556Z"
                  fill="white"
                />
              </svg>

              <svg
                className="cursor-pointer"
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9728 2.90664C17.8692 2.50323 17.6662 2.13541 17.3843 1.84C17.1023 1.54459 16.7512 1.33195 16.3662 1.22337C14.9481 0.821289 9.24996 0.821289 9.24996 0.821289C9.24996 0.821289 3.5518 0.821289 2.13377 1.22337C1.74871 1.33195 1.39763 1.54459 1.11566 1.84C0.833699 2.13541 0.630737 2.50323 0.527092 2.90664C0.262313 4.42177 0.133823 5.95958 0.143312 7.49986C0.133823 9.04014 0.262313 10.578 0.527092 12.0931C0.630737 12.4965 0.833699 12.8643 1.11566 13.1597C1.39763 13.4551 1.74871 13.6678 2.13377 13.7764C3.5518 14.1784 9.24996 14.1784 9.24996 14.1784C9.24996 14.1784 14.9481 14.1784 16.3662 13.7764C16.7512 13.6678 17.1023 13.4551 17.3843 13.1597C17.6662 12.8643 17.8692 12.4965 17.9728 12.0931C18.2376 10.578 18.3661 9.04014 18.3566 7.49986C18.3661 5.95958 18.2376 4.42177 17.9728 2.90664ZM7.42863 10.3621V4.63762L12.1576 7.49986L7.42863 10.3621Z"
                  fill="white"
                />
              </svg>
              <svg
                className="cursor-pointer"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0055 0.214355H4.28025C3.24013 0.215468 2.24293 0.629148 1.50745 1.36463C0.771971 2.10011 0.35829 3.09731 0.357178 4.13743V10.8627C0.35829 11.9028 0.771971 12.9 1.50745 13.6355C2.24293 14.371 3.24013 14.7847 4.28025 14.7858H11.0055C12.0457 14.7847 13.0429 14.371 13.7783 13.6355C14.5138 12.9 14.9275 11.9028 14.9286 10.8627V4.13743C14.9275 3.09731 14.5138 2.10011 13.7783 1.36463C13.0429 0.629148 12.0457 0.215468 11.0055 0.214355ZM7.64289 10.8627C6.97782 10.8627 6.32769 10.6655 5.77471 10.296C5.22173 9.92651 4.79073 9.40134 4.53622 8.78689C4.28171 8.17245 4.21512 7.49634 4.34487 6.84405C4.47462 6.19176 4.79487 5.5926 5.26515 5.12233C5.73542 4.65205 6.33459 4.33179 6.98687 4.20204C7.63916 4.0723 8.31528 4.13889 8.92972 4.3934C9.54416 4.64791 10.0693 5.07891 10.4388 5.63189C10.8083 6.18487 11.0055 6.835 11.0055 7.50007C11.0046 8.39161 10.65 9.24637 10.0196 9.87679C9.3892 10.5072 8.53443 10.8618 7.64289 10.8627ZM11.8462 4.13743C11.6799 4.13743 11.5174 4.08813 11.3791 3.99576C11.2409 3.90338 11.1331 3.77209 11.0695 3.61848C11.0059 3.46487 10.9892 3.29584 11.0217 3.13277C11.0541 2.9697 11.1342 2.81991 11.2518 2.70234C11.3693 2.58477 11.5191 2.5047 11.6822 2.47227C11.8453 2.43983 12.0143 2.45648 12.1679 2.5201C12.3215 2.58373 12.4528 2.69148 12.5452 2.82973C12.6375 2.96797 12.6868 3.13051 12.6868 3.29677C12.6868 3.51973 12.5983 3.73355 12.4406 3.89121C12.283 4.04886 12.0691 4.13743 11.8462 4.13743ZM9.88465 7.50007C9.88465 7.94345 9.75317 8.37687 9.50685 8.74552C9.26052 9.11418 8.9104 9.40151 8.50078 9.57118C8.09115 9.74086 7.6404 9.78525 7.20555 9.69875C6.77069 9.61225 6.37124 9.39875 6.05773 9.08523C5.74421 8.77172 5.53071 8.37227 5.44421 7.93741C5.35771 7.50256 5.4021 7.05181 5.57178 6.64219C5.74145 6.23256 6.02878 5.88244 6.39744 5.63612C6.76609 5.38979 7.19951 5.25831 7.64289 5.25831C8.23744 5.25831 8.80764 5.4945 9.22805 5.91491C9.64847 6.33532 9.88465 6.90552 9.88465 7.50007Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {categories.map((category, index) => (
            <div key={index} className={index === 1 ? "col-span-2" : ""}>
              <h1 className="text-white font-semibold">{category.title}</h1>
              <TitleBorder />
              <div className="mt-3 space-y-[12px] text-[12px]">
                {category.links.map((link: any, linkIndex) => (
                  <div key={linkIndex}>
                    <Link href={link.href}>
                      <h2 className="text-white  transition-colors duration-150 ease-out cursor-pointer flex items-center ">
                        {link && (
                          <span className="text-lg mr-3">{link.icon}</span>
                        )}{" "}
                        {link.text}
                      </h2>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-[1px] border-white ">
        <div className="xl:container mx-auto px-4  2xl:px-28 flex xl:flex-row flex-col items-center justify-between py-6 gap-2 md:gap-4">
          <p className="text-white text-xs text-center">
            @{" "}
            <span className="text-xs">
              Copyright 2024 Technical Sewa All Rights Reserved
            </span>{" "}
          </p>
          <div>
            <div className="flex items-center md:gap-[30px] justify-center md:justify-start gap-3 sm:gap-[24px] whitespace-nowrap text-[12px]  text-white">
              <p className="">Privacy & Data</p>
              <p className="">Cookies</p>
              <p className="">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
