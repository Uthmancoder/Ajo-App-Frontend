// UnreadMessagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unreadMessages: 0,
};

const UnreadMessages = createSlice({
  name: "UnreadMessages",
  initialState,
  reducers: {
    incrementUnreadMessages: (state) => {
      state.unreadMessages += 1;
    },
    resetUnreadMessages: (state) => {
      state.unreadMessages = 0;
    },
  },
});

export const { incrementUnreadMessages, resetUnreadMessages } = UnreadMessages.actions;

export default UnreadMessages.reducer;
