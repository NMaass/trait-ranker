import React from "react";
import { Grid } from "@mui/material";
import FlipCard from "./FlipCard";

// Renders the final ranking, #1 at the top. The reveal animates bottom-up so
// the list counts down to the user's top trait.
const SmallTraitList = ({ traits }) => {
  const shown = traits.slice(0, 7);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
      sx={{ width: "100%", gap: { xs: 0.5, sm: 0.75 } }}
    >
      {shown.map((trait, index) => (
        <Grid
          item
          key={trait}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
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
