import React from "react";
import logo from "../images/Microfinance.png";
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillTwitterCircle, AiFillInstagram} from  "react-icons/ai"
import AppNav from "./AppNav";

const About = () => {
  return (
    <div className="bg-light w-100 h-100 ">
        <AppNav/>
      <div className="container pt-3">
        <div className="about-header  d-flex align-items-center justify-content-center">
          <img
            style={{ width: "50px", height: "50px" }}
            className="rounded-1"
            src={logo}
            alt="Thrift App Logo"
          />
          <h1 className="fs-2 mx-2">About Our Thrift App</h1>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Welcome to Ultimate Microfinance Bank, your trusted platform for
            managing thrift groups and achieving your financial goals. Our
            mission is to simplify the process of saving and investing money
            with your friends and family.
          </p>
          <h2>What We Offer</h2>
          <p>
            Ultimate Microfinance Bank offers a secure and convenient way to
            create and manage thrift groups, contribute money, and track your
            financial progress. With our app, you can enjoy the benefits of
            collaborative saving and achieve your financial dreams faster.
          </p>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Easy creation and management of thrift groups.</li>
            <li>Easy and accessible payments</li>
            <li>Secure and transparent financial transactions.</li>
            <li>Real-time tracking of contributions and payouts.</li>
            <li>Community-driven saving and investing.</li>
          </ul>
        </div>

        <div className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <blockquote>
              "I love using Ultimate Microfinance app to save for my goals. It's
              easy to use, and I'm seeing great results."
            </blockquote>
            <p>- John Doe</p>
          </div>
        </div>

        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or need assistance, please don't hesitate
            to contact our support team at
            support@adewaleagbolahan025@gmail.com.
          </p>
        </div>
      </div>

      <footer className="footer bg-dark text-secondary py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Explore</h3>
              <ul>
                <li>
                  <a className="text-secondary text-decoration-none" href="/">Home</a>
                </li>
                <li>
                  <a className="text-secondary text-decoration-none" href="/about">About</a>
                </li>
                <li>
                  <a className="text-secondary text-decoration-none" href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Follow Us</h3>
              <div className="social-media">
                {/* Add your social media icons or links here */}
                <a className="text-secondary mx-2" href="https://www.linkedin.com/in/adebayo-uthman-024494259/">
                 <AiFillLinkedin size={25}/>
                </a>
                <a className="text-secondary mx-2" href="https://twitter.com/uthmancoder">
                  <AiFillTwitterCircle size={25}/>
                </a>
                <a className="text-secondary mx-2" href="#">
                  <AiFillInstagram size={25}/>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <h3>&copy; {new Date().getFullYear()} Ultimate Microfinance Bank</h3>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
