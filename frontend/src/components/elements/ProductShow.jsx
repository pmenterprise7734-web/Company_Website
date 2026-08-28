import React, { useState } from 'react'
import { MoveUpRight, MoveRight, Scaling, Focus } from 'lucide-react';
import { Modal, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Package,WeightTilde } from 'lucide-react';

export default function ProductShow({Products, EmptyText}) {

  const isMd = window.innerWidth >= 768;
  const[ConfirmationModal, setConfirmationModal] = useState(false)
  const[enquireModal,setEnquireModal] = useState(false)
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

  const onCloseEnquireModal = () => {
    setEnquireModal(false)
    setForm({...form, name:"", company:"", address:"", state:"", country:"", email:"", phone:"", website:"", query:""})
    setProdData({...ProdData, quantity:null})
  }

  const onCloseConfirmationModal = () => {
    setEnquireModal(false)
    setConfirmationModal(false)
    setForm({...form, name:"", company:"", address:"", state:"", country:"", email:"", phone:"", website:"", query:""})
    setProdData({...ProdData, quantity:null})
  }



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

    const response = await fetch(`https://company-website-cw4n.onrender.com/Query/AddQuery`,{
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
      setConfirmationModal(true)
    }
  }

  return (
    <div className='flex flex-row flex-wrap justify-around md:justify-start md:gap-6 2xl:gap-10 mt-6 md:mx-[5%] w-full'>
        {
            Products && Products.length>0 ? (
              Products.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex flex-col w-[45%] md:w-[23%] 2xl:w-[18%] aspect-[4/6] md:aspect-[4/5] border-2 border-[#FFB720] rounded-[10px] my-2 "
                  >
                    <div
                      className="flex flex-col h-[70%] w-[full] rounded-t-[9px]"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            to left,
                            rgba(0,0,0,0.9) 0%,
                            rgba(0,0,0,0.7) 30%,
                            rgba(0,0,0,0.5) 50%,
                            transparent 65%
                          ),
                          url(${item.picture})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: 'top',
                      }}
                      onClick={() => {
                        console.log("Link was touched");
                      }}
                    >
                      <div className="flex flex-row w-full justify-end items-start">
                        <div className="flex flex-col m-2 md:m-4 gap-2 ">
                          <p className="flex items-center gap-2 text-[#fff] font-medium self-end text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 bg-[#0B1F3A]/60 backdrop-blur-sm border border-[#FFF]/20 rounded-[8px] cursor-default">
                            <Scaling size={isMd? 20:12} color="#FFB720" /> {item.pansize}
                          </p>
                          <p className="text-[#FFF] font-medium self-end text-[10px] md:text-xs px-2 py-1 md:px-4 md:py-2 bg-[#FFB720]/90 backdrop-blur-sm rounded-[6px] cursor-default tracking-wider">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col w-auto self-end justify-end items-start m-2 md:m-4 md:gap-2">
                        <div className="flex flex-row items-center gap-2  border-b border-[#fff]/20 py-1 ">
                          <Focus className="text-[#FFB720]" size={isMd? 20:14} />
                          <div className="flex flex-col ">
                            <p className="text-[8px] text-[#F2F2F2]">
                              ACCURACY
                            </p>
                            <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                              {item.accuracy}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-2 border-b border-[#fff]/20 py-1 ">
                          <WeightTilde className="text-[#FFB720]" size={isMd? 20:14} />
                          <div className="flex flex-col ">
                            <p className="text-[7px] text-[#F2F2F2]">
                              CAPACITY
                            </p>
                            <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                              {item.capacity}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-2 border-[#fff]/20 py-1 ">
                          <Package className="text-[#FFB720]" size={isMd? 20:14} />
                          <div className="flex flex-col ">
                            <p className="text-[6px] text-[#F2F2F2]">MODEL</p>
                            <p className="text-[8px] md:text-[10px] text-[#FFF]">
                              {item.model}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col h-[30%] w-full items-center rounded-b-[9px] justify-center bg-[#0B1F3A] px-3 md:px-4 border-t border-[#FFF]/30">
                      <div className="flex w-full flex-col ">
                        <p className="text-[#FFF] font-medium text-xs md:text-base my-0 leading-relaxed">
                          {item.name.length > 30
                            ? item.name.slice(0, 30) + "..."
                            : item.name}
                        </p>
                        <div className="flex h-[2px] w-8 bg-[#FFB720] mb-1 md:mb-2"></div>
                      </div>
                      {/* <div className='flex flex-row w-full overflow-hidden py-1 justify-around'>
                        <div className='flex flex-row justify-center items-center gap-2 border border-[#fff]/20 py-1 px-2 rounded-[10px]'>
                          <Package className='text-[#FFB720]' size={20} />
                          <div className='flex flex-col '>
                            <p className='text-[6px] text-[#F2F2F2]'>MODEL</p>
                            <p className='text-[10px]  text-[#FFF]'>{item.model}</p>
                          </div>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2 border border-[#fff]/20 py-1 px-2 rounded-[10px]'>
                          <WeightTilde className='text-[#FFB720]' size={20} />
                          <div className='flex flex-col '>
                            <p className='text-[6px] text-[#F2F2F2]'>CAPACITY</p>
                            <p className='text-[10px]  text-[#FFF]'>{item.capacity}</p>
                          </div>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2 border border-[#fff]/20 py-1 px-2 rounded-[10px]'>
                          <Focus className='text-[#FFB720]' size={20} />
                          <div className='flex flex-col '>
                            <p className='text-[6px] text-[#F2F2F2]'>ACCURACY</p>
                            <p className='text-[10px]  text-[#FFF]'>{item.accuracy}</p>
                          </div>
                        </div>
                      </div> */}
                      <div
                        className="group flex flex-row w-full bg-[#FFB720] rounded-[6px] py-1 md:py-2 my-2 cursor-pointer hover:scale-[1.03] duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setEnquireModal(true);
                          setProdData({
                            ...ProdData,
                            id: item._id,
                            company: item.company,
                            catagory: item.catagory,
                            name: item.name,
                            model: item.model,
                            capacity: item.capacity,
                            pansize: item.pansize,
                            accuracy: item.accuracy,
                            desc: item.desc,
                            picture: item.picture,
                          });
                        }}
                      >
                        <p className="flex flex-[3] justify-center items-center tracking-widest text-[10px] md:text-sm">
                          ENQUIRE NOW
                        </p>
                        <div className="flex flex-1 justify-center items-center border-l-2 border-[#000]/40 py-1 md:py-0">
                          <MoveRight className="group-hover:translate-x-2 duration-300" size={isMd? 20:14}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>{EmptyText}</div>
            )
        }
        <Modal open={enquireModal} onClose={onCloseEnquireModal}>
          <div className='flex flex-col h-screen w-full bg-[rgba(0,0,0,0.8)] md:justify-center items-center'>
            <div className='flex h-[80vh] md:h-auto flex-col md:flex-row w-[90%] md:w-[60%] rounded-[4px] bg-[#FFF] px-2 py-6 overflow-y-auto mt-[10px]'>

              <div className='flex flex-col w-full md:w-[40%] gap-4 justify-center '>
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
                    <TextField label="Quantity" type='number' inputProps={{min:1}} className=' w-[80%] m-auto ' sx={whiteStyles} value={ProdData.quantity} required onChange={(e) => setProdData({...ProdData, quantity: e.target.value})}/>
                  </div>
              </div>

              <div className='flex w-full md:w-[60%]'>
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
              <p className='bg-[#c71a1a] text-[#FFF] py-4 px-10 rounded-[4px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]' onClick={onCloseEnquireModal}>Cancel</p>
              <p className='bg-[#14b319] text-[#FFF] py-4 px-10 rounded-[4px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]' onClick={Submit}>Submit Enquiry</p>
            </div>
          </div>
        </Modal>

        <Modal open={ConfirmationModal} onClose={onCloseConfirmationModal}>
          <div className='flex flex-col h-screen w-full bg-[rgba(0,0,0,0.9)] justify-center items-center'>
            <div className='flex w-[90%] flex-col px-6 py-10 md:px-16 bg-[#FFF] rounded-[10px] justify-center items-center my-4'>
              <p className='w-full text-[#14b319] text-center text-2xl my-4 md:my-10 font-bold'>Your Query Has been Submitted Successfully</p>
              <p className='w-full text-[#14b319] text-center'>you'll get a callback from our team soon</p>
            </div>
            <p className='text-[#FFF] bg-[#14b319] py-4 px-8 rounded-[10px] cursor-pointer hover:scale-110 active:scale-90 duration-200' onClick={() => {onCloseConfirmationModal()}}>Ok </p>
          </div>
        </Modal>


    </div>
  )
}
