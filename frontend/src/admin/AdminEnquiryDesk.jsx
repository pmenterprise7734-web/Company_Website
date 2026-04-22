import React, { useEffect, useState } from 'react'

export default function AdminEnquiryDesk() {

  const[AllQueries, setAllQueries] = useState([])

  useEffect(() => {
    CallQueryData()
  },[])

  const CallQueryData = async() => {
    const response = await fetch(`http://${process.env.REACT_APP_IPV}:5000/Query/getAllQuery`)
    const data = await response.json()
    setAllQueries(data)
    console.log(data)
  }



  return (
    <div className='flex flex-row'></div>
  )
}
