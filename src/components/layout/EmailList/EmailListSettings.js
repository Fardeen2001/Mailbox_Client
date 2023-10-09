import React from "react";
import classes from "./EmailListSettings.module.css";
import { IconButton } from "@mui/material";
import {
  Archive,
  CheckBoxOutlineBlank,
  Delete,
  DriveFolderUpload,
  ExpandMore,
  GppBad,
  MoreHoriz,
} from "@mui/icons-material";

const EmailListSettings = () => {
  return (
    <div className={classes.setting}>
      <div className={classes.settingLeft}>
        <CheckBoxOutlineBlank />
        <ExpandMore />
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
          Sort
          <IconButton>
            <ExpandMore />
          </IconButton>
        </p>
      </div>
    </div>
  );
};

export default EmailListSettings;
