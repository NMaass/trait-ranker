import React, { useContext } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import logo512 from "../../Assets/logo512.png";
import { ResetContext } from "../App";

const HomeButton = ({ history }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const reset = useContext(ResetContext);

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
    // Match the dialog's promise to the user: reset clears localStorage and
    // resets in-memory state, then we navigate to the start.
    if (typeof reset === "function") reset();
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
        aria-label="Return to home"
        style={{ maxWidth: "7vh", maxHeight: "7vh" }}
      >
        {/* Recolor the PNG logo at render time so its fill matches whatever
            the theme uses for AppBar contrast (white). The PNG acts as a mask;
            the visible color comes from `bgcolor`. */}
        <Box
          aria-hidden="true"
          sx={{
            width: "7vh",
            height: "7vh",
            bgcolor: "primary.contrastText",
            WebkitMaskImage: `url(${logo512})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: `url(${logo512})`,
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
          }}
        />
      </IconButton>
    </>
  );
};
export default HomeButton;
