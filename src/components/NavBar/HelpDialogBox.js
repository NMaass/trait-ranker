import React, { forwardRef } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpDialogBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        TransitionComponent={Transition}
        open={open}
      >
        <DialogContentText paragraph={false} className="helpDialog">
          <br />
          1. Drag traits to the left or right depending on whether you value
          them.
          <br />
          <br />
          2. Click on the traits you value more.
          <br />
          <br />
          3. Click the share buttons to show your friends!
          <br />
        </DialogContentText>
      </Dialog>
    </div>
  );
};
export default HelpDialogBox;
