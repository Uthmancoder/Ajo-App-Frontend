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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllUsers from "../Redux/AllUsers";
import AllGroupsSlice from "../Redux/AllGroups"; 
import { fetchGroups, fetchGroupsSuccess, fetchGroupsFailure } from "../Redux/AllGroups";
const Groups = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [groupCount, setGroupCount] = useState(
    Number(localStorage.getItem("groupCount")) || 0
  );
  const Navigate = useNavigate();

  // Getting the current signed user
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const currentUserUsername = fetchedUser?.username;
  const isLoadingUser = fetchedUser?.loading;

  

  const token = localStorage.getItem("token");

  // Fetching all the existing thrifts from the server
  useEffect(() => {
    // Dispatch the fetchGroups action to initiate fetching
    dispatch(fetchGroups());
  
    if (!isLoadingUser && token) {
      axios
        .get("https://ultimate-thrift.onrender.com/user/ExistingThrift", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.existingThrifts);
          dispatch(fetchGroupsSuccess(res.data.existingThrifts));
          setLoading(false);
          console.log("Data received:", res.data.existingThrifts);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching thrift groups:", error);
          dispatch(fetchGroupsFailure(error));
        });
    } else if (!isLoadingUser) {
      alert("Error fetching thrift groups");
    }
  }, [isLoadingUser, token]);
  

  // Calculate the user's group count
  useEffect(() => {
    if (!loading && data && data.length > 0) {
      const userGroupCount = data.filter((thriftGroup) =>
        thriftGroup.verifiedMembers.some(
          (member) => member.username === currentUserUsername
        )
      ).length;
      setGroupCount(userGroupCount);
      localStorage.setItem("usersConnection", userGroupCount);
    }
  }, [data, currentUserUsername, loading]);
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
      console.log("Group Details :", response.data);
      dispatch(fetchingMembersSuccessful(response.data));
      // Serialize the data before saving to localStorage
      const serializedData = JSON.stringify(response.data);
      localStorage.setItem("groupdata", serializedData);
      localStorage.setItem("Username", currentUserUsername);

      // Save the length of the groupMembers array to localStorage
      localStorage.setItem(
        "AllMembers",
        response.data.groupMembers.length
      );

      Navigate("/dashboard/groups/contribution");
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
        <div className="med account_rel">
          <h1>Groups</h1>

          {showLoader ? <Loading /> : null}

          {loading ? (
            <Loading />
          ) : data && data.length > 0 ? (
            data.map((thriftGroup) => ( 
              <div
              onClick={() => handleGroupMembers(thriftGroup.groupName)}
                key={thriftGroup._id}
                title="Contribuctions"
                className="card w-100 mx-auto  text-decoration-none  rounded-3 my-3 py-1  px-3 shadow eachgroups clickable"
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

                  <div>
                    {thriftGroup.verifiedMembers.map((member, index) => (
                      <span key={index}>
                        {member.username === currentUserUsername
                          ? member.verified
                            ? "✅"
                            : "✖️"
                          : null}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoGroups />
          )}
          {data && data.length > 0 ? (
            <Link to="/dashboard/createThrift" className="text-primary create fw-bold">
              Create A Thrift{" "}
              <AiOutlineArrowRight
                style={{ fontWeight: "500", fontSize: "17px" }}
              />
            </Link>
          ) : null}
        </div>
    </div>
  );
};

export default Groups;
