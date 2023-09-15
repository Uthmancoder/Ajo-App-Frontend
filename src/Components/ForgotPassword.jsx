import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const otp = localStorage.getItem("Otp") ||""
  const Navigate = useNavigate()
  const [OTP, setOTP] = useState(["", "", "", ""]); // An array to store OTP digits
  const inputRef = useRef([null, null, null, null]); 

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    // Updating the OTP array with the entered value
    const UpdatedOtp = [...OTP];
    UpdatedOtp[index] = value;
    setOTP(UpdatedOtp);

    // Moving focus to the next input field if the value is not empty
    if (value !== "" && index < OTP.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const verifyCode=(ev)=>{
    ev.preventDefault()
    const FullOtp =  OTP.join("");
    if(Number(FullOtp) !== Number(otp)){
       alert("Invalid activation number, the code you entered is not correct check your email for the correct code")
    }
    else{
      Navigate("/login")
    }
  }
    return (
      <div className="joinGroup">
        <img
          className="logo"
          src={require("../images/Microfinance.png")}
          alt=""
        />
        <div className="row container">
          <h1 className="text-secondary d-flex align-items-center justify-content-center text-center col-12 gap-6 col-sm-12 col-md-6 ">
            Forgotten password ??, No issues you can actually reset your
            password wthout ease
          </h1>
          <form
            action=""
            className="col-12 col-sm-12  col-md-6  mx-auto mt-5 shadow  rounded-3  border p-5 w-fit-content h-fit-content"
          >
            <h2 className="text-secondary text-center">
              Enter the 4 digit OTP sent to your email address
            </h2>
            <div className="mx-auto inputs_div">
              {OTP.map((digit, index) => (
                <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"  // Change the input type to "text"
                inputMode="numeric"  // Set input mode to "numeric"
                className="passwordinputs fs-3 m-2"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={1} // Allow only one digit per input
                style={{ WebkitAppearance: "none" }}  // Remove increment and decrement buttons in webkit-based browsers
              />
              
              ))}
            </div>

           <div className=" verify_div mx-auto">
           <button onClick={verifyCode} className="btn btn-secondary fs-5  mt-3 px-4 rounded-5">Verify</button>
           </div>
          </form>
        </div>
      </div>
    );
  
};

export default ForgotPassword;
