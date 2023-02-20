import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Dialogbox = ({ open, handleClose, handleConfirm, handleCancle }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="alert-dialog"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record"}</DialogTitle>
        <DialogContent className="alert-dialog-content">
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to delete this record?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="alert-dialog-actions">
          <button
            onClick={handleCancle}
            className="smt-btn dialog-btn"
            // className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 mx-5 border border-blue-500 hover:border-transparent rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="smt-btn dialog-btn"
            // className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 mx-5 border border-blue-500 hover:border-transparent rounded"
            autoFocus
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dialogbox;
