"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const page = () => {
    const router = useRouter()
  return (
    <div className='w-full flex my-20 justify-center rounded relative'>
        <img src='/cloudy.png' className='w-[500px] h-[400px] object-cover ' />
        <div className='p-10 absolute w-full h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center '>
        <FaCheckCircle className=' text-orange-400  cursor-pointer text-center' size={60}  />
            <h2 className='text-center mt-10 mb-16 font-semibold text-xl text-gray-600'>Thank you for Ordering!</h2>
            <div className='flex justify-between gap-2'>
                    <button onClick={()=>router.push("/order-history")} className='border-2 border-orange-200 rounded text-black/50 font-extrabold px-8 h-10 text-sm'>VIEW ORDER</button>
              
                    <button onClick={()=>router.push("/")} className='bg-gradient-to-tr from-orange-200 to-orange-600 rounded text-white h-10 text-sm font-extrabold px-8 whitespace-nowrap flex-1'>CONTINUE SHOPPING</button>
            </div>
        </div>
    </div>
  )
}

export default page