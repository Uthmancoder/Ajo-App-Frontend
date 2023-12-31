import React, { useState } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import { FaCamera } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import AllUsers from "../Redux/AllUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { addMessage } from "../Redux/messages";
import {incrementUnreadMessages}  from '../Redux/UnreadMessages'


const Settings = () => {
  const navigate = useNavigate();
  const [selectedImage, setselectedImage] = useState(null);
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  console.log(fetchedUser);
  const dispatch = useDispatch();
  const username = fetchedUser?.username;
  const email = fetchedUser?.email;
  const userImage = fetchedUser?.image;
  const isLoading = fetchedUser?.loading;

  // Initialize state variables with user data
  const [Username, setUsername] = useState(username || "");
  const [Email, setEmail] = useState(email || "");
  const [oldPass, setOldPass] = useState("");
  const [Newpass, setNewPass] = useState("");
  const [loaddata, setloadData] = useState(true);

  const uploadImg = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();



    reader.onload = (e) => {
      const dataURL = e.target.result;
      setselectedImage(dataURL);
    };

    reader.readAsDataURL(file);
  };

  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // updating data to be sent to the server
  const updatingData = {
    username: Username,
    email: Email,
    image: selectedImage,
  };

  // updating data for changing password
  const updatePassword = {
    oldpassword: oldPass,
    newPassword: Newpass,
    email: email,
  };



  // saving the user details update 
  const saveChanges = async () => {
    setloadData(!loaddata)
    try {
      const url = "https://ultimate-thrift.onrender.com/user/editProfile";
      const response = await axios.post(url, updatingData);
      console.log(response.data);
      if (response.status === 200) {
        alert(response.data.message);
        // save the message to redux
        const messageDetails = {
          message: response.data.message,
          time: response.data.formattedDateTime
        }
        dispatch(addMessage(messageDetails));
        dispatch(incrementUnreadMessages());
        navigate("/dashboard");
        setTimeout(() => {
          navigate("/dashboard/settings")
        }, 500)
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setloadData(true)
      // Reload the page by navigating to the current location
      navigate(window.location.settings);
    }
  };

  // saving the password update
  const changePassword = async () => {

    try {
      const url = "https://ultimate-thrift.onrender.com/user/changePassword";
      const response = await axios.post(url, updatePassword);
      alert(response.data.message)
      // save the message to redux
      const messageDetails = {
        message: response.data.message,
        time: response.data.formattedDateTime
      }
      dispatch(addMessage(messageDetails));
      dispatch(incrementUnreadMessages());
      navigate("/dashboard");
      setTimeout(() => {
        navigate("/settings")
      }, 500)
    } catch (error) {
      console.log(error.data.message);
      alert(error.data.message)
    }
  };

  return (
    <div>
      <div className=" account_rel">
        <h1 className="fs-2 m-3">
          Account <span className="fs-3 text-secondary">Settings</span>
        </h1>
        <div onChange={uploadImg} className="userProfile mx-auto ">
          <input
            type="file"
            name="upload"
            id="uploadInput"
            style={{ display: "none" }} // Hide the input element
          />
          <label style={{ cursor: "pointer" }} htmlFor="uploadInput">
            <Tooltip title="Upload Image">
              <img
                style={{ width: "100px", height: "100px" }}
                className="img-fluid rounded-circle"
                src={selectedImage || userImage} // Use selectedImage if available, otherwise fallback to the default image
                alt=""
              />
              <FaCamera size={20} className="text-secondary cam" />
            </Tooltip>
          </label>
        </div>

        <div>
          <p className="fs-5 text-secondary text-center mt-4">
            Personal Information{" "}
          </p>

          <div className="col-12 col-lg-10 px-4">
            <div className="row w-100">
              <div className="d-grid text-start col-12 col-sm-6 col-md-6 my-2 text-secondary">
                <label htmlFor="First Name">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={Username}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="d-grid text-start col-12 col-sm-6 col-md-6 my-2 text-secondary">
                <label htmlFor="First Name">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  type="text"
                  className="form-control"
                />
              </div>
              <button
                onClick={saveChanges}
                className="btn btn-primary save m-3 "
                style={{ width: "fit-content" }}
              >
                {loaddata ? (
                  "Save Changes"
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>

              <p className="my-3">Change Password</p>
              <div className="d-grid text-start col-12 col-sm-6 col-md-6 my-2 text-secondary">
                <label htmlFor="First Name">Current Password</label>
                <input
                  onChange={(ev) => setOldPass(ev.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="d-grid text-start col-12 col-sm-6 col-md-6 my-2 text-secondary">
                <label htmlFor="First Name">New Password</label>
                <input
                  onChange={(ev) => setNewPass(ev.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <button
                onClick={changePassword}
                className="btn btn-primary  m-3 save"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Settings;
