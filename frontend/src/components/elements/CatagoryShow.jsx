import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';

export default function CatagoryShow({Name, Image, Value, BName}) {
  return (
    <div className='flex flex-col flex-shrink-0 w-[23vw] aspect-square items-center'>
        <div style={{backgroundImage:`url(${Image})`, backgroundSize:'cover', backgroundPosition:'center'}} 
        className='flex h-[95%] w-[80%] rounded-[10px] items-end justify-center border-2 border-[#FFB720]'>
            <Link to={`/ProductList?value=${Value}&bname=${BName}`} className='flex py-4 text-lg font-medium text-[#FFF] px-10 bg-[#FFB720] rounded-full justify-center items-center mb-[-8%] hover:scale-105 duration-200 active:scale-90'>{Name}</Link>
        </div>
    </div>
  )
}
