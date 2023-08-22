import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import LandingPageNav from "./LandingPageNav";
import laptop from "../images/desktop-removebg-preview (1).png";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNav />
      <div className="landing  ">
        <div className="px-5 row container">
          <div className="text-light mt-5 col-12 col-sm-6 col-md-6">
            <p className="fw-bolder all text-light">
              ALL-IN-ONE-THRIFT STORE{" "}
            </p>
            <h1 className="every">Everything you need to manage sales and donations.</h1>
            <ul>
              <li>Easy-To-Use Thrift Pos System</li>
              <li>Integrated Pos System</li>
              <li>Automation Donation collection tools</li>
            </ul>
            <Link to="/signup">
              <button className="btn btn-outline-light m-3">
                Join Us Now <BsArrowRight size={20} />
              </button>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <img className="img-fluid" src={laptop} alt="laptop" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
