import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';


export default function BrandShow({name, ImgUrl}) {
  return (
    <div className='flex w-[30%] border-2 border-[#000] justify-center items-end rounded-full aspect-square m-6 mb-8 md:m-10' style={{backgroundImage:`url(${ImgUrl})`, backgroundSize:'cover', backgroundPosition:'center' }}>
        <Link to={`/Catagories?name=${name}`} className='flex text-[#FFF] text-sm md:text-xl font-medium bg-[#FFB720] px-6 py-2 md:px-14 md:py-4 rounded-full mb-[-10px] gap-2  hover:scale-110 duration-200 active:scale-90'>Explore<MoveRight className='self-center'/></Link>
    </div>
  )
}
