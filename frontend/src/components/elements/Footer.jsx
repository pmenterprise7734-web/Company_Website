import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex flex-row h-[80vh] w-full bg-[#0A192F]'>
      <div className='flex w-[50%] '></div>
      <div className='flex flex-col w-[50%]'>
        <div className='flex flex-row h-[50%] w-full gap-6 items-center justify-end px-10 '>
          <div className='flex h-[70%] aspect-[7/5] rounded-[10px]' style={{backgroundImage:`url(/Banners/WKLOGO.png)`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
          <div className='flex h-[70%] aspect-[7/5] rounded-[10px]' style={{backgroundImage:`url(/Banners/SNTLOGO.png)`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
        </div>
        <div className='flex flex-col h-[50%] w-full items-end px-10'>
          <Link to={'/'} style={{backgroundImage:"url(/Logo/PMlogo.png)", backgroundSize:'cover', backgroundPosition:'center'}} className='h-[30%] w-[70%] my-4 rounded-[10px]'></Link>
          <p className='text-md text-[#f2f2f2]'>email: pmenterprise123@gmail.com</p>
          <p className='text-md text-[#f2f2f2]'>email(alt): office@weightkart.in</p>
          <p className='text-md text-[#f2f2f2]'>contact: +91 96098 89162</p>
        </div>
      </div>
    </div>
  )
}
