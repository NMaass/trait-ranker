import React from "react";
import { Grid } from "@mui/material";
import FlipCard from "./FlipCard";

const SmallTraitList = ({ traits }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      {traits.splice(0, 7).map((trait, index) => {
        return (
          <Grid item>
            <FlipCard trait={trait} index={index} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default SmallTraitList;
