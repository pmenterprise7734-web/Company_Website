import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductShow from './elements/ProductShow';
import HeadingButtons from './elements/HeadingButtons';
import { MenuItem, TextField } from '@mui/material';

export default function ProductList() {

    const location = useLocation()
    console.log(location.state.value)

    const[Products,setProducts] = useState([])
    const[FilterCompany,setFilterCompany] = useState("All")
    const[SortBy,setSortBy] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
        CallProductByCatagory()
    },[])


    const CallProductByCatagory = async() => {
        const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/callProductByCatagory/${location.state.value}`)
        const data = await response.json()
        setProducts(data)
    }


  return (
    <div className='flex flex-col min-h-screen'>
        <div className='flex flex-row items-center justify-between'>
            <HeadingButtons text="Products"/>

            <div className='flex w-[40vw] flex-row justify-center gap-6 mt-14'>
                <TextField select label="company" value={FilterCompany} className='w-[10vw] mt-6'
                onChange={(e) => setFilterCompany(e.target.value)}>
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
                    <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
                </TextField>

                <TextField select label="sort by" value={SortBy} className='w-[15vw] mt-6'
                onChange={(e) => setSortBy(e.target.value)}>
                    <MenuItem value={"PHL"}>Price High to Low</MenuItem>
                    <MenuItem value={"PLH"}>Price Low to High</MenuItem>
                    <MenuItem value={"CHL"}>Capacity High to Low</MenuItem>
                    <MenuItem value={"CLH"}>Capacity Low to High</MenuItem>
                </TextField>
            </div>

        </div>
        <ProductShow Products={Products} EmptyText={"Something went wrong, Nothing to show here."} />
    </div>
  )
}