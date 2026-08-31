import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Modal, setRef } from '@mui/material'
import { addQuery } from '../../firebase/service/queryService'

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

  const response = await addQuery({
    name: form.name,
    company: form.company,
    address: form.address,
    state: form.state,
    country: form.country,
    email: form.email,
    phone: form.phone,
    website: form.website,
    comment: form.query,
    prodquery: false,
  })
    .then(() => {
      console.log("Enquiry submission successful");
      setSubmitModal(true)
      setRefresh(true)
    })
    .catch(() => {
      console.log("Enquiry submission failed");
      alert("Something went wrong! Please try again Later");
    });

  const Response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
      subject: "🚀 Website Enquiry",
      from_name: "Enquiry Form",

      Sender: `
            Name:${form.name}
            Company:${form.company}
            Address:${form.address}
            State:${form.state}
            Country:${form.country}
            Email:${form.email}
            Phone:${form.phone}
            Website:${form.website}
            Comment:${form.query}
            `,
      product: `Normal Enquiry`,
    }),
  });

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
          <p className='text-sm md:text-md lg:text-lg text-[#bfbfbf]'>email: <a href='mailto:pmenterprise143@gmail.com'>pmenterprise143@gmail.com</a></p>
          <p className='text-sm md:text-md lg:text-lg mb-4 text-[#bfbfbf]'>contact: <a href='tel:+919609889162'>+91 96098 89162</a></p>
          <div className='flex flex-row justify-center items-center w-full mb-4 md:mb-0 gap-2 md:gap-4'>
            <div className='flex h-full'>
              <div className='flex flex-row items-center gap-2'>
                <a href='https://www.facebook.com/share/1BG1itJMn5/' target='_blank'><img src='Logo/FB.png' className='w-[40px] aspect-square '/></a>
                <a href='https://www.instagram.com/pintu.mandal.773124?igsi=NmQwOXh4YzhucGRv' target='_blank'><img src='Logo/Insta.png' className='w-[40px] rounded-[5px] aspect-square '/></a>
                <a href='https://wa.me/919609889162' target='_blank'><img src='Logo/WP.png' className='w-[40px] rounded-[5px] aspect-square '/></a>
              </div>
            </div>
            <div className='flex h-[40px] md:h-full border border-[#f2f2f2]'></div>
            <div className='flex h-full flex-col items-center justify-center gap-[2px]'>
              <p className='text-xs md:text-sm lg:text-md text-[#bfbfbf]'>email(alt): <a href='mailto:office@weightkart.in'>office@weightkart.in</a></p>
              <p className='text-xs md:text-sm lg:text-md text-[#bfbfbf]'>contact(alt): <a href='tel:+919734637734'>+91 97346 37734</a></p>
            </div>
          </div>
          
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
