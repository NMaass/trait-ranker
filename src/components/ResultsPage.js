import React, { useEffect, useRef } from "react";
import makeId from "../utils/makeIdUtil";
import CopyableLink from "./CopyableLink";
import { setDBTraits } from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";
import { Grid } from "@mui/material";
import { trackResultsPage } from "../utils/mixpanel";
import { updateResultsProgress } from "../utils/progressManagement";

const ResultsPage = ({ topTraits, userID, progressData, setProgressData }) => {
  useEffect(() => {
    trackResultsPage(topTraits);
    (async () => {
      console.log("setting traits", topTraits);
      await setDBTraits(userID, topTraits);
    })();
    setProgressData(updateResultsProgress(progressData, { traits: topTraits }));
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <h3>Top Traits</h3>
      </Grid>
      <Grid item>
        <SmallTraitList traits={topTraits.reverse()} />
      </Grid>
      <Grid item sx={{ padding: "1rem" }}>
        <CopyableLink
          text={"https://nmaass.github.io/trait-ranker/#/Share/" + userID}
        />
      </Grid>
    </Grid>
  );
};

export default ResultsPage;
