import React from 'react'
import AppNav from './AppNav'
import Sidenav from './Sidenav'

const FundWallet = () => {
  return (
    <div>
       <AppNav/>
       <div className='row w-100'>
   <div className='col-3'>
 <Sidenav/>
   </div>
   <div className='col-9 '>
   <h1 className='text-primary fw-bold text-center'>Fund Wallet</h1>
   
   </div>
       </div>
    </div>
  )
}

export default FundWallet
