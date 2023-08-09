import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className="background">
        <div className="shadow"></div>
        <div className=" nav">
          <div className="logo"></div>
          <div className="d-flex align-items-center">
            <Link to="/login">
              {" "}
              <button className="login bg-dark mx-2">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-light rounded-5 mx-3">
                Create an account
              </button>
            </Link>
          </div>
        </div>

        <h1 className=" text  m-5 unlock">
          Unlock The Power of Thrift and Achieve Your Financial Goals.
        </h1>
        <Link to="/signup"> <button className="btn btn-secondary border rounded-5 px-5 mx-5 py-2 mt-4">
          Get Started{" "}
          <BsArrowRight style={{ fontWeight: "bolder", marginLeft: "10px" }} />
        </button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
