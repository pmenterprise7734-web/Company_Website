import React, { useEffect, useRef, useState } from 'react'
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {TextField, Modal, Switch} from '@mui/material'
import { ImagePlus, Eye, EyeOff } from 'lucide-react'
import { Link} from 'react-router-dom'



export default function AdminViewAllCatagories() {

    const [Reload, setReload] = useState(false);

    const[AllCatagory, setAllCatagory] = useState([])
    const[CatagoryName, setCatagoryName] = useState("")
    const[CatagoryValue, setCatagoryValue] = useState("")
    const[CatagoryImg, setCatagoryImg] = useState("")
    const[PreviewImg, setPreviewImg] = useState("") // Temporary link for image preview
    const[UploadingImg, setUploadingImg] = useState(false) // To make the system wait untill image is fully uploaded
    const[Active,setActive] = useState(true)

    const[AddModal, setAddModal] = useState(false)
    const handleOpen = () => {setAddModal(true)}
    const handleClose = () => {setAddModal(false); setPreviewImg(""); setCatagoryValue("")}

    const[CatagoryVisibleModal, setCatagoryVisibleModal] = useState(false)
    const[CurrentSelectedCatagory, setCurrentSelectedCatagory] = useState("")
    const[CurrentSelectedCatagoryID, setCurrentSelectedCatagoryID] = useState("")
    const[CurrentSelectedCatagoryStatus, setCurrentSelectedCatagoryStatus] = useState(null)
    const CatagoryVisibleModalOpen = (currentCatagory,ID, status) => {
        setCurrentSelectedCatagory(currentCatagory)
        setCurrentSelectedCatagoryID(ID)
        console.log(CurrentSelectedCatagoryID)
        setCurrentSelectedCatagoryStatus(status)
        setCatagoryVisibleModal(true)
    }
    const CatagoryVisibleModalClose = () => {setCatagoryVisibleModal(false)}


    useEffect(() => {
        GetAllCatagory()
    },[Reload])

    
    // fetching all the catagories that exists under useEffect.
    const GetAllCatagory = async() => {
        const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/getCatagory`)
        const data = await response.json()
        setAllCatagory(data)
        console.log(data)
    }

    // Submit button while adding new catagories
    const Submit = async() => {
        if (!CatagoryName){
            alert("Please select a name")
            return;
        }
        if (!CatagoryValue){
            alert("Please select a Value")
            return;
        }
        if (!CatagoryImg){
            alert("Please select an Image")
            return;
        }
        const result = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/addCatagory`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catagoryname:CatagoryName,
                value:CatagoryValue,
                picture:CatagoryImg,
                status:Active
            })
        })
        console.log(result.message)

        handleClose()
        setReload(prev => !prev)
    }


    // Changing visibily if Owner doesn't want to show some catagories or discontinuing it
    const ChangeVisibility = async() => {
        const visibility = await fetch(`http://${process.env.REACT_APP_IPV}:5000/catagory/changeVisibility`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: CurrentSelectedCatagoryID,
                status:!CurrentSelectedCatagoryStatus,
            })
        })

        const res = visibility.json()
        console.log(res)
        CatagoryVisibleModalClose()
        setReload(prev => !prev)
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
            setCatagoryImg(downloadUrl)
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
        <div className='flex flex-row justify-between'>
            <p className='text-3xl text-[#FFF] mx-10 px-10 py-2 bg-[#17b02b] my-10 rounded-[10px] '>Catagories</p>
            <div className='flex flex-row my-10'>
                <div className='flex h-[60px] w-[200px] bg-[#000] mx-5 justify-center items-center cursor-pointer hover:scale-[1.1] active:scale-[0.9] duration-200 rounded-[10px]' onClick={handleOpen}><p className='text-[#FFF]'>+ Add Catagory</p></div>
                <Link to={"/AdminAddProduct"} className='flex h-[60px] w-[250px] bg-[#000] mx-5 justify-center items-center cursor-pointer hover:scale-[1.1] active:scale-[0.9] duration-200 rounded-[10px]' onClick={''}><p className='text-[#FFF]'>+ Add Product</p></Link>
            </div>
        </div>
        <div className='flex flex-row flex-wrap min-h-screen w-full px-8 py-5 justify-around'>
            {
                AllCatagory?.length > 0 ? (
                    AllCatagory.map((item) => {
                        return(
                            <div key={item._id} className='flex flex-col items-center my-5'>
                                <Link to={"/AdminProductList"} state={{value:item.value, catagoryname:item.catagoryname}} className="flex h-[300px] w-[320px] rounded-[20px] bg-center my-5 bg-cover justify-end cursor-pointer hover:scale-[1.1] duration-200 active:scale-[1]" style={{ backgroundImage: `url(${item.picture})` }}>
                                    <div className='flex flex-row w-[15%] h-[15%] bg-[#000] m-5 rounded-[20px] justify-center items-center cursor-pointer hover:scale-[1.2] duration-200'
                                      title='You can turn off visibility of this catagory' 
                                      onClick={(e) => {
                                        e.stopPropagation();   // stops event bubbling to Link
                                        e.preventDefault();
                                        CatagoryVisibleModalOpen(item.catagoryname, item._id, item.status)}}>
                                        {
                                            item.status == true? <Eye className='text-[#FFF]' size={25}/> 
                                            : <EyeOff className='text-[#FFF]' size={25}/> 
                                        }
                                    </div>
                                </Link>
                                <p className='text-[#000] text-[20px] font-semibold'>{item.catagoryname}</p>
                            </div>
                        )
                    })
                ) : (
                    <div className='flex h-full w-full justify-center'>
                        <p className='px-10 py-5 text-white bg-[#000] rounded-[10px]'>Sorry there is nothing to show</p>
                    </div>
                )
            }
        </div>


        {/* change catagory visibility Modal */}
        {/* change catagory visibility Modal */}
        <Modal open={CatagoryVisibleModal} onClose={CatagoryVisibleModalClose} sx={{"& .MuiBackdrop-root": {backgroundColor: "rgba(0, 0, 0, 0.9)"}}}>
            <div className='flex min-h-screen w-full justify-center items-center'>
                <div className='flex flex-col justify-center items-center border-2 border-[#f2f2f2] rounded-[20px] p-5'>
                    <p className='text-[#000] px-5 py-5 rounded-[20px] bg-[#FFF]'>{CurrentSelectedCatagoryStatus? "Turning off Visibility is restricting This Platform not to show users" : "Turning On Visibility is allowing This Platform to show users"} <span className={`${CurrentSelectedCatagoryStatus? "text-[#f00]" : "text-[#17b02b]"} text-[24px]`}>{CurrentSelectedCatagory}</span> catagory.</p>
                    <div className='flex flex-row justify-around m-5'>
                        <p className={`text-[#fff] px-5 py-2 ${CurrentSelectedCatagoryStatus? "bg-[#f20]" : "bg-[#17b02b]"} rounded-[10px] cursor-pointer hover:scale-[1.2] active:scale-[1.0] duration-100 mx-10`}
                          onClick={() => {ChangeVisibility()}}>{CurrentSelectedCatagoryStatus? "Turn off Visibility" : "Turn on Visibility"}</p>
                        <p className='text-[#000] px-5 py-2 bg-[#fff] rounded-[10px] cursor-pointer hover:scale-[1.2] active:scale-[1.0] duration-100'
                          onClick={CatagoryVisibleModalClose}>cancel</p>
                    </div>
                </div>
            </div>
        </Modal>
        {/* change catagory visibility Modal */}
        {/* change catagory visibility Modal */}
        
        
        {/* Add-Catagory Modal */}
        {/* Add-Catagory Modal */}
        <Modal open={AddModal} onClose={handleClose}>
            <div className='flex min-h-screen justify-center items-center'>
                <div className='flex flex-col h-[55vh] w-[50vw] bg-[#FFF] rounded-[20px]'>

                  <div className='flex flex-row flex-[3] '>
                    <div className='flex flex-[2] flex-col'>
                        <div className='flex flex-col m-10 '>
                            <TextField id="outlined-basic" label="Catagory Name" variant="outlined" sx={{width:"100%",marginY:1, '& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}} 
                              onChange={(e) => {setCatagoryName(e.target.value)}} />
                            <div className='flex flex-row'>
                                <TextField id="outlined-basic" label="Value" variant="outlined" sx={{width:"50%",marginY:1, '& .MuiOutlinedInput-root':{backgroundColor:'#FFF', borderRadius:3, fontSize:16}}} 
                                  onChange={(e) => {setCatagoryValue(e.target.value.toUpperCase())}} slotProps={{input:{inputProps:{maxLength:2}}}} value={CatagoryValue} />
                                <div className='flex flex-row items-center mx-5' title='This allows all the visitors see the catagory'>
                                    <p>Visible:</p>
                                    <Switch checked={Active} onChange={(e) => {setActive(e.target.checked)}} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-1 justify-center items-center'>
                        {
                            PreviewImg == "" ? 
                            (
                                <div className='flex h-[80%] w-[90%] border border-[#000] rounded-[20px] cursor-pointer items-center justify-center'
                                onClick={ImageUploadClick}>
                                    <ImagePlus className='w-10 text-[#17b02b]' />
                                </div>
                            ) : (
                                <div className='flex h-[80%] w-[90%] border border-[#000] rounded-[20px] cursor-pointer items-center justify-center'
                                style={{backgroundImage:`url(${PreviewImg})`, backgroundSize:"cover", backgroundPosition:'center'}}
                                onClick={ImageUploadClick}>
                                </div>
                            )
                        }
                        <input type='file' disabled={UploadingImg} ref={inputRef} hidden onChange={ImageSelection} />
                    </div>
                  </div>


                  <div className='flex flex-[1] flex-row justify-around items-center border-t border-[#c9c9c9]'>
                    <div className='flex h-[70%] w-[30%] bg-[#F00] justify-center items-center rounded-[20px] cursor-pointer hover:scale-110 duration-300' onClick={handleClose}>
                      <p className='text-[#FFF]'>Cancel</p>
                    </div>
                    <div className={`flex h-[70%] w-[30%] justify-center items-center rounded-[20px] ${!UploadingImg? "bg-[#2ba31d] cursor-pointer hover:scale-110 duration-300" : "bg-[#757575] cursor-not-allowed"} `} 
                    onClick={() => { if(!UploadingImg) Submit()}}>
                      <p className='text-[#FFF]'>Submit</p>
                    </div>
                  </div>

                </div>
            </div>
        </Modal>
        {/* Add-Catagory Modal */}
        {/* Add-Catagory Modal */}

    </div>
  )
}
