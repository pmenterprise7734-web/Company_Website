import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {




  return (
    <div className='flex min-h-screen w-full border-2 border-red-500 justify-center items-center'>

      <Link to={'/ViewAllCatagories'}>
        <div className='flex h-[200px] w-[400px] bg-[#2ba31d] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300 m-5'>
          <p className='text-[#FFF]'>View All products</p>
        </div>
      </Link>

    </div>
  )
}

export default AdminHome



