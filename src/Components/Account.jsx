import React, { useState } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import { FaAngleRight } from "react-icons/fa";
import AllUsers from "../Redux/AllUsers";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
// import PaystackConfig  from "./paystackConfig";
import { PaystackButton } from 'react-paystack';





const Account = () => {

  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const username = fetchedUser?.user.username;
  const name = username.toUpperCase();
  const email = fetchedUser.email;
  const publickKey = 'pk_test_dbcb6b7004be89b6c6f9b41c5c1a2d11ade8023f'


  const [payment, setpayment] = useState(false);
  const [amount, setamount] = useState("");


  // Trigger the modal
  const fundWallet = () => {
    setpayment(true);
  };

  // cancel the modal
  const cancelModal = () => {
    setpayment(!true);
  };

  const handlePaystackSuccessAction = (reference) => {
    console.log(reference);
  };


  const handlePaystackCloseAction = () => {
    console.log('closed')
  }




  // declaring the payment details
  const componentProps = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount,
    publickKey,
    text: 'Add Fund',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
};


  return (
    <div>
      <AppNav />
      <div className="row w-100 h-100">
        <div className="d-none d-sm-block  col-3 ">
          <Sidenav />
        </div>
        <div className="col-9 account_rel">
          <h1 className="fs-2 m-3">
            My <span className="fs-3 text-secondary">Account</span>
          </h1>
          <div className="card w-100 shadow  p-2 ">
            <div>
              <h5 className="fw-bolder">{name}</h5>
              <div className=" justify-content-between rounded-2 p-2  bg-primary my-2  d-flex align-items-center w-100 history">
                <div
                  className="d-grid shadow py-2 px-4 text-center balance text-light rounded-3 "
                  style={{ minHeight: "50px", minWidth: "250px" }}
                >
                  <h5 className="fw-bolder text-light balancetext">
                    {" "}
                    Wallet Balance
                  </h5>
                  <p>₦0.00</p>
                </div>
                <div
                  className="d-grid mx-4 shadow py-2 text-center balance text-light balancetext rounded-3 px-5"
                  style={{ minHeight: "70px", minWidth: "250px" }}
                >
                  <h5 className="fw-bolder text-light">Group Members </h5>
                  <p>0</p>
                </div>
                <div
                  className="d-grid shadow p-2 text-center text-light rounded-3 "
                  style={{ minHeight: "70px", minWidth: "250px" }}
                >
                  <h5 className="fw-bolder text-light">Successful Payments </h5>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card  shadow mt-4  ">
            <div
              className="trackPayment m-2 d-flex align-items-center justify-content-around"
              style={{ backgroundColor: "white" }}
            >
              <p className="fw-bolder text-primary fw-bolder fs-5">
                Pending payment
              </p>
              <p className="fw-bolder text-primary fw-bolder fs-5">
                Defaulted payments
              </p>
              <p className="fw-bolder text-primary fw-bolder fs-5">
                Fund Wallet
              </p>
            </div>

            <div className="bg-light d-flex align-items-center justify-content-between py-3 px-5">
              <div className="text-start">
                <h5>₦0.00</h5>
                <p>Next transfer</p>
                <p className="mt-3">
                  Next transfer <FaAngleRight />
                </p>
              </div>
              <hr className="p-2 line" />
              <div className="text-start">
                <h5>₦0.00</h5>
                <p>Defaulted Payment</p>
                <p className="mt-3">
                  Defaulted Payment
                  <FaAngleRight />
                </p>
              </div>
              <hr className="p-2 line2" />
              <div className="text-start" style={{ marginLeft: "-10%" }}>
                <button onClick={fundWallet} className="btn btn-primary">
                  Fund Wallet
                </button>
              </div>
            </div>
          </div>

          <div className={payment ? "funding" : "funding hidden"}>
            <div
              onClick={cancelModal}
              title="cancel"
              className="bg-white  rounded-circle closebtn"
            >
              <AiOutlineClose className="text-dark fw-bolder" size={20} />
            </div>
            <h1 className="fs-1 fw-bolder text-light ">
              UPDATE WALLET BALANCE
            </h1>
            <div className="card p-3 w-50 mx-auto d-flex flex-direction-column align-items-end">
              <input
                onChange={(ev) => setamount(ev.target.value)}
                className="form-control my-2 mx-2"
                type="number"
                placeholder="Enter Amount"
              />
               <PaystackButton className="btn btn-primary mx-2" {...componentProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
