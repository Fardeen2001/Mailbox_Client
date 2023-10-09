import { Delete, StarOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "../EmailList/EmailBody.module.css";

const SentMailsBody = (props) => {
  const showWords = 10;
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const words = container.textContent.split(" ");
      if (words.length > showWords) {
        container.innerHTML = words.slice(0, showWords).join(" ") + "...";
      }
    }
  }, [props.body, showWords]);
  const deleteHandler = () => {};
  const clickHandler = () => {};
  return (
    <div className={classes.emailBody}>
      <div className={classes.checkBox}>
        <input type="checkbox" name={props.Name} id={props.id} />
      </div>
      <Link
        to={`/emailDetails/${props.id}`}
        key={props.id}
        className={classes.link}
        onClick={clickHandler}
      >
        <div className={classes.emailBodyLeft}>
          <p style={{ color: "#1976d2", marginLeft: "10px" }}>{props.icon}</p>
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

export default SentMailsBody;
