import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("token", action.payload);
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
