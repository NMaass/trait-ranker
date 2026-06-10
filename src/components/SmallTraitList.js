import React from "react";
import { Grid } from "@mui/material";
import FlipCard from "./FlipCard";

// Renders the final ranking, #1 at the top. The reveal animates bottom-up so
// the list counts down to the user's top trait.
const SmallTraitList = ({ traits }) => {
  const shown = traits.slice(0, 7);
  return (
    <Grid container direction="column" alignItems="center">
      {shown.map((trait, index) => (
        <Grid item key={trait}>
          <FlipCard
            trait={trait}
            rank={index + 1}
            delay={(shown.length - 1 - index) * 500}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default SmallTraitList;
