import React, { useState } from 'react'
import { MoveUpRight, MoveRight, Scaling, Focus, Package,WeightTilde } from 'lucide-react';
import { Modal, TextField } from '@mui/material';
import { useEffect } from 'react';
import {addQuery} from '../../firebase/service/queryService'
import {
  PersonOutline,
  BusinessCenterOutlined,
  LocationOnOutlined,
  PublicOutlined,
  EmailOutlined,
  PhoneOutlined,
  LanguageOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";

import useWeb3Forms from "@web3forms/react"

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

    const response = await addQuery({
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
    }).then(() => {
      console.log("Enquiry submission successful")
      setConfirmationModal(true)
    }).catch(() => {
      console.log("Enquiry submission failed")
      alert("Something went wrong! Please try again Later")
    })

    const Response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
          subject: "🚀 Website Enquiry",
          from_name: "Enquiry Form",

          Sender:`
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
          product: `
            Product Name: ${ProdData.name}
            Model: ${ProdData.model}
            Capacity: ${ProdData.capacity}
            Product Company: ${ProdData.company}
            Pan Size: ${ProdData.pansize}
          `
        })
      }
    )
  }

  return (
    <div className="flex flex-row flex-wrap justify-around md:justify-start md:gap-6 2xl:gap-10 mt-6 md:mx-[5%] w-full">
      {Products && Products.length > 0 ? (
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
                  backgroundPosition: "top",
                }}
                onClick={() => {
                  console.log("Link was touched");
                }}
              >
                <div className="flex flex-row w-full justify-end items-start">
                  <div className="flex flex-col m-2 md:m-4 gap-2 ">
                    <p className="flex items-center gap-2 text-[#fff] font-medium self-end text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 bg-[#0B1F3A]/60 backdrop-blur-sm border border-[#FFF]/20 rounded-[8px] cursor-default">
                      <Scaling size={isMd ? 20 : 12} color="#FFB720" />{" "}
                      {item.pansize}
                    </p>
                    <p className="text-[#FFF] font-medium self-end text-[10px] md:text-xs px-2 py-1 md:px-4 md:py-2 bg-[#FFB720]/90 backdrop-blur-sm rounded-[6px] cursor-default tracking-wider">
                      {item.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col w-auto self-end justify-end items-start m-2 md:m-4 md:gap-2">
                  <div className="flex flex-row items-center gap-2  border-b border-[#fff]/20 py-1 ">
                    <Focus className="text-[#FFB720]" size={isMd ? 20 : 14} />
                    <div className="flex flex-col ">
                      <p className="text-[8px] text-[#F2F2F2]">ACCURACY</p>
                      <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                        {item.accuracy}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 border-b border-[#fff]/20 py-1 ">
                    <WeightTilde
                      className="text-[#FFB720]"
                      size={isMd ? 20 : 14}
                    />
                    <div className="flex flex-col ">
                      <p className="text-[7px] text-[#F2F2F2]">CAPACITY</p>
                      <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                        {item.capacity}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 border-[#fff]/20 py-1 ">
                    <Package className="text-[#FFB720]" size={isMd ? 20 : 14} />
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
                <div
                  className="group flex flex-row w-full bg-[#FFB720] rounded-[6px] py-1 md:py-2 my-2 cursor-pointer hover:scale-[1.03] duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setEnquireModal(true);
                    setProdData({
                      ...ProdData,
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
                    <MoveRight
                      className="group-hover:translate-x-2 duration-300"
                      size={isMd ? 20 : 14}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>{EmptyText}</div>
      )}


      <Modal open={enquireModal} onClose={onCloseEnquireModal}>
        <div className="flex flex-col h-screen w-full bg-[rgba(0,0,0,0.8)] md:justify-center items-center py-4">
          <div className="flex flex-col md:flex-row w-[90%] md:w-[70%] overflow-y-scroll no-scrollbar rounded-[4px] p-2 md:p-4 bg-[#FFF]">

            {/* LeftSide */}
            <div className="flex flex-col w-full md:w-[40%] gap-4 md:overflow-y-scroll p-2 md:p-4 no-scrollbar">

              {/* Enquiry Text */}
              <div className="">
                <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold text-[#0B1F3A]">
                  Enquiry Form
                </h2>
                <div className="w-16 h-1 bg-[#F4B63D] mt-2 rounded-full"></div>
                <p className="text-xs 2xl:text-sm text-[#7d7d7d] mt-2">
                  Fill in your details and we will get back to you shortly.
                </p>
              </div>

              {/* Image Section */}
              <div className="flex flex-col w-[100%] border border-[#FFB720] rounded-[10px]">
                <div
                  className="flex flex-col w-full aspect-[4/3] rounded-t-[9px]"
                  style={{
                    backgroundImage: `
                          linear-gradient(
                            to left,
                            rgba(0,0,0,0.9) 0%,
                            rgba(0,0,0,0.7) 30%,
                            rgba(0,0,0,0.5) 50%,
                            transparent 65%
                          ),
                          url(${ProdData.picture})
                        `,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                  onClick={() => {
                    console.log("Link was touched");
                  }}
                >
                  <div className="flex flex-row w-full justify-end items-start">
                    <div className="flex flex-col m-4 gap-2 ">
                      <p className="flex items-center gap-2 text-[#fff] font-medium self-end text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 bg-[#0B1F3A]/60 backdrop-blur-sm border border-[#FFF]/20 rounded-[8px] cursor-default">
                        <Scaling size={isMd ? 20 : 12} color="#FFB720" />{" "}
                        {ProdData.pansize}
                      </p>
                      <p className="text-[#FFF] font-medium self-end text-[10px] md:text-xs px-2 py-1 md:px-4 md:py-2 bg-[#FFB720]/90 backdrop-blur-sm rounded-[6px] cursor-default tracking-wider">
                        {ProdData.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-auto self-end justify-end items-start m-4 md:gap-2">
                    <div className="flex flex-row items-center gap-2  border-b border-[#fff]/20 py-1 ">
                      <Focus className="text-[#FFB720]" size={isMd ? 20 : 14} />
                      <div className="flex flex-col ">
                        <p className="text-[8px] text-[#F2F2F2]">ACCURACY</p>
                        <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                          {ProdData.accuracy}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 border-b border-[#fff]/20 py-1 ">
                      <WeightTilde
                        className="text-[#FFB720]"
                        size={isMd ? 20 : 14}
                      />
                      <div className="flex flex-col ">
                        <p className="text-[7px] text-[#F2F2F2]">CAPACITY</p>
                        <p className="text-[10px] md:text-xs font-semibold tracking-wide text-[#FFF]">
                          {ProdData.capacity}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 border-[#fff]/20 py-1 ">
                      <Package
                        className="text-[#FFB720]"
                        size={isMd ? 20 : 14}
                      />
                      <div className="flex flex-col ">
                        <p className="text-[6px] text-[#F2F2F2]">MODEL</p>
                        <p className="text-[8px] md:text-[10px] text-[#FFF]">
                          {ProdData.model}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center my-2'>
                  <p className="text-[#FFF] font-medium text-xs md:text-base my-0 leading-relaxed text-black">
                    {ProdData.name.length > 30
                      ? ProdData.name.slice(0, 30) + "..."
                      : ProdData.name}
                  </p>
                  <div className="flex h-[2px] w-8 bg-[#FFB720] mb-1 md:mb-2"></div>
                </div>
              </div>
               {/* Quantity Section */}
              <div className="flex">
                <TextField
                  label="Quantity"
                  type="number"
                  inputProps={{ min: 1 }}
                  className=" w-full m-auto "
                  value={ProdData.quantity}
                  required
                  onChange={(e) =>
                    setProdData({ ...ProdData, quantity: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Form */}
            <div className="w-full md:w-[60%] px-2 md:px-4 py-6 md:overflow-y-scroll no-scrollbar md:border-l-2 border-[#FFB720]/40 ">
              {/* Heading */}

              <div className="grid grid-cols-6 md:grid-cols-6 gap-5">
                <TextField
                  label="Name"
                  required
                  fullWidth
                  className="col-span-3 md:col-span-3"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <PersonOutline className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Company"
                  fullWidth
                  className="col-span-3 md:col-span-3"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <BusinessCenterOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Address"
                  fullWidth
                  className="col-span-6 md:col-span-6"
                  value={form.address}
                  multiline
                  maxRows={3}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <LocationOnOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="State *"
                  fullWidth
                  className="col-span-3 md:col-span-3"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <PublicOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Country *"
                  fullWidth
                  className="col-span-3 md:col-span-3"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <PublicOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Email *"
                  fullWidth
                  className="col-span-4 md:col-span-4"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <EmailOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Phone *"
                  fullWidth
                  className=" col-span-2 md:col-span-2"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <PhoneOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Company Website"
                  fullWidth
                  className="col-span-6 md:col-span-6"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <LanguageOutlined className="text-gray-400 mr-2" />
                    ),
                  }}
                />

                <TextField
                  label="Any Query"
                  fullWidth
                  multiline
                  rows={5}
                  className="col-span-6 md:col-span-6"
                  value={form.query}
                  onChange={(e) => setForm({ ...form, query: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <ChatBubbleOutlineOutlined className="text-gray-400 mr-2 self-start mt-2" />
                    ),
                  }}
                />
              </div>
            </div>
          </div>

            {/* buttons */}
          <div className="flex flex-row justify-center gap-6 items-center my-4">
            <p
              className="bg-[#c71a1a]/70 text-[#FFF] py-2 px-6 rounded-[4px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]"
              onClick={onCloseEnquireModal}
            >
              Cancel
            </p>
            <p
              className="flex items-center bg-[#0B1F3A]/40 border border-[#FFF]/30 text-[#FFF] py-2 px-6 rounded-[4px] cursor-pointer hover:scale-[1.05] duration-200 active:scale-[0.95]"
              onClick={Submit}
            >
              Submit Enquiry <MoveUpRight size={20} color='#FFF'/>
            </p>
          </div>
        </div>
      </Modal>

      <Modal open={ConfirmationModal} onClose={onCloseConfirmationModal}>
        <div className="flex flex-col h-screen w-full bg-[rgba(0,0,0,0.9)] justify-center items-center">
          <div className="flex w-[90%] flex-col px-6 py-10 md:px-16 bg-[#FFF] rounded-[10px] justify-center items-center my-4">
            <p className="w-full text-[#14b319] text-center text-2xl my-4 md:my-10 font-bold">
              Your Query Has been Submitted Successfully
            </p>
            <p className="w-full text-[#14b319] text-center">
              you'll get a callback from our team soon
            </p>
          </div>
          <p
            className="text-[#FFF] bg-[#14b319] py-4 px-8 rounded-[10px] cursor-pointer hover:scale-110 active:scale-90 duration-200"
            onClick={() => {
              onCloseConfirmationModal();
            }}
          >
            Ok{" "}
          </p>
        </div>
      </Modal>
    </div>
  );
}
