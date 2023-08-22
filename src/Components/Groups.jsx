import React, { useState, useEffect } from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import NoGroups from "./NoGroups";
import axios from "axios";
import Loading from "./Loading";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  fetchingMembersSuccessful,
  fetchingMembersFailed,
} from "../Redux/GroupUsers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllUsers from "../Redux/AllUsers";

const Groups = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const Navigate = useNavigate();

  // Getting the current signed user
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const currentUserUsername = fetchedUser?.user.username;
  const isLoadingUser = fetchedUser?.loading;

  const token = localStorage.getItem("token");

  // Fetching all the existing thrifts from the server
  useEffect(() => {
    if (!isLoadingUser && token) {
      axios
        .get("https://ultimate-thrift.onrender.com/user/ExistingThrift", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.existingThrifts);
          setLoading(false);
          console.log("Data received:", res.data.existingThrifts);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching thrift groups:", error);
        });
    } else if (!isLoadingUser) {
      alert("Error fetching thrift groups");
    }
  }, [isLoadingUser, token]);

  // ...

  if (isLoadingUser) {
    return <Loading />;
  }

  // Fetching all the group members from the server
  const handleGroupMembers = async (groupName) => {
    const url = "https://ultimate-thrift.onrender.com/user/getmembers";
    try {
      setShowLoader(true); // Show the loader before making the API call
      const response = await axios.post(
        url,
        { groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Group Members:", response.data);
      dispatch(fetchingMembersSuccessful(response.data));
      Navigate("/contribution");
    } catch (error) {
      console.error("Error fetching group members:", error);
      dispatch(fetchingMembersFailed(error));
      // Handle the error (e.g., show an error message)
      alert("Error fetching group members:", error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div>
      <AppNav />
      <div className="row w-100 h-100">
        <div className="d-none d-sm-block  col-12 col-sm-3 col-md-3">
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 mx-auto ">
          <h1>Groups</h1>

          {showLoader ? <Loading /> : null}

          {loading ? (
            <Loading />
          ) : data && data.length > 0 ? (
            data.map((thriftGroup) => (
              <div
                onClick={() => handleGroupMembers(thriftGroup.groupName)}
                key={thriftGroup._id}
                className="card w-100 mx-auto   rounded-3 my-3 py-1  px-3 shadow"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      className="grplog"
                      src={thriftGroup.groupIcon}
                      alt=""
                    />
                    <div className="">
                      <p className="mx-3 fw-bolder text-primary pt-2">
                        {thriftGroup.groupName}
                      </p>
                      <div className=" plan">
                        <small className="text-secondary">
                          ₦{thriftGroup.Amount}{" "}
                        </small>
                        <small className="text-secondary">
                          {thriftGroup.plan},{" "}
                        </small>
                        <small className="text-secondary tot">
                          Pack:₦{thriftGroup.Total},{" "}
                        </small>
                        <small className="text-secondary tot">
                          {thriftGroup.RequiredUsers} Members
                        </small>
                      </div>
                    </div>
                  </div>

                  {thriftGroup.verifiedMembers.map((member, index) => (
                    <span key={index}>
                      {member.verified &&
                      currentUserUsername === member.username
                        ? "✅"
                        : "🚫"}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <NoGroups />
          )}
          {data && data.length > 0 ? (
            <Link to="/create" className="text-primary create fw-bold">
              Create A Thrift{" "}
              <AiOutlineArrowRight
                style={{ fontWeight: "500", fontSize: "17px" }}
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Groups;
