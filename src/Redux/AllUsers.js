import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  fetchedUser: [],  
  fetchingError: null,
  isPosting: false,
  postingSuccess: null,
  postingError: null,
};

const AllUsers = createSlice({
  name: "AllUsers",
  initialState,
  reducers: {
    fetchingUser: (state) => {
      state.isFetching = true;
      state.fetchedUser = [];
      state.fetchingError = null;
    },
    fetchingSuccessful: (state, action) => {
      state.isFetching = false;
      state.fetchedUser = action.payload;
      state.fetchingError = null;
    },
    fetchingFailed: (state, action) => {
      state.isFetching = false;
      state.fetchedUser = null;
      state.fetchingError = action.payload;
    },
    PostingUser: (state) => {
      state.isPosting = true;
      state.postingSuccess = null;
      state.postingError = null;
    },
    PostingSuccessful: (state, action) => {
      state.isPosting = false;
      state.postingSuccess = action.payload;
      state.postingError = null;
    },
    PostingFailed: (state, action) => {
      state.isPosting = false;
      state.postingSuccess = null;
      state.postingError = action.payload;
    },
  },
});

export const {
  fetchingUser,
  fetchingFailed,
  fetchingSuccessful,
  PostingUser,
  PostingSuccessful,
  PostingFailed,
} = AllUsers.actions;

export default AllUsers.reducer;
