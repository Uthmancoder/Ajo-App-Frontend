import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { MdGroups, MdAccountBalance } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";

const Sidenav = (props) => {
  const Navigate = useNavigate();
  const LogUserOut = () => {
    alert("logging out");
    localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <div>
      <div className={`bg-dark px-3 user_dashboard sidenav ${props.className}`}>
        <Link to="/dashboard">
          <button className="text-light btn btn-dark w-100 rounded-5 p-3 shadow">
            <BiSolidDashboard style={{ fontSize: "23px" }} /> Dashboard
          </button>
        </Link>
        <Link to="groups">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <MdGroups style={{ fontSize: "25px" }} /> Groups
          </button>
        </Link>
        <Link to="account">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <MdAccountBalance style={{ fontSize: "20px" }} /> Account
          </button>
        </Link>
        <Link to="messages">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <TiMessages style={{ fontSize: "23px" }} /> Notifications
          </button>
        </Link>

        <Link to="settings">
          <button className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow">
            <FiSettings style={{ fontSize: "20px" }} /> Settings
          </button>
        </Link>

        <button
          onClick={LogUserOut}
          className="text-light btn btn-dark w-100 rounded-5 mt-4 p-3 shadow"
        >
          Log out
          <Tooltip title="Logout">
            <span style={{ cursor: "pointer", marginLeft: "8px" }}>
              <BiExit style={{ fontSize: "20px" }} />
            </span>
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
