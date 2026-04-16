import React from 'react'
import { MoveUpRight } from 'lucide-react';

export default function ProductShow({Products, EmptyText}) {
  return (
    <div className='flex flex-row flex-wrap gap-10 my-10 mx-[5%] w-full'>
        {
            Products && Products.length>0 ? (
              Products.map((item) => {
                return(
                  <div key={item._id} className='flex flex-col w-[20%] aspect-[4/5] border-2 border-[#FFB720] rounded-b-[20px]'>
                    <div className='flex flex-col justify-between h-[75%] w-[full] cursor-pointer' style={{backgroundImage:`url(${item.picture})`, backgroundSize:'cover', backgroundPosition:'center'}}
                    onClick={() => {console.log("Link was touched")}}>
                      <div className='flex flex-row w-full justify-end items-start'>
                        <div className='flex flex-col m-2 gap-2'>
                          <p className='text-[#fff] font-medium self-end text-xs px-4 py-1 bg-[rgba(148,148,148,0.78)] rounded-[15px] cursor-default'>{item.pansize}</p>
                          <p className='text-[#FFF] font-medium self-end text-[12px] px-4 py-1 bg-[rgba(255,183,32,0.83)] rounded-[15px] cursor-default'>{item.company}</p>
                        </div>
                      </div>
         
                      <div className='flex flex-col m-2 gap-2 items-end' >
                        <p className='text-[#828282] font-medium italic text-xs px-6 py-1 bg-[#EFEFEF] rounded-[15px] cursor-default'>Accuracy: {item.accuracy}</p>
                        <p className='flex text-[#FFF] font-medium text-[20px] px-6 py-1 bg-[#FFB720] rounded-[15px] items-center cursor-pointer hover:scale-105 duration-200 active:scale-95'
                        onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>enquire <MoveUpRight size={20}/> </p>
                      </div>
        
                            
                    </div>
                          
                    <div className='flex flex-col h-[25%] w-full items-center justify-center'>
                      <div className='flex w-full flex-col justify-center items-center'>
                        <p className='text-[#454443] font-medium text-[16px] text-center my-0'>
                          {
                            (item.name).length > 30? item.name.slice(0,40)+"..." : item.name
                          }
                        </p>
                      </div>
                      <div className='flex flex-row w-full justify-around items-center overflow-hidden py-1'>
                        <p className='text-[10px] text-[#5A5958] px-4 py-1 border border-[rgba(161,161,161,0.4)] rounded-[10px] '>Model: {item.model}</p>
                        <p className='text-[12px] text-[#5A5958] italic px-4 py-1 bg-[#e6e6e6] rounded-full'>{item.capacity}</p>
                      </div>
                    </div>
                  </div>    
                )
              })
            ) : (
              <div>{EmptyText}</div>
            )
        }
    </div>
  )
}
