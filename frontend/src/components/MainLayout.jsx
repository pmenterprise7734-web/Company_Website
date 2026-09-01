import React from 'react'
import NavBar from './elements/NavBar'
import Footer from './elements/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <NavBar/>
        <main className='md:mt-[10vh]'>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout