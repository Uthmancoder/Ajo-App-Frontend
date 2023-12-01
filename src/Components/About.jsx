import React from "react";
import logo from "../images/Microfinance.png";
import Contact from './Contact'
import AppNav from "./AppNav";
import MultipleItems from "./Carousel";

const About = () => {
  return (
    <div className="">
      <div className="container-fluid pt-3">

        <h1 className="fs-2 text-center py-5 fw-bold">About Us</h1>

        <div className="about-section">
          <div className="row w-100 d-flex align-items-center justify-content-center">
            <div className="col-12 col-sm-6 col-md-6">
              <h1 className="fs-1 fw-bold">Our Mission</h1>
              <p className="text-secondary fs-5">
                Welcome to Ultimate Microfinance Bank, your trusted platform for
                managing thrift groups and achieving your financial goals. Our
                mission is to simplify the process of saving and investing money
                with your friends and family.
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-6">
              <img className="img-fluid" src="https://media.licdn.com/dms/image/D4E12AQHgMxo-g7BYsw/article-cover_image-shrink_720_1280/0/1658422953944?e=2147483647&v=beta&t=cbUAMWH281ZrksBTR63LDIweFkMUqiWhVA7CobvLCwY" alt="" />
            </div>
          </div>
          <div className="row w-100 container-fluid d-flex align-items-center justify-content-center my-4">
            <div className="col-12 col-sm-6 col-md-6">
              <img className="img-fluid" src="https://www.jenoptik.co.kr/-/media/websiteimages/visuals/other/was-wir-bieten.jpg?impolicy=aoiv1&width=1920&height=1440" alt="" />
            </div>
            <div className="col-12 col-sm-6 col-md-6">
              <h2>What We Offer</h2>
              <p>
                Ultimate Microfinance Bank offers a secure and convenient way to
                create and manage thrift groups, contribute money, and track your
                financial progress. With our app, you can enjoy the benefits of
                collaborative saving and achieve your financial dreams faster.
              </p>
            </div>
          </div>
        </div>


        <div className="row w-100 d-flex align-items-center justify-content-center">
          <div className="col-12 col-sm-6 col-md-6 ">
            <h2>Key Features</h2>
            <ul>
              <li>Easy creation and management of thrift groups.</li>
              <li>Easy and accessible payments</li>
              <li>Secure and transparent financial transactions.</li>
              <li>Real-time tracking of contributions and payouts.</li>
              <li>Community-driven saving and investing.</li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-md-6">
            <img className="w-100 h-100" src="https://media.istockphoto.com/id/1174418655/photo/future-mobile-phone-technology-to-control-smart-home-cellphone-app-interface-with-abstract.jpg?s=1024x1024&w=is&k=20&c=ecOC7JN2aAvEhgWQriKfMjV3MqP2b83UInqq05d8Jqs=" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
