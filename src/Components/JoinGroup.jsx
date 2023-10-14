import React, { useState, useEffect } from "react";
import logo from "../images/Microfinance.png";
import GroupUsers from "../Redux/GroupUsers";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JoinGroup = () => {
  const [loaddata, setloadData] = useState(true);
  const [groupData, setGroupData] = useState(null); // Initialize groupData as null

  const navigate = useNavigate();

   // Get the group ID from the URL
   const InviteLink = window.location.href;
   const parts = InviteLink.split('/');
   const groupId = parts[parts.length - 1]; // knowing that  the group ID is the last part of the URL

   useEffect(() => {
     const getGroupData = async () => {
       try {
         // Send a GET request to your server using the groupId as a URL parameter
         const response = await axios.get(`http://localhost:3000/user/getDetails/${groupId}`);
         // Handle the response from the server, which should contain the group data
         console.log('Group Data:', response.data);
         setGroupData(response.data);
       } catch (error) {
         console.error('Error fetching group data:', error);
       }
     }
     getGroupData();
   }, [groupId]);
  console.log("logged Data :", groupData);
  const username = localStorage.getItem("currentUser") || "";

  const handleJoin = async () => {
    setloadData(!loaddata);
    try {
      const response = await axios.post("https://ultimate-thrift.onrender.com/user/addusers", {
        username,
        groupname: groupData.groupDetails.groupName, // Access groupData properties directly
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
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        setTimeout(() => {
          navigate("/groups");
        }, 3000);
        if (error.response.status === 404) {
          sessionStorage.setItem("joinGroupIntent", groupData.groupName);
          navigate("/signup");
        }
      }
    } finally {
      setloadData(true);
    }
  };

  // Check if groupData is still null and show Loading component
  if (groupData === null) { 
    return <Loading />;
  }


  return (
    <div className="joinGroup  ">
      <div className="card col-10 col-sm-8 col-md-6 col-lg-4 mx-auto p-3 joinGroup_card shadow">
        <img src={groupData.groupDetails.groupIcon} className="join_logo" alt="" />
        <h5 className=" fw-bolder fs-3 mt-3 text-center join_header">
          Ultimate Microfinance app
        </h5>
        <h5 className="groupname fw-bold mt-3">{groupData.groupDetails.groupName}</h5>
        <p className="text-uppercase group_Details">
          {groupData.groupDetails.Amount} {groupData.groupDetails.plan}, {groupData.RequiredUsers}{" "}
          required users, pack : {groupData.groupDetails.Total}{" "}
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
