import React from 'react'
import logo from "../images/Microfinance.png"

const JoinGroup = () => {
  return (
    <div className='joinGroup  '>
         <div className='card w-25 mx-auto p-3 joinGroup_card'>
            <img src={logo} className='join_logo' alt="" />
     <h5 className='text-light fw-bold mt-3'>Ultimate Microfinance app</h5>
     <h5 className='text-light fw-bold mt-3'>Blue-Shark Thrift</h5>
     <p className='text-light'>9members pack:50000, 8members required  </p>
     <button className='btn btn-light'>Join Thrift</button>
         </div>
    </div>
  )
}

export default JoinGroup
