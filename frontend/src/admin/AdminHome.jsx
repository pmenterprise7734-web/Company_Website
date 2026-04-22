import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {




  return (
    <div className='flex flex-row flex-wrap min-h-screen w-full justify-center items-center gap-8'>

      <Link to={'/AdminViewAllCatagories'}>
        <div className='flex h-[100px] w-[300px] bg-[#2ba31d] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300'>
          <p className='text-[#FFF]'>View All products</p>
        </div>
      </Link>

      <Link to={'/AdminHeroBanner'}>
        <div className='flex h-[100px] w-[300px] bg-[#2b0000] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300'>
          <p className='text-[#FFF]'>HomePage Sliding Banners</p>
        </div>
      </Link>

      <Link to={'/AdminTopProducts'}>
        <div className='flex h-[100px] w-[300px] bg-[#261cd9] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300'>
          <p className='text-[#FFF]'>Top Products</p>
        </div>
      </Link>

      <Link to={'/AdminEnquiryDesk'}>
        <div className='flex h-[100px] w-[300px] bg-[#261cd9] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300'>
          <p className='text-[#FFF]'>Enquiries</p>
        </div>
      </Link>

    </div>
  )
}

export default AdminHome



