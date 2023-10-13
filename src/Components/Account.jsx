import React, { useState, useEffect } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import { FaAngleRight } from "react-icons/fa";
import AllUsers from "../Redux/AllUsers";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";

const Account = () => {
  // paystack initialization
  const publicKey = "pk_test_dbcb6b7004be89b6c6f9b41c5c1a2d11ade8023f";
  const [payment, setPayment] = useState(false);
  const [amount, setAmount] = useState("");
  const [loaddata, setloadData] = useState(true);

  // trying to get the user's total deposits
  const [GetUsersDeposit, setGetUsersDeposit] = useState(
    Number(localStorage.getItem("GetUsersDeposit")) || 0
  );

  const AllMembers = localStorage.getItem("AllMembers") || 0;

  const { fetchedUser } = useSelector((state) => state.AllUsers, []);

  // getting all the user's data
  const username = fetchedUser?.user?.username || "";
  const name = username.toUpperCase();
  const email = fetchedUser?.user?.email || ""; // Add a conditional check for email
  const Wallet = fetchedUser?.user?.wallet;
  const isLoading = fetchedUser?.user?.loading; // Update the loading property path

  // data to be sent to paystack
  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      username: name,
      email,
    },
    publicKey,
    text: "Add Fund",
    onSuccess: (response) => {
      let url = "https://ultimate-thrift.onrender.com/user/updateWallet";
      let data = {
        amount: amount,
        username: username,
      };
  
      console.log(response);
  
      // Wrap the asynchronous operation in a Promise
      const asyncOperation = new Promise(async (resolve, reject) => {
        try {
          const newResponse = await axios.post(url, data);
          console.log(newResponse.data);
          setGetUsersDeposit((prevDeposit) => prevDeposit + 1);
          localStorage.setItem("GetUsersDeposit", GetUsersDeposit + 1);
  
          // Get the existing messages array from local storage or initialize it if it doesn't exist
          let messages =
            JSON.parse(localStorage.getItem("transactionMessages")) || [];
  
          // Add the new message to the array
          messages.push(newResponse.data.message);
          // Save the updated messages array to local storage
          localStorage.setItem("transactionMessages", JSON.stringify(messages));
  
          // Resolve the Promise after successful completion
          resolve();
        } catch (error) {
          console.log(error.newResponse.data);
          // Reject the Promise if there's an error
          reject(error);
        }
      });
  
      asyncOperation
        .then(() => {
          // Reload the page after the asynchronous operation is complete
          window.location.reload();
        })
        .catch((error) => {
          // Handle the error as needed
        });
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  
  // chevking loafing state
  if (isLoading) {
    return <Loading />;
  }

  // Trigger the modal
  const fundWallet = () => {
    setPayment(true);
  };

  // cancel the modal
  const cancelModal = () => {
    setPayment(!true);
  };

  return (
    <div>
      <AppNav />
      <div className="row w-100 h-100">
        <div className="d-none d-sm-block  col-3">
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 account_rel pt-16 med">
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
                  <p>{Number(Wallet) > 0 ? `₦ ${Wallet}` : "0.00"}</p>
                </div>
                <div
                  className="d-grid mx-4 shadow py-2 text-center balance text-light balancetext rounded-3 px-5"
                  style={{ minHeight: "70px", minWidth: "250px" }}
                >
                  <h5 className="fw-bolder text-light">Group Members </h5>
                  <p>{AllMembers}</p>
                </div>
                <div
                  className="d-grid shadow p-2 text-center text-light rounded-3 "
                  style={{ minHeight: "70px", minWidth: "250px" }}
                >
                  <h5 className="fw-bolder text-light">Successful Payments </h5>
                  <p>{GetUsersDeposit}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card  shadow mt-4 acc_details ">
            <div className="bg-light d-flex flex-wrap align-items-center justify-content-between py-3  px-5">
              <div className="text-start smallsc" style={{ maxWidth: "300px" }}>
                <p className="fw-bolder trackPayment m-2 text-primary fw-bolder fs-5">
                  Pending payment
                </p>
                <h5>₦0.00</h5>
                <p>Next transfer</p>
                <p className="mt-3">
                  Next transfer <FaAngleRight />
                </p>
              </div>
              <hr className="p-2 line" />
              <div className="text-start smallsc" style={{ maxWidth: "300px" }}>
                <p className="fw-bolder trackPayment m-2 text-primary fw-bolder fs-5">
                  Defaulted payments
                </p>
                <h5>₦0.00</h5>
                <p>Defaulted Payment</p>
                <p className="mt-3">
                  Defaulted Payment
                  <FaAngleRight />
                </p>
              </div>
              <hr className="p-2 line2" />
              <div
                className=" smallsc smallsc3"
                style={{
                  maxWidth: "300px",
                  marginLeft: "-10%",
                  textAlign: "start",
                }}
              >
                <p className="fw-bolder trackPayment m-2 text-primary fw-bolder fs-5">
                  Fund Wallet
                </p>
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
            <div className="card p-3 col-10 col-sm-9 col-md-8 col-lg-5 mx-auto d-flex flex-direction-column align-items-end">
              <input
                onChange={(ev) => setAmount(ev.target.value)}
                className="form-control my-2 mx-2"
                type="number"
                placeholder="Enter Amount"
              />
              <PaystackButton className="btn btn-primary addfund" {...componentProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
