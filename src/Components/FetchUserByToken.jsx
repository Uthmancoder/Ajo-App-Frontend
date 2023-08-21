import axios from "axios";
import { fetchingFailed, fetchingSuccessful } from "../Redux/AllUsers";

const FetchUserByToken = async (token, dispatch) => {
  const url = "https://ultimate-thrift.onrender.com/user/SaveCurrentUser";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response);
    console.log(response.data);
    dispatch(fetchingSuccessful(response.data)); // Dispatch the action to update the Redux store
  } catch (error) {
    console.log(error);
    dispatch(fetchingFailed(error.message));

    if (error.response) {
      // The request was made, but the server responded with an error status code
      if (error.response.status === 500) {
        alert("Session Expired");
      }
      // Handle other status codes as needed
    } else if (error.request) {
      // The request was made, but no response was received
      alert("Network Error");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    // Remove the token regardless of the error type
    localStorage.removeItem("token");

    throw new Error("Error fetching user data");
  }
};

export default FetchUserByToken;
