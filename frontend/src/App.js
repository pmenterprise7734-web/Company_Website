import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//UserPage
import HomePage from './components/HomePage'
import Catagories from './components/Catagories'
import Gallery from './components/Gallery'
import AboutUs from './components/AboutUs'

//AdminPage
import AdminHome from './admin/AdminHome'
import AdminAddProduct from './admin/AdminAddProduct'
import AdminViewAllCatagories from './admin/AdminViewAllCatagories'
import AdminProductList from './admin/AdminProductList'
import AdminHeroBanner from './admin/AdminHeroBanner'

//NavBar element
import NavBar from './components/elements/NavBar'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/Catagories" element={<Catagories/>} />
          <Route exact path="/Gallery" element={<Gallery/>} />
          <Route exact path="/AboutUs" element={<AboutUs/>} />

          <Route exact path="/AdminHome" element={<AdminHome/>} />
          <Route exact path="/AdminAddProduct" element={<AdminAddProduct/>} />
          <Route exact path="/AdminViewAllCatagories" element={<AdminViewAllCatagories/>} />
          <Route exact path="/AdminProductList" element={<AdminProductList/>} />
          <Route exact path="/AdminHeroBanner" element={<AdminHeroBanner/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
