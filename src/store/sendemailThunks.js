import { sendEmailSliceActions } from "./sendemail";

export const fetchSentMails = (email) => {
  const EditedMail = email.replace(/[@.]/g, "");
  return async (dispatch) => {
    const fetchingSentMails = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}userSentEmails${EditedMail}.json`
      );
      if (!res.ok) {
        throw new Error("invalid while fetching");
      }
      const data = await res.json();
      return data;
    };
    try {
      const fetchedData = await fetchingSentMails();
      dispatch(
        sendEmailSliceActions.fetchSentEmails({
          emails: fetchedData.emails || [],
          totalMails: fetchedData.totalMails,
          unreadMails: fetchedData.unreadMails,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const sendingSentMails = (emailData, userEmail) => {
  const editedEmail = userEmail.replace(/[@.]/g, "");
  return async (dispatch) => {
    const sentMailsSending = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DATABASEID}userSentEmails${editedEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            emails: emailData.emails,
            totalMails: emailData.totalMails,
            unreadMails: emailData.unreadMails,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("invalid");
      }
    };
    try {
      await sentMailsSending();
    } catch (error) {
      console.log(error.message);
    }
  };
};
