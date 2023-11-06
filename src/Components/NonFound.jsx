import React from 'react'
import nonfound from "../images/nonFound.png"
import { Link } from 'react-router-dom'

const NonFound = () => {
  return (
    <div>
      <img className="nonFound w-100 h-100 " src={nonfound} alt="nonfound" />
     <Link  to="/">
     <button className='btn btn-primary goback'>Go back to home</button>
     </Link>
    </div>
  )
}

export default NonFound
