import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Modal } from '@mui/material'

export default function Footer() {

  const[form,setForm] = useState({
    name:"",
    company:"",
    address:"",
    state:"",
    country:"",
    email:"",
    phone:"",
    website:"",
    query:""
  })
  const[SubmitModal,setSubmitModal] = useState(false)
  const onCloseModal = () => {setSubmitModal(false)}
  const[Refresh,setRefresh] = useState(false)

  useEffect(() => {},[Refresh])


  const whiteStyles = {
  input: { color: "white", },
  textarea: { color: "white" },
  "& .MuiInputLabel-root": { color: "white" , fontSize:{xs:'16px'}},
  "& .MuiInputLabel-root.Mui-focused": { color: "white" },
  "& .MuiFormLabel-asterisk": { color: "red", fontSize: "18px",},
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#8f8f8f" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#fff" },
  },
};

const onSubmit = async() => {
  if(form.name == ""){
    alert("please enter a valid name.")
    return
  }

  if(form.state == ""){
    alert("please enter your state.")
    return
  }

  if(form.country == ""){
    alert("please enter your country.")
    return
  }

  if(form.email == ""){
    alert("please enter your email.")
    return
  }

  if(form.phone == ""){
    alert("please enter your phone no. for communication.")
    return
  }

  const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/Query/AddQuery`,{
    method:"POST",
    headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name ,
        company:form.company,
        address:form.address,
        state:form.state,
        country:form.country,
        email:form.email,
        phone:form.phone,
        website:form.website,
        comment:form.query, 
        prodquery:false,
      })
  })
  
  if(response.status == 200){
    setSubmitModal(true)
    setRefresh(true)
  }

}


  return (
    <div className='flex flex-col md:flex-row w-full bg-[#0A192F]'>
      <div className='flex w-full md:w-[60%] lg:w-[50%] justify-center items-center'>
        <div className='flex flex-col w-[98%] md:w-[80%] border-2 gap-2 border-[#8f8f8f] px-6 py-6 my-10 rounded-[20px] justify-center items-center'>
          
          <div className='grid grid-cols-6 gap-4 p-2'>
            <TextField label="Name" fullWidth sx={whiteStyles} className='col-span-3' value={form.name} required onChange={(e) => setForm({...form, name:e.target.value})}/>
            <TextField label="Company" fullWidth sx={whiteStyles} className='col-span-3' value={form.company} onChange={(e) => setForm({...form, company :e.target.value})}/>
            <TextField label="Address" fullWidth sx={whiteStyles} className='col-span-6' value={form.address} multiline maxRows={2} onChange={(e) => setForm({...form, address :e.target.value})}/>
            <TextField label="State" fullWidth sx={whiteStyles} className='col-span-3' value={form.state} required onChange={(e) => setForm({...form, state :e.target.value})}/>
            <TextField label="Country" fullWidth sx={whiteStyles} className='col-span-3' value={form.country} required onChange={(e) => setForm({...form, country :e.target.value})}/>
            <TextField label="Email" fullWidth sx={whiteStyles} className='col-span-4' value={form.email} required onChange={(e) => setForm({...form, email :e.target.value})}/>
            <TextField label="Phone" fullWidth sx={whiteStyles} className='col-span-2' value={form.phone} required onChange={(e) => setForm({...form, phone :e.target.value})}/>
            <TextField label="Company Website" fullWidth sx={whiteStyles} className='col-span-6' value={form.website} onChange={(e) => setForm({...form, website :e.target.value})}/>
            <TextField label="Any Query" fullWidth sx={whiteStyles} className='col-span-6' value={form.query} multiline maxRows={3} onChange={(e) => setForm({...form, query :e.target.value})}/>
          </div>

          <p className='py-2 px-6 bg-[#0eb319] rounded-[10px] text-[#FFF] cursor-pointer hover:scale-[1.05] active:scale-[0.95] duration-200' onClick={() => {onSubmit()}}>Submit Query</p>

        </div>
      </div>

      <div className='flex flex-col w-full md:w-[40%] lg:w-[50%] justify-center items-center '>
        <div className='flex flex-row md:flex-col lg:flex-row w-full gap-6 items-center justify-center px-4 md:px-10 '>
          <div className='flex w-[40%] md:w-[80%] lg:w-[40%] aspect-[7/5] rounded-[10px] bg-[#000]' style={{backgroundImage:`url(/Banners/WKLOGO.png)`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
          <div className='flex w-[40%] md:w-[80%] lg:w-[40%] aspect-[7/5] rounded-[10px]' style={{backgroundImage:`url(/Banners/SNTLOGO.png)`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
        </div>
        <div className='flex flex-col w-full items-center px-4 '>
          <Link to={'/'} className='flex w-full my-4 justify-center' >
            <img src='/Logo/PMlogo.png' className='w-[90%] md:w-[100%] lg:w-[70%] rounded-[10px]'/>
          </Link>
          <p className='text-xs md:text-sm lg:text-lg text-[#bfbfbf]'>email: pmenterprise123@gmail.com</p>
          <p className='text-xs md:text-sm lg:text-md text-[#bfbfbf]'>email(alt): office@weightkart.in</p>
          <p className='text-xs md:text-sm lg:text-md mb-6 text-[#bfbfbf]'>contact: +91 96098 89162</p>
        </div>
      </div>


      <Modal open={SubmitModal} onClose={onCloseModal} >
        <div className='flex flex-col min-h-screen w-full gap-4 justify-center items-center' style={{backgroundColor: "rgba(0,255,255,0.8)"}}>
          <div className='flex flex-col justify-center items-center bg-[#FFF] rounded-[20px]'>
            <p className='px-10 py-4 pt-10 text-3xl font-bold text-[#148a12]'>Query Submitted</p>
            <p className='px-16 py-4 pb-10 text-[#148a12]'>You will soon get a callback from PM Enterprise</p>
          </div>
          <p className='text-[#148a12] px-4 py-2 bg-[#FFF] font-bold rounded-[10px] cursor-pointer hover:scale-[1.1] active:scale-[0.95] duration-300' 
          onClick={() => {
            setForm({name: "", company: "", address: "", state: "", country: "", email: "", phone: "", website: "", query: ""});
            onCloseModal()
            }}>OK</p>
        </div>
      </Modal>

    </div>
  )
}
