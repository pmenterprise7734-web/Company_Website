import React, { useState } from 'react'
import { MoveUpRight } from 'lucide-react';
import { Modal, TextField } from '@mui/material';
import { useEffect } from 'react';

export default function ProductShow({Products, EmptyText}) {

  const[enquireModal,setEnquireModal] = useState(false)
  const onCloseEnquireModal = () => setEnquireModal(false)
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
  const[ProdData,setProdData] = useState({
      id:"",
      company:"",
      catagory:"",
      name:"",
      model:"",
      capacity:"",
      pansize:"",
      accuracy:"",
      desc:"",
      picture:"",
      quantity:null,
    })



  const whiteStyles = {
  input: { color: "#242424", },
  textarea: { color: "#242424" },
  "& .MuiInputLabel-root": { color: "#8f8f8f" , fontSize:{xs:'16px'}},
  "& .MuiInputLabel-root.Mui-focused": { color: "#8f8f8f" },
  "& .MuiFormLabel-asterisk": { color: "red", fontSize: "18px",},
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#8f8f8f" },
    "&:hover fieldset": { borderColor: "#14b319" },
    "&.Mui-focused fieldset": { borderColor: "#14b319" },
  },
};

  const Submit = async() => {
    if(ProdData.quantity == null){
      alert("please enter quantity for this product.")
      return
    }
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
          prodquery:true,
          product: ProdData
        })
    })
  
    if(response.status == 200){
      console.log("Data upload complete")
    }
  }

  return (
    <div className='flex flex-row flex-wrap gap-10 my-10 mx-[5%] w-full'>
        {
            Products && Products.length>0 ? (
              Products.map((item) => {
                return(
                  <div key={item._id} className='flex flex-col w-[20%] aspect-[4/5] border-2 border-[#FFB720] rounded-b-[20px]'>
                    <div className='flex flex-col justify-between h-[75%] w-[full] cursor-pointer' style={{backgroundImage:`url(${item.picture})`, backgroundSize:'cover', backgroundPosition:'center'}}
                    onClick={() => {console.log("Link was touched")}}>
                      <div className='flex flex-row w-full justify-end items-start'>
                        <div className='flex flex-col m-2 gap-2'>
                          <p className='text-[#fff] font-medium self-end text-xs px-4 py-1 bg-[rgba(148,148,148,0.78)] rounded-[15px] cursor-default'>{item.pansize}</p>
                          <p className='text-[#FFF] font-medium self-end text-[12px] px-4 py-1 bg-[rgba(255,183,32,0.83)] rounded-[15px] cursor-default'>{item.company}</p>
                        </div>
                      </div>
         
                      <div className='flex flex-col m-2 gap-2 items-end' >
                        <p className='text-[#828282] font-medium italic text-xs px-6 py-1 bg-[#EFEFEF] rounded-[15px] cursor-default'>Accuracy: {item.accuracy}</p>
                        <p className='flex text-[#FFF] font-medium text-[20px] px-6 py-1 bg-[#FFB720] rounded-[15px] items-center cursor-pointer hover:scale-105 duration-200 active:scale-95'
                        onClick={(e) => {
                          e.stopPropagation(); 
                          e.preventDefault(); 
                          setEnquireModal(true);
                          setProdData({...ProdData, id:item._id, company:item.company, catagory:item.catagory, name:item.name, model:item.model, capacity:item.capacity, pansize:item.pansize, accuracy:item.accuracy, desc:item.desc, picture:item.picture })
                          }}>enquire <MoveUpRight size={20}/> </p>
                      </div>
        
                            
                    </div>
                          
                    <div className='flex flex-col h-[25%] w-full items-center justify-center'>
                      <div className='flex w-full flex-col justify-center items-center'>
                        <p className='text-[#454443] font-medium text-[16px] text-center my-0'>
                          {
                            (item.name).length > 30? item.name.slice(0,40)+"..." : item.name
                          }
                        </p>
                      </div>
                      <div className='flex flex-row w-full justify-around items-center overflow-hidden py-1'>
                        <p className='text-[10px] text-[#5A5958] px-4 py-1 border border-[rgba(161,161,161,0.4)] rounded-[10px] '>Model: {item.model}</p>
                        <p className='text-[12px] text-[#5A5958] italic px-4 py-1 bg-[#e6e6e6] rounded-full'>{item.capacity}</p>
                      </div>
                    </div>
                  </div> 
                )
              })
            ) : (
              <div>{EmptyText}</div>
            )
        }

        <Modal open={enquireModal} onClose={onCloseEnquireModal}>
          <div className='flex flex-col h-screen w-full bg-[rgba(0,0,0,0.8)] justify-center items-center'>
            <div className='flex w-[60%] rounded-[20px] bg-[#FFF]'>

              <div className='flex flex-col w-[40%] gap-4 justify-center '>
                <div className='flex flex-col w-[80%] aspect-[4/5] border border-[#FFB720] rounded-b-[20px] mx-auto'>
                    <div className='flex flex-col justify-between h-[75%] w-[full] cursor-pointer' style={{backgroundImage:`url(${ProdData.picture})`, backgroundSize:'cover', backgroundPosition:'center'}}
                    onClick={() => {console.log("Link was touched")}}>
                      <div className='flex flex-row w-full justify-end items-start'>
                        <div className='flex flex-col m-2 gap-2'>
                          <p className='text-[#fff] font-medium self-end text-xs px-4 py-1 bg-[rgba(148,148,148,0.78)] rounded-[15px] cursor-default'>{ProdData.pansize}</p>
                          <p className='text-[#FFF] font-medium self-end text-[12px] px-4 py-1 bg-[rgba(255,183,32,0.83)] rounded-[15px] cursor-default'>{ProdData.company}</p>
                        </div>
                      </div>
                      <div className='flex flex-col m-2 gap-2 items-end' >
                        <p className='text-[#828282] font-medium italic text-xs px-6 py-1 bg-[#EFEFEF] rounded-[15px] cursor-default'>Accuracy: {ProdData.accuracy}</p>
                      </div>
                    </div>
                          
                    <div className='flex flex-col h-[25%] w-full items-center justify-center'>
                      <div className='flex w-full flex-col justify-center items-center'>
                        <p className='text-[#454443] font-medium text-[16px] text-center my-0'>
                          {
                            (ProdData.name).length > 30? ProdData.name.slice(0,40)+"..." : ProdData.name
                          }
                        </p>
                      </div>
                      <div className='flex flex-row w-full justify-around items-center overflow-hidden py-1'>
                        <p className='text-[10px] text-[#5A5958] px-4 py-1 border border-[rgba(161,161,161,0.4)] rounded-[10px] '>Model: {ProdData.model}</p>
                        <p className='text-[12px] text-[#5A5958] italic px-4 py-1 bg-[#e6e6e6] rounded-full'>{ProdData.capacity}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex w-full justify-center items-center'>
                    <TextField label="Qtn." type='number' className='w-[30%] m-auto' sx={whiteStyles} value={ProdData.quantity} required onChange={(e) => setProdData({...ProdData, quantity: e.target.value})}/>
                  </div>
              </div>

              <div className='flex w-[60%]'>
                <div className='grid grid-cols-6 gap-4 p-2 my-4 mx-4'>
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
              </div>
            </div>

            <div className='flex flex-row justify-center gap-6 items-center my-4'>
              <p className='bg-[#c71a1a] text-[#FFF] py-4 px-10 rounded-[10px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]' onClick={onCloseEnquireModal}>Cancel</p>
              <p className='bg-[#14b319] text-[#FFF] py-4 px-10 rounded-[10px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]' onClick={Submit}>Submit Enquiry</p>
            </div>
          </div>
        </Modal>



    </div>
  )
}
