import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { traitIcons } from "../utils/listOfAllTraits";
import { IconContext } from "react-icons";

const FlipCard = ({ trait, index }) => {
  const [value, setValue] = useState("");
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlip(true);
      setTimeout(() => setValue(trait), 500);
    }, index * 500);
  });
  return (
    <Card className={`wideCard ${flip && "flip"}`} style={{ margin: ".5vw" }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
          style={{ marginTop: "-8vw" }} //for some reason this is the only thing I could vertically center content with
        >
          <Grid item>
            <IconContext.Provider value={{ size: "9vw" }}>
              {traitIcons[value]}
            </IconContext.Provider>
          </Grid>
          <Grid item>
            <h3>{value}</h3>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlipCard;
