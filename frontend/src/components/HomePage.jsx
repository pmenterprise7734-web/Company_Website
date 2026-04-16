import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeadingButtons from './elements/HeadingButtons'
import BrandShow from './elements/BrandShow'
import CatagoryShow from './elements/CatagoryShow'

import { MoveUpRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

function HomePage() {

  const[TopProdData,setTopProdData] = useState([])
  const[AllCatagory, setAllCatagory]=useState([])
  const[Banners,setBanners] = useState([])


  useEffect(() => {
      GetAllCatagory();
      getBanners();
      CallData();
    },[])
  
    const GetAllCatagory = async() => {
          const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/getCatagory`)
          const data = await response.json()
          setAllCatagory(data)
          console.log(data)
      }

    const getBanners = async() => {
        const result = await fetch(`http://${process.env.REACT_APP_IPV}:5000/homeBanner/getBanners`)
        const data = await result.json()
        setBanners(data[0].banners)
        console.log(data[0].banners)
    }

    const CallData = async() => {
      const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/callTopProducts`)
      const data = await response.json()
      console.log(data)
      setTopProdData(data)
    }


  return (
    <div className='flex flex-col min-h-Screen w-full'>
    {
      Banners && Banners.length>0 ? (
        <Swiper className='relative w-full aspect-[12/5] my-0 items-end overflow-hidden' style={{marginBottom:5}}
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1} 
        pagination = {{ clickable: true }}
        autoplay = {{delay:2500}}
        speed={1500}
        effect="fade"
        fadeEffect={{crossFade: true}}
        loop={true}>
          {
            Banners.map((item) => {
                return(
                  <SwiperSlide key={item}>
                    <div className='h-full w-full' style={{backgroundImage:`url(${item})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
                  </SwiperSlide>
                )
              })
          }
      </Swiper>
      ) : (
        <div className='text-[#000] bg-[#FFF] px-20 py-5'>There is nothing To show</div>
      )
    }


      {/* Brands Section */}
      <div className='flex flex-col'>
        <HeadingButtons text='Our Brands'/>
        <div className='flex flex-row flex-wrap w-full justify-center'>
          <BrandShow name='WeightKart' ImgUrl='/Banners/WKLOGO.png'/>
          <BrandShow name='Sonatta' ImgUrl='/Banners/SNTLOGO.png'/>
        </div>
      </div>

      {/* Catagories Section */}
      <div className='flex flex-col bg-[#f5f5f5]'>
        <HeadingButtons text='Catagories'/>
        <div className='flex flex-col items-center mx-[5%] my-10' >
          <div className='flex flex-row overflow-x-auto w-full py-[5px] no-scrollbar'>
            {
              AllCatagory?.map((item) => {
                if (item.status == true){
                  return(
                    <CatagoryShow Name={item.catagoryname} Image={item.picture} Value={item.value} />
                  )
                }
              })
            }            
          </div>
          <p className='flex gap-1 items-center text-[#00000f] text-sm my-8'>we are here to help in your business <p className='flex flex-row items-center text-[#FFB720]'>needs. <MoveUpRight/></p> </p>
        </div>
      </div>


      {/* About Section */}
      <div className='flex flex-col'>
        <HeadingButtons text='About Us'/>
        <div className='flex w-[90%] my-10 aspect-[10/3]  rounded-[20px] self-center' style={{backgroundImage:`url(/Banners/Motivation.png)`, backgroundSize:'cover', backgroundPosition:'center'}}>
        </div>
      </div>


      {/* Top product Section */}
      <div className='flex flex-col bg-[#f5f5f5]'>
        <HeadingButtons text='Top products'/>
        <div className='flex flex-row flex-wrap items-center mx-[5%] my-10 gap-8' >
            {
              TopProdData && TopProdData.length>0 ? (
                TopProdData.map((item) => {
                  return(
                    <div className='flex flex-col w-[20%] aspect-[4/5] border-2 border-[#FFB720] rounded-b-[20px]'>
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
                <div>Sorry There is nothing to show</div>
              )
            }            
          </div>
          <p className='flex gap-1 items-center text-[#00000f] text-sm my-8 self-center'>enjoy our most selling <p className='flex flex-row items-center text-[#FFB720]'>Top Products. <MoveUpRight/></p> </p>
      </div>

    </div>
  )
}

export default HomePage