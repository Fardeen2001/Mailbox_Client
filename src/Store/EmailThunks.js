import { fetchEmailActions } from "./fetchEmail";
export const fetchEmailData = (userMail) => {
  const EditedMail = userMail.replace(/[@.]/g, "");
  return async (dispatch) => {
    const fetchRequest = async () => {
      const res = await fetch(
        `https://client-mailbox-default-rtdb.asia-southeast1.firebasedatabase.app/userEmail${EditedMail}.json`
      );
      if (!res.ok) {
        throw new Error("invalid");
      }
      const data = await res.json();

      return data;
    };

    try {
      const emailData = await fetchRequest();
      emailData &&
        dispatch(
          fetchEmailActions.fetchEmail({
            emails: emailData.emails || [],
            totalMails: emailData.totalMails,
            unreadMails: emailData.unreadMails,
          })
        );
    } catch (error) {
      alert(error.message);
    }
  };
};

export const DeleteEmailsHandler = (email, userMail) => {
  const EditedMail = userMail.replace(/[@.]/g, "");
  return async (dispatch) => {
    const DeleteHandler = async () => {
      const res = await fetch(
        `https://client-mailbox-default-rtdb.asia-southeast1.firebasedatabase.app/userEmail${EditedMail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            emails: email.emails,
            totalMails: email.totalMails,
            unreadMails: email.unreadMails,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Invalid while fetching");
      }
    };
    try {
      await DeleteHandler();
    } catch (error) {
      alert(error.message);
    }
  };
};

export const SendEmailData = (email, userSendEmail) => {
  const editedEmail = userSendEmail.replace(/[@.]/g, "");
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await fetch(
        `https://client-mailbox-default-rtdb.asia-southeast1.firebasedatabase.app/userEmail${editedEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            emails: email.emails,
            totalMails: email.totalMails,
            unreadMails: email.unreadMails,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Invalid while fetching");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      alert(error.message);
    }
  };
};