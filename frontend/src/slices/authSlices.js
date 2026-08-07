import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  signUpData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignupData: (state, action) => {
      state.signUpData = action.payload;
    },
  },
});

export const { setToken, logout, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;

