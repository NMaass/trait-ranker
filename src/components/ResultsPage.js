import React, { useContext, useEffect } from "react";
import CopyableLink from "./CopyableLink";
import { setDBTraits } from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";
import { Button, Grid, Typography } from "@mui/material";
import { trackResultsPage } from "../utils/mixpanel";
import { updateResultsProgress } from "../utils/progressManagement";
import { ResetContext } from "./App";
import { useHistory } from "react-router-dom";

const ResultsPage = ({ topTraits, userID, progressData, setProgressData }) => {
  const reset = useContext(ResetContext);
  const history = useHistory();

  useEffect(() => {
    trackResultsPage(topTraits);
    setDBTraits(userID, topTraits).catch(() => {
      // Saving for the share link is best-effort; the results screen itself
      // doesn't depend on it.
    });
    setProgressData(updateResultsProgress(progressData, { traits: topTraits }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // Top padding keeps the headline clear of the fixed app bar.
      style={{ height: "100vh", paddingTop: 72, boxSizing: "border-box" }}
    >
      <Grid item>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Your top traits
        </Typography>
      </Grid>
      <Grid item>
        <SmallTraitList traits={topTraits || []} />
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
