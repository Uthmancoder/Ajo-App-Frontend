import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState("")
    const navigate = useNavigate()

    const sendDetails = async (ev) => {
        ev.preventDefault()
        if (!email) {
            toast.error("Email is required.");
        } else if (!isValidEmail(email)) {
            toast.error("Invalid email format. Please enter a valid email address.");
        } else {
            try {
                setloading(true);
                const url = "https://ultimate-thrift.onrender.com/user/forgotPassword";
                const data = {
                    email,
                };
                const response = await axios.post(url, data);
                console.log(response.data);
                const userData = response.data.data;
                localStorage.setItem("userData", JSON.stringify(userData));
                toast.success("Password reset link sent successfully.");
                setTimeout(() => {
                    navigate("/forgotPassword");
                }, 3000);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "An error occurred.");
            } finally {
                setloading(false);
            }
        }
    };
    
    function isValidEmail(email) {
        // A basic email format validation using a regular expression.
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        return emailPattern.test(email);
    }
    

    return (
        <div>
            <div className="joinGroup forgot">
                <h1 className="text-light text-center">Enter your email for paassword reset</h1>
                <form style={{ position: "relative", height: "130px" }} className="card col-10 col-sm-8 col-md-6 col-lg-4 mx-auto p-3 joinGroup_card shadow">
                    <input onChange={(ev) => setemail(ev.target.value)} className='form-control' type="email" placeholder='Enter Your Email..'  required />
                    <button type='submit' onClick={sendDetails} style={{ position: "absolute", right: "20px", bottom: "10px" }} className='btn btn joingroup fw-bold w-50 mt-4 ml-auto'>{!loading ? (
                        "Send"
                    ) : (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SendMail;
