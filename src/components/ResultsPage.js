import React, { useContext, useEffect } from "react";
import CopyableLink from "./CopyableLink";
import { setDBTraits } from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";
import { Button, Grid } from "@mui/material";
import { trackResultsPage } from "../utils/mixpanel";
import { updateResultsProgress } from "../utils/progressManagement";
import { ResetContext } from "./App";
import { useHistory } from "react-router-dom";

const ResultsPage = ({ topTraits, userID, progressData, setProgressData }) => {
  const reset = useContext(ResetContext);
  const history = useHistory();

  useEffect(() => {
    trackResultsPage(topTraits);
    (async () => {
      console.log("setting traits", topTraits);
      await setDBTraits(userID, topTraits);
    })();
    setProgressData(updateResultsProgress(progressData, { traits: topTraits }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Display order is "highest at the bottom" per the original UI; build a copy
  // rather than mutating in place (the prior `topTraits.reverse()` mutated
  // App-level state, which silently flipped the list on every re-render).
  const displayTraits = [...(topTraits || [])].reverse();

  // Build the share link from the live origin so it stays correct across
  // domains (custom domain, github.io fallback, localhost dev). HashRouter
  // means everything after the `#` is the route the recipient lands on.
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://trait-ranker.nmaass.dev";
  const shareUrl = `${origin}/#/Share/${userID}`;

  const handleStartOver = () => {
    if (typeof reset === "function") reset();
    history.push("/");
  };

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
        <SmallTraitList traits={displayTraits} />
      </Grid>
      <Grid item sx={{ padding: "1rem" }}>
        <CopyableLink text={shareUrl} />
      </Grid>
      <Grid item sx={{ paddingTop: "0.5rem" }}>
        <Button onClick={handleStartOver} color="warning" variant="outlined">
          Start over
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResultsPage;
