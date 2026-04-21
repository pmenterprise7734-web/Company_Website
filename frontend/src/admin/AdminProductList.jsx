import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HeadingButtons from '../components/elements/HeadingButtons'
import { MoveUpRight, Trash2, SquarePen, Heart } from 'lucide-react'
import { Modal } from '@mui/material'
import AdminAddProduct from './AdminAddProduct'

export default function AdminProductList() {


    const[Refresh, setRefresh] = useState(false)
    const[DeleteProductId, setDeleteProductId] = useState("")
    const[DeleteModal, setDeleteModal] = useState(false)
    const onDeleteModalClose = () => {setDeleteModal(false)}
    const onDeleteModalOpen = () => {setDeleteModal(true)}
    const[Products,setProducts] = useState([])
    const navigate = useNavigate()
    const { value } = useParams()
    // console.log(value)

    useEffect(() => {
        fetchProducts()
    },[Refresh])

    const fetchProducts = async() => {
      const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/getProductbyId/${value}`)
      const data = await response.json()
      setProducts(data)
      console.log(data)
    }


    const DeleteProduct = async(id) => {
      console.log(id)
      const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/deleteProduct/${id}`, {
        method:'POST'
      })
      setRefresh(prev=>!prev)
      console.log(response.status, response.message)
      if (response.status == 200) {
        onDeleteModalClose()
      } else {
        alert("Action Couldn't be completed")
      }
    }

    const AddToFavorite = async(id) => {
      console.log(id)
      const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/product/AddtoFavorite/${id}`, {
        method:"POST"
      })

      console.log(response.status)
      if(response.status == 200){
        setRefresh(prev=>!prev)
      }
      else{
        alert("Something went wrong. Please try again later")
      }
    }



    

  return (
    <div className='flex flex-col min-h-screen min-w-screen'>
      <HeadingButtons text={"Products"} />
      <div className='flex flex-wrap w-[80%] mx-20 my-5 gap-6'>
      
        {
          Products && Products.length>0 ? (
            Products.map((item) => {
              return(
                <div className='flex flex-col w-[30%] aspect-[4/5] border-2 border-[#FFB720] rounded-b-[20px]'>
                  
                  <div className='flex flex-col justify-between h-[75%] w-[full] cursor-pointer' style={{backgroundImage:`url(${item.picture})`, backgroundSize:'cover', backgroundPosition:'center'}}
                  onClick={() => {console.log("Link was touched")}}>
                    <div className='flex flex-row w-full justify-between items-start'>
                      <p className={`text-xl p-2 ${item.favorite? "text-[#FFF] bg-[#06cf06]" : "text-[#06cf06] bg-[#FFF]"} m-2 rounded-full justify-start hover:scale-110 active:scale-90 duration-200`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        AddToFavorite(item._id)
                      }}><Heart/></p>
                      <div className='flex flex-col m-2 gap-2'>
                        <p className='text-[#fff] font-medium self-end text-md px-4 py-1 bg-[rgba(148,148,148,0.78)] rounded-[15px] cursor-default'>{item.pansize}</p>
                        <p className='text-[#FFF] font-medium self-end text-[12px] px-4 py-1 bg-[rgba(255,183,32,0.83)] rounded-[15px] cursor-default'>{item.company}</p>
                      </div>
                    </div>

                    <div className='flex flex-col m-2 gap-2 items-end' >
                      <p className='text-[#828282] font-medium italic text-[12px] px-2 py-2 bg-[#EFEFEF] rounded-full hover:scale-110 duration-200 active:scale-95' 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        e.preventDefault();
                        navigate("/AdminAddProduct", { state:{name:item.name, capacity:item.capacity, catagory:item.catagory, companyname:item.company, pansize:item.pansize, accuracy:item.accuracy, description:item.desc, img:item.picture, model:item.model, id:item._id}})
                        }}><SquarePen size={25}/></p>
                      <p className='flex text-[#FFF] font-medium text-[20px] px-2 py-2 bg-[#F00] rounded-full items-center cursor-pointer hover:scale-110 duration-200 active:scale-95'
                      onClick={(e) => {e.stopPropagation(); e.preventDefault(); setDeleteProductId(item._id); setDeleteModal(true)}}><Trash2 size={25}/> </p>
                    </div>
 
                    <div className='flex flex-col m-2 gap-2 items-end' >
                      <p className='text-[#828282] font-medium italic text-[12px] px-6 py-1 bg-[#EFEFEF] rounded-[15px] cursor-default'>Accuracy: {item.accuracy}</p>
                      {/* <p className='flex text-[#FFF] font-medium text-[20px] px-6 py-2 bg-[#FFB720] rounded-[15px] items-center cursor-pointer hover:scale-105 duration-200 active:scale-95'
                      onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>enquire <MoveUpRight size={20}/> </p> */}
                    </div>

                    
                  </div>
                  
                  <div className='flex flex-col h-[25%] w-full items-center justify-center'>
                    <p className='text-[#5A5958] font-medium text-[20px] self-center my-2'>{item.name}</p>
                    <div className='flex flex-row w-full justify-around items-center overflow-hidden'>
                      <p className='text-[12px] px-4 py-1 border border-[rgba(161,161,161,0.4)] rounded-[10px] '>Model: {item.model}</p>
                      <p className='text-[14px] italic px-4 py-1 bg-[#e6e6e6] rounded-full'>{item.capacity}</p>
                    </div>
                  </div>

                </div>
              )
            })
          ) : (
            <p className='text-[#000]'>No products here or Internal Issue. Sorry there is nothing to Show</p>
          )
        }

      </div>

      <Modal open={DeleteModal} onClose={onDeleteModalClose} sx={{"& .MuiBackdrop-root": {backgroundColor: "rgba(0, 0, 0, 0.7)"}}}>
        <div className='flex min-h-screen w-full justify-center items-center '>
          <div className='flex flex-col gap-4'>
            <p className='text-[#000] px-16 py-8 rounded-[10px] bg-[#FFF]'>Are you sure you want to delete this item?</p>
            <div className='flex flex-row justify-center items-center gap-6'>
              <p className='text-[#FFF] px-8 py-2 rounded-[5px] bg-[#06cf06] cursor-pointer hover:scale-110 duration-200 active:scale-95'
              onClick={() => {onDeleteModalClose()}}>NO</p>
              <p className='text-[#FFF] px-8 py-2 rounded-[5px] bg-[#e62020] cursor-pointer hover:scale-110 duration-200 active:scale-95'
              onClick={() => {DeleteProduct(DeleteProductId)}}>YES</p>
            </div>
          </div>
        </div>
      </Modal>


    </div> 
  )
}
