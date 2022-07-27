import React from "react";
import { Button } from "@mui/material";

const HomeButton = ({ history }) => {
  const handleHome = () => {
    history.push("/");
  };
  return (
    <Button color="inherit" onClick={handleHome}>
      Trait Ranker
    </Button>
  );
};
export default HomeButton;


