import React from "react";
import EmailListSettings from "../EmailList/EmailListSettings";
import SentMailsBody from "./SentMailsBody";
import classes from "../EmailList/EmailList.module.css";
import { Reply } from "@mui/icons-material";
import { useSelector } from "react-redux";

const SentMails = () => {
  const sentEmails = useSelector((state) => state.sendEmail.emails);
  return (
    <div className={classes.emailList}>
      <EmailListSettings />
      {sentEmails.map((email) => (
        <SentMailsBody
          Name={email.name}
          id={email.id}
          key={email.id}
          subject={email.subject}
          body={email.body}
          time={email.time}
          icon={<Reply />}
        />
      ))}
    </div>
  );
};

export default SentMails;
