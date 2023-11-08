import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  const otp = userData?.generatedNum || "";
  console.log(otp);
  const username = userData?.username || "";
  localStorage.setItem("username", username);
  const Navigate = useNavigate();
  const [OTP, setOTP] = useState(["", "", "", ""]); // An array to store OTP digits
  const inputRef = useRef([null, null, null, null]);

  const [loading, setloading] = useState(false)

  // Focusing on the first input immeiately you're landing on the page
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  // Handling OTP input
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

  const verifyCode = (ev) => {
    ev.preventDefault();
    const FullOtp = OTP.join("");
    if(!FullOtp){
       alert("Inputs cannot be empty ")
    }
    if (Number(FullOtp) !== Number(otp)) {
      alert(
        "Invalid activation number, the code you entered is not correct check your email for the correct code"
      );
    } else {
      alert("Code Verification successful!!, consider resetting your password  ")
      setloading(!loading)
      setTimeout(() => {
        Navigate("/resetPassword");
      }, 3000);
    }
  };
  return (
    <div className="joinGroup">
      <img
        className="logo"
        src={require("../images/Microfinance.png")}
        alt=""
      />
      <div className="row container " > 
        <h2 className="text-light text-center">
          Enter the 4 digit OTP sent to your email address
        </h2>
        <form
          action=""
          className="col-12 col-sm-12 joinGroup_card enterOtp col-md-6  mx-auto mt-5 shadow-lg  rounded-3   p-5 w-fit-content h-fit-content"
          style={{position : "relative", height : "180px"}}
        >
          <div className="mx-auto inputs_div">

            {OTP.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                className="passwordinputs fs-3 m-2"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={1}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/, ""); // Allow only digits (remove non-numeric characters)
                }}
                style={{ WebkitAppearance: "none" }}
              />
            ))}
          </div>

          <button
          // style={{position : "absolute", right : "20px", bottom :"10px"}}
            onClick={verifyCode}
            className="btn btn joingroup fw-bold w-50  mt-4 mx-auto"
          >
            Verify
          </button>
        </form>
        {loading ? (
          <div className="loading">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
