import React from "react";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlipIcon from "@mui/icons-material/Flip";
import "../../style/CardStyle.scss";

// Each card face gets its own fixed icon: the front always shows the help
// "?", the back always shows the flip-back arrow. (It used to swap with the
// shared `flipped` state, so pressing it visibly changed the icon on the
// face you were looking at mid-flip.)
const CardHelp = ({ toggleFlipped, firstCard, icon = "help" }) => {
  return (
    <IconButton
      onClick={toggleFlipped}
      style={{ position: "absolute", top: -5, right: -5 }}
      className={firstCard ? "icon-grow" : ""}
      aria-label={icon === "flip" ? "Flip card back" : "Show definition"}
    >
      {icon === "flip" ? (
        <FlipIcon fontSize="large" />
      ) : (
        <HelpOutlineIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default CardHelp;
