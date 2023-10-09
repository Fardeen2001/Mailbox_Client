import React, { useEffect, useRef } from "react";
import classes from "./EmailBody.module.css";
import { Delete, StarOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmailActions } from "../../../store/fetchemail";

const EmailBody = (props) => {
  const showWords = 10;
  const containerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const words = container.textContent.split(" ");
      if (words.length > showWords) {
        container.innerHTML = words.slice(0, showWords).join(" ") + "...";
      }
    }
  }, [props.body, showWords]);
  const deleteHandler = () => {
    dispatch(fetchEmailActions.deleteEmail(props.id));
  };
  const clickHandler = () => {
    dispatch(fetchEmailActions.isRead({ id: props.id, isRead: true }));
  };

  return (
    <div className={classes.emailBody}>
      <div className={classes.checkBox}>
        <input type="checkbox" name={props.Name} id={props.id} />
      </div>
      <Link
        to={`/emailDetails/${props.id}`}
        key={props.id}
        onClick={clickHandler}
        className={classes.link}
      >
        <div className={classes.emailBodyLeft}>
          <p className={classes.icon}>{props.icon}</p>
          <h4>{props.Name}</h4>
        </div>

        <div className={classes.emailBodyMiddle}>
          <StarOutline data-testid="star-icon" />
          <div className={classes.emailBodyMiddleMsg}>
            <p>
              <b>{props.subject}</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.body,
                }}
                ref={containerRef}
                className={classes.msgDiv}
              />
            </p>
          </div>
        </div>
      </Link>
      <div className={classes.emailBodyRight}>
        <IconButton onClick={deleteHandler}>
          <Delete />
        </IconButton>
        <p>{props.time}</p>
      </div>
    </div>
  );
};

export default EmailBody;
