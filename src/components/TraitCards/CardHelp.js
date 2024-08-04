import React from "react";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlipIcon from "@mui/icons-material/Flip";

const CardHelp = ({ toggleFlipped, flipped }) => {
  return (
    <IconButton
      onClick={toggleFlipped}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      {flipped ? <FlipIcon /> : <HelpOutlineIcon />}
    </IconButton>
  );
};

export default CardHelp;
