import React, { useState, useEffect } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import { FaAngleRight } from "react-icons/fa";
import AllUsers from "../Redux/AllUsers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import { addMessage } from "../Redux/messages";
import { incrementUnreadMessages } from '../Redux/UnreadMessages'
import { IoMdRefreshCircle } from 'react-icons/io'

const Account = () => {
  // paystack initialization
  const publicKey = "pk_test_dbcb6b7004be89b6c6f9b41c5c1a2d11ade8023f";
  const [payment, setPayment] = useState(false);
  const [amount, setAmount] = useState("");
  const [loaddata, setloadData] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const url = "https://ultimate-thrift.onrender.com/user/updateWallet";
      const data = {
        amount: amount,
        username: username,
      };

      console.log(response);

      // Create a Promise to wrap the Axios call
      const paymentPromise = new Promise((resolve, reject) => {
        axios.post(url, data)
          .then((newResponse) => {
            console.log("payment Data : ", newResponse.data);
            resolve(newResponse);
          })
          .catch((error) => {
            reject(error);
          });
      });

   
      paymentPromise
        .then((newResponse) => {
          // Update the component's state with the new wallet balance and deposit count
          setAmount("");  // Reset the input field
          navigate("/dashboard");
          setTimeout(() => {
            navigate("/dashboard/account");
          }, 500);
          setGetUsersDeposit((prevDeposit) => prevDeposit + 1);
          const messageDetails = {
            message: newResponse.data.message,
            time: newResponse.data.formattedDateTime
          }
          // Add the new message to the array
          dispatch(addMessage(messageDetails))
          dispatch(incrementUnreadMessages())
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while trying to update your wallet balance");
        });
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

     // handling the refresh function
     const handleRefresh = ()=>{
      window.location.reload()
   }

  // checking loading state
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

      <div className="account_rel pt-8 med w-100 ">
        <h1 className="fs-2 m-3">
          My <span className="fs-3 text-secondary">Account</span>
        </h1>
        <div className="card w-100 shadow  p-2 ">
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="fw-bolder">{name}</h5>
              <div onClick={handleRefresh}><Tooltip title="Refresh"> <IoMdRefreshCircle size={30} className="text-secondary"/> </Tooltip></div>
            </div>
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
                Transaction History
              </p>
              <h5>₦0.00</h5>
              <p>Recent Transaction</p>
              <p className="mt-3">
                Check History <FaAngleRight />
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
  );
};

export default Account;
