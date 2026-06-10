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
    const timer = setTimeout(() => {
      setFlip(true);
      setTimeout(() => setValue(trait), 500);
    }, delay);
    return () => clearTimeout(timer);
    // Reveal runs once; trait/delay are fixed for the life of the card.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={`wideCard ${flip ? "flip" : ""}`}>
      <CardContent sx={{ height: "100%", py: 0, "&:last-child": { pb: 0 } }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          wrap="nowrap"
          sx={{ height: "100%" }}
        >
          <Grid item>
            <Typography
              sx={{
                width: "1.75rem",
                fontWeight: 700,
                color: "text.secondary",
              }}
              align="center"
            >
              {rank}
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <IconContext.Provider
              value={{
                style: {
                  width: "clamp(28px, 4vh, 40px)",
                  height: "clamp(28px, 4vh, 40px)",
                },
              }}
            >
              {traitIcons[value]}
            </IconContext.Provider>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="span">
              {value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlipCard;
