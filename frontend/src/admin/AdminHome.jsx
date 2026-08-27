import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Modal } from "@mui/material";

function AdminHome() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  console.log(username, password)

  const[id, setId] = useState("")
  const[pass, setPass] = useState("")

  const whiteStyles = {
    input: { color: "black" },
    textarea: { color: "black" },
    "& .MuiInputLabel-root": { color: "black", fontSize: { xs: "16px" } },
    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
    "& .MuiFormLabel-asterisk": { color: "red", fontSize: "18px" },
    "& .MuiOutlinedInput-root": {
      height:"50px",
      "& fieldset": { borderColor: "#f00" },
      "&:hover fieldset": { borderColor: "#f0f" },
      "&.Mui-focused fieldset": { borderColor: "#00f" },
    },
  };

  useEffect(() => {

  },[username, password])

  if (username !== "PMEnterprise" || password !== "PMEnterprise") {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <div className="flex flex-col w-[30%] items-center rounded-[10px] border border-[#f00] py-6 gap-4">
          <p className="text-[20px] font-semibold">Login</p>
          <TextField label="username" sx={whiteStyles} className="w-[80%]" onChange={(e) => {setId(e.target.value)}}/>
          <TextField label="password" sx={whiteStyles} className="w-[80%]" onChange={(e) => {setPass(e.target.value)}}/>
          <p className="px-6 py-2 bg-[#00f] rounded-[4px] cursor-pointer hover:scale-[1.02] duration-200" 
          onClick={() => {
            sessionStorage.setItem("username", id)
            sessionStorage.setItem("password", pass)
            window.location.reload()
          }}
          >Login</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row flex-wrap min-h-screen w-full justify-center items-center gap-8">
        <Link to={"/AdminViewAllCatagories"}>
          <div className="flex h-[100px] w-[300px] bg-[#2ba31d] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300">
            <p className="text-[#FFF]">View All products</p>
          </div>
        </Link>
        <Link to={"/AdminHeroBanner"}>
          <div className="flex h-[100px] w-[300px] bg-[#2b0000] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300">
            <p className="text-[#FFF]">HomePage Sliding Banners</p>
          </div>
        </Link>
        <Link to={"/AdminTopProducts"}>
          <div className="flex h-[100px] w-[300px] bg-[#261cd9] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300">
            <p className="text-[#FFF]">Top Products</p>
          </div>
        </Link>
        <Link to={"/AdminEnquiryDesk"}>
          <div className="flex h-[100px] w-[300px] bg-[#261cd9] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300">
            <p className="text-[#FFF]">Enquiries</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default AdminHome;
