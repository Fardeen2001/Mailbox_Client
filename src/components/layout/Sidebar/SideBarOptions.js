import React from "react";
import classes from "./SideBarOptions.module.css";
import { IconButton } from "@mui/material";

const SideBarOptions = (props) => {
  return (
    <div
      className={`${classes.SideBarOptions} ${
        props.isActive && classes.active
      }`}
      onClick={props.onClick}
    >
      <IconButton>{props.icon}</IconButton>
      <h4>{props.title}</h4>
      <p>{props.number}</p>
    </div>
  );
};

export default SideBarOptions;
