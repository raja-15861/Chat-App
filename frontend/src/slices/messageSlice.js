import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  messages: [],
  selectedUser: null,
  loading: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUsers,
  setMessages,
  setSelectedUser,
  addMessage,
  setLoading,
} = messageSlice.actions;
export default messageSlice.reducer;

