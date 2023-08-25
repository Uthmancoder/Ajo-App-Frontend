import React, { useState } from "react";
import logo from "../images/Microfinance.png";
import GroupUsers from "../Redux/GroupUsers";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JoinGroup = () => {
  const [loaddata, setloadData] = useState(true);

  const groupData = JSON.parse(localStorage.getItem("groupdata")) || [];

  console.log(groupData);

  const username = localStorage.getItem("currentUser") || "";

  console.log(username);

  const navigate = useNavigate();

  const handleJoin = async () => {
    setloadData(!loaddata);
    try {
      const response = await axios.post("http://localhost:3000/user/addusers", {
        username,
      });

      console.log(response.data);

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/groups");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorMessage = error.response.data.message; // Access the error message from the server response
        toast.error(errorMessage);
        setTimeout(() => {
          navigate("/groups");
        }, 3000);
        if (error.response.status === 404) {
          sessionStorage.setItem("joinGroupIntent", groupData.groupName);
          // Redirect to signup page
          navigate("/signup");
        }
      }
    } finally {
      setloadData(true); // Hide the loader
    }
  };

  return (
    <div className="joinGroup  ">
      <div className="card col-10 col-sm-8 col-md-6 col-lg-4 mx-auto p-3 joinGroup_card shadow">
        <img src={groupData.groupIcon} className="join_logo" alt="" />
        <h5 className=" fw-bolder fs-3 mt-3 text-center join_header">
          Ultimate Microfinance app
        </h5>
        <h5 className="groupname fw-bold mt-3">{groupData.groupName}</h5>
        <p className="text-uppercase group_Details">
          {groupData.Amount} {groupData.plan}, {groupData.RequiredUsers}{" "}
          required users, pack : {groupData.Total}{" "}
        </p>
        <button
          onClick={handleJoin}
          className="btn btn joingroup  fw-bold w-50 mx-auto"
        >
          {loaddata ? (
            "Join Group"
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JoinGroup;
