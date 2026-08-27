import React from 'react'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react';

export default function CatagoryShow({Name, Image, Value, BName}) {
  return (
    <div className="flex flex-col flex-shrink-0 w-[45vw] md:w-[23vw] aspect-square items-center my-2 ">
      <div className="flex flex-col h-[100%] w-[80%] rounded-[10px] items-center justify-center border border-[#FFB720]">
        <img src={Image} className="w-full h-[75%] rounded-t-[10px]" />
        <div className="flex flex-col h-[25%] w-full bg-[#0B1F3A] rounded-b-[10px] justify-center items-center ">
          <p className="text-base md:text-lg text-[#FFF]">{Name}</p>
          {/* <div className="h-[2px] w-10 bg-[#FFB720]"></div> */}
          <Link
            className={`group flex rounded-[4px] items-center tracking-widest text-xs md:text-xs text-[#FFB720] leading-none font-semibold hover:scale-[1.05] transition-all duration-200 ease-out`}
            to={`/ProductList?value=${Value}&bname=${BName}`}
          >
            Explore <MoveRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
