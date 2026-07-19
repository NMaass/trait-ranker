import React, { useContext, useEffect } from "react";
import CopyableLink from "./CopyableLink";
import { setDBTraits } from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";
import { Box, Button, Grid, Typography } from "@mui/material";
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
    <Box
      component="main"
      // App's legacy touchmove lock is needed by Selection's drag surface. Stop
      // the event here so this page keeps native momentum scrolling on phones.
      onTouchMove={(event) => event.stopPropagation()}
      sx={{
        position: "fixed",
        inset: 0,
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "contain",
        pt: { xs: "72px", sm: "80px" },
        pb: {
          xs: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
          sm: 3,
        },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent={{ xs: "flex-start", md: "center" }}
        wrap="nowrap"
        sx={{
          width: "100%",
          maxWidth: 560,
          minHeight: "100%",
          mx: "auto",
        }}
      >
        <Grid item sx={{ pb: { xs: 1, sm: 1.5 } }}>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{ fontWeight: 600, fontSize: { xs: "1.35rem", sm: "1.5rem" } }}
          >
            Your top traits
          </Typography>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <SmallTraitList traits={topTraits || []} />
        </Grid>
        <Grid item sx={{ width: "100%", pt: { xs: 1, sm: 2 } }}>
          <CopyableLink text={shareUrl} />
        </Grid>
        <Grid item sx={{ pt: { xs: 1, sm: 1.5 } }}>
          <Button onClick={handleStartOver} color="warning" variant="outlined">
            Start over
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsPage;
