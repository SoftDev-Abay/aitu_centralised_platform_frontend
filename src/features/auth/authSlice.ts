import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") || null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
