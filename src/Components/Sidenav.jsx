import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { MdGroups, MdAccountBalance } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";

const Sidenav = () => {
  const Navigate = useNavigate();
  const LogUserOut = () => {
    alert("logging out");
    localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <div>
      <div className="bg-dark px-3 user_dashboard">
        <Link to="/dashboard">
          <button className="text-light btn btn-dark w-100 rounded-5 p-3 shadow">
            <BiSolidDashboard style={{ fontSize: "23px" }} /> Dashboard
          </button>
        </Link>
        <Link to="/groups">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <MdGroups style={{ fontSize: "25px" }} /> Groups
          </button>
        </Link>
        <Link to="/account">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <MdAccountBalance style={{ fontSize: "20px" }} /> Account
          </button>
        </Link>
        <Link to="/messages">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <TiMessages style={{ fontSize: "23px" }} /> Messages
          </button>
        </Link>
        <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
          <FiSettings style={{ fontSize: "20px" }} /> Settings
        </button>
        <button
          onClick={LogUserOut}
          className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
