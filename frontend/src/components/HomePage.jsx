import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './elements/NavBar'
import HeadingButtons from './elements/HeadingButtons'
import BrandShow from './elements/BrandShow'
import CatagoryShow from './elements/CatagoryShow'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

function HomePage() {

  const[AllCatagory, setAllCatagory]=useState([])



  useEffect(() => {
      GetAllCatagory()
    },[])
  
    const GetAllCatagory = async() => {
          const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/getCatagory`)
          const data = await response.json()
          setAllCatagory(data)
          console.log(data)
      }


      const Image1 = "https://th.bing.com/th/id/OIP.RmldSfev8EynQNF1x-MWqAHaEK?w=319&h=180&c=7&r=0&o=7&pid=1.7&rm=3";
      const Image2 = "/Banner/Banner2.png";
      const Image3 = "/Banner/Banner3.png";


  return (
    <div className='flex flex-col min-h-Screen w-full'>

      <Swiper className='relative w-full h-[90vh] items-end overflow-hidden' style={{marginBottom:5}}
      modules={[Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1} 
      pagination = {{ clickable: true }}
      autoplay = {{delay:3000}}
      speed={1000}
      effect="fade"
      fadeEffect={{crossFade: true}}
      loop={true}>
        <SwiperSlide>
          <div className='h-full w-full' style={{backgroundImage:`url(${Image1})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full' style={{backgroundImage:`url(${Image2})`}}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full' style={{backgroundImage:`url(${Image3})`}}></div>
        </SwiperSlide>
      </Swiper>

  

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
        <div className='flex mx-[5%] my-10' >
          <div className='flex flex-row overflow-x-auto w-full no-scrollbar'>
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
        </div>
      </div>


    </div>
  )
}

export default HomePage
// backgroundImage:`url(/Banners/Banner2.png)`, backgroundPosition:'center' , backgroundSize:'cover', 


{/* <div className='absolute flex flex-col w-[30%] bottom-[-10%] left-[-5%] aspect-square rounded-full items-start justify-center items-center bg-[#FFF] shadow-2xl shadow-[30px_-20px_30px_rgba(255,255,255,0.2)] '>
          <Link  className=' text-[#FFF] text-xl font-medium bg-[#FFB720] px-12 py-2 rounded-[10px] border border-[#c4c4c4] mb-2'> Explore </Link>
          <Link  className='text-[#000] px-10 py-2 rounded-[10px] bg-[#f2f2f2]'>About Us</Link>
        </div> */}