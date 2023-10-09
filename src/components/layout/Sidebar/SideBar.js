import React, { useState } from "react";
import classes from "./SideBar.module.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SideBarOptions from "./SideBarOptions";
import {
  DocumentScanner,
  GppBad,
  Inbox,
  Logout,
  Photo,
} from "@mui/icons-material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import StarIcon from "@mui/icons-material/Star";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { modalSliceActions } from "../../../store/modal";

const SideBar = () => {
  const dispatch = useDispatch();
  const numberOfMails = useSelector((state) => state.fetchEmail.totalMails);
  const numberOfSentMails = useSelector((state) => state.sendEmail.totalMails);
  const totalUnreadMails = useSelector((state) => state.fetchEmail.unreadMails);
  const navigate = useNavigate();
  const [active, setActive] = useState("Inbox");
  const logoutHandler = () => {
    dispatch(authSliceActions.logout());
    navigate("/auth", { replace: true });
  };
  const openHandler = () => {
    dispatch(modalSliceActions.closeHandler());
  };
  const activeHandler = (options) => {
    setActive(options);
  };

  return (
    <div className={classes.sidebar}>
      <Button
        startIcon={<AddIcon />}
        className={classes.composeBtn}
        onClick={openHandler}
      >
        Compose
      </Button>
      <Link
        to="/"
        className={classes.links}
        onClick={() => {
          activeHandler("Inbox");
        }}
      >
        <SideBarOptions
          icon={<Inbox />}
          title={"Inbox"}
          number={numberOfMails}
          isActive={active === "Inbox"}
        />
      </Link>
      <Link
        to="/unreadMails"
        className={classes.links}
        onClick={() => {
          activeHandler("Unread");
        }}
      >
        <SideBarOptions
          icon={<MarkEmailUnreadIcon />}
          title={"Unread"}
          number={totalUnreadMails}
          isActive={active === "Unread"}
        />
      </Link>
      <SideBarOptions
        icon={<StarIcon />}
        title={"Stared"}
        //number={"55"}
        //isActive={true}
      />
      <SideBarOptions
        icon={<DraftsIcon />}
        title={"Drafts"}
        //number={"55"}
        //  isActive={true}
      />
      <Link
        to="/sentMails"
        className={classes.links}
        onClick={() => {
          activeHandler("SendBox");
        }}
      >
        <SideBarOptions
          icon={<SendIcon />}
          title={"Sent"}
          number={numberOfSentMails}
          isActive={active === "SendBox"}
        />
      </Link>
      <SideBarOptions
        icon={<GppBad />}
        title={"Spam"}
        //number={"55"}
        // isActive={true}
      />
      <SideBarOptions
        icon={<DeleteIcon />}
        title={"Deleted/Trash"}
        //number={"55"}
        //isActive={true}
      />
      <div className={classes.view}>
        <h3 className={classes.SideBarOptionsHeading}>Views</h3>
        <SideBarOptions
          icon={<Photo />}
          title={"Photos"}
          //isActive={true}
        />
        <SideBarOptions
          icon={<DocumentScanner />}
          title={"Documents"}
          //isActive={true}
        />
      </div>
      <div className={classes.view}>
        <h3 className={classes.SideBarOptionsHeading}>Folder</h3>
        <SideBarOptions
          icon={<CreateNewFolderIcon />}
          title={"New Folder"}
          //isActive={true}
        />
      </div>
      <Button
        startIcon={<Logout />}
        className={classes.composeBtn}
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
};

export default SideBar;
