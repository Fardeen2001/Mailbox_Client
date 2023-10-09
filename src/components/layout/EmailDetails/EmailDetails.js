import React from "react";
import EmailDetailsSetting from "./EmailDetailSettings";
import classes from "./EmailDetails.module.css";
import { Print, StarOutline } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Emaildetails = () => {
  const { Id } = useParams();
  const emails = useSelector((state) => state.fetchEmail.emails);
  const sentMails = useSelector((state) => state.sendEmail.emails);
  const email =
    emails.find((email) => email.id === parseFloat(Id)) ||
    sentMails.find((email) => email.id === parseFloat(Id));

  return (
    <div className={classes.emailDetails}>
      <EmailDetailsSetting />
      <div className={classes.EmaildetailsHeader}>
        <div className={classes.EmaildetailsHeaderLeft}>
          <h4>{email.subject}</h4>
        </div>
        <div className={classes.EmaildetailsHeaderRight}>
          <StarOutline data-testid="star-icon" />
          <p>Your inbox</p>
        </div>
      </div>
      <div className={classes.Emaildetailsbody}>
        <div className={classes.EmaildetailsbodyHeader}>
          <div className={classes.EmaildetailsBodyLeft}>
            <div className={classes.avatar}>
              <Avatar sx={{ height: "30px", width: "30px" }} />
            </div>
            <div className={classes.name}>
              <h4>{email.name}</h4>
              <h5>From: {email.senderMail}</h5>
            </div>
          </div>
          <div className={classes.EmaildetailsBodyRight}>
            <IconButton>
              <Print />
            </IconButton>

            <p>{email.time}</p>
          </div>
        </div>
        <div className={classes.msg}>
          <div dangerouslySetInnerHTML={{ __html: email.body }} />
        </div>
      </div>
    </div>
  );
};

export default Emaildetails;
