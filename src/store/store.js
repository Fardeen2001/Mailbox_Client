import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import fetchemail from "./fetchemail";
import sendemail from "./sendemail";

const store = configureStore({
  reducer: {
    auth: auth,
    modal: modal,
    fetchEmail: fetchemail,
    sendEmail: sendemail,
  },
});
export default store;
