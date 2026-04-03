import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <Link to="/AdminHome"><div style={{height:500, width:200, backgroundColor:'#000'}}></div></Link>
    </div>
  )
}

export default HomePage