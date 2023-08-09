import React, {useState} from 'react'
import { Link } from "react-router-dom";

const NoGroups = () => {
    const [activeButton, setActiveButton] = useState("create");

    const handleButtonClick = (button) => {
      setActiveButton(button);
    };
  return (
    <div>
        <div className="nogrops d-grid">
            <img
              className="w-50 mx-auto"
              alt=""
              src={require("../images/groups-removebg-preview (1).png")}
            />
            <p className="fw-bolder  text-secondary">
              There are no groups available currently kindly create a group or
              join an existing group
            </p>
            <div className="d-flex ">
              <Link to="/create" className="w-50 mx-2 p-2">
                <button
                  className={`btn ${
                    activeButton === "create"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } w-100 mx-2 p-3 `}
                  onClick={() => handleButtonClick("create")}
                >
                  Create a Thrift
                </button>
              </Link>
              <Link to="/groups" className="w-50 mx-2 p-2">
                <button
                  className={`btn ${
                    activeButton === "join"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } w-100 mx-2 p-3`}
                  onClick={() => handleButtonClick("join")}
                >
                  Join an existing group
                </button>
              </Link>
            </div>
          </div>
    </div>
  )
}

export default NoGroups