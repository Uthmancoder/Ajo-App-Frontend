import React from "react";
import GetLink from "../Redux/GetLink";
import { useSelector } from "react-redux";

const GroupLink = () => {
  const { fetchedLink } = useSelector((state) => state.GetLink);
  const grouplink = fetchedLink?.link;
  const groupLink = localStorage.getItem("fetchedlink")
  console.log(grouplink);

  const copyLink = (ev) => {
    ev.preventDefault();
  };

  return (
    <div>
      <div className="groupLink">
        <form action="" className="card w-50 mx-auto p-5 shadow rounded-2">
          <div className="linkarea">
            <p className="text-primary text-center my-3">Here is the group link, you can share to people to add more users to your group</p>
            <h1>{groupLink}</h1> <button onClick={copyLink}>C</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupLink;
