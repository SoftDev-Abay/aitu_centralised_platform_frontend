import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") || null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
