import React, { useState } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const LandingPageNav = () => {
  const [menu, setMenu] = useState(false);
  const pages = [
    {
      id: 1,
      text: "Home",
      URL: "/",
    },
    {
      id: 2,
      text: "About Us",
      URL: "/about",
    },
    {
      id: 3,
      text: "Products",
      URL: "/https://uthmancoder-hexashop.netlify.app",
    },
    {
      id: 4,
      text: "Portfolio",
      URL: "/https://uthmancoder-portfolio.netlify.app",
    },
  ];

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between navv py-3 px-5">
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <AiFillPayCircle size={40} />
            <h1 className="fs-2 pt-2 fw-bolder ">
              <span className="text-danger fw-bolder">Ul</span>
              <span className="text-alert alert-secondary fw-bolder">tim</span>
              <span className="text-light fw-bolder">ate</span>
            </h1>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <div className="homelinks">
            {pages.map((page) => (
              <Link
                className="p-4 text-decoration-none text-light fw-semibold"
                key={page.id}
                to={page.URL}
              >
                {page.text}
              </Link>
            ))}
            <Link to="/login" className=" text-decoration-none  ">
              <button className="btn btn-light rounded-2 px-4 ">Login</button>
            </Link>
          </div>
          <div className="menu" onClick={handleClick}>
            {!menu ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
          </div>
        </div>
      </div>
      {/* small screen sidebar */}
      {menu ? (
        <div className="sidebar">
          <div>
            <div className="d-flex align-items-center m-3">
              <AiFillPayCircle size={40} />
              <h1 className="fs-2 pt-2 fw-bolder ">
                <span className="text-danger fw-bolder">Ul</span>
                <span className="text-alert alert-secondary fw-bolder">
                  tim
                </span>
                <span className="text-light fw-bolder">ate</span>
              </h1>
            </div>
          </div>

          <div className="side1">
            <div className="d-grid fixed">
              {pages.map((page) => (
                <Link
                  className="p-5 text-start px-3 border-bottom  mediascr text-decoration-none text-dark fw-semibold"
                  key={page.id}
                  to={page.URL}
                >
                  {page.text}
                </Link>
              ))}
              <Link to="/login"  className=" text-decoration-none   mt-4 login-button">
                <button className="btn btn-secondary w-75 mt-4 ">  
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="side2">
          <div>
            <div className="d-flex align-items-center m-3">
              <AiFillPayCircle size={40} />
              <h1 className="fs-2 pt-2 fw-bolder ">
                <span className="text-danger fw-bolder">Ul</span>
                <span className="text-alert alert-secondary fw-bolder">
                  tim
                </span>
                <span className="text-light fw-bolder">ate</span>
              </h1>
            </div>
          </div>

          <div className="">
            <div className="d-grid fixed">
              {pages.map((page) => (
                <Link
                  className="p-4 text-decoration-none text-light fw-semibold"
                  key={page.id}
                  to={page.URL}
                >
                  {page.text}
                </Link>
              ))}
              <Link className=" text-decoration-none  ">
                <button className="btn btn-secondary  w-75 mt-4 mx-3">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageNav;
