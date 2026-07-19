import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { traitIcons } from "../utils/listOfAllTraits";
import { IconContext } from "react-icons";

// One row of the final ranking. Starts as a numbered empty slot, then flips
// to reveal its trait after `delay` ms.
const FlipCard = ({ trait, rank, delay = 0 }) => {
  const [value, setValue] = useState("");
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setValue("");
    setFlip(false);
    let valueTimer;
    const flipTimer = setTimeout(() => {
      setFlip(true);
      valueTimer = setTimeout(() => setValue(trait), 500);
    }, delay);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(valueTimer);
    };
  }, [trait, delay]);

  return (
    <Card
      className={flip ? "flip" : ""}
      sx={{
        width: "min(100%, 480px)",
        height: { xs: "clamp(44px, 7dvh, 58px)", sm: "clamp(56px, 8vh, 72px)" },
        flexShrink: 0,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          boxSizing: "border-box",
          px: { xs: 1, sm: 2 },
          py: 0,
          "&:last-child": { pb: 0 },
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          wrap="nowrap"
          sx={{ height: "100%" }}
        >
          <Grid item>
            <Typography
              sx={{
                width: { xs: "1.35rem", sm: "1.75rem" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 700,
                color: "text.secondary",
                fontVariantNumeric: "tabular-nums",
              }}
              align="center"
            >
              {rank}
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", flexShrink: 0 }}>
            <IconContext.Provider
              value={{
                style: {
                  width: "clamp(24px, 4dvh, 36px)",
                  height: "clamp(24px, 4dvh, 36px)",
                },
              }}
            >
              {traitIcons[value]}
            </IconContext.Provider>
          </Grid>
          <Grid item sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              component="span"
              title={value}
              noWrap
              sx={{ fontSize: { xs: "0.95rem", sm: "1.25rem" } }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlipCard;
