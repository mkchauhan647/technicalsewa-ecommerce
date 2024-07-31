import React from "react";
import { ImFacebook } from "react-icons/im";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import "./footer.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/tslogo-final1.png"
import Locations from "./Locations";
const Footer = async () => {

 const data =await axios
 .get(
   "https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/GetContactUs"
 )
 const description = data?.data?.brands[0].description

  return (
    <div>
      <div className="relative bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700">
        <div className="py-[10px]   max-w-[1280px] mx-auto">
          {/* heading of footer */}
          <Locations />
          
          <hr />
          {/* Next Foter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between  mt-[10px] gap-4 px-[10px] md:px-[0px]">
            <div className="flex flex-row gap-4 items-center md:flex-col">
              <Link
                href="/"
                className="w-[210px] h-[52px] 2xl:h-[67px] bg-[#FFF] p-[3px] rounded-[3px]"
              >
                <Image
                height={52}
                width={210}
                loading="lazy"
                  src={logo}
                  alt="image of logo"
                  className="object-contain w-full h-full"
                />
              </Link>
              <Link
                target="_blank"
                href="https://maps.app.goo.gl/YgkiRnKFGvErHfRa7"
                className=" bg-white text-primary flex py-4 items-center justify-center w-[95px] h-[28px] font-Roboto font-normal text-base leading-[24px]  text-center border-[1px] border-solid border-[#E5E7EB]"
              >
                Direction
                <IoLocationSharp className="text-green-500" size={20} />
              </Link>
            </div>
            <div className="flex  gap-4 md:gap-[48px] flex-row ">
              <div className="flex flex-col font-Roboto text-[#FFF] gap-[10px]">
                <p className="font-bold text-[14px] leading-[16px]">
                  Quick Links
                </p>
                <Link
                  href="/"
                  className="font-[300px] text-[13px] leading-[15px] hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="font-[300px] text-[13px] leading-[15px] hover:underline"
                >
                  About
                </Link>
                <Link
                  href="privacy-policy"
                  className="font-[300px] text-[13px] leading-[15px] hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="font-[300px] text-[13px] leading-[15px] hover:underline"
                >
                  Terms and Condition
                </Link>
              </div>
              <div className="flex flex-col font-Roboto text-[#FFF] gap-[10px]">
                <Link href="#" className="font-bold text-[14px] leading-[16px]">
                  Contact us
                </Link>
                <div
                  className="font-[300px] text-[13px] leading-[15px] contact"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
            <div className="">
              <div className="flex  justify-start xl:justify-end gap-[10px]">
                <a
                  href="https://www.facebook.com/61551939094429"
                  className="flex items-center justify-center bg-[white] w-[35px] h-[35px] rounded-[50%]"
                  target="_blank"
                >
                  <ImFacebook className="text-primary" size={20} />
                </a>
                <a
                  href="https://www.instagram.com/technicalsewa.np/"
                  className="flex items-center justify-center bg-[white] w-[35px] h-[35px] rounded-[50%]"
                  target="_blank"
                >
                  <BiLogoInstagramAlt className="text-primary" size={20} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCw2U7K_AKEkws0uzyI4T_kA"
                  target="_blank"
                  className="flex items-center justify-center bg-[white]  w-[35px] h-[35px] rounded-[50%]"
                >
                  <BsYoutube className="text-primary" size={20} />
                </a>
                <a
                  href="https://twitter.com/technicals2023"
                  target="_blank"
                  className="flex items-center justify-center bg-[white] w-[35px] h-[35px] rounded-[50%]"
                >
                  <BsTwitter className="text-primary" size={20} />
                </a>
              </div>
              <h5 className="font-normal text-[13px] leading-[24px] text-[#FFF] pt-[10px] text-left md:text-right">
                Enter mobile number to get APP download Link
              </h5>
              <div className="flex items-center justify-start md:justify-end my-[22px] w-full">
                <input
                  type="phone"
                  name="phonenumber"
                  placeholder="Type your mobile number "
                  className="border rounded-[5px] h-[32px] bg-white pl-[14px] w-[170px] text-xs outline-none"
                />
                <button className="bg-black rounded-tr-[5px] rounded-br-[5px] text-[#FBFCFE] leaing-[25.5px] font-notmal h-[32px] px-[8px] ">
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copyright footer */}
      <div className="py-[9px] bg-[#054355] px-[10px] md:px-0">
        <h6 className="font-light text-[14px] text-white/[0.5] tracking-[0.3px] leading-[14.06px] text-center">
          Copyright {new Date().getFullYear()} Technical Sewa All Rights
          Reserved
        </h6>
      </div>
    </div>
  );
};

export default Footer;