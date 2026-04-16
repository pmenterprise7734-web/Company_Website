import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//UserPage
import HomePage from './components/HomePage'
import Catagories from './components/Catagories'
import Gallery from './components/Gallery'
import AboutUs from './components/AboutUs'
import ProductList from './components/ProductList'

//AdminPage
import AdminHome from './admin/AdminHome'
import AdminAddProduct from './admin/AdminAddProduct'
import AdminViewAllCatagories from './admin/AdminViewAllCatagories'
import AdminProductList from './admin/AdminProductList'
import AdminHeroBanner from './admin/AdminHeroBanner'
import AdminTopProducts from './admin/AdminTopProducts'

//NavBar element
import NavBar from './components/elements/NavBar'

//Footer element
import Footer from './components/elements/Footer'


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
          <Route exact path="/ProductList" element={<ProductList/>} />

          <Route exact path="/AdminHome" element={<AdminHome/>} />
          <Route exact path="/AdminAddProduct" element={<AdminAddProduct/>} />
          <Route exact path="/AdminViewAllCatagories" element={<AdminViewAllCatagories/>} />
          <Route exact path="/AdminProductList/:value" element={<AdminProductList/>} />
          <Route exact path="/AdminHeroBanner" element={<AdminHeroBanner/>} />
          <Route exact path="/AdminTopProducts" element={<AdminTopProducts/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}
