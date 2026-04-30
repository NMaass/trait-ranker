import React, { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";
import useBreakpoint from "./useBreakpoint";

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
        sx={{
          minHeight: "1.9rem",
          marginTop: "10vh",
          position: "absolute",
          width: "100%",
        }}
        align="center"
        variant={isDesktop ? "h3" : "h5"}
      >
        {currentText}
      </Typography>
    </Fade>
  );
};

export default FadeTextSeries;
