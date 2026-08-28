import React from 'react'

export default function HeadingButtons({text, margin}) {
  return (
    <div className={`flex flex-col ${margin === 0? "":"ml-4 md:ml-20"}`}>
      <p className={`flex w-fit py-2 text-lg md:text-2xl 2xl:text-3xl text-[#0B1F3A] font-bold justify-center items-center ${margin === 0? "":"mt-4 md:mt-10"}`}>{text}</p>
      <div className='h-1 w-12 bg-[#FFB720] rounded-full'></div>
    </div>
  )
}
