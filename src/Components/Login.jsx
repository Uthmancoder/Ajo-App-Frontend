import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AllUsers from "../Redux/AllUsers";
import { useDispatch } from "react-redux";
import {
  PostingUser,
  fetchingSuccessful,
  PostingFailed,
} from "../Redux/AllUsers";
import { addMessage } from "../Redux/messages";
import { incrementUnreadMessages } from '../Redux/UnreadMessages'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setusername] = useState("");o
  const [showPassword, setShowPassword] = useState(false);
  const [loaddata, setloadData] = useState(true);
  const [loading, setloading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const fetchingSuccessful = useSelector((state) => state.AllUsers);

  const signin = async (ev) => {
    ev.preventDefault();
  
    if (!email || !password) {
      toast.error("Input fields cannot be empty");
      return;
    } else {
      setloadData(!loaddata);
      const uri = "https://ultimate-thrift.onrender.com/user/signin";
      const data = { email, password };
  
      try {
        dispatch(PostingUser());
        const response = await axios.post(uri, data);
        console.log(response);
  
        if (response?.data?.status) {
          // show success message
          toast.success(`Welcome ${response.data.userData.username}`);
  
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("Username", response.data.userData.username);
  
          // save the userdata to the store
          dispatch(fetchingSuccessful(response.data.userData));
  
          // save the message to redux
          const messageDetails = {
            message: response.data.message,
            time: response.data.userData.formattedDateTime,
          };
          dispatch(addMessage(messageDetails));
          dispatch(incrementUnreadMessages());
  
          // delayed the time for navigation
          const delayedNavigation = async () => {
            // Check for joinIntent in sessionStorage
            const joinIntent = sessionStorage.getItem("groupname");
  
            if (joinIntent) {
              // If joinIntent exists, ask the user for confirmation
              const shouldJoinGroup = window.confirm("Do you want to join the group?");
  
              if (shouldJoinGroup) {
                // If the user confirms, send a request to join the group
                const username = response.data.userData.username;
                const groupname = joinIntent;
  
                try {
                  const joinGroupResponse = await axios.post("https://ultimate-thrift.onrender.com/user/addusers", {
                    username,
                    groupname,
                  });
  
                  if (joinGroupResponse.data.status === true) {
                    // If successfully joined the group, show a success message
                    toast.success(joinGroupResponse.data.message);
  
                    // Remove the joinIntent from sessionStorage
                    sessionStorage.removeItem("groupname");
  
                    // Navigate the user to the dashboard/groups route
                    navigate("/dashboard/groups");
                  } else {
                    // If there was an issue joining the group, show an error message
                    toast.error(joinGroupResponse.data.message);
                  }
                } catch (joinGroupError) {
                  console.error(joinGroupError);
                  // Handle any errors that may occur during the join group process
                  toast.error("An error occurred while joining the group");
                }
              } else {
                // If the user chooses not to join the group, navigate to the dashboard
                navigate("/dashboard");
              }
            } else {
              // If there's no joinIntent, simply navigate to the dashboard
              navigate("/dashboard");
            }
          };
  
          setTimeout(delayedNavigation, 2000);
        } else {
          toast(response?.data?.message || "Server error");
          dispatch(PostingFailed("Server error"));
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "An error occurred");
        dispatch(PostingFailed(error));
      } finally {
        setloadData(true); // Hide the loader
      }
    }
  };
  



  const handleClick = () => {
    setRemember(true);
  };

  const toggleShowPassword = (ev) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup_div  py-3">
      <form
        autoComplete={false}
        className="form mx-auto my-2  rounded-3 bg-light shadow"
      >
        <div className="header">Sign In</div>
        <div className="m-3">

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input form-control w-100 mt-3 my-2"
            type="text"
          />
          <div className="password_div">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input form-control w-100 my-2 p-2"
              type={showPassword ? "text" : "password"}
            />
            <button onClick={toggleShowPassword} className="input_type2">
              {showPassword ? <AiFillEyeInvisible /> : <BsFillEyeFill />}
            </button>
          </div>
          <div className="checkbox-container">
            <label className="checkbox">
              <input onChange={handleClick} type="checkbox" id="checkbox" />
            </label>
            <label htmlFor="checkbox" className="checkbox-text">
              Remember me
            </label>
          </div>

          {/* signin button */}
          <button
            className={`sigin-btn ${!remember ? "disabled" : ""}`}
            type="submit"
            onClick={signin}
            disabled={!remember || !loaddata}
          >
            {loaddata ? (
              "Submit"
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>

          {/* end of signin button */}

          <Link to="/sendMail" className="forget text-primary">
            Forget password?
          </Link>
          <p className="signup-link">
            Don't have an account? <Link to="/signup" className="fw-bold mx-2">Sign up</Link>
          </p>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
