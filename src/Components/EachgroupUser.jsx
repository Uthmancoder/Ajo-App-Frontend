import React, { useState } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import GroupUsers from "../Redux/GroupUsers";
import axios from "axios";
import { useSelector } from "react-redux";
import GetLink from "../Redux/GetLink";
import CopyToClipboard from "./CopyToClipboard";
import Loading from "./Loading";
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

  const isLoading = fetchedUser?.loading; // Add a loading check

  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Declaring the link to joinnthrift here for a purpose
  const linkTojoinGroup = "http://localhost:3001/jointhrift";

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
            <th className=" border payment_status">Contributors</th>
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
              <td className="px-2 text-start">{user.username}</td>
              {plan === "Daily" && Array.isArray(user.payments)
                ? user.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : "✖️"}
                    </td>
                  ))
                : plan === "Weekly" && Array.isArray(user.payments)
                ? // If the plan is weekly, create columns for each week
                  user.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : "✖️"}
                    </td>
                  ))
                : plan === "Monthly" && Array.isArray(user.payments)
                ? // If the plan is monthly, create columns for each month
                  user.payments.map((payment, i) => (
                    <td className="payment_status" key={i}>
                      {payment.paid ? "✅" : "✖️"}
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

  const makePayment = async () => {
    setloadData(!loaddata);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/paythrift",
        dataToBeSent
      );

      console.log(response.data.message);
      alert(response.data.message);
      navigate("/groups");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    } finally {
      setloadData(loaddata);
    }
  };

  return (
    <div>
      <AppNav />
      <div className="row w-100">
        <div className="col-3 d-none  d-md-block">
          <Sidenav />
        </div>
        <div className="col-9">
          <div className="d-flex m-4  align-items-center justify-content-between">
            <button
              onClick={fundWallet}
              className="btn  btn-light contribute text-secondary shadow rounded-5 "
            >
              Pay Thrift
            </button>
            <p className="py-2 px-3 contribute text-secondary shadow rounded-5  bal">
              {Number(groupWallet) > 0
                ? `Balance : ₦ ${groupWallet}`
                : "Balance : ₦ 0.00"}
            </p>
          </div>
          <h1 className="fs-1 text-center text-primary fw-bolder mt-2">
            {groupname?.toUpperCase()}
          </h1>
          <table className="border rounded-3 w-100 p-3 text-center">
            {renderTableHeader()}
            {renderTableData()}
          </table>

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
              <button onClick={makePayment} className="btn btn-primary w-25">
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
            <div className="row w-100  py-2">
              <div className="d-grid col-12 col-lg-4 text-center ">
                <h5 className="text-primary pt-1 fw-bolder">Next Withdrawer</h5>
                <p>Uthman</p>
              </div>
              <div className="d-grid col-12  py-2 col-sm-4 border-div ">
                <h5 className="text-primary fw-bolder">Total Withdraws</h5>
                <p>5</p>
              </div>
              <div className="d-grid col-12  py-2 col-sm-4 ">
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
