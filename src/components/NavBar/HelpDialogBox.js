import React, { forwardRef } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpDialogBox = ({ currentPage }) => {
  const [open, setOpen] = React.useState(false);
  const [grow, setGrow] = React.useState(false);

  const doGrow = () => {
    setGrow(true);
    setTimeout(() => {
      setGrow(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    doGrow();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const isMobile = useMediaQuery("(min-width:1024px)");
  const helpData = {
    Selection: {
      title: "Selection",
      description: `Trait Ranker helps you discover and prioritize your most important personality traits. ${
        isMobile ? "Drag" : "Swipe "
      } right to mark a trait as valuable or left to skip it. Press the help button anytime for guidance.`,
      media:
        "https://github.com/NMaass/trait-ranker/blob/master/src/Assets/MobileDrag.gif",
    },
  };

  return (
    <div>
      <IconButton
        size="large"
        onClick={handleOpen}
        className={`${grow && "grow"}`}
      >
        <HelpOutlineIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        TransitionComponent={Transition}
        open={open}
        fullScreen
        style={{
          marginTop: "10vh",
          marginLeft: "1vw",
          marginRight: "1vw",
        }}
        PaperProps={{
          style: { borderTopLeftRadius: 6, borderTopRightRadius: 6 },
        }}
      >
        <DialogTitle>{helpData[currentPage].title}</DialogTitle>
        <IconButton
          style={{ position: "absolute", right: "0", top: "0" }}
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContentText
          paragraph={false}
          style={{ margin: 10 }}
        ></DialogContentText>
      </Dialog>
    </div>
  );
};
export default HelpDialogBox;
