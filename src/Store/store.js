import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import model from "./model";
import fetchEmail from "./fetchEmail";
import sendEmail from "./sendEmail";

const store = configureStore({
  reducer: {
    auth: auth,
    modal: model,
    fetchEmail: fetchEmail,
    sendEmail: sendEmail,
  },
});
export default store;
