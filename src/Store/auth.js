import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  isAuthenticate: !!localStorage.getItem("auth") || false,
  token: localStorage.getItem("auth") || null,
  userName: localStorage.getItem("userName") || "",
  userEmail: localStorage.getItem("userEmail") || "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,

  reducers: {
    login: (state, action) => {
      state.isAuthenticate = true;
      state.token = action.payload.idToken;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      localStorage.setItem("auth", action.payload.idToken);
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("userEmail", action.payload.userEmail);
    },
    logout: (state, action) => {
      state.isAuthenticate = false;
      state.token = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    },
  },
});
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
