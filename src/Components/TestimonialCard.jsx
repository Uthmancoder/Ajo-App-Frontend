import React from 'react'

const TestimonialCard = (props) => {
    return (
        <div className='card shadow-lg mx-2  bg-light' style={{backgroundColor : "white"}}>
            <div className=' d-flex align-items-center p-3 bg-transparent flex-column' style={{position : "relative"}}>
                <img className='userImg ' style={{  width: "100px", height: "100px", borderRadius : "100%" }} src={props.image} alt="" />
                <p>{props.text}</p>
                <b>{props.username}</b>
            </div>
        </div>
    )
}

export default TestimonialCard