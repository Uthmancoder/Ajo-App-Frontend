import React, { useState, useEffect } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import GroupUsers from "../Redux/GroupUsers";
import axios from "axios";
import { useSelector } from "react-redux";
import GetLink from "../Redux/GetLink";
import CopyToClipboard from "./CopyToClipboard";
import Loading from "./Loading";
import { Tooltip } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EachgroupUser = () => {
  const { fetchedUser } = useSelector((state) => state.GroupUsers, []);

  const groupname = fetchedUser?.groupName;

  const groupMembers = fetchedUser?.groupMembers || [];

  const currentUser = localStorage.getItem("currentUser");

  const groupWallet = fetchedUser?.wallet;

  const amountPerThrift = fetchedUser?.amount;

  console.log(groupMembers);

  const plan = fetchedUser?.plan;

  const navigate = useNavigate();

  const [payment, setPayment] = useState(false);

  const [amount, setAmount] = useState("");

  const [loaddata, setloadData] = useState(true);

  const [transactionCount, setTransactionCount] = useState(0);

  // Initializing the states with values from localStorage, if available
  const [currentWithdrawalIndex, setCurrentWithdrawalIndex] = useState(() => {
    // Check if there's a value for 'currentWithdrawer' in localStorage
    const storedCurrentWithdrawer = localStorage.getItem("currentWithdrawer");

    // If there's a value in localStorage, find its index in groupMembers
    if (storedCurrentWithdrawer !== null) {
      const currentIndex = groupMembers.findIndex(
        (user) => user.username === storedCurrentWithdrawer
      );

      // If the stored currentWithdrawer exists in groupMembers, set the currentWithdrawalIndex to its index
      if (currentIndex !== -1) {
        return currentIndex;
      }
    }

    // Default: Start with the first user
    return 0;
  });

  // Initializing the totalWithdraws state with the value from localStorage, if available
  const [totalWithdraws, setTotalWithdraws] = useState(() => {
    const storedTotalWithdraws = localStorage.getItem("totalWithdraws");

    // If there's a value for 'totalWithdraws' in localStorage, parse it as an integer
    if (storedTotalWithdraws !== null) {
      return parseInt(storedTotalWithdraws);
    }

    // Default: Start with 0
    return 0;
  });

  const [paymentCompleted, setpaymentCompleted] = useState(false);

  const isLoading = fetchedUser?.loading; // Add a loading check

  // Define the function to check all payments completed
  const checkAllPaymentsCompleted = () => {
    return groupMembers.every((user) =>
      user.payments.every((payment) => payment.paid)
    );
  };

  // Use useEffect to update the paymentCompleted state when needed
  useEffect(() => {
    const allPaymentsCompleted = checkAllPaymentsCompleted();
    setpaymentCompleted(allPaymentsCompleted);
  }, [groupMembers]); // Update when groupMembers change

  console.log(paymentCompleted);

  // loading state
  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Declaring the link to joinnthrift here for a purpose
  const linkTojoinGroup = "https://uthman-thrift-app.onrender.com/jointhrift";

  // Trigger the modal
  const fundWallet = () => {
    setPayment(true);
  };

  // cancel the modal
  const cancelModal = () => {
    setPayment(!true);
  };

  // rendering of table header
  const renderTableHeader = () => {
    if (plan === "Daily") {
      const days = []; // Create an array to hold the day labels

      for (let i = 1; i <= groupMembers.length; i++) {
        days.push(`Day ${i}`); // Add day labels to the array
      }

      return (
        <thead>
          <tr className="px-3">
            <th className="px-2 payment_status">S/N</th>
            <th className="  payment_status">Contributors</th>
            {days?.map((day, index) => (
              <th className=" payment_status" key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
      );
    } else if (plan === "Weekly") {
      const week = []; // Create an array to hold the weeks labels

      for (let i = 1; i <= groupMembers.length; i++) {
        week.push(`Week ${i}`); // Add day labels to the array
      }

      return (
        <thead>
          <tr className="px-3">
            <th className="px-2 payment_status">S/N</th>
            <th className="px-2 payment_status">Contributors</th>
            {week?.map((Week, index) => (
              <th className="payment_status" key={index}>
                {Week}
              </th>
            ))}
          </tr>
        </thead>
      );
    } else if (plan === "Monthly") {
      const Month = []; // Create an array to hold the day labels

      for (let i = 1; i <= groupMembers.length; i++) {
        Month.push(`Month ${i}`); // Add day labels to the array
      }

      return (
        <thead>
          <tr className="px-3">
            <th className="payment_status">Contributors</th>
            {Month?.map((month, index) => (
              <th className="px-2 payment_status" key={index}>
                {month}
              </th>
            ))}
          </tr>
        </thead>
      );
    }
  };
  // end of table header rendering

  // rendering table data
  const renderTableData = () => {
    const label = [];
    for (let i = 1; i <= groupMembers.length; i++) {
      label.push(i); // Add serial numbers to the array
    }

    if (!groupMembers) {
      return <p>Loading...</p>;
    } else {
      return (
        <tbody>
          {groupMembers.map((user, index) => (
            <tr key={index}>
              <td className="px-2 payment_status ">{label[index]}</td>{" "}
              {/* Display the serial number */}
              <td className="px-2 text-start">{user?.username}</td>
              {plan === "Daily" && Array.isArray(user?.payments)
                ? user?.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : ""}
                    </td>
                  ))
                : plan === "Weekly" && Array.isArray(user?.payments)
                ? // If the plan is weekly, create columns for each week
                  user?.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : ""}
                    </td>
                  ))
                : plan === "Monthly" && Array.isArray(user?.payments)
                ? // If the plan is monthly, create columns for each month
                  user?.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : ""}
                    </td>
                  ))
                : null}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  // end of table data

  // data for paying thrift
  const dataToBeSent = {
    username: currentUser,
    groupName: groupname,
    amount: amount,
    amountPerThrift: amountPerThrift,
  };

  // Making payments to groupwallet
  const makePayment = async () => {
    setloadData(!loaddata);
    try {
      const response = await axios.post(
        "https://ultimate-thrift.onrender.com/user/paythrift",
        dataToBeSent
      );

      console.log(response.data.message);
      setTransactionCount((prevCount) => prevCount + 1);
      localStorage.setItem("totalTransactions", transactionCount)
      alert(response.data.message);
      navigate("/groups");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    } finally {
      setloadData(loaddata);
    }
  };

  // getting the next withdrawer
  const getNextWithdrawer = () => {
    if (currentWithdrawalIndex === -1) {
      // Start with the first user
      return groupMembers[0]?.username;
    }

    // Increment the currentWithdrawalIndex, and if it exceeds the length of groupMembers, reset it to 0
    const nextIndex =
      currentWithdrawalIndex === groupMembers.length - 1
        ? 0
        : currentWithdrawalIndex + 1;
    return groupMembers[nextIndex]?.username;
  };

  const withdraw = () => {
    // Increment totalWithdraws
    setTotalWithdraws(totalWithdraws + 1);
    console.log("currentWithdrawalIndex:", currentWithdrawalIndex);

    // Get the username of the current withdrawer
    const currentWithdrawer = getNextWithdrawer();

    console.log(currentWithdrawer);

    // Update the WithdrawingData object with the current username
    const updatedWithdrawingData = {
      Withdrawer: currentWithdrawer, // Add the current withdrawer username
      username: currentUser,
      groupName: groupname,
      amount: groupWallet,
    };

    // Make your API call with updatedWithdrawingData
    // You can replace this part with your actual API call
    axios
      .post("https://ultimate-thrift.onrender.com/user/withdraw", updatedWithdrawingData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);

        localStorage.setItem("currentWithdarwer", currentWithdrawer);
        localStorage.setItem("totalWithdraws", totalWithdraws);
        navigate("/groups");
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });

    // Move to the next user
    setCurrentWithdrawalIndex((prevIndex) => {
      const nextIndex =
        prevIndex === groupMembers.length - 1 ? 0 : prevIndex + 1;
      return nextIndex;
    });
  };

  return (
    <div>
      <AppNav />
      <div className="row w-100">
        <div className="col-3 d-none  d-md-block">
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 med">
          <div className="d-flex m-4 w-100 align-items-center justify-content-between px-2">
            {!paymentCompleted ? (
              <Tooltip title="Pay Thrift">
                <button
                  onClick={fundWallet}
                  className="btn  btn-light contribute text-secondary shadow rounded-5 "
                >
                  Pay Thrift
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Withdraw Funds">
                <button
                  onClick={withdraw}
                  className="btn  btn-light contribute text-secondary shadow rounded-5 "
                >
                  Withdraw
                </button>
              </Tooltip>
            )}

            <Tooltip title="Wallet Balance">
              <p
                style={{ cursor: "pointer" }}
                className="py-2 px-3 contribute  text-secondary shadow rounded-5  bal"
              >
                {Number(groupWallet) > 0
                  ? `Balance : ₦ ${groupWallet}`
                  : "Balance : ₦ 0.00"}
              </p>
            </Tooltip>
          </div>
          <h1 className="fs-1 text-center text-primary fw-bolder mt-2">
            {groupname?.toUpperCase()}
          </h1>
          <div className="tableData">
            <table className="border rounded-3 w-100 p-3 text-center">
              {renderTableHeader()}
              {renderTableData()}
            </table>
          </div>

          <div className={payment ? "funding" : "funding hidden"}>
            <div
              onClick={cancelModal}
              title="cancel"
              className="bg-white  rounded-circle closebtn"
            >
              <AiOutlineClose className="text-dark fw-bolder" size={20} />
            </div>
            <h1 className="fs-1 fw-bolder text-light ">Pay Thrift</h1>
            <div className="card p-3 col-10 col-sm-9 col-md-8 col-lg-5 mx-auto d-flex flex-direction-column align-items-end">
              <input
                onChange={(ev) => setAmount(ev.target.value)}
                className="form-control my-2 mx-2"
                type="number"
                placeholder="Enter Amount"
              />
              <button onClick={makePayment} className="btn btn-primary addfund">
                {loaddata ? (
                  "Add Fund"
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className=" shadow  rounded-2 withraws ">
            <div className=" d-flex flex-wrap align-items-center justify-content-between text-center w-100  py-2">
              <div
                className="d-grid  text-center  nextwithdraw"
                style={{ maxWidth: "300px" }}
              >
                <h5 className="text-primary pt-1 fw-bolder">Next Withdrawer</h5>
                <p>{getNextWithdrawer()?.toUpperCase()}</p>
              </div>
              <div
                className="d-grid   py-2  border-div nextwithdraw "
                style={{ minWidth: "300px" }}
              >
                <h5 className="text-primary text-center fw-bolder">
                  Total Withdraws
                </h5>
                <p className="text-center">{totalWithdraws}</p>
              </div>
              <div
                className="d-grid nextwithdraw   "
                style={{ maxWidth: "300px" }}
              >
                <h5 className="text-primary fw-bolder">Group Link</h5>
                <CopyToClipboard text={linkTojoinGroup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachgroupUser;
