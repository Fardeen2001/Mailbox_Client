import React from "react";
import EmailListSettings from "./EmailListSettings";
import classes from "./EmailList.module.css";
import EmailBody from "./EmailBody";
import { useSelector } from "react-redux";
import { FiberManualRecord } from "@mui/icons-material";

const EmailList = () => {
  const emails = useSelector((state) => state.fetchEmail.emails);

  return (
    <div className={classes.emailList}>
      <EmailListSettings />
      {emails.map((email) => (
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

export default EmailList;
