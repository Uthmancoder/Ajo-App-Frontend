import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  fetchedLink: [],  
  fetchingError: null,
};

const GetLink = createSlice({
  name: "GetLink",
  initialState,
  reducers: {
    fetchingLink: (state) => {
      state.isFetching = true;
      state.fetchedLink = [];
      state.fetchingError = null;
    },
    fetchingSuccessful: (state, action) => {
      state.isFetching = false;
      state.fetchedLink = action.payload;
      state.fetchingError = null;
    },
    fetchingFailed: (state, action) => {
      state.isFetching = false;
      state.fetchedLink = null;
      state.fetchingError = action.payload;
    },
  },
});

export const {
  fetchingLink,
  fetchingSuccessful,
  fetchingFailed,
} = GetLink.actions;

export default GetLink.reducer;
