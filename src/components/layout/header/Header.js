import { Avatar, IconButton } from "@mui/material";
import React from "react";
import classes from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandMore, Search, Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Header = () => {
  const userName = useSelector((state) => state.auth.userName);
  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <h1>Client MailBox</h1>
      </div>
      <div className={classes.headerMidddle}>
        <div className={classes.searchMail}>
          <IconButton>
            <Search />
          </IconButton>
          <input type="text" placeholder="Search Mail" />
          <IconButton>
            <ExpandMore />
          </IconButton>
        </div>
      </div>
      <div className={classes.headerRight}>
        <Avatar sx={{ width: 24, height: 24 }} />
        <h5>{userName}</h5>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
