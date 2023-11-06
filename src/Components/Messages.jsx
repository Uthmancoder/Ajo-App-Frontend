import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchUserByToken from "./FetchUserByToken";
import { useNavigate } from "react-router-dom";
import GetLink from "../Redux/GetLink";

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for fetching from fetcheduser
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const {messages} = useSelector((state) => state.AllMessages)
  console.log("here are the messages :", messages)
  const userName = fetchedUser?.user?.username;
  const Welcomemessage = fetchedUser?.message;
  const date = fetchedUser?.user?.date;
  const Time = fetchedUser?.user?.time;
  const message = `Hi, ${userName}! Welcome to Ultimate microfinance bank. We're glad to have you on board.`;

  // fetching from getlink
  const { fetchedLink } = useSelector((state) => state.GetLink);
  const groupMessage = fetchedLink.message;
  const greetings = `Hi ${userName},`;
  const createddate = fetchedLink.date;
  const createdTime = fetchedLink.time;

  // getting the messages array from the local storage
  const AllMessages = JSON.parse(localStorage.getItem("transactionMessages"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to the signup page if the token is not available
      navigate("/signup");
      alert("User not found, try signing up for a new account");
    } else {
      FetchUserByToken(token, dispatch);
    }
  }, [dispatch]);

  return (
    <div>
      <div className="med account_rel">
        <h1>Messages</h1>
        <div className="p-2 bg-light shadow-sm rounded-2" style={{ position: "relative" }}>
          <h6 className=""> Welcome Message </h6>
          <p className="text-secondary">
            {message} {Welcomemessage}
          </p>
          <p>{Time}</p>
          <p style={{ position: "absolute", right: "4%", bottom: "-10px", fontSize: "13px" }}>{date}</p>
        </div>
        {AllMessages ? (
          AllMessages.map((message, index) => (
            <div key={index} className="p-2 bg-light shadow-sm rounded-2 my-3" style={{ position: "relative" }}>
              <p className="text-secondary">{message}</p>
              <p className="text-secondary" style={{ position: "absolute", right: "4%", bottom: "-10px", fontSize: "13px" }}>
                {createdTime}
              </p>
            </div>
          ))
        ) : (
          <p className="text-secondary p-2 bg-light rounded-2 my-3">Ultimate Microfinance Bank provides suggestions for connecting with friends.  Connect and contribute with people you know  and display profile pictures of potential friends the user might recognize based on their email contacts or other connections</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
