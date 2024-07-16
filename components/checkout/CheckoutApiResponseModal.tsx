import { CrossCircledIcon } from '@radix-ui/react-icons'
import { CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'

const CheckoutApiResponseModal = ({showModal}:any) => {
    const router = useRouter()
  return (
    <div className='w-[500px] h-[400px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded'>
        <img src='/cloudy.png' className='w-full h-full object-cover relative ' />
        <CrossCircledIcon onClick={()=>showModal(false)} className='absolute top-2 right-2 w-8 h-8 cursor-pointer text-blue z-50' />
        <div className='p-10 absolute w-full h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center '>
        <FaCheckCircle className='w-full text-orange-400  cursor-pointer text-center' size={60}  />
            <h2 className='text-center mt-10 mb-16 font-bold text-xl'>Thank you for Ordering!</h2>
            <div className='flex w-full justify-between gap-2'>
                    <button onClick={()=>router.push("/order-history")} className='border-2 border-orange-200 rounded text-black/50 font-extrabold px-8 h-10 text-sm'>VIEW ORDER</button>
              
                    <button onClick={()=>router.push("/")} className='bg-gradient-to-tr from-orange-200 to-orange-600 rounded text-white h-10 text-sm font-extrabold whitespace-nowrap flex-1'>CONTINUE SHOPPING</button>
            </div>
        </div>
    </div>
  )
}

export default CheckoutApiResponseModal