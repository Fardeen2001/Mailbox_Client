import React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceActions } from "../store/modal";
import { DialogContent } from "@mui/material";
import Compose from "../components/layout/Compose/Compose";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isFullOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalSliceActions.openFullHandlerfuc());
    dispatch(modalSliceActions.composeHandler());
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullWidth
    >
      <DialogContent>
        <Compose />
      </DialogContent>
    </BootstrapDialog>
  );
};

export default Modal;
