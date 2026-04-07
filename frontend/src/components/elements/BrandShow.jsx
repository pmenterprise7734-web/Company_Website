import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';


export default function BrandShow({name, ImgUrl}) {
  return (
    <div className='flex w-[30%] border-2 border-[#000] justify-center items-end rounded-full aspect-square m-10' style={{backgroundImage:`url(${ImgUrl})`, backgroundSize:'cover', backgroundPosition:'center' }}>
        <Link className='flex text-[#FFF] text-xl font-medium bg-[#FFB720] px-14 py-4 rounded-full mb-[-10px] gap-2  hover:scale-110 duration-200 active:scale-90'>Explore<MoveRight className='self-center'/></Link>
    </div>
  )
}
