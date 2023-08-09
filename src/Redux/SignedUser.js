import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isfetching : false,
    fetchedUser : [],
    fetchFailed : null
};

const signedUser = createSlice({
    name : "SignedUser",
    initialState,
    reducers : {
      FetchingUser : (state)=>{
      state.isfetching =  true;
      state.fetchedUser = [];
      state.fetchFailed = null;
      }, 
      fetchingSuccesful : (state, action) => {
        state.isfetching = false;
        state.fetchedUser =  action.payload
        state.fetchFailed = null
      },
      fetchingError : (state, action) =>{
        state.isfetching = false;
        state.fetchedUser = null
        state.fetchFailed = action.payload
      }
    }
})


export const {FetchingUser, fetchingSuccesful, fetchingError} =signedUser.actions
export default signedUser.reducer 