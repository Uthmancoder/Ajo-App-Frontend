import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  fetchedUser: [],
  fetchingError: null,
  isPosting: false,
  postingSuccess: null,
  postingError: null,
};

const GroupUsers = createSlice({
  name: "GroupUsers",
  initialState,
  reducers: {
    fetchingMembers: (state) => {
      state.isFetching = true;
      state.fetchedUser = [];
      state.fetchingError = null;
    },
    fetchingMembersSuccessful: (state, action) => {
      state.isFetching = false;
      state.fetchedUser = action.payload;
      state.fetchingError = null;
    },
    fetchingMembersFailed: (state, action) => {
      state.isFetching = false;
      state.fetchedUser = null;
      state.fetchingError = action.payload;
    },
    PostingMembers: (state) => {
      state.isPosting = true;
      state.postingSuccess = null;
      state.postingError = null;
    },
    PostingMembersSuccessful: (state, action) => {
      state.isPosting = false;
      state.postingSuccess = action.payload;
      state.postingError = null;
    },
    PostingMembersFailed: (state, action) => {
      state.isPosting = false;
      state.postingSuccess = null;
      state.postingError = action.payload;
    },
  },
});

export const {
  fetchingMembers,
  fetchingMembersSuccessful,
  fetchingMembersFailed,
  PostingMembers,
  PostingMembersSuccessful,
  PostingMembersFailed,
} = GroupUsers.actions;

export default GroupUsers.reducer;
