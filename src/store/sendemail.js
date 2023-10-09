import { createSlice } from "@reduxjs/toolkit";
const initialSendMail = {
  emails: [],
  userEmail: "",
  userName: localStorage.getItem("userName") || "",
  totalMails: 0,
  unreadMails: 0,
  senderMail: localStorage.getItem("userEmail") || "",
  isDataChanged: false,
};
const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: initialSendMail,
  reducers: {
    userEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    userName: (state, action) => {
      state.userName = action.payload;
    },

    sendEmailHandler: (state, action) => {
      state.totalMails++;
      state.unreadMails++;
      state.isDataChanged = true;
      state.emails.push({
        id: Math.random() * 10,
        name: state.userName,
        subject: action.payload.subject,
        body: action.payload.body,
        time: `${new Date().getHours()}:${
          new Date().getMinutes().length === 1 ? "0" : ""
        }${new Date().getMinutes()}`,
        isRead: false,
        senderMail: state.senderMail,
      });
    },
    fetchSentEmails: (state, action) => {
      state.emails = action.payload.emails;
      state.totalMails = action.payload.totalMails;
      state.unreadMails = action.payload.unreadMails;
    },
  },
});
export const sendEmailSliceActions = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
