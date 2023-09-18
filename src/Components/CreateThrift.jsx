import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import { useSelector, useDispatch } from "react-redux";
import AppNav from "./AppNav";
import useFetch from "./Fetch";
import axios from "axios";
import { fetchingSuccessful } from "../Redux/GetLink";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchedLink } from "../Redux/GetLink";
import GroupLink from "./GroupLink";

const CreateThrift = () => {
  // import useNavigate
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const { fetchedUser } = useSelector((state) => state.AllUsers);

  // Addeed a state variable to track the successful creation of the thrift group
  const [thriftGroupCreated, setThriftGroupCreated] = useState(false);

  const creatorUsername = fetchedUser?.user?.username;
  // inputs intialization
  const [groupName, setgroupName] = useState("");

  const [Amount, setAmount] = useState("");

  const [users, setusers] = useState("");

  const [interest, setInterest] = useState("");

  const [plan, setPlan] = useState("");

  // state for setting loader
  const [loaddata, setloadData] = useState(true);

  // for selecting the group icon
  const [imageFile, setimageFile] = useState("");
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimageFile(reader.result);
    };
  };
  // end of image selection

  // Handle changes in the plan select element
  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  // Creating thrifts
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const pack = Number(Amount) * Number(users); // Convert Amount and users to numbers

    //  getting the token from localstorage
    const token = localStorage.getItem("token");
    console.log(token);

    if (
      groupName === "" ||
      Amount === "" ||
      interest === "" ||
      plan === "" ||
      imageFile === ""
    ) {
      alert("imput field cannot be empty");
    } else if (Number(users) > 8) {
      alert("Maximum of 8 users can be accepted in a group, please try reducing your users");
    }
    else {
      // data to be sent to the server
      const ThriftData = {
        groupName: groupName,
        Amount: Amount,
        interest: interest,
        plan: plan,
        imageFile: imageFile,
        Total: pack,
        RequiredUsers: users,
        creatorUsername: creatorUsername,
      };
      // stop the loader
      setloadData(!loaddata);
      try {
        // Sending  thrift data to the server
        console.log(ThriftData);
        await axios
          .post(
            "https://ultimate-thrift.onrender.com/user/CreateThrift",
            ThriftData,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            }
          )
          .then((res) => {
            dispatch(fetchingSuccessful(res.data));
            localStorage.setItem("fetchedLink", JSON.stringify(res.data.message));

            toast.success("Thrift group created successfully");
            if (res.status === 200) {
              setThriftGroupCreated(true);
            }
            setloadData(true);

            //  delayed the time for the navigation
            setTimeout(() => {
              Navigate("/groups");
            }, 3000);
          });
      } catch (error) {
        console.log(error);
        toast.error("Error creating thrift, " + error.response.data.message);
        setloadData(true);
      }
    }
  };
  // end of create thrift

  return (
    <div>
      {/* imported the app nav */}
      <AppNav />
      <div className="row w-100">
        <div className="col-3 d-none d-sm-block">
          {/* imported the sidenav */}
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 mx-auto">
          <form action="" className="form_main shadow w-100 my-5">
            <p className="heading">Create a thrift</p>
            <div className="row w-100">
              <div className="inputContainer col-12   col-sm-6 d-grid">
                <label htmlFor="Thriftname" className="text-dark fw-bolder ">
                  Enter a group name
                </label>
                <input
                  type="text"
                  onChange={(e) => setgroupName(e.target.value)}
                  className="inputField form-control p-3"
                  id="Thriftname"
                  placeholder="Name"
                />
              </div>
              <div className="inputContainer col-12 col-sm-6 d-grid ">
                <label htmlFor="Thriftname" className="fw-bolder text-dark">
                  Select a plan
                </label>
                <select
                  style={{ width: "220px" }}
                  className="p-1 rounded-2"
                  name="plan"
                  id="plan"
                  value={plan}
                  onChange={handlePlanChange}
                >
                  <option className="m-2" value="Daily">
                    Daily
                  </option>
                  <option className="m-2" value="Weekly">
                    Weekly
                  </option>
                  <option className="m-2" value="Monthly">
                    Monthly
                  </option>
                </select>
              </div>
              <div className="inputContainer col-12 col-sm-6 d-grid ">
                <label htmlFor="Thriftname" className="fw-bolder  amount">
                  Amount to be paid
                </label>
                <input
                  type="text"
                  onChange={(e) => setAmount(e.target.value)}
                  className="inputField form-control p-3 w-100"
                  id="amount"
                  placeholder="Amount"
                />
              </div>

              <div className="inputContainer col-12 col-sm-6 d-grid  ">
                <label htmlFor="Thriftname" className="text-dark fw-bolder ">
                  Required Users
                </label>
                <input
                  type="number"
                  min="0"
                  max="8"
                  onChange={(e) => setusers(e.target.value)}
                  className="inputField form-control requiredUsers p-3 "
                  
                  placeholder="Amount of users needed in group"
                />
              </div>

              <div className="inputContainer col-12   col-sm-6 d-grid">
                <label htmlFor="Thriftname" className="text-dark fw-bolder ">
                  Interest if defaulted
                </label>
                <input
                  type="text"
                  onChange={(e) => setInterest(e.target.value)}
                  className="inputField form-control p-3 w-100"
                  id="plan"
                  placeholder="Interest"
                />
              </div>
              <div
                style={{ paddingLeft: "11%" }}
                className="col-12  col-sm-6   d-grid"
              >
                <label htmlFor="icon" class=" fw-bolder mx-3">
                  Select group logo
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="file"
                    onChange={handleChange}
                    className=" mx-3 bg-primary icon rounded-3 "
                    id="plan"
                    name="icon"
                  />
                  {imageFile && (
                    <img
                      className="grplog"
                      src={imageFile}
                      alt="Image"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              className="mt-3"
              id="button"
              type="submit"
              onClick={handleSubmit}
            >
              {loaddata ? (
                "Submit"
              ) : (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            {/* Checking the thrift group created status */}
            {thriftGroupCreated ? (
              <div>
                <GroupLink />
              </div>
            ) : null}
          </form>
        </div>
      </div>
      {/* ... (existing code) */}

      <ToastContainer />
    </div>
  );
};

export default CreateThrift;
