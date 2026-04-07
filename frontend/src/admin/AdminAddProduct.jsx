import React, { useEffect, useState, useRef } from 'react'
import { TextField, Select, MenuItem, InputLabel } from '@mui/material'
import { BadgePlus, ImagePlus } from 'lucide-react';
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'


export default function AdminAddProduct() {

  const[Name,setName] = useState("")
  const[Capacity,setCapacity] = useState("")
  const[Catagory, setCatagory] = useState("")
  const[CompanyName, setCompanyName] = useState("")
  const[PanSize,setPanSize] = useState("")
  const[Accuracy,setAccuracy] = useState("")
  const[Description,setDescription] = useState("")
  const[PreviewImg, setPreviewImg] = useState("") // Temporary link for image preview
  const[Img, setImg] = useState("")
  const[Model, setModel] = useState("")
  const[UploadingImg, setUploadingImg] = useState(false) // To make the system wait untill image is fully uploaded
  

  const[AllCatagory, setAllCatagory] = useState([])


  useEffect(() => {
    GetAllCatagory()
  },[])

  const GetAllCatagory = async() => {
        const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/getCatagory`)
        const data = await response.json()
        setAllCatagory(data)
        console.log(data)
    }


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


const inputRef = useRef()
const ImageUploadClick = () => {
  inputRef.current.click()
}


// In the current version the selected Image directly uploads to the storage
    const ImageSelection = async(e) => {
        console.log(e)
        const selectedFile = e.target.files[0]
        setUploadingImg(true)

        if (!selectedFile) {
            setUploadingImg(false)
            alert("Please select an Image")
            return;  
        } 

        //preview for image to be uploaded
        const previewUrl = URL.createObjectURL(selectedFile)
        setPreviewImg(previewUrl)

        const fileRef = ref( storage, `images/${Date.now()}_${selectedFile.name}` )

        try {
            await uploadBytes(fileRef, selectedFile)
            const downloadUrl = await getDownloadURL(fileRef)
            setImg(downloadUrl)
            console.log(downloadUrl)
            setUploadingImg(false)
        } catch (error) {
            console.log("error message: " + error)
            setUploadingImg(false)
            alert("Image Upload unsuccessful")
        }

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
              {
                AllCatagory?.length > 0? (
                  AllCatagory.map((item) => (
                    <MenuItem value={item.value}>{item.catagoryname}</MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>There is nothing to show. Please refresh and try again</MenuItem>
                )
              }
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
              {
                PreviewImg == "" ? 
                (
                    <div className='flex h-full w-full border cursor-pointer items-center justify-center'
                    onClick={ImageUploadClick}>
                        <ImagePlus className='w-10 text-[#17b02b]' />
                    </div>
                ) : (
                    <div className='flex h-full w-full cursor-pointer items-center justify-center'
                    style={{backgroundImage:`url(${PreviewImg})`, backgroundSize:"cover", backgroundPosition:'center'}}
                    onClick={ImageUploadClick}>
                    </div>
                )
              }
            <input type='file' disabled={UploadingImg} ref={inputRef} hidden onChange={ImageSelection} />
            </div>
          </div>

        </div>
      </div>
      <div className={`flex h-[50px] w-[200px] self-end m-5 rounded-[10px] justify-center self-center items-center ${!UploadingImg? "bg-[#2ba31d] cursor-pointer hover:scale-110 duration-300" : "bg-[#757575] cursor-not-allowed"} `}
      onClick={() => {if(!UploadingImg) onSubmit()}}>
        <p className='text-[#FFF] text-[20px]'>Continue</p>
      </div>
    </div>
  )
}
