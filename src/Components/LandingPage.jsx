import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import LandingPageNav from "./LandingPageNav";
import coin from "../images/coin.png";
import About from "./About";
import Footer from "./Footer";
import MultipleItems from "./Carousel";
import Contact from "./Contact";
// import MultipleItems from "./Carousel";


const LandingPage = () => {
  return (
    <div>
      <div id="navBar" className="navBar" style={{ height: "80px" }}>
        <LandingPageNav />
      </div>
      <div className="landing  ">
        <div id="Home" className="px-5 row container">
          <div className="text-light mt-5 col-12 co l-sm-6 col-md-6">
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
          <div className="col-12 col-sm-6 col-md-6 ">
            <img className="img-fluid animated-image w-100" src={coin} alt="laptop" />
          </div>
        </div>
      </div>
      {/* About Section */}
      <div id="About">
        <About />
      </div>
      {/* Testimonials Section */}
      <div id="Testimonials" className="m-5" >
        <h2 className="fs-2 fw-bold my-5">  Testimonials</h2>
        <div className="text-center w-100 my-4">
          <MultipleItems />
        </div>
      </div>

      
      <div>
 {/* Contact section */}
      <div id="Contact" className="contact-info">
          <h2 className="fs-2 fw-bold m-5">Contact Us</h2>
          <Contact/>
          <p>
            If you have any questions or need assistance, please don't hesitate
            to contact our support team at
            support@adewaleagbolahan025@gmail.com.
          </p>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
