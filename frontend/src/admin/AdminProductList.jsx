import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function AdminProductList() {


    const[Products,setProducts] = useState({})

    const location = useLocation()
    console.log(location.state)

    useEffect(() => {
        fetchProducts()
    },[])

    const fetchProducts = async() => {

    }
    

  return (
    <div></div>
  )
}
