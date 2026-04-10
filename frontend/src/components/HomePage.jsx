import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './elements/NavBar'
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

  const[AllCatagory, setAllCatagory]=useState([])
  const[Banners,setBanners] = useState([])


  useEffect(() => {
      GetAllCatagory();
      getBanners();
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


      const Image1 = "https://th.bing.com/th/id/OIP.RmldSfev8EynQNF1x-MWqAHaEK?w=319&h=180&c=7&r=0&o=7&pid=1.7&rm=3";
      const Image2 = "/Banner/Banner2.png";
      const Image3 = "/Banner/Banner3.png";


  return (
    <div className='flex flex-col min-h-Screen w-full'>
    {
      Banners && Banners.length>0 ? (
        <Swiper className='relative w-full aspect-[10/4] my-0 items-end overflow-hidden' style={{marginBottom:5}}
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1} 
        pagination = {{ clickable: true }}
        autoplay = {{delay:2000}}
        speed={1000}
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
        <div className='flex w-[90%] my-10 aspect-[10/3] border-2 border-[#0f0] rounded-[20px] self-center'>
        </div>
      </div>


      {/* Top product Section */}


    </div>
  )
}

export default HomePage