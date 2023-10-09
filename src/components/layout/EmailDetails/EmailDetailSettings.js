import React from "react";
import classes from "./EmailDetailSettings.module.css";
import {
  Archive,
  ArrowBack,
  Close,
  Delete,
  DriveFolderUpload,
  ExpandMore,
  Forward,
  GppBad,
  MoreHoriz,
  Reply,
  ReplyAll,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmailDetailsSetting = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className={classes.setting}>
      <div className={classes.settingLeft}>
        <IconButton onClick={backHandler}>
          <ArrowBack />
        </IconButton>
        Back
        <IconButton>
          <Reply />
        </IconButton>
        <IconButton>
          <ReplyAll />
        </IconButton>
        <IconButton>
          <Forward />
        </IconButton>
      </div>
      <div className={classes.settingMiddle}>
        <p>
          {" "}
          <IconButton>
            <Archive />
          </IconButton>
          Archive
        </p>
        <p>
          {" "}
          <IconButton>
            <DriveFolderUpload />
          </IconButton>
          Move
        </p>
        <p>
          {" "}
          <IconButton>
            <Delete />
          </IconButton>
          Delete
        </p>
        <p>
          {" "}
          <IconButton>
            <GppBad />
          </IconButton>
          Spam
        </p>
        <p>
          {" "}
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </p>
      </div>
      <div className={classes.settingRight}>
        <p>
          <IconButton>
            <ExpandMore />
          </IconButton>
          <IconButton onClick={backHandler}>
            <Close />
          </IconButton>
        </p>
      </div>
    </div>
  );
};

export default EmailDetailsSetting;
