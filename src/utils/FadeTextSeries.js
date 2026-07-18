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
        // Mirrors the guidance line on the ranking page so coaching text has
        // one consistent home across the app.
        sx={{
          minHeight: "1.9rem",
          position: "absolute",
          top: "calc(64px + 1.5rem)",
          left: 0,
          width: "100%",
          // Keep the coaching line above the cards (.card is z-index:1) so it
          // is never painted behind a card if their bands meet (e.g. landscape
          // or a dynamic-viewport transition on mobile).
          zIndex: 3,
          color: "text.secondary",
          fontWeight: 500,
        }}
        align="center"
        variant={isDesktop ? "h5" : "subtitle1"}
      >
        {currentText}
      </Typography>
    </Fade>
  );
};

export default FadeTextSeries;
