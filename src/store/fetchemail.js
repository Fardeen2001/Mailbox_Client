import { createSlice } from "@reduxjs/toolkit";
const initialFetchEmail = {
  emails: [],
  totalMails: 0,
  unreadMails: 0,
  userFetchEmail: localStorage.getItem("userEmail") || null,
  isDataChanged: false,
};
const fetchEmailSlice = createSlice({
  name: "fetchEmail",
  initialState: initialFetchEmail,
  reducers: {
    userEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    fetchEmail: (state, action) => {
      state.emails = action.payload.emails;
      state.totalMails = action.payload.totalMails;
      state.unreadMails = action.payload.unreadMails;
    },
    deleteEmail: (state, action) => {
      state.totalMails--;
      if (state.unreadMails >= 0) {
        state.unreadMails--;
      }
      state.isDataChanged = true;
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );
    },
    isRead: (state, action) => {
      state.isDataChanged = true;
      const existing = state.emails.findIndex(
        (email) => email.id === action.payload.id
      );
      if (existing !== -1) {
        state.emails[existing].isRead = true;
        if (state.unreadMails > 0) {
          state.unreadMails--;
        }
      }
    },
  },
});
export const fetchEmailActions = fetchEmailSlice.actions;
export default fetchEmailSlice.reducer;
