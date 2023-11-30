import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchUserByToken from "./FetchUserByToken";
import { useNavigate } from "react-router-dom";


const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages } = useSelector((state) => state.AllMessages);
  console.log("here are the messages :", messages);

  const token = localStorage.getItem("token");

  // Use the custom hook
  FetchUserByToken(token);

  useEffect(() => {
    if (!token) {
      // Redirect to the signup page if the token is not available
      navigate("/signup");
      alert("User not found, try signing up for a new account");
    }
  }, [navigate, token]);

  return (
    <div>
      <div className="med account_rel">
        <h1>Messages</h1>
        {/* <div className="p-2 bg-light shadow-sm rounded-2" style={{ position: "relative" }}>
          <h6 className=""> Welcome Message </h6>
          <p className="text-secondary">
            {message} {Welcomemessage}
          </p>
          <p>{Time}</p>
          <p style={{ position: "absolute", right: "4%", bottom: "-10px", fontSize: "13px" }}>{date}</p>
        </div> */}
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((notification, index) => (
            <div key={index} className="p-2 bg-light shadow-sm rounded-2 my-3" style={{ position: "relative" }}>
              {notification && notification.message ? (
                <p className="text-secondary">{notification.message}</p>
              ) : (
                <p className="text-secondary">Message not available</p>
              )}
              {notification && notification.time && (
                <p className="text-secondary" style={{ position: "absolute", right: "4%", bottom: "-10px", fontSize: "13px" }}>
                  {notification.time}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-secondary p-2 bg-light rounded-2 my-3">Ultimate Microfinance Bank provides suggestions for connecting with friends. Connect and contribute with people you know and display profile pictures of potential friends the user might recognize based on their email contacts or other connections</p>
        )}

      </div>
    </div>
  );
};

export default Messages;
