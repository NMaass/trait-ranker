import React, { useEffect, useRef, useContext, useState } from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Grid, useMediaQuery } from "@mui/material";
import { trackRankingPage } from "../utils/mixpanel";
import { ProgressContext } from "./App";

import generateBracket from "../utils/generateMatches";

const RankingPage = ({ topTraits, setTopTraits, history, finalList }) => {
  const [displayedPairs, setDisplayedPairs] = useState(topTraits.slice(0, 2));
  const matches = useRef([]);

  useEffect(() => {
    trackRankingPage(topTraits);
    matches.current = generateBracket(topTraits.length);
    console.log(matches.current);
  }, []);
  const loadPlayers = () => {
    for (let i = 0; i < topTraits.length; i += 2) {
      //generate pairs for the user to sort
      matches.current[i][0] = topTraits[i];
      matches.current[i][1] = topTraits[i + 1];
    }
  };

  const isMobile = useMediaQuery("(min-width:1024px)");

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;

  return (
    <div>
      <Grid
        container
        spacing={isMobile ? 60 : 3}
        alignItems="center"
        justifyContent="center"
        direction={isMobile ? "row" : "column"}
      >
        <Grid item>
          <RankingTrait trait={displayedPairs[0]} />
        </Grid>
        <Grid item>
          <RankingTrait trait={displayedPairs[1]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RankingPage;
