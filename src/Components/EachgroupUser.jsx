import React from "react";
import AppNav from "./AppNav";
import Sidenav from "./Sidenav";
import GroupUsers from "../Redux/GroupUsers";
import { useSelector } from "react-redux";
import GetLink from "../Redux/GetLink";
import CopyToClipboard from "./CopyToClipboard";
import Loading from "./Loading";

const EachgroupUser = () => {
  const { fetchedUser } = useSelector((state) => state.GroupUsers);
  const groupname = fetchedUser?.groupName;
  const groupMembers = fetchedUser?.groupMembers;
  const plan = fetchedUser?.plan;
  const { fetchedLink } = useSelector((state) => state.GetLink);
  console.log(fetchedLink);

  const isLoading = fetchedUser?.loading; // Add a loading check

  if (isLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }

  //getting group grouplinks
  const grouplink = fetchedLink?.link;
  const newLink = localStorage.getItem("fetchedLink");
  console.log(grouplink);
  const linkLoading = fetchedLink?.loading;
  if (linkLoading) {
    // Show a loading indicator or message
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // end of getting group link

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
      const week = []; // Create an array to hold the day labels

      for (let i = 1; i <= groupMembers.length; i++) {
        week.push(`Week ${i}`); // Add day labels to the array
      }

      return (
        <thead>
          <tr className="px-3">
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
    if (!groupMembers) {
      return (
        <p>Loading...</p>
      );
    } else {
      return (
        <tbody>
          {groupMembers.map((user, index) => (
            <tr key={index}>
              <td className="px-2 text-start">{user.username}</td>
              <td className="payment_status">
                {Array.isArray(user.payment) ? (
                  user.payment.map((payment, i) => (
                    payment.paid === true ? "✅" : "✖️"
                  ))
                ) : (
                  user.payment?.paid === true ? "✅" : "✖️"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
  };
  
  
  // end of table data

  return (
    <div>
      <AppNav />
      <div className="row w-100">
        <div className="col-3 d-none  d-md-block">
          <Sidenav />
        </div>
        <div className="col-9">
          <h1 className="fs-1 text-center text-primary fw-bolder mt-2">
            {groupname?.toUpperCase()}
          </h1>
          <table className="border rounded-3 w-100 p-3 text-center">
            {renderTableHeader()}
            {renderTableData()}
          </table>

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
                <CopyToClipboard text={newLink} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachgroupUser;
