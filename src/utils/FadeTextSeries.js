import React, { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";

const FadeTextSeries = ({ stringArray, variant }) => {
  const [currentText, setCurrentText] = useState(stringArray[0]);
  const [checked, setChecked] = useState(true);
  const fadeTime = 3000;

  useEffect(() => {
    let count = 0;

    setInterval(() => {
      setChecked((prev) => !prev);
    }, fadeTime);

    setInterval(() => {
      if (count !== stringArray.length - 1) {
        count++;
        setCurrentText(stringArray[count]);
      } else {
        setCurrentText("");
      }
    }, fadeTime * 2);
  }, []);

  return (
    <Fade
      in={checked}
      timeout={{
        enter: fadeTime * 1.9,
        exit: fadeTime * 1.9,
      }}
    >
      <Typography sx={{minHeight: '1.9rem', marginTop: '1vh'}} variant={variant}>{currentText}</Typography>
    </Fade>
  );
};
export default FadeTextSeries;
