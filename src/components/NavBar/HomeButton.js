import React from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import logo512 from "../../Assets/logo512.png";

const HomeButton = ({ history }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleHome = () => {
    setOpenDialog(true);
  };
  const ConfirmDialog = () => (
    <Dialog
      open={openDialog}
      onClose={handleCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{"Return to Home?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          Are you sure you want to return to the home page? Your current
          progress will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
          variant="contained"
          autoFocus
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="warning" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleConfirm = () => {
    setOpenDialog(false);
    history.push("/");
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <ConfirmDialog />
      <IconButton
        color="inherit"
        onClick={handleHome}
        style={{ maxWidth: "7vh", maxHeight: "7vh" }}
      >
        <img
          src={logo512}
          alt="The trait ranker icon"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </IconButton>
    </>
  );
};
export default HomeButton;
