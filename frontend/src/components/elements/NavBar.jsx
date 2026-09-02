import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Menu as MenuIcon, House, Info, Images } from 'lucide-react';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {

  const [anchorEl, setAnchorEl] = useState(null)
  const[scrolled,setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY>80)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])


  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };



  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }



  return (
  <div className='md:fixed z-50 top-0 flex w-full justify-center'>
    <div className={`flex flex-row h-[10vh] md:bg-white/50 md:backdrop-blur-lg justify-between transition-all duration-500 ease-in-out ${scrolled? "md:mt-2 md:w-[85%] md:rounded-[30px] shadow-[0_8px_25px_rgba(0,0,0,0.25)]":" w-full"}`}>
      <div className='flex w-[80%] lg:w-[40%] h-full items-center'>
        <Link to={'/'} className={`h-[90%] transition-all ease-in-out duration-400 ${scrolled? "ml-[12%]":"ml-[5%]"}`}>
          <img src='/Logo/PMlogo.png' className='h-full w-full' />
        </Link>
      </div>

      <div className='flex lg:hidden w-[20%] items-center justify-end '>
        <MenuIcon onClick={handleClick} className='h-8 w-8 mx-6 p-1 cursor-pointer duration-300 active:scale-90 border border-[#090909] rounded-[5px]' />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{sx:{backgroundColor:'#000'}}} >
          <MenuItem onClick={handleClose}>
            <NavLink to={'/'} className={({isActive}) => `flex flex-row h-full w-full gap-2 px-8 py-2 text-[#f2f2f2] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 ":"hover:scale-[1.05] hover:text-[#FFF] hover:bg-[#595959] rounded-[5px]"}`} >
              <House/>
              <p>Home</p>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={'/Catagories'} className={({isActive}) => `flex flex-row h-full w-full gap-2 px-8 py-2 text-[#f2f2f2] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 ":"hover:scale-[1.05] hover:text-[#FFF] hover:bg-[#595959] rounded-[5px]"}`}>
              <MenuIcon/>
              <p>Catagories</p>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={'/AboutUs'} className={({isActive}) => `flex flex-row h-full w-full gap-2 px-8 py-2 text-[#f2f2f2] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 ":"hover:scale-[1.05] hover:text-[#FFF] hover:bg-[#595959] rounded-[5px]"}`}>
              <Info/>
              <p>About Us</p>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={'/Gallery'} className={({isActive}) => `flex flex-row h-full w-full gap-2 px-8 py-2 text-[#f2f2f2] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 ":"hover:scale-[1.05] hover:text-[#FFF] hover:bg-[#595959] rounded-[5px]"}`}>
              <Images/>
              <p>Gallery</p>
            </NavLink>
          </MenuItem>
        </Menu>
      </div>

      <div className={`hidden lg:flex w-[30%] lg:w-[60%] h-full justify-between border-b border-[#c4c4c4] transition-all ease-in-out duration-400 ${scrolled? "bg-[#1B1A1C] backdrop-blur-md rounded-[30px]":"bg-[#1B1A1C] rounded-l-[10px]"} `}>
        <div className='flex flex-row w-[55%] h-full justify-around items-center ml-10'>
            <NavLink to={'/'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`} >Home</NavLink>
            <NavLink to={'/Catagories'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>Catagories</NavLink>
            <NavLink to={'/AboutUs'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>About Us</NavLink>
            <NavLink to={'/Gallery'} className={({isActive}) => `text-[#f2f2f2] hover:scale-110 hover:text-[#FFF] duration-200 cursor-pointer ${isActive? "font-bold underline underline-offset-4 decoration-2 hover:scale-100":""}`}>Gallery</NavLink>
        </div>
        <div className='flex w-[30%] h-full justify-around items-center'>
            <div className='flex justify-center items-center bg-[#FFB720] hover:scale-[1.04] duration-100 rounded-[4px] px-3 py-1 cursor-pointer' onClick={() => {scrollToContact()}}>
                <p className='text-[#fff] font-medium'>contact us</p>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}
