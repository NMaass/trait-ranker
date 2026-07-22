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
      // Positive insets keep the icon fully inside both faces. The old
      // `top/right: -5` was measured against different ancestors per face —
      // the back face's rotateY transform makes IT the containing block, so
      // the back icon bled past the edge and got clipped by overflow:hidden.
      style={{ position: "absolute", top: 4, right: 4, zIndex: 2 }}
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
