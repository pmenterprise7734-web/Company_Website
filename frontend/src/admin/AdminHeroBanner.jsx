import React, { useEffect, useRef, useState } from 'react'
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Modal } from '@mui/material'
import { ImagePlus,Trash2 } from 'lucide-react';

export default function AdminHeroBanner() {

    const inputRef = useRef()
    const ImageUploadClick = () => {
        inputRef.current.click()
    }


    const[Banners,setBanners] = useState([])
    const[Reload, setReload] = useState(false);
    const[SelFile, setSelFile] = useState()
    const[PreviewUrl, setPreviewUrl] = useState("")
    const[AddBannerModal, setAddBannerModal] = useState(false)
    const handleOpen = () => {setAddBannerModal(true)}
    const handleClose = () => {setAddBannerModal(false)}



    useEffect(() => {
        getBanners()
    },[Reload])

    const getBanners = async() => {
        const result = await fetch(`http://${process.env.REACT_APP_IPV}:5000/homeBanner/getBanners`)
        const data = await result.json()
        setBanners(data[0].banners)
        console.log(data[0].banners)
    }


    const ImageSelection = (e) => {
        console.log(e)
        const selectedFile = e.target.files[0]

        if(!selectedFile){
            alert("Please select en image")
            return;
        }

        setSelFile(selectedFile)
        const previewUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(previewUrl)        
    }


    const Submit = async() => {
        const fileRef = ref( storage, `banners/${Date.now()}` )

        try{
            await uploadBytes(fileRef, SelFile)
            const downloadUrl = await getDownloadURL(fileRef)
            console.log(downloadUrl)
            SaveImageLinkToDatabase(downloadUrl)
            handleClose()
            setPreviewUrl("")
            setReload(prev => !prev)
        } catch(error) {
            console.log("Message: "+error)
            alert("Image Upload Unsuccessful")
            setReload(prev => !prev)
        }
    }


    const SaveImageLinkToDatabase = async(url) => {
        const result = await fetch(`http://${process.env.REACT_APP_IPV}:5000/homeBanner/addBanner`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                imgUrl: url
            })
        }) 
    } 


    const DeleteBanner = async(url) => {
        const result = await fetch(`http://${process.env.REACT_APP_IPV}:5000/homeBanner/deleteBanner`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                url: url
            })
        })
        setReload(prev => !prev) 
    }






  return (
    <div className='flex flex-col w-full '>
        <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex h-[60px] w-[250px] bg-[#2ba] rounded-[10px] m-5 justify-center items-center cursor-pointer hover:scale-110 duration-200 active:scale-90'>
                <p className='text-[#FFF] font-bold text-xl'>Home Page Banners</p>
            </div>

            <div className='flex h-[50px] w-[200px] bg-[#2ba300] rounded-[10px] m-5 justify-center items-center cursor-pointer hover:scale-110 duration-200 active:scale-90'
            onClick={() => {setAddBannerModal(true)}}>
                <p className='text-[#FFF]'>+ Add New</p>
            </div>
        </div>

        <div className='flex flex-row flex-wrap gap-4 w-full py-10 justify-center'>
            {
                Banners.map((item) => {
                    return(
                        <div className='flex w-[40vw] aspect-[6/3] justify-end' style={{backgroundImage:`url(${item})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                            <div className='flex justify-center items-center h-[40px] aspect-square bg-[#d60000] rounded-full m-5 hover:scale-[1.2] duration-200 active:scale-90 cursor-pointer'
                            onClick={() => {DeleteBanner(item)}}>
                                <Trash2 size={20} color='#FFF'/>
                            </div>
                        </div>
                    )
                })

            }
        </div>


        <Modal open={AddBannerModal} onClose={handleClose} sx={{"& .MuiBackdrop-root": {backgroundColor: "rgba(0, 0, 0, 0.9)"}}}>
            <div className='flex flex-col h-screen w-full justify-center items-center'>
                <div className='flex h-[50%] w-[50%] bg-[#fff] justify-center items-center cursor-pointer' 
                onClick={() => {ImageUploadClick()}}>
                    {
                        PreviewUrl == "" ?  (
                            <ImagePlus className='' size={50} />
                        ) : (
                            <div className='h-full w-full' style={{backgroundImage:`url(${PreviewUrl})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
                        )
                    }
                </div>
                <input type='file' ref={inputRef} hidden onChange={ImageSelection} />
                <div className='flex flex-row gap-4 m-4'>
                    <div className='flex h-[50px] w-[150px] bg-[#f00] justify-center items-center text-[#FFF] font-medium cursor-pointer hover:scale-110 duration-200 active:scale-90'
                    onClick={handleClose}>Cancel</div>
                    <div className='flex h-[50px] w-[150px] bg-[#090] justify-center items-center text-[#fff] font-medium cursor-pointer hover:scale-110 duration-200 active:scale-90'
                    onClick={Submit}>+Add</div>
                </div>
            </div>
        </Modal>



    </div>
  )
}
