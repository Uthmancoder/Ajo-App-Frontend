import React, { useState, useEffect, useMemo } from "react";
import Sidenav from "./Sidenav";
import AppNav from "./AppNav";
import AllUsers from "../Redux/AllUsers";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const balance = fetchedUser?.wallet

  return (
    <div>
      <AppNav />
      <div className="w-100  row bg-light">
        <div className="col-12 col-sm-3 co-md-3 d-none d-sm-none d-md-block d-lg-block ">
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 col-md-9  ">
          <h1 className="fw-bolder my-2 mx-3">
            Dashboard <span className="text-secondary fs-3">Control Panel</span>
          </h1>

          <div className="row container ">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2 ">
              <div className="card p-3 bbb text-light ">
                <h4>₦{balance}.00</h4>
                <h4>Account Balance</h4>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className="card p-3 bbb text-light">
                <h4>0</h4>
                <h4>Total Withdrawal</h4>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className="card p-3 bg-primary text-light">
                <h4>0</h4>
                <h4>Connections</h4>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className="card p-3 bg-primary text-light">
                <h4>0</h4>
                <h4>Total Transactions</h4>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className="card p-3 bbb text-light">
                <h4>0</h4>
                <h4>Total Deposits</h4>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <div className=" p-3  text-light">
               <img className="img-fluid w-75" src={require("../images/get.png")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
