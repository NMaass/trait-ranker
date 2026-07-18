import React, { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";
import useBreakpoint from "./useBreakpoint";
import { coachingTextSx } from "../style/coachingText";

const FadeTextSeries = ({ stringArray = [] }) => {
  const [currentText, setCurrentText] = useState("");
  const [checked, setChecked] = useState(true);
  const [count, setCount] = useState(0);
  const fadeTime = 2000;
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (stringArray.length > 0) {
      setCurrentText(stringArray[0]);
      setCount(0);
      setChecked(true);
    }
  }, [stringArray]);

  const handleExited = () => {
    if (count < stringArray.length - 1) {
      setCount((prevCount) => prevCount + 1);
      setCurrentText(stringArray[count + 1]);
      setChecked(true);
    } else {
      setCurrentText("");
    }
  };

  const handleEntered = () => {
    setTimeout(() => {
      setChecked(false);
    }, fadeTime);
  };

  return (
    <Fade
      in={checked}
      timeout={{
        enter: fadeTime * 0.35,
        exit: fadeTime * 0.7,
      }}
      onExited={handleExited}
      onEntered={handleEntered}
    >
      <Typography
        // Shared style with the Ranking prompt (see style/coachingText).
        sx={coachingTextSx}
        align="center"
        variant={isDesktop ? "h5" : "subtitle1"}
      >
        {currentText}
      </Typography>
    </Fade>
  );
};

export default FadeTextSeries;
