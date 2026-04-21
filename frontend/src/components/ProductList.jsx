import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductShow from './elements/ProductShow';
import HeadingButtons from './elements/HeadingButtons';
import { MenuItem, TextField } from '@mui/material';

export default function ProductList() {

    const [SearchParams] = useSearchParams()
    const CValue = SearchParams.get("value")
    const BName = SearchParams.get("bname") 

    // console.log(location.state.value)

    const[Products,setProducts] = useState([])
    const[FilterCompany,setFilterCompany] = useState(BName)

    useEffect(() => {
        window.scrollTo(0, 0);
        CallProductByCatagory()
    },[FilterCompany])


    const CallProductByCatagory = async() => {
        const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/callProductByCatagory/${CValue}`)
        const data = await response.json()
        console.log("Calling data: "+data)
        setProducts(data)
    }


  return (
    <div className='flex flex-col min-h-screen w-full'>
        <div className='flex flex-row justify-between items-end pr-10'>
            <HeadingButtons text="Products"/>

            <TextField select label="company" value={FilterCompany} className='w-[10vw] mt-6'
            onChange={(e) => setFilterCompany(e.target.value)}>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
                <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
            </TextField>

        </div>
        <ProductShow Products={FilterCompany == "All"? Products : Products.filter(p => p.company === FilterCompany) }  EmptyText={"Something went wrong, Nothing to show here."} />
    </div>
  )
}
