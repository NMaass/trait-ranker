import React from "react";
import { IconButton } from "@mui/material";
import logo512 from "../../Assets/logo512.png";

const HomeButton = ({ history }) => {
  const handleHome = () => {
    history.push("/");
  };
  return (
    <IconButton
      color="inherit"
      onClick={handleHome}
      style={{ maxWidth: "10vh", maxHeight: "10vh" }}
    >
      <img
        src={logo512}
        alt="The trait ranker icon"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </IconButton>
  );
};
export default HomeButton;
