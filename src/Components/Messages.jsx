import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import FetchUserByToken from "./FetchUserByToken";
import { useNavigate } from "react-router-dom";
import GetLink from "../Redux/GetLink";

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for fetching from fetcheduser
  const { fetchedUser } = useSelector((state) => state.AllUsers);
  const userName = fetchedUser?.user?.username;
  const Welcomemessage = fetchedUser?.message;
  const date = fetchedUser?.user?.date;
  const Time = fetchedUser?.user?.time;
  const message = `Hi, ${userName}! Welcome to Ultimate microfinance bank. We're glad to have you on board.`;

  // fetching from getlink
  const {fetchedLink} = useSelector((state)=> state.GetLink)
  const groupMessage = fetchedLink.message
  const greetings = `Hi ${userName},`
  const createddate = fetchedLink.date;
  const createdTime = fetchedLink.time

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to signup page if token is not available
      navigate("/signup");
      alert("User not found, try signing up for a new account");
    } else {
      FetchUserByToken(token, dispatch);
    }
  }, [dispatch]);

  return (
    <div>
      <AppNav />
      <div className="row w-100 h-100">
        <div className=" col-3 d-none d-md-block">
          <Sidenav />
        </div>
        <div className="col-12 col-sm-9 col-md-9 med account_rel">
          <h1>Messages</h1>
          <div className="p-2 bg-light rounded-2" style={{ position: "relative" }}>
            <h6 className=""> Welcome Message </h6>
            <p className="text-secondary ">{message} {Welcomemessage}</p>
            <p>{Time}</p>
            <p style={{ position: "absolute", right: "4%", bottom: "-10px" }}>{date}</p>
          </div>
          <div className="p-2 bg-light rounded-2 my-3" style={{ position: "relative" }}>
            <h6 className=""> Group Message </h6>
            <p className="text-secondary ">{greetings} {groupMessage}</p>
            <p>{createdTime}</p>
            <p style={{ position: "absolute", right: "4%", bottom: "-10px" }}>{createddate}</p>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Messages;
