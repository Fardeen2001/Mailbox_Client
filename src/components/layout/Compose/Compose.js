import React, { useRef, useState } from "react";
import classes from "./Compose.module.css";
import { Close, Delete, OpenInFull } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceActions } from "../../../store/modal";
import { sendEmailSliceActions } from "../../../store/sendemail";

const Compose = () => {
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const fullOpen = useSelector((state) => state.modal.isFullOpen);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const subjectHandler = (event) => {
    setSubject(event.target.value);
  };
  const openFullHandler = () => {
    dispatch(modalSliceActions.openFullHandlerfuc());
    dispatch(modalSliceActions.composeHandler());
  };
  const closeHandler = () => {
    dispatch(modalSliceActions.closeHandler());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(
      sendEmailSliceActions.sendEmailHandler({
        subject: subject,
        body: content,
      })
    );
    dispatch(sendEmailSliceActions.userEmail(email));
    setContent("");
    setEmail("");
    setSubject("");
    dispatch(modalSliceActions.closeHandler());
  };

  return (
    <div className={!fullOpen ? classes.compose : ""}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <span>New Message</span>
        </div>
        <div className={classes.headerRight}>
          <IconButton onClick={openFullHandler}>
            <OpenInFull />
          </IconButton>
          <IconButton onClick={closeHandler}>
            <Close />
          </IconButton>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.body}>
          <div className={classes.bodyForm}>
            <input
              type="email"
              placeholder="Receipents"
              required
              value={email}
              onChange={emailHandler}
            />
            <input
              type="text"
              placeholder="Subject"
              required
              value={subject}
              onChange={subjectHandler}
            />
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>
        <div className={classes.footer}>
          <Button variant="contained" type="submit">
            Send
          </Button>
          <IconButton>
            <Delete />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Compose;
