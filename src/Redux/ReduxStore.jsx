import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a storage method (localStorage, sessionStorage, etc.)

// Import your reducers
import AllUsers from "./AllUsers";
import signedUser from "./SignedUser";
import GroupUsers from "./GroupUsers";
import GetLink from "./GetLink";
import AllGroups from "./AllGroups";
import AllMessages, { addMessage } from "./messages";
import UnreadMessages from "./UnreadMessages";

// Combine your reducers
const rootReducer = combineReducers({
  AllUsers,
  signedUser,
  GroupUsers,
  GetLink,
  AllGroups,
  AllMessages,
  UnreadMessages,
});

// Configure the persist options
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AllUsers", "signedUser", "AllMessages", "UnreadMessages", "GroupUsers"], // Define the reducers you want to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const Store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor object for persisting and rehydrating the Redux store
const persistor = persistStore(Store);

// Dispatch the FetchUserByToken action on page refresh
const userToken = localStorage.getItem("token");
if (userToken) {
  Store.dispatch(addMessage());
}

export { Store, persistor };









