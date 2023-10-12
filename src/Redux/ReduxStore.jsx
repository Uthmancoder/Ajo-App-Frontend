import { configureStore } from "@reduxjs/toolkit";
import FetchUserByToken from "../Components/FetchUserByToken";
import GroupUsers from "./GroupUsers";
import GetLink from "./GetLink";
import AllGroups from "./AllGroups";
import AllUsers from "./AllUsers";
import signedUser from "./SignedUser";

export const Store = configureStore({
    reducer : {
        AllUsers,
        signedUser,
        GroupUsers,
        GetLink,
        AllGroups
    }
})
// Retrieve the user token from local storage
const userToken = localStorage.getItem('token');

// Dispatch the FetchUserByToken action on page refresh
if (userToken) {
  FetchUserByToken(userToken, Store.dispatch);
}






