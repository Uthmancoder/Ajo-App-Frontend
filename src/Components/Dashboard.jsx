import React, { useState, useEffect, useMemo } from "react";
import Sidenav from "./Sidenav";
import AppNav from "./AppNav";
import { Link } from "react-router-dom";
import AllUsers from "../Redux/AllUsers";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Dashboard = () => {
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const balance = fetchedUser?.user?.wallet;
  const username = fetchedUser?.user?.username;
  const isLoading = fetchedUser?.loading; // Add a loading check

  // getting user's connection from the localstorage
  const connection = localStorage.getItem("usersConnection") || 0

  // getting total transactions
  const TotalTransactions = localStorage.getItem("totalTransactions") || 0

  // getting the  user's total deposits 
  const totalDeposit =  Number(localStorage.getItem("GetUsersDeposit")) || 0

  // After successful signup and login
  useEffect(() => {
    const joinGroupIntent = sessionStorage.getItem("joinGroupIntent") || "";
    if (joinGroupIntent) {
      // User had an intention to join a group
      try {
        const response = axios.post(
          "https://ultimate-thrift.onrender.com/user/addusertogroup",
          { username }
        );
        console.log(response.data);
        // Clear the stored intent
        sessionStorage.removeItem("joinGroupIntent");
        // You can proceed with some action like displaying a success message or updating state
      } catch (error) {
        console.log(error);
        // Handle errors if needed
      }
    }
  }, [username]);

  const totalWithdraws = localStorage.getItem("totalWithdraws") || 0;

  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
        <div className="med">
          <h1 className="fw-bolder my-2 mx-3">
            Dashboard <span className="text-secondary fs-3">Control Panel</span>
          </h1>

          <div className="row container ">
            <Link
              to="account"
              className="col-12 dash col-sm-12 col-md-6 col-lg-6 my-2 "
            >
              <div className="card p-3 bbb text-light ">
                <h4>{Number(balance) > 0 ? `₦ ${balance}` : "0.00"}</h4>
                <h4>Account Balance</h4>
              </div>
            </Link>
            <Link
              to="/dashboard/account"
              className="col-12 dash col-sm-12 col-md-6 col-lg-6 my-2 "
            >
              <div className="card p-3 bbb text-light">
                <h4>{totalWithdraws}</h4>
                <h4>Total Withdrawal</h4>
              </div>
            </Link>
            <Link
              to="groups"
              className="col-12 dash col-sm-12 col-md-6 col-lg-6 my-2 "
            >
              <div className="card p-3 bg-primary text-light">
                <h4>{connection}</h4>
                <h4>Connections</h4>
              </div>
            </Link>
            <Link
              to="/dashboard/groups"
              className="col-12 dash col-sm-12 col-md-6 col-lg-6 my-2 "
            >
              <div className="card p-3 bg-primary text-light">
                <h4>{TotalTransactions}</h4>
                <h4>Total Transactions</h4>
              </div>
            </Link>
            <Link
              to="account"
              className="col-12 dash col-sm-12 col-md-6 col-lg-6 my-2 "
            >
              <div className="card p-3 bbb text-light">
                <h4>{totalDeposit}</h4>
                <h4>Total Deposits</h4>
              </div>
            </Link>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className=" p-3  text-light">
                <img
                  className="img-fluid  googleplay"
                  src={require("../images/get.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
