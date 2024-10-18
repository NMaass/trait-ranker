import React from "react";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlipIcon from "@mui/icons-material/Flip";
import "../../style/CardStyle.scss";

const CardHelp = ({ toggleFlipped, flipped, firstCard }) => {
  return (
    <IconButton
      onClick={toggleFlipped}
      style={{ position: "absolute", top: 5, right: 5 }}
      className={firstCard ? "icon-grow" : ""}
    >
      {flipped ? (
        <FlipIcon fontSize="large" />
      ) : (
        <HelpOutlineIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default CardHelp;
