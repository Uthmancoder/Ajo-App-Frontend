import React, { useState, useEffect } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from '../images/Microfinance.png'

const LandingPageNav = () => {

  const [menu, setMenu] = useState(false);
  const pages = [
    {
      id: "home",
      text: "Home",
      // URL: "/",
    },
    {
      id: "about",
      text: "About Us",
      // URL: "/about",
    },
    {
      id: "contact",
      text: "Contact",
      // URL: "/contact",
    },
    {
      id: 'testimonials',
      text: "Testimonial",
      // URL: "/testimonials",
    },
  ];

  const handleClick = () => {
    setMenu(!menu);
  };

  const handleNavLinkClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div>
      <div id="navBar" className="d-flex align-items-center justify-content-between navv  py-3 px-5" style={{ height: "80px" }}>
        <div>
          <div className="d-flex align-items-center justify-content-center">
            {/* <AiFillPayCircle size={40} />
            <h1 className="fs-2 pt-2 fw-bolder ">
              <span className="text-danger fw-bolder">Ul</span>
              <span className="text-alert alert-secondary fw-bolder">tim</span>
              <span className="text-light fw-bolder">ate</span>
            </h1> */}
            <img className="img-fluid logo" src={logo} alt="" />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <div className="homelinks">
            {pages.map((page) => (
              <NavLink
                className="p-4 text-decoration-none NavLink text-light fw-semibold"
                key={page.id}
                onClick={() => handleNavLinkClick(page.id)}
                // to={page.URL}
              >
                {page.text}
              </NavLink>
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
              {/* <AiFillPayCircle size={40} />
              <h1 className="fs-2 pt-2 fw-bolder ">
                <span className="text-danger fw-bolder">Ul</span>
                <span className="text-alert alert-secondary fw-bolder">
                  tim
                </span>
                <span className="text-light fw-bolder">ate</span>
              </h1> */}
              <img className="img-fluid " style={{ width: "30%", height: "30%" }} src={logo} alt="" />
            </div>
          </div>

          <div className="side1">
            <div className="d-grid fixed shadow-lg">
              {pages.map((page) => (
                <NavLink
                  className="py-4 text-start px-5 border-bottom  NavLink mediascr text-decoration-none text-dark fw-semibold"
                  key={page.id}
                  onClick={() => handleNavLinkClick(page.id)}
                  // to={page.URL}
                >
                  {page.text}
                </NavLink>
              ))}
              <Link to="/login" className=" text-decoration-none   my-4 login-button">
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
                  className="p-1 text-decoration-none NavLink text-light fw-semibold"
                  key={page.id}
                  onClick={() => handleNavLinkClick(page.id)}
                  // to={page.URL}
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
