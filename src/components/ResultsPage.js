import React, { useEffect, useRef } from "react";
import makeId from "../utils/makeIdUtil";
import CopyableLink from "./CopyableLink";
import { setDBTraits } from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";
import { Grid } from "@mui/material";
import {trackResultsPage} from "../utils/mixpanel"

const ResultsPage = ({ topTraits, userID }) => {
  useEffect(() => {
    trackResultsPage(topTraits.current);
    console.log("tracking top traits", topTraits.current);
    (async () => {
      console.log("setting traits", topTraits.current);
      await setDBTraits(userID, topTraits.current);
    })();
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <h3>Top Traits</h3>
      </Grid>
      <Grid item>
        <SmallTraitList traits={topTraits.current.reverse()} />
      </Grid>
      <Grid item>
        <CopyableLink
          text={"https://nmaass.github.io/trait-ranker/#/Share/" + userID}
        />
      </Grid>
    </Grid>
  );
};

export default ResultsPage;
