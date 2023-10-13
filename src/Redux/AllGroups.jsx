import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isfetching: false,
  fetchedGroups: [],
  fetchedError: null,
};

const AllGroupsSlice = createSlice({
  initialState,
  name: "AllGroups",
  reducers: {
    fetchGroups: (state) => {
      state.isfetching = true;
    },
    fetchGroupsSuccess: (state, actions) => {
      state.isfetching = false;
      state.fetchedGroups = actions.payload;
    },
    fetchGroupsFailure: (state, actions) => {
      state.isfetching = false;
      state.fetchedError = actions.payload;
    },
  },
});

export const { fetchGroups, fetchGroupsSuccess, fetchGroupsFailure } = AllGroupsSlice.actions;
export default AllGroupsSlice.reducer;
