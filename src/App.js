import Auth from "./components/auth/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  DeleteEmailsHandler,
  SendEmailData,
  fetchEmailData,
} from "./store/EmailThunk";
import Header from "./components/Header/";
import SideBar from "./components/layout/Sidebar/SideBar";
import classes from "./App.module.css";
import Emaildetails from "./Components/Layout/EmailDetails/Emaildetails";
import EmailList from "./components/layout/EmailList/EmailList";
import Compose from "../src/components/layout/Compose/Compose";
import Modal from "./UI/Modal";
import SentMails from "./Components/Layout/SentMails/SentMails";
import { fetchSentMails, sendingSentMails } from "./Store/sentMailsThunks";
import UnreadList from "./Components/Layout/Unread/UnreadList";
// import useFetch from "./Store/CustomHooks/useFetch";
// import { fetchEmailActions } from "./Store/fetchEmail";

let initialState = true;

function App() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);
  const sendingEmails = useSelector((state) => state.sendEmail);
  const userFetchEmail = useSelector((state) => state.auth.userEmail);
  const userSendEmail = useSelector((state) => state.sendEmail.userEmail);
  const emails = useSelector((state) => state.fetchEmail);

  const composeOpen = useSelector((state) => state.modal.isComposeOpen);
  const modalOpen = useSelector((state) => state.modal.isFullOpen);
  const close = useSelector((state) => state.modal.close);

  useEffect(() => {
    dispatch(fetchEmailData(userFetchEmail));
  }, [dispatch, userFetchEmail]);
  // const EditedMail = userFetchEmail.replace(/[@.]/g, "");
  // const [data] = useFetch(
  //   `https://client-mailbox-default-rtdb.asia-southeast1.firebasedatabase.app/userEmail${EditedMail}.json`
  // );
  // console.log("fetching Data", data);
  // data &&
  //   dispatch(
  //     fetchEmailActions.fetchEmail({
  //       emails: data.emails || [],
  //       totalMails: data.totalMails,
  //       unreadMails: data.unreadMails,
  //     })
  //   );
  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    dispatch(SendEmailData(sendingEmails, userSendEmail));
  }, [dispatch, sendingEmails, userSendEmail]);

  useEffect(() => {
    dispatch(fetchSentMails(userFetchEmail));
  }, [dispatch, userFetchEmail]);
  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    dispatch(sendingSentMails(sendingEmails, userFetchEmail));
  }, [dispatch, sendingEmails, userFetchEmail]);
  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    dispatch(DeleteEmailsHandler(emails, userFetchEmail));
  });

  return (
    <Router>
      <Routes>
        {!isAuthenticate && <Route exact path="/auth" element={<Auth />} />}
      </Routes>

      {!isAuthenticate ? (
        <Navigate to="/auth" />
      ) : (
        <>
          {" "}
          <Header />
          <div className={classes.body}>
            <SideBar />
            <Routes>
              <Route exact path="/" element={<EmailList />} />
              <Route
                exact
                path="/emailDetails/:Id"
                element={<Emaildetails />}
              />
              <Route exact path="/sentMails" element={<SentMails />} />
              <Route exact path="/unreadMails" element={<UnreadList />} />
            </Routes>
          </div>
          {composeOpen && close && <Compose />}
          {modalOpen && close && <Modal />}
        </>
      )}
    </Router>
  );
}

export default App;
