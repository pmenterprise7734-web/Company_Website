import React from 'react'
import { Link } from 'react-router-dom'

function AdminHome() {




  return (
    <div className='flex min-h-screen w-full border-2 border-red-500 justify-center items-center'>
      <Link to={"/AdminAddProduct"}>
        <div className='flex h-[200px] w-[400px] bg-[#ff2626] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300 m-5'>
          <p className='text-[#FFF]'>Add Product</p>
        </div>
      </Link>

      <Link to={''}>
        <div className='flex h-[200px] w-[400px] bg-[#2ba31d] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300 m-5'>
          <p className='text-[#FFF]'>View All products</p>
        </div>
      </Link>

      <Link to={'/EditCatagories'}>
        <div className='flex h-[200px] w-[400px] bg-[#2ba31d] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300 m-5'>
          <p className='text-[#FFF]'>Edit Catagories</p>
        </div>
      </Link>
    </div>
  )
}

export default AdminHome





  // const Name="Sudip Paul"
  // const Price = 3000
  // const Ip = "AEC113"

  // const fetchDatabase = async() => { 
  //   const response = await fetch("http://192.168.0.105:5000/TestTask/TestAdd", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name:Name,
  //       price:Price,
  //       ip:Ip
  //     })
  //   })
  // }