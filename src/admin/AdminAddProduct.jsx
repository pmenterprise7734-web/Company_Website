import React, { useState } from 'react'
import { TextField, Select, MenuItem, InputLabel } from '@mui/material'
import { BadgePlus } from 'lucide-react';


export default function AdminAddProduct() {

  const[Name,setName] = useState("")
  const[Capacity,setCapacity] = useState("")
  const[Catagory, setCatagory] = useState("")
  const[CompanyName, setCompanyName] = useState("")
  const[PanSize,setPanSize] = useState("")
  const[Accuracy,setAccuracy] = useState("")
  const[Description,setDescription] = useState("")
  const[Img, setImg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqKhl0i-yIbhEa_Qejs3pD056MhjETa0TVw&s")
  const[Model, setModel] = useState("")

  const onSubmit = () => {
    const Time = Date.now()
    const Model = "P" + CompanyName.slice(0,1) + Catagory.slice(0,2) + Time.toString().slice(-5)
    setModel(Model)
    sendData(Model)
  }

  const sendData = async(Model) => {
    const Response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/addProduct`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Name,
        capacity: Capacity,
        catagory: Catagory,
        company: CompanyName,
        pansize: PanSize,
        accuracy: Accuracy,
        desc: Description,
        picture:Img,
        model:Model,
      })
    })
  }

  


  return (
    <div className='flex flex-col min-h-screen w-full'>
      <p className='text-[25px] text-[#000] self-center p-5'>Enter product Details:</p>
      <div className='flex flex-row justify-center'>
        <div className='flex flex-col h-[70vh] w-[70vw] border-2 border-[#d4d4d4] rounded-[15px] justify-center items-center px-10'>

          <div className='flex flex-row w-full items-center justify-between'>
            <TextField id="outlined-basic" label="Product Name" variant="outlined" sx={{width:"65%", '& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}} 
              onChange={(e) => {setName(e.target.value)}} />
            <TextField id="outlined-basic" label="Capacity" variant="outlined" sx={{width:'30%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}}
              onChange={(e) => {setCapacity(e.target.value)}}
            /> 
          </div>

          <div className='flex flex-row w-full items-center justify-between pt-5'>
            <TextField select label="Company Name" value={CompanyName} sx={{width:'23%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}}
              onChange={(e) => {setCompanyName(e.target.value)}}>
              <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
              <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
            </TextField>
            <TextField select label="Catagory" value={Catagory} sx={{width:'23%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}} 
              onChange={(e) => {setCatagory(e.target.value)}}>
              <MenuItem value={"TT"}>Table Top</MenuItem>
              <MenuItem value={"PF"}>Platform</MenuItem>
              <MenuItem value={"HS"}>Hanging Scale</MenuItem>
            </TextField>
            <TextField id="outlined-basic" label="PanSize" variant="outlined" sx={{width:'23%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}}
              onChange={(e) => {setPanSize(e.target.value)}}
            />
            <TextField id="outlined-basic" label="Accuracy" variant="outlined" sx={{width:'23%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}}
              onChange={(e) => {setAccuracy(e.target.value)}}
            />
          </div>

          <div className='flex flex-row w-full items-center justify-between pt-5'>
            <TextField id="outlined-multiline-static" label="Product Description" multiline minRows={5} variant="outlined" sx={{width:'65%','& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}}
              onChange={(e) => {setDescription(e.target.value)}}
            />
            <div className='flex h-[150px] w-[20vw] bg-[#000] rounded-[10px] justify-center items-center cursor-pointer'>
              <BadgePlus className='text-[#fff]' size={50} />
            </div>
          </div>

        </div>
      </div>
      <div className='flex h-[50px] w-[200px] bg-[#0a8a0c] self-end m-5 rounded-[10px] justify-center self-center items-center cursor-pointer hover:scale-110 duration-200' onClick={() => {onSubmit()}}>
        <p className='text-[#FFF] text-[20px]'>Submit</p>
      </div>
    </div>
  )
}
