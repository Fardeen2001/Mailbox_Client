import React from "react";
import EmailListSettings from "../EmailList/EmailListSettings";
import classes from "../EmailList/EmailList.module.css";
import { FiberManualRecord } from "@mui/icons-material";
import EmailBody from "../EmailList/EmailBody";
import { useSelector } from "react-redux";

const UnreadList = () => {
  const emails = useSelector((state) => state.fetchEmail.emails);
  const unreadMails = emails.filter((emails) => {
    return emails.isRead === false;
  });
  return (
    <div className={classes.emailList}>
      <EmailListSettings />
      {unreadMails.map((email) => (
        <EmailBody
          Name={email.name}
          id={email.id}
          key={email.id}
          subject={email.subject}
          body={email.body}
          time={email.time}
          icon={!email.isRead && <FiberManualRecord />}
        />
      ))}
    </div>
  );
};

export default UnreadList;
