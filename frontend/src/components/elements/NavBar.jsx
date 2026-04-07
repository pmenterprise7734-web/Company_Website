import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {



  return (
    <div className='flex flex-row w-full h-[10vh] justify-between'>
      <div className='flex w-[40%] h-full'>
        <Link to={'/'} style={{backgroundImage:"url(/Logo/PMlogo.svg)", backgroundSize:'cover', backgroundPosition:'center'}} className='w-[18%] ml-[5%]'></Link>
      </div>
      <div className='flex w-[60%] h-full bg-[#1B1A1C] rounded-bl-[30px] justify-between border-b border-[#c4c4c4] '>
        <div className='flex flex-row w-[55%] h-full justify-around items-center ml-10'>
            <NavLink to={'/'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`} >Home</NavLink>
            <NavLink to={'/Catagories'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>Catagories</NavLink>
            <NavLink to={'/AboutUs'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>About Us</NavLink>
            <NavLink to={'/Gallery'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>Gallery</NavLink>
        </div>
        <div className='flex w-[30%] h-full justify-around items-center '>
            <Link to={'/'} className='flex justify-center items-center bg-[#FFB720] hover:scale-105 duration-100 rounded-[5px] px-3 py-1'>
                <p className='text-[#fff] font-medium'>contact us</p>
            </Link>
        </div>
      </div>
    </div>
  )
}
