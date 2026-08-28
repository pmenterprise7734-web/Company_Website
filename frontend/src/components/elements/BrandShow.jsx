import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';


export default function BrandShow({name, ImgUrl}) {
  const isMd = window.innerWidth >= 768;
  return (
    <div className='flex flex-col w-[35%] md:w-[25%] aspect-[1.5/1] border-2 border-[#000] justify-center items-center rounded-[20px] md:rounded-[40px] m-4 mb-8 md:m-10 gap-2 py-4' >
        <img src={ImgUrl} className='w-[80%] aspect-[1.5/1] rounded-[40px] object-cover' />
        <Link to={`/Catagories?name=${name}`} className='group flex text-[#FFF] text-xs md:text-lg bg-[#0B1F3A] px-6 py-2 md:px-6 md:py-2 rounded-[4px] gap-2  hover:scale-110 duration-200 active:scale-90'>Explore<MoveRight className='self-center text-[#FFB720] transition-transform duration-300 group-hover:translate-x-2' size={isMd? 25:14}/></Link>
    </div>
  )
}
