import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { ChevronRight } from 'lucide-react';



export default function AdminEnquiryDesk() {

  // const[AllQueries, setAllQueries] = useState([])
  const[ProdQueries, setProdQueries] = useState([])
  const[OtherQueries, setOtherQueries] = useState([])
  const[ProdEnquiryPage,setProdEnquiryPage] = useState(true)

  useEffect(() => {
    CallQueryData()
  },[])

  const CallQueryData = async() => {
    const response = await fetch(`https://company-website-cw4n.onrender.com/Query/getAllQuery`)
    const data = await response.json()
    const dataArr = data.data
    setProdQueries(dataArr.filter(item => item.prodquery === true))
    setOtherQueries(dataArr.filter(item => item.prodquery === false))
    console.log(data.data)
  }



  return (
    <div className='flex flex-col h-screen w-full items-center'>
      <div className='flex flex-col h-full w-[95%]'>
        <div className='flex flex-row w-full gap-10 py-10'>
          <p className={`text-[#FFF] px-10 py-4 rounded-[10px] ${ProdEnquiryPage? "bg-[#1bab16] font-bold" : "bg-[#828282] cursor-pointer" }`} onClick={() => {setProdEnquiryPage(true)}}>Product Enquiry</p>
          <p className={`text-[#FFF] px-10 py-4 rounded-[10px] ${ProdEnquiryPage? "bg-[#828282] cursor-pointer" : "bg-[#1bab16]  font-bold"}`} onClick={() => {setProdEnquiryPage(false)}} >Other Enquiry</p>
        </div>

        <div className='flex w-full'>
          {
            ProdEnquiryPage? (
              <div className='flex flex-col w-full gap-4'>
                {
                  ProdQueries?.length>0? (
                    ProdQueries.map((item) => {
                      return(
                        <div key={item._id} className='flex flex-row rounded-[5px] bg-[#f2f2f2]'>
                          <div className='flex flex-col flex-[2] md:flex-[1.2] justify-center items-center'>
                            <img src={item.product.picture} className='w-full aspect-square'/>
                            <div className='flex flex-col md:flex-row w-full justify-around py-2'>
                              <p className='text-xs'>model: <span className='text-[xs] md:text-sm leading-none font-bold'>{(item.product.model).length > 30? item.name.slice(0,30)+"..." : item.product.model}</span></p>
                              <p className='text-xs'>qtn: <span className='text-[xs] md:text-sm leading-none font-bold'>{item.product.quantity}</span></p>
                            </div>
                          </div>
                          <div className='flex flex-[2] flex-col gap-1 p-5'>
                              <p className='text-xs md:text-base'>Name: <span className='text-sm md:text-lg leading-none font-bold'>{(item.name).length > 30? item.name.slice(0,30)+"..." : item.name}</span></p>
                              <p className='text-xs md:text-base'>Company: <span className='text-sm md:text-lg leading-none font-bold'>{(item.company).length > 30? item.name.slice(0,30)+"..." : item.company}</span></p>
                              <p className='text-xs md:text-base'>State: <span className='text-sm md:text-lg leading-none '>{(item.state).length > 30? item.name.slice(0,30)+"..." : item.state}</span></p>
                              <p className='text-xs md:text-base'>Country: <span className='text-sm md:text-lg leading-none '>{(item.country).length > 30? item.name.slice(0,30)+"..." : item.country}</span></p>
                              <p className='text-xs md:text-base'>Email: <span className='text-sm md:text-lg leading-none '>{(item.email).length > 30? item.name.slice(0,30)+"..." : item.email}</span></p>
                              <p className='text-xs md:text-base'>Phone: <span className='text-sm md:text-lg leading-none '>{(item.phone).length > 30? item.name.slice(0,30)+"..." : item.phone}</span></p>
                          </div>
                          <div className='flex flex-[3] hidden md:block flex-col gap-1 p-5 '>
                              <p className='text-md'>Query: <span className='text-md leading-none '>{item.comment}</span></p>
                          </div>
                          <div className='flex flex-[0.5] justify-center items-center flex-col'>
                            <Link><ChevronRight className='w-[40px] h-[40px] border-2 border-[#FFF] rounded-[5px]'/></Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div>hiii</div>
                  )
                }
              </div>
            ) : (
              <div className='flex flex-col w-full gap-4'>
                {
                  OtherQueries?.length>0? (
                    OtherQueries.map((item) => {
                      return(
                        <div key={item._id} className='flex flex-row rounded-[5px] bg-[#f2f2f2]'>
                          <div className='flex flex-[2] flex-col gap-1 p-5'>
                              <p className='text-xs md:text-base'>Name: <span className='text-sm md:text-lg leading-none font-bold'>{(item.name).length > 30? item.name.slice(0,30)+"..." : item.name}</span></p>
                              <p className='text-xs md:text-base'>Company: <span className='text-sm md:text-lg leading-none font-bold'>{(item.company).length > 30? item.name.slice(0,30)+"..." : item.company}</span></p>
                              <p className='text-xs md:text-base'>State: <span className='text-sm md:text-lg leading-none '>{(item.state).length > 30? item.name.slice(0,30)+"..." : item.state}</span></p>
                              <p className='text-xs md:text-base'>Country: <span className='text-sm md:text-lg leading-none '>{(item.country).length > 30? item.name.slice(0,30)+"..." : item.country}</span></p>
                          </div>
                          <div className='flex flex-[3] flex-col gap-1 p-5 hidden md:block'>
                              <p className='text-md'>Email: <span className='text-lg leading-none '>{(item.email).length > 30? item.name.slice(0,30)+"..." : item.email}</span></p>
                              <p className='text-md'>Phone: <span className='text-lg leading-none '>{(item.phone).length > 30? item.name.slice(0,30)+"..." : item.phone}</span></p>
                              <p className='text-md'>Query: <span className='text-md leading-none '>{(item.comment).length > 150? item.name.slice(0,30)+"..." : item.comment}</span></p>
                          </div>
                          <div className='flex flex-[1] justify-center items-center flex-col'>
                            <Link><ChevronRight className='w-[40px] h-[40px] border-2 border-[#FFF] rounded-[5px]'/></Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div>hiii</div>
                  )
                }
              </div>
            ) 
          }
        </div>
      </div>
    </div>
  )
}
