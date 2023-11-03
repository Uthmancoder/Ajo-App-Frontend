import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const AllMessages = createSlice({
    name: "AllMessages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload); // Append the new message
        },
    },
});

export const { addMessage } = AllMessages.actions;

export default AllMessages.reducer;
