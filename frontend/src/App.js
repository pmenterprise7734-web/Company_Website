import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//UserPage
import HomePage from './components/HomePage'

//AdminPage
import AdminHome from './admin/AdminHome'
import AdminAddProduct from './admin/AdminAddProduct'
import ViewAllCatagories from './admin/ViewAllCatagories'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />

          <Route exact path="/AdminHome" element={<AdminHome/>} />
          <Route exact path="/AdminAddProduct" element={<AdminAddProduct/>} />
          <Route exact path="/ViewAllCatagories" element={<ViewAllCatagories/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
