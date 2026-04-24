import React, { useEffect, useState } from 'react'

export default function AdminEnquiryDesk() {

  const[AllQueries, setAllQueries] = useState([])
  const[ProdEnquiryPage,setProdEnquiryPage] = useState(true)

  useEffect(() => {
    CallQueryData()
  },[ProdEnquiryPage])

  const CallQueryData = async() => {
    const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/Query/getAllQuery`)
    const data = await response.json()
    setAllQueries(data)
    console.log(data)
  }



  return (
    <div className='flex flex-col min-h-screen w-full'>
      <div className='flex flex-row w-full gap-10 m-10'>
        <p className={`text-[#FFF] px-10 py-4 rounded-[10px] ${ProdEnquiryPage? "bg-[#1bab16] font-bold" : "bg-[#828282] cursor-pointer" }`} onClick={() => {setProdEnquiryPage(true)}}>Product Enquiry</p>
        <p className={`text-[#FFF] px-10 py-4 rounded-[10px] ${ProdEnquiryPage? "bg-[#828282] cursor-pointer" : "bg-[#1bab16]  font-bold"}`} onClick={() => {setProdEnquiryPage(false)}} >Other Enquiry</p>
      </div>

      <div className=''>
        {
          ProdEnquiryPage? (
            <div></div>
          ) : (
            <div></div>
          ) 
        }
      </div>
    </div>
  )
}
