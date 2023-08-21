import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AllUsers from "../Redux/AllUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  PostingUser,
  PostingSuccessful,
  PostingFailed,
} from "../Redux/AllUsers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loaddata, setloadData] = useState(true);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchedUser = useSelector((state) => state.AllUsers);

  const signin = async (ev) => {
    ev.preventDefault();

    if (!email || !password || !username) {
      toast.error("Input fields cannot be empty");
    } else {
      setloadData(!loaddata);
      const uri = "http://localhost:3000/user/signin";
      const data = { username, password };
      try {
        dispatch(PostingUser());

        const response = await axios.post(uri, data);
        console.log(response);

        if (response?.data?.status) {
          // show success message
          toast.success("Login successful");

          localStorage.setItem("token", response.data.token);

          // save the userdata to store
          dispatch(PostingSuccessful(response.data.result));

          // Dispatch action to fetch and update user data
          if (remember) {
            fetchUserData();
          }

          // Delayed the time for navigation
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
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
    <div className="signup_div bg-dark py-3">
      <form
        autoComplete={false}
        className="form mx-auto my-2  rounded-3 bg-light shadow"
      >
        <div className="header">Sign In</div>
        <div className="m-3">
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
            className="input form-control w-100"
            type="text"
          />
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

          <a className="forget" href="#">
            Forget password?
          </a>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
