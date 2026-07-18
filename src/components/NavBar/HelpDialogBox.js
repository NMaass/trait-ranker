import React, { forwardRef } from "react";
import {
  Dialog,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useLocation } from "react-router-dom";
import desktopDrag from "../../Assets/DesktopDrag.gif";
import useBreakpoint from "../../utils/useBreakpoint";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Map a route path to one of our help entries.
function pageFromPath(pathname) {
  const p = (pathname || "").toLowerCase();
  if (p.startsWith("/rank")) return "Rank";
  if (p.startsWith("/results")) return "Results";
  if (p.startsWith("/share")) return "Share";
  return "Selection";
}

const HelpDialogBox = () => {
  const [open, setOpen] = React.useState(false);
  const [grow, setGrow] = React.useState(false);
  const { isDesktop } = useBreakpoint();
  const location = useLocation();
  const page = pageFromPath(location?.pathname);

  const doGrow = () => {
    setGrow(true);
    setTimeout(() => {
      setGrow(false);
    }, 1000);
  };

  // Pulse once shortly after load so first-time visitors notice where help
  // lives, without interrupting anything.
  React.useEffect(() => {
    const timer = setTimeout(doGrow, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    doGrow();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const verb = isDesktop ? "Drag" : "Swipe";

  const helpData = {
    Selection: {
      title: "Selection",
      description: `Trait Ranker helps you discover and prioritize your most important personality traits. ${verb} right to mark a trait as valuable or left to skip it. Press the help button anytime for guidance.`,
      media: desktopDrag,
      mediaAlt:
        "Animated example of swiping a trait card right to keep it or left to pass.",
    },
    Rank: {
      title: "Ranking",
      description:
        "You'll see two traits at a time — tap the one that matters more to you. Repeat until your favorites bubble to the top. Use the undo button if you change your mind.",
      media: null,
    },
    Results: {
      title: "Your Top Traits",
      description:
        "These are your top seven traits, in priority order. Copy the share link to send your ranking to a friend, or start over to try again.",
      media: null,
    },
    Share: {
      title: "Shared Ranking",
      description:
        "You're looking at someone else's top traits. Try guessing their order, or just reveal the list — then take the quiz yourself.",
      media: null,
    },
  };

  const entry = helpData[page] || helpData.Selection;

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        className={`${grow && "grow"}`}
        aria-label="Open help"
        color="inherit"
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>

      <Dialog
        onClose={handleClose}
        TransitionComponent={Transition}
        open={open}
        fullScreen
        aria-labelledby="help-dialog-title"
        aria-describedby="help-dialog-body"
        style={{
          marginTop: "10vh",
          marginLeft: "1vw",
          marginRight: "1vw",
        }}
        PaperProps={{
          style: { borderTopLeftRadius: 6, borderTopRightRadius: 6 },
        }}
      >
        <DialogTitle id="help-dialog-title">{entry.title}</DialogTitle>
        <IconButton
          style={{ position: "absolute", right: "0" }}
          color="inherit"
          onClick={handleClose}
          aria-label="Close help"
        >
          <CloseIcon />
        </IconButton>
        <DialogContentText
          id="help-dialog-body"
          paragraph={false}
          style={{ margin: 10 }}
        >
          {entry.description}
        </DialogContentText>
        {entry.media && (
          <img
            src={entry.media}
            style={{ width: "100%" }}
            alt={entry.mediaAlt || ""}
          />
        )}
      </Dialog>
    </div>
  );
};
export default HelpDialogBox;
